import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopOnce } from "three";

export function Book(props) {
  const { nodes, materials, animations } = useGLTF("models/intro/book.glb");
  const { ref, mixer, names, actions, clips } = useAnimations(animations);
  useEffect(() => {
    if (props.playAnimation) {
      actions["Action.002"].clampWhenFinished = true;
      actions["Action.004"].clampWhenFinished = true;
      actions["Action.005"].clampWhenFinished = true;
      actions["Action.006"].clampWhenFinished = true;

      actions["Action.002"].setLoop(LoopOnce);
      actions["Action.004"].setLoop(LoopOnce);
      actions["Action.005"].setLoop(LoopOnce);
      actions["Action.006"].setLoop(LoopOnce);

      actions["Action.002"].play();
      actions["Action.004"].play();
      actions["Action.005"].play();
      actions["Action.006"].play();
    }
  }, [props.playAnimation]);

  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Pages"
          position={[-0.005, -0.138, -1.153]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={2.976}
        >
          <skinnedMesh
            name="PagesMesh"
            geometry={nodes.PagesMesh.geometry}
            material={materials.PagesMaterial}
            skeleton={nodes.PagesMesh.skeleton}
            morphTargetDictionary={nodes.PagesMesh.morphTargetDictionary}
            morphTargetInfluences={nodes.PagesMesh.morphTargetInfluences}
          />
          <primitive object={nodes.PagesBottom} />
          <primitive object={nodes.PagesBottomSide} />
          <primitive object={nodes.ControlPages} />
        </group>
        <group name="Empty" position={[-0.005, -0.138, 0.495]} scale={1.761}>
          <group name="Cover" position={[-0.664, 0.297, -0.903]} scale={0.568}>
            <primitive object={nodes.BookRoot} />
          </group>
          <skinnedMesh
            name="CoverMesh"
            geometry={nodes.CoverMesh.geometry}
            material={materials.BookCoverMaterial}
            skeleton={nodes.CoverMesh.skeleton}
          />
        </group>
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          position={[0, -0.08, -1.181]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/intro/book.glb");
