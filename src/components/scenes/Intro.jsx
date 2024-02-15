import { Center, OrbitControls, PivotControls } from "@react-three/drei";
import { Book } from "../elements/intro/Book";
import { PostIt1 } from "../elements/intro/PostIt1";
import { PostIt2 } from "../elements/intro/PostIt2";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useControls } from "leva";

export const Intro = () => {
  const [cursor, setCursor] = useState("default");
  const [postItPosition, setPostItPosition] = useState([-0.5, 0, 3]);
  const [postItRotation, setPostItRotation] = useState([
    Math.PI / 2 - Math.PI,
    Math.PI / 2,
    (2 * Math.PI) / 3,
  ]);
  const [bookPosition, setBookPosition] = useState([-0.5, 0, 3]);
  const [bookRotation, setBookRotation] = useState([
    Math.PI / 2 - Math.PI,
    Math.PI / 2,
    (2 * Math.PI) / 3,
  ]);
  const [clicked, setClicked] = useState(false);
  const [showPostIt, setShowPostIt] = useState(true);
  const [playAnimation, setPlayAnimation] = useState(false);

  const PostIt = window.location.pathname === "/intro-v1" ? PostIt1 : PostIt2;

  useEffect(() => {
    document.body.style.cursor = cursor;
  }, [cursor]);

  const animatePostIt = () => {
    if (!clicked) {
      gsap.to(postItPosition, {
        0: postItPosition[0] + 0,
        1: postItPosition[1] + 0.2,
        2: postItPosition[2] + 4.5,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => setPostItPosition([...postItPosition]),
      });

      gsap.to(postItRotation, {
        0: postItRotation[0] + 0.1,
        1: postItRotation[1] - 0.4,
        2: postItRotation[2] + 0.9,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => setPostItRotation([...postItRotation]),
      });
      setClicked(true);
    } else {
      setCursor("default");
      setShowPostIt(false);
      setPlayAnimation(true);
      animateBook();
    }
  };

  const animateBook = () => {
    gsap.to(bookPosition, {
      0: bookPosition[0] + 0.5,
      1: bookPosition[1] - 1,
      2: bookPosition[2] + 2,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        setBookPosition([...bookPosition]);
      },
    });

    gsap.to(bookRotation, {
      0: bookRotation[0] + 1.5,
      1: bookRotation[1] - 1.5,
      2: bookRotation[2] - 2.1,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => setBookRotation([...bookRotation]),
    });
  };

  return (
    <>
      <ambientLight />

      <Book
        playAnimation={playAnimation}
        rotation={[bookRotation[0], bookRotation[1], bookRotation[2]]}
        position={bookPosition}
      />

      {showPostIt && (
        <PostIt
          position={postItPosition}
          rotation={[postItRotation[0], postItRotation[1], postItRotation[2]]}
          onPointerEnter={() => setCursor("pointer")}
          onPointerLeave={() => setCursor("default")}
          onClick={() => animatePostIt()}
        />
      )}
    </>
  );
};

export default Intro;
