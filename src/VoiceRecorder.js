// import React, { useContext } from "react";

// import { GlobalStoreContext } from "./Store";
// import { Modal, Button } from "@mui/material";

// const style = {
//     top: "0",
//     left: "0",
//     right: "0",
//     bottom: "0",
//     opacity: "0",
//     background: "black",

//     padding: "1rem",
//     cursor: "pointer",

//     display: "flex",
//     position: "fixed",
//     alignItems: "center",
//     justifyContent: "center",
//     transition: "all 0.35s ease-in",
// }

// const VoiceRecorder = () => {
//     let { store } = useContext(GlobalStoreContext);

//     function stopRecording(event){
//         event.stopPropagation();

//         if(store){
//             store.stopRecording();
//         }
//     }

//     return(
//         <Modal sx={{style}} open={store.is_recording}>
//             <Button tabIndex={0} onClick={stopRecording}>
//                 hi
//             </Button>
//         </Modal>
//     );
// }

// export default VoiceRecorder;