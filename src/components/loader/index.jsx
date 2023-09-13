import { useProgress } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { useLottie } from "lottie-react";
import { lottieSVG } from "../styles/lottie";
import { Canvas } from "@react-three/fiber";

export default function Loader() {
  const options = {
    animationData: lottieSVG[0],
    loop: true
  }
    const {progress} = useProgress();
    const {loadAnim} = useLottie(options);

    return (
      <Canvas>
        <Html className="loader">
          <>{loadAnim}</>
          <Html centered style={{color: "black"}}>{progress}% Loaded!</Html>
        </Html>
      </Canvas>
    );
}