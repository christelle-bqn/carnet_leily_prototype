export default function Daughter(props) {
  return (
    <mesh {...props}>
      <sphereGeometry args={[.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
