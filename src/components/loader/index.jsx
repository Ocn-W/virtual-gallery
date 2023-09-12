import { useProgress } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { useLottie } from "lottie-react";
import { lottieSVG } from "../styles/lottie";

export default function Loader() {
  const options = {
    animationData: lottieSVG[0],
    loop: true
  }
    const {progress} = useProgress();
    const {loadAnim} = useLottie(options);

    return (
      <Html className="loader">
        <>{loadAnim}</>
        <Html centered style={{color: "black"}}>{progress}% Loaded!</Html>
      </Html>
    );
}