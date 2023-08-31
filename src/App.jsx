import './App.scss';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function App() {
  return (
    <Canvas className='canvas' camera={[75, window.innerWidth/window.innerHeight, 0.1, 1000]}>
  <ambientLight intensity={1}/>
  <directionalLight color="white" position={[0, 0, 5]} />
  <mesh>
    <boxGeometry args={[1,1,1]}/>
    <meshStandardMaterial color='yellow'/>
  </mesh>
  <OrbitControls/>
</Canvas>
  )
}
