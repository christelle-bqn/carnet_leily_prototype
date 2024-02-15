import React, { useRef } from "react";
import { Outlines, useGLTF } from "@react-three/drei";

export function Waiter(props) {
  const { nodes, materials } = useGLTF("models/scene2/waiter.glb");
  return (
    <group {...props} name="Waiter">
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WAITER.geometry}
        material={nodes.WAITER.material}
        position={[-2.53, 1.673, -4.24]}
        rotation={[0, 0.147, 0]}
        scale={[0.388, 0.368, 0.388]}
      >
        {props.outline && <Outlines thickness={0.05} color="red" />}
      </mesh>
    </group>
  );
}

useGLTF.preload("models/scene2/waiter.glb");
