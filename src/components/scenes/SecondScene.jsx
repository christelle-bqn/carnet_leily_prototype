import { useState, useEffect, useRef } from "react";
import { DoubleSide } from "three";
import { Center, KeyboardControls, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import { Appart } from "../elements/scene2/Appart";
import { ApplePie } from "../elements/scene2/ApplePie";
import { Waiter } from "../elements/scene2/Waiter";
import Mother from "../elements/Mother";
import Daughter from "../elements/Daughter";

import { useThree } from "@react-three/fiber";

export const SecondScene = () => {
  const [cursor, setCursor] = useState("default");

  const [rotation, setRotation] = useState([0, 0, 0]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [motherPosition, setMotherPosition] = useState([-3, 1, -1]);
  const [daughterPosition, setDaughterPosition] = useState([-3, 1, 1]);
  const [isDaughterEnabled, setIsDaughterEnabled] = useState(true);
  const [interactiveObjects, setInteractiveObjects] = useState([
    { component: ApplePie, position: null, outline: false },
    { component: Waiter, position: null, outline: false },
  ]);
  const [mode, setMode] = useState("click");

  const isDaughterEnabledRef = useRef(isDaughterEnabled);
  const motherPositionRef = useRef(motherPosition);
  const daughterPositionRef = useRef(daughterPosition);
  const interactiveObjectsRef = useRef(interactiveObjects);

  const [isPressed, setIsPressed] = useState(false);

  const { scene } = useThree();

  useEffect(() => {
    document.body.style.cursor = cursor;
  }, [cursor]);

  useEffect(() => {
    const interactionImage = document.getElementById("interactionImage");

    if (window.location.pathname === "/second-scene-click") {
      setMode("click");
      interactionImage.src = "/ui/tutorial/click.svg";
    } else {
      setMode("press");
      interactionImage.src = "/ui/tutorial/press.svg";
    }
  }, []);

  addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      setIsPressed(true);
    }
  });

  addEventListener("keyup", (e) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      setIsPressed(false);
    }
  });

  const moveZone = {
    x: [-5, 5.1],
    z: [1, 6],
  };

  useEffect(() => {
    let newInteractiveObjects = [];

    scene.traverse((child) => {
      const interactiveObject = interactiveObjects.find(
        (el) => el.component.name === child.name
      );

      if (interactiveObject && child.isGroup) {
        interactiveObject.position = child.children[0].position.clone();
        newInteractiveObjects.push(interactiveObject);
      }
    });

    setInteractiveObjects(newInteractiveObjects);
  }, []);

  useEffect(() => {
    isDaughterEnabledRef.current = isDaughterEnabled;
    motherPositionRef.current = motherPosition;
    daughterPositionRef.current = daughterPosition;
    interactiveObjectsRef.current = interactiveObjects;
  }, [isDaughterEnabled, motherPosition, daughterPosition, interactiveObjects]);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    return () => {
      context.close();
    };
  }, []);

  const rotateAppart = () => {
    gsap.to(rotation, {
      1: rotation[1] + Math.PI,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => setRotation([...rotation]),
    });

    setIsDaughterEnabled(!isDaughterEnabled);
  };

  const checkDistanceAndUpdateOutline = () => {
    const characterPosition = isDaughterEnabled
      ? daughterPositionRef.current
      : motherPositionRef.current;

    interactiveObjectsRef.current.forEach((interactiveObject) => {
      const objectPosition = interactiveObject.position;
      const distance = Math.sqrt(
        Math.pow(characterPosition[0] - objectPosition?.x, 2) +
          Math.pow(characterPosition[1] - objectPosition?.y, 2) +
          Math.pow(characterPosition[2] - objectPosition?.z, 2)
      );

      interactiveObject.outline = distance < 2;
    });
  };

  useEffect(() => {
    checkDistanceAndUpdateOutline();
  }, [daughterPosition, motherPosition]);

  const Move = (direction) => {
    const step = 0.3;
    const newPosition = isDaughterEnabledRef.current
      ? [
          daughterPositionRef.current[0] + direction[0] * step,
          daughterPositionRef.current[1] + direction[1] * step,
          daughterPositionRef.current[2] + direction[2] * step,
        ]
      : [
          motherPositionRef.current[0] + -direction[0] * step,
          motherPositionRef.current[1] + -direction[1] * step,
          motherPositionRef.current[2] + -direction[2] * step,
        ];
    if (isDaughterEnabledRef.current) {
      if (
        newPosition[0] > moveZone.x[0] &&
        newPosition[0] < moveZone.x[1] &&
        newPosition[2] > moveZone.z[0] &&
        newPosition[2] < moveZone.z[1]
      ) {
        setDaughterPosition(newPosition);
      }
    } else {
      if (
        newPosition[0] > moveZone.x[0] &&
        newPosition[0] < moveZone.x[1] &&
        newPosition[2] > -moveZone.z[1] &&
        newPosition[2] < -moveZone.z[0]
      ) {
        setMotherPosition(newPosition);
      }
    }
  };

  function loadAudio(index) {
    const audioPath = `voiceover/scene2/${index}.mp3`;

    if (currentAudio) {
      currentAudio.stop();
      currentAudio.currentTime = 0;
    }

    fetch(audioPath)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        audioContext.decodeAudioData(arrayBuffer, (buffer) => {
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.destination);
          source.start();
          setCurrentAudio(source);
        });
      })
      .catch((error) => console.error("Error loading audio:", error));
  }

  function onItemClick(e, index) {
    e.stopPropagation();

    if (interactiveObjects[index].outline && mode === "click") {
      if (currentAudio) {
        currentAudio.stop();
        currentAudio.currentTime = 0;
      }

      loadAudio(index);
    }
  }

  useEffect(() => {
    if (isPressed) {
      interactiveObjectsRef.current.forEach((interactiveObject, index) => {
        if (interactiveObject.outline && mode === "press") {
          if (currentAudio) {
            currentAudio.stop();
            currentAudio.currentTime = 0;
          }

          loadAudio(index);
        }
      });
    }
  }, [isPressed]);

  return (
    <>
      <OrbitControls />

      <pointLight position={[0, 3, 2]} intensity={0.5} />
      <pointLight position={[0, 3, -2]} intensity={0.5} />

      <KeyboardControls
        map={[
          { name: [0, 0, -1], keys: ["ArrowUp"] },
          { name: [0, 0, 1], keys: ["ArrowDown"] },
          { name: [-1, 0, 0], keys: ["ArrowLeft"] },
          { name: [1, 0, 0], keys: ["ArrowRight"] },
        ]}
        onChange={(direction) => Move(direction)}
      >
        <group rotation={rotation}>
          <Center>
            <Appart />

            {/* {interactiveObjects.map(({ component: Item, outline }, index) => (
              <Item
                key={index}
                index={index}
                outline={outline}
                onClick={(e) => onItemClick(e, index)}
                onPointerEnter={() =>
                  interactiveObjects[index].outline &&
                  mode === "click" &&
                  setCursor("pointer")
                }
                onPointerLeave={() => mode === "click" && setCursor("default")}
              />
            ))} */}

            <Mother position={motherPosition} />
            <Daughter position={daughterPosition} />
          </Center>

          <mesh position={[-1.75, 0, 0]} onClick={rotateAppart}>
            <sphereGeometry args={[0.5, 32]} />
            <meshBasicMaterial color="red" side={DoubleSide} />
          </mesh>
        </group>
      </KeyboardControls>
    </>
  );
};

export default SecondScene;
