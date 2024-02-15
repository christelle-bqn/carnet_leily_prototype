import React, { useRef } from "react";
import { Outlines, useGLTF } from "@react-three/drei";

export function ApplePie(props) {
  const { nodes, materials } = useGLTF("models/scene2/applePie.glb");
  return (
    <group {...props} dispose={null} name="ApplePie">
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.APPLE_PIE.geometry}
        material={nodes.APPLE_PIE.material}
        position={[4.305, 1.535, 1.948]}
        scale={0.105}
      ></mesh>
    </group>
  );
}
useGLTF.preload("models/scene2/applePie.glb");
