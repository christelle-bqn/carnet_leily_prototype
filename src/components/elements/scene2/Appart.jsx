import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Appart(props) {
  const { nodes, materials } = useGLTF("models/scene2/scene.glb");
  return (
    <group {...props} dispose={null} name="Appart">
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[3.553, 1.421, 0.372]}
        scale={[1.034, 0.017, 0.199]}
      />
    </group>
  );
}

useGLTF.preload("models/scene2/scene.glb");
