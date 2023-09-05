import { useProgress, Html } from "@react-three/drei";

export default function Loader() {
    const {progress} = useProgress();
    return (
      <Html center style={{color: "black"}}>{progress}% Loaded!</Html>
    );
}