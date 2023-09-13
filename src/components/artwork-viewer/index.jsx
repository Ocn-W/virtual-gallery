import { React, useState, Suspense, startTransition, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import Loader from "../loader/index.jsx";
import { artwork } from "../paintings/index.jsx";

//Passing currArtwork index value to useGLTF
const loadGLTF = (artworkIndex) => {
  return artworkIndex
};

export default function ArtworkViewer(props) {
  const [currArtwork, setSelectedArtwork] = useState(0);
  const { nodes, materials } = useGLTF(artwork[currArtwork].GLTF);
  //Edit Camera Position
  const cameraConfig = { fov: 60, position: [10, 0, 0] };
  //Edit object Positon (X|Y|Z)
  const objectPosition = [0, -4, 0];

  loadGLTF(currArtwork);

  function artworkSelected(index) {
    //Lets React know this is apart of an async update
    startTransition(() => {
      setSelectedArtwork(index);
    });
  }

  return (
    <>
      <div className="artview-container">
        <section className="art-view">
          <Canvas
            style={{ height: "100%", width: "100%" }}
            className="artwork-container"
          >
            <Suspense fallback={<Loader />}>
              <PerspectiveCamera makeDefault {...cameraConfig} />
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
              <OrbitControls enableZoom={false} object={artwork.map((art) => art.GLTF)} />
              <ambientLight intensity={5} />
            </Suspense>
          </Canvas>
          <section className="art-details">
            <h2>{artwork[currArtwork].name}</h2>
            <p>{artwork[currArtwork].date}</p>
            <p>{artwork[currArtwork].price}</p>
            <button>Purchase</button>
          </section>
        </section>
        <section className="art-selection">
          <div className="art-image">
            {artwork.map((art, index) => (
              <img
                src={art.image}
                key={index}
                onClick={() => artworkSelected(index)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

useGLTF.preload(artwork[loadGLTF]);
