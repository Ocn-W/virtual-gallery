import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Scene(props) {
  const { nodes, materials } = useGLTF("/assets/blender-objects/scene/gallery-full.gltf");
  return (
    <>
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
    <directionalLight intensity={5}  position={[1,1,1]}/>
    <directionalLight intensity={5}  position={[-1,1,-1]}/>
    <directionalLight intensity={5}  position={[-1,-1,-1]}/>
    </>
  );
}

useGLTF.preload("/assets/blender-objects/scene/gallery-full.gltf");
