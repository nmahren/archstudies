import { Line, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import { QuadraticBezierCurve3, Vector3 } from "three";
import "./App.css";
import Model from "./components/Untitled";

const path = new QuadraticBezierCurve3(
  new Vector3(-5, -0.5, -1),
  new Vector3(0, 5, 6),
  new Vector3(5, -0.5, -1)
);
function App() {
  const [percentage, setPercentage] = useState(20);
  const [showSunPath, setShowSunPath] = useState(false);

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
            min="20"
            max="80"
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
          <p
            style={{ cursor: "pointer" }}
            onClick={() => setShowSunPath(!showSunPath)}
          >
            Sonne {showSunPath ? "ausblenden" : "einblenden"}
          </p>
        </div>
      </div>
      <Canvas shadows camera={{ fov: 45, position: [8, 10, 10] }}>
        <fog attach="fog" args={["white", 5.5, 40]} />
        <ambientLight intensity={0.2} />
        <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
        <pointLight position={[-20, -20, -20]} />
        <directionalLight
          castShadow
          position={path.getSpacedPoints(100)[percentage]}
          intensity={3}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={100}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
        <mesh scale={0.5} position={[-1.5, 0.25, 1]} castShadow receiveShadow>
          <boxGeometry />
          <meshStandardMaterial attach="material" color="gray" />
        </mesh>
        <Suspense fallback={false}>
          <Model />
        </Suspense>

        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <shadowMaterial attach="material" opacity={0.2} color="black" />
        </mesh>

        {showSunPath && (
          <>
            {/* @ts-ignore */}
            <Line points={path.getPoints(50)} color="purple" />
            <mesh position={path.getSpacedPoints(100)[percentage]} scale={0.1}>
              <sphereGeometry />
              <meshStandardMaterial attach="material" color="yellow" />
            </mesh>
          </>
        )}
        <OrbitControls target0={new Vector3(0, 0, 0)} />
      </Canvas>
    </div>
  );
}

export default App;
