import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import Loader from "../loader";

export default function VirtualGallery(props) {
  const { nodes, materials } = useGLTF('src/assets/blender-objects/scene/testEnv.gltf');
  return (
    <Canvas style={{ height: "100vh", width: "auto" }}>
      <Suspense fallback={<Loader/>}>
        <group {...props} dispose={null}>
        <group position={[0, 3.429, 0]} rotation={[1.36, 0.028, -0.049]}>
            <PerspectiveCamera
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={55}
            rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
        <group position={[-3.982, 0, -4.023]} scale={4}>
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane043.geometry}
            material={materials["TEST_FLOOR.001"]}
            />
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane043_1.geometry}
            material={materials["TEST_WALL.001"]}
            />
        </group>
        </group>
        <ambientLight intensity={5}/>
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('src/assets/blender-objects/scene/testEnv.gltf');