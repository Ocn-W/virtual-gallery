import React, { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../loader";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";

export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("src/assets/blender-objects/character/testChar.gltf");
  const { actions } = useAnimations(animations, group);
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="charactergltf">
          <group
            name="Camera"
            position={[-2.095, 1.299, -6.528]}
            rotation={[1.586, -0.005, 2.814]}
          >
            <PerspectiveCamera
              name="Camera_Orientation"
              makeDefault={false}
              far={1000}
              near={0.1}
              fov={22.895}
              rotation={[-Math.PI / 2, 0, 0]}
            />
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
    </group>        
  );
}

useGLTF.preload("src/assets/blender-objects/character/testChar.gltf");
