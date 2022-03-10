import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { QuadraticBezierCurve3, Vector3 } from "three";
import "./App.css";

const path = new QuadraticBezierCurve3(
  new Vector3(-5, -0.5, -1),
  new Vector3(0, 5, 6),
  new Vector3(5, -0.5, -1)
);
function App() {
  const [percentage, setPercentage] = useState(0);

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          position: "fixed",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>SonnenStudie 3000</h1>
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={({ target }) => setPercentage(parseInt(target.value))}
            step="1"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>05:00</p>
            <p>12:00</p>
            <p>20:00</p>
          </div>
        </div>
      </div>
      <Canvas shadows camera={{ fov: 45, position: [8, 10, 10] }}>
        <fog attach="fog" args={["white", 5.5, 40]} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <directionalLight
          castShadow
          position={path.getSpacedPoints(100)[percentage]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={100}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry />
          <meshStandardMaterial attach="material" color="gray" />
        </mesh>

        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <shadowMaterial attach="material" opacity={0.3} color="darkblue" />
        </mesh>

        {/* @ts-ignore */}
        {/* <Line points={path.getPoints(50)} color="purple" /> */}
        <OrbitControls target0={new Vector3(0, 0, 0)} />
      </Canvas>
    </div>
  );
}

export default App;
