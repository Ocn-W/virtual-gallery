/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { Suspense, useRef } from "react";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Loader from "../../loader";
import { Canvas } from "@react-three/fiber";

export default function ThreeRs(props) {
  const { nodes, materials } = useGLTF("src/assets/blender-objects/paintings/threeRs-exp.gltf");
  //Edit Camera Position
  const cameraConfig = { fov: 60, position: [10, 0, 0] }
  //Edit object Positon (X|Y|Z)
  const objectPosition = [0,-4,0];

  return (
  <Canvas style={{height: '80vh', width:'60vh'}} className="artwork-container">
    <Suspense fallback={<Loader/>}>
    <PerspectiveCamera makeDefault {...cameraConfig}/>
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        position={objectPosition}
        geometry={nodes.Painting_Cube_Wood.geometry}
        material={materials.Wood}
      />
      <mesh
        castShadow
        receiveShadow
        position={objectPosition}
        geometry={nodes.Painting_Cube_Painting.geometry}
        material={materials.Painting}
      />
      <mesh
        castShadow
        receiveShadow
        position={objectPosition}
        geometry={nodes.Painting_Cube_Material.geometry}
        material={materials.Material}
      />
    </group>
    <ambientLight intensity={5}/>
    <OrbitControls enableZoom={false} object={ThreeRs}/>
    </Suspense>
  </Canvas>
  );
}

useGLTF.preload("src/assets/blender-objects/paintings/threeRs-exp.gltf");