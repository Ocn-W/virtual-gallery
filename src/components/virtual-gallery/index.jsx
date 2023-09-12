import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../loader";
import { Player } from "../character";
import Navigation from "../navigation";
import { CapsuleCollider, MeshCollider, Physics, RigidBody, interactionGroups } from "@react-three/rapier";
import { Scene } from "./scene";

export default function VirtualGallery(props) {
  return (
    <>
      <Navigation />
      <div className="galleryContainer">
        <Canvas style={{ height: "100%", width: "auto" }} camera={{fov: 55, near: 0.1, far: 1000, position: [0, 3, 7]}}>
          <Suspense fallback={<Loader />}>
            <Physics gravity={[0,1,0]} colliders={false} debug>
              <RigidBody colliders='trimesh' includeInvisible type='fixed'>
                <Scene/>
              </RigidBody>
              <RigidBody includeInvisible colliders='trimesh' type='dynamic' gravityScale={0}>
                <CapsuleCollider args={[.8,.5,0]} position={[0,1.2,0]} />
                <Player />
              </RigidBody>   
            </Physics>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
