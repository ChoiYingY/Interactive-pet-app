import React, { useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

const GltfModel = ({ modelPath, position = [0, 0, 0] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  // const animations = gltf.animations;
  const mixer = new THREE.AnimationMixer(gltf.scene);

  const [hovered, setHovered] = useState(false);
  // const [currentAnimation, setCurrentAnimation] = useState(null);

  // const playAnimation = (name) => {
  //   const animation = animations.find((anim) => anim.name === name);
  //   if (animation) {
  //     setCurrentAnimation(name);
  //     const action = mixer.clipAction(animation, ref.current);
  //     action.play();
  //   }
  // };

  // const stopAnimation = () => {
  //   if (currentAnimation) {
  //     const animation = animations.find((anim) => anim.name === currentAnimation);
  //     const action = mixer.clipAction(animation, ref.current);
  //     action.stop();
  //     setCurrentAnimation(null);
  //   }
  // };

  const handlePointerOver = () => {
    console.log("point over")
    setHovered(true);
    ref.current.scale.set(1.25, 1.25, 1.25);
  };

  const handlePointerOut = () => {
    console.log("point out")
    setHovered(false);
    ref.current.scale.set(1, 1, 1);
  };


  useFrame(({ mouse, camera }) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.007;
    mixer.update(0.016);
  });

  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </>
  );
};

export default GltfModel;