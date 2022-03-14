/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Untitled: THREE.Mesh;
  };
  materials: {
    diffuse_0_0_0_255: THREE.MeshStandardMaterial;
  };
};

export default function Model({ ...props }: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF("/untitled.glb") as GLTFResult;
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={0.15}
      receiveShadow
      castShadow
    >
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.Untitled.geometry}
        // material={materials.diffuse_0_0_0_255}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial attach="material" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/untitled.glb");
