import React from "react";

import ModelViewer from "./ModelViewer";

const HomeScreen = () => {
    return(
        <div>
            <ModelViewer scale="10" modelPath={"./assests/cube.gltf"} />
        </div>
    );
}

export default HomeScreen;