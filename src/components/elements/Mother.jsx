import React from "react";

export default function Mother(props) {
  return (
    <mesh {...props}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
