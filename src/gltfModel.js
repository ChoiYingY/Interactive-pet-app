import React, { useRef, useState, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

const GltfModel = ({ modelPath, position = [0, 0, 0] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const mixer = new THREE.AnimationMixer(gltf.scene);

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if(ref && ref.current){
      if(hovered)
        ref.current.scale.set(1.25, 1.25, 1.25);
      else
        ref.current.scale.set(1, 1, 1);
      }
  }, [hovered]);

  const handlePointerOver = () => {
    console.log("point over")
    setHovered(true);
  };

  const handlePointerOut = () => {
    console.log("point out")
    setHovered(false);
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