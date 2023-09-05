import { useState, Suspense, startTransition } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Loader from '../loader/index.jsx';
import Lottie from "lottie-react";
import { lottieSVG } from "../styles/lottie.jsx";
import { artworkImages } from "../paintings/artwork-images";
import { artworkGLTF } from "../paintings/artwork-3D";


//Passing currArtwork index value to useGLTF
const loadGLTF = (artworkIndex) => {
    return artworkIndex
}

export default function ArtworkViewer(props) {
  const [currArtwork, setSelectedArtwork] = useState(0);
  const [loadingArt, setLoadingArt] = useState(false);
  //Edit Camera Position
  const { nodes, materials } = useGLTF(artworkGLTF[currArtwork]);
  const cameraConfig = { fov: 60, position: [10, 0, 0] };
  //Edit object Positon (X|Y|Z)
  const objectPosition = [0, -4, 0];

  loadGLTF(currArtwork);

  function artworkSelected(index) {
    //Lets React know this is apart of an async update
    startTransition(() => {
        setLoadingArt(true);
        setSelectedArtwork(index);
        setLoadingArt(false);
    });
  }

  return (
    <>
      <div className="artview-container">
        <section className="art-selection">
          <div className="art-image">
            {artworkImages.map((img, index) => (
              <img
                src={img}
                key={index}
                onClick={() => artworkSelected(index)}
              />
            ))}
          </div>
        </section>
        <section className="art-view">
            <Canvas style={{ height: "80vh", width: "60vh" }} className="artwork-container">
                {loadingArt ? <Lottie animationData={lottieSVG[0]} loop={true}/> : (
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
                <ambientLight intensity={5} />
                <OrbitControls enableZoom={false} object={artworkGLTF} />
              </Suspense>
              )}
            </Canvas>
        </section>
      </div>
    </>
  );
}

useGLTF.preload(artworkGLTF[loadGLTF]);

