import { Canvas } from "@react-three/fiber";
import { SecondScene } from "./components/scenes/SecondScene";
import { Route } from "wouter";
import { useControls } from "leva";
import { useEffect, useMemo } from "react";
import { navigate } from "wouter/use-location";
import Intro from "./components/scenes/Intro";

function App() {
  const { scene } = useControls({
    scene: {
      label: "scene manager",
      value: "intro-v1",
      options: ["intro-v2", "second-scene-click", "second-scene-press"],
    },
  });

  useEffect(() => {
    navigate(scene);
  }, [scene]);

  return (
    <Canvas shadows camera={{ position: [0, 0, 10] }}>
      <color attach="background" args={["#ececec"]} />
      <Route path="/intro-v1" component={Intro} />
      <Route path="/intro-v2" component={Intro} />
      <Route path="/second-scene-click" component={SecondScene} />
      <Route path="/second-scene-press" component={SecondScene} />
    </Canvas>
  );
}

export default App;
