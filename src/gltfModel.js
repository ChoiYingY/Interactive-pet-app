import React, { useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GltfModel = ({ modelPath, position = [0, 0, 0] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, setHovered] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(null);

  const playAnimation = (name) => {
    const animation = animations.find((anim) => anim.name === name);
    if (animation) {
      setCurrentAnimation(name);
      const action = mixer.clipAction(animation, meshRef.current);
      action.play();
    }
  };

  const stopAnimation = () => {
    if (currentAnimation) {
      const animation = animations.find((anim) => anim.name === currentAnimation);
      const action = mixer.clipAction(animation, meshRef.current);
      action.stop();
      setCurrentAnimation(null);
    }
  };


  useFrame(({ mouse, camera }) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.007;
  });

  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        onPointerOver={(event) => setHovered(true)}
        onPointerOut={(event) => setHovered(false)}
      />
    </>
  );
};

export default GltfModel;