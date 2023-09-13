import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { RigidBody, CapsuleCollider, RapierRigidBody, vec3, quat } from "@react-three/rapier";
import { useInput } from "./controls";
import * as THREE from 'three';

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({forward, backward, left, right}) => {
  var directionOffset = 0; // W KEY
  if(forward){
    if(left){
      directionOffset = Math.PI / 4; // W KEY + A KEY
    } else if(right){
      directionOffset = -Math.PI / 4; // W KEY + D KEY
    }
  } else if(backward) {
    if(left){
      directionOffset = Math.PI / 4 + Math.PI / 2; // S KEY + A KEY
    } else if(right){
      directionOffset = -Math.PI / 4 - Math.PI / 2; // S KEY + D KEY
    } else {
      directionOffset = Math.PI; // S KEY
    }
  } else if(left) {
    directionOffset = Math.PI / 2; // A KEY
  } else if(right) {
    directionOffset = -Math.PI / 2 // D KEY
  }
  return directionOffset
}

export function Player(props) {
  const model = useGLTF("/assets/blender-objects/character/testChar.gltf");
  const group = useRef(model.scene);
  const rigidBody = useRef(<RapierRigidBody/>);
  const { forward, backward, left, right, shift } = useInput();
  const { animations } = useGLTF("/assets/blender-objects/character/testChar.gltf");
  const { actions } = useAnimations(animations, group);
  const currentAction = useRef('');
  const controlsRef = useRef(<OrbitControls/>);
  const camera = useThree(state => state.camera);

  const updateCameraTarget = (moveX, moveZ) => {
    //move camera
    camera.position.x += moveX;
    camera.position.z += moveZ;

    //update target
    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;
    if(controlsRef.current) controlsRef.current.target = cameraTarget;
  }

  useEffect(() => {
    let action = '';
    if(forward || backward || left || right) {
      action = 'Walking';
      if(shift) {
        action = 'Running'
      }
    } else {
      action = 'Idle'
    }

    if(currentAction.current != action) {
      const nextAction = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextAction?.reset().fadeIn(0.2).play()
      currentAction.current = action;
    }
  }, [forward, backward, left, right, shift]);

  useFrame((state, delta) => {
    if(currentAction.current == 'Walking' || currentAction.current == 'Running') {
      //camera direction calc
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );
      //diagonal movement
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right
      });

      //rotate model
      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      //walk direction
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      //run speed
      const velocity = currentAction.current == 'Running' ? 10 : 5;

      //move model & camera
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);    
      
      if(rigidBody.current) {
      const position = vec3(model.scene.position);
      const quaternion = quat(rotateQuarternion);
      //set values for rigid body
        rigidBody.current.setTranslation(position, true);
        rigidBody.current.setRotation(quaternion, true);
    }
    }
  })

  return (
    <>
    <OrbitControls ref={controlsRef} />
    <RigidBody includeInvisible type='kinematicPosition' colliders='trimesh' gravityScale={0} ref={rigidBody}>
      <CapsuleCollider args={[.8,.5,0]} position={[0,1.5,0]} />
      <primitive object={model.scene} {...props}/>
    </RigidBody>
    </>   
  );
}

useGLTF.preload("/assets/blender-objects/character/testChar.gltf");
