import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Loader from "../../loader";
import { Player } from "../../character";

export function Scene(props) {
  const { nodes, materials } = useGLTF("/assets/blender-objects/scene/gallery-full.gltf");
  return (
  <Suspense fallback={<Loader/>}>
  <Canvas style={{ height: "100%", width: "auto" }} camera={{fov: 55, near: 0.1, far: 1000, position: [0, 3, 7]}}>
  <Physics gravity={[0,1,0]} colliders={false} debug>

    <RigidBody includeInvisible type='fixed' colliders='trimesh' >
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FLOOR.geometry}
          material={materials["Concrete Pavement"]}
          position={[-5.07, 0, -2.173]}
          scale={[49.466, 32.953, 32.82]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CIEL.geometry}
          material={nodes.CIEL.material}
          position={[-5.07, 17.124, -2.173]}
          scale={[49.466, 32.953, 32.82]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WALL.geometry}
          material={nodes.WALL.material}
          position={[-5.07, -0.599, -2.173]}
          scale={[49.466, 32.953, 32.82]}
        />    
      </group> 
    </RigidBody>

      <Player/> 

  </Physics>

  <ambientLight intensity={5}/>
  <Environment files={'/assets/blender-objects/scene/HDRI/kloofendal_48d_partly_cloudy_puresky_4k.hdr'} background/>
  </Canvas>
  </Suspense>
  );
}

useGLTF.preload("/assets/blender-objects/scene/gallery-full.gltf");
