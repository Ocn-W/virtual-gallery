import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useAnimations, OrbitControls } from "@react-three/drei";
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
  const model = useGLTF("src/assets/blender-objects/character/testChar.gltf");
  const group = useRef(model.scene);
  const { forward, backward, left, right, shift } = useInput();
  const { animations } = useGLTF("src/assets/blender-objects/character/testChar.gltf");
  const { actions } = useAnimations(animations, group);

  const currentAction = useRef('');
  const camera = useThree(state => state.camera);
  const controlsRef = useRef(<OrbitControls />);
  
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
        angleYCameraDirection = newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      //walk direction
      camera.getWorldDirection(walkDirection)
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      //run speed
      const velocity = currentAction.current == 'Running' ? 7 : 3;

      //move model & camera
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
    }
  })


  return (
    <>
    <OrbitControls ref={controlsRef} enableZoom={true} />
    <primitive object={model.scene} />
    
    {/* <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="charactergltf" position={[0.379, 0.573, 0.248]}>
          <group
            name="Camera"
            position={[0.044, 4.538, 8.801]}
            rotation={[1.393, 0.001, -0.003]}
          >
          </group>
          <group name="Armature" position={[0, 0.94, 0]} scale={0.095}>
            <group name="Character">
              <skinnedMesh
                name="Cube014"
                geometry={nodes.Cube014.geometry}
                material={materials.Outline}
                skeleton={nodes.Cube014.skeleton}
              />
              <skinnedMesh
                name="Cube014_1"
                geometry={nodes.Cube014_1.geometry}
                material={materials.CharTexture}
                skeleton={nodes.Cube014_1.skeleton}
              />
            </group>
            <group name="PantStyle1">
              <skinnedMesh
                name="Cube016"
                geometry={nodes.Cube016.geometry}
                material={materials.Pants}
                skeleton={nodes.Cube016.skeleton}
              />
              <skinnedMesh
                name="Cube016_1"
                geometry={nodes.Cube016_1.geometry}
                material={materials.Outline}
                skeleton={nodes.Cube016_1.skeleton}
              />
            </group>
            <group name="ShoesStyle1">
              <skinnedMesh
                name="Cube006"
                geometry={nodes.Cube006.geometry}
                material={materials.Shoes}
                skeleton={nodes.Cube006.skeleton}
              />
              <skinnedMesh
                name="Cube006_1"
                geometry={nodes.Cube006_1.geometry}
                material={materials.Outline}
                skeleton={nodes.Cube006_1.skeleton}
              />
            </group>
            <group name="T-ShirtStyle1">
              <skinnedMesh
                name="Cube001"
                geometry={nodes.Cube001.geometry}
                material={materials.Shirt}
                skeleton={nodes.Cube001.skeleton}
              />
              <skinnedMesh
                name="Cube001_1"
                geometry={nodes.Cube001_1.geometry}
                material={materials.Outline}
                skeleton={nodes.Cube001_1.skeleton}
              />
            </group>
            <primitive object={nodes.Root} />
            <primitive object={nodes.IKLegPoleL} />
            <primitive object={nodes.IKTargetL} />
            <primitive object={nodes.IKLegPoleR} />
            <primitive object={nodes.IKTargetR} />
          </group>
        </group>
      </group>
    </group> */}
    </>   
  );
  
}

useGLTF.preload("src/assets/blender-objects/character/testChar.gltf");
