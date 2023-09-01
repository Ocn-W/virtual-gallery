import { useProgress, Html } from "@react-three/drei";

export default function Loader() {
    const {progress} = useProgress();
    return (
      <Html center>{progress}% Loaded!</Html>
    );
}