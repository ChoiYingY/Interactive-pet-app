import './App.css';

import { Canvas } from "react-three-fiber";
import React, {useEffect, useState } from 'react';

import HomeScreen from "./HomeScreen";
import LoadingScreen from './LoadingScreen';


// import React, { Suspense } from 'react';
// import { useGLTF } from '@react-three/drei';

// import * as THREE from 'three';

// const camera = new THREE.PerspectiveCamera(
//   45,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// function Model() { 
//   const usingGlft = useGLTF('./wolfie.glb',true);
//   return (
//     <>
//       <ambientLight intensity={1} />
//       <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
//       <pointLight position={[-10, -10, -10]} />
//       <Suspense fallback={null}>
//         <primitive object={usingGlft.scene} />
//       </Suspense>
//     </>
//   )
// }

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);
    
  return (
    <div className='home'>
      {!isLoading
        ? <div>
          <HomeScreen/>
        </div>
        : <LoadingScreen/>
      }
    </div>
    
    // <ModelViewer scale="10" modelPath={"./wolfie.glb"} />

    // <Canvas style={{ background: "#B6977D", height:"500px"}}>
    // </Canvas>
    // <div className="App">
    //   {/* <ModelViewer scale="40" modelPath={"/rsrc/wolfie.glb"} /> */}
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    // </div>
  );
}

export default App;
