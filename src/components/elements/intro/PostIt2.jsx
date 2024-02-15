import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function PostIt2(props) {
  const { nodes, materials } = useGLTF("models/intro/postIt2.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MomLetter.geometry}
        material={materials.Material}
        position={[-0.493, 0.378, 0.47]}
        rotation={[-3.125, 1.2, -0.018]}
        scale={[-0.93, -0.001, -1.125]}
      />
    </group>
  );
}

useGLTF.preload("models/intro/postIt2.glb");
