import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../loader";
import { Player } from "../character";
import { Physics, RigidBody } from "@react-three/rapier";
import { Scene } from "./scene";


export default function VirtualGallery(props) {
  //WHEN GALLERY IS FINISHED SET TO TRUE
  const [active,] = useState(true)

  return (
    <>
      <section className="galleryContainer">
        {!active ? <h1>COMING SOON!</h1> : (
        <Canvas style={{ height: "100%", width: "auto" }} camera={{fov: 55, near: 0.1, far: 1000, position: [0, 3, 7]}}>
          <Suspense fallback={<Loader />}>
            <Physics gravity={[0,1,0]} colliders={false} debug>
              <RigidBody colliders='trimesh' includeInvisible type='fixed'>
                <Scene/>
              </RigidBody>
                <Player />  
            </Physics>
          </Suspense>
        </Canvas>
        )}
      </section>
    </>
  );
}
