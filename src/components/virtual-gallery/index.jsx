import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import Loader from "../loader";
import { Player } from "../character";
import Navigation from "../navigation";

export default function VirtualGallery(props) {
  const { nodes, materials } = useGLTF(
    "public/assets/blender-objects/scene/testEnv.gltf"
  );
  return (
    <>
      <Navigation />
      <div className="galleryContainer">
        <Canvas style={{ height: "100%", width: "auto" }} camera={{fov: 55, near: 0.1, far: 1000, position: [0, 3, 7]}}>
          <Suspense fallback={<Loader />}>
            <group {...props} dispose={null}>
              <group position={[0, 0, 0.022]}>
                <group position={[0.018, 8.654, -19.659]} scale={4}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane034.geometry}
                    material={materials["TEST_FLOOR.002"]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane034_1.geometry}
                    material={materials["TEST_WALL.002"]}
                  />
                </group>
              </group>
            </group>
            <Player />
            <ambientLight intensity={5} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

useGLTF.preload("public/assets/blender-objects/scene/testEnv.gltf");
