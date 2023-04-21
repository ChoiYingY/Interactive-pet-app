import { createContext, useState } from 'react';

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    ADD_NEW_MSG: "ADD_NEW_MSG",
    UPDATE_RECORDING_STATUS: "UPDATE_RECORDING_STATUS"
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        messageList: [],
        is_recording: false
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.ADD_NEW_MSG: {
                console.log("ADD_NEW_MSG");
                return setStore({
                    messageList: payload,
                    is_recording: store.is_recording
                });
            }
            case GlobalStoreActionType.UPDATE_RECORDING_STATUS: {
                return setStore({
                    messageList: store.messageList,
                    is_recording: payload
                });
            }
            default:
                return store;
        }
    }

    store.addMessage = function(sender, message){
        var msgList = store.messageList;

        const msg = {
            id: msgList.length+1,
            sender: sender,
            message: message
        }

        msgList.push(msg);

        storeReducer({
            type: GlobalStoreActionType.ADD_NEW_MSG,
            payload: msgList
        });
    }

    store.selfIntroduction = function(){
        var msgList = store.messageList;

        var bearName = "Rilakkuma";
        var intro = "Welcome! My name is Rilakkuma.";

        const msg = {
            id: msgList.length+1,
            sender: bearName,
            message: intro
        }

        if(!msgList.some(msgObj => (msgObj.sender === bearName && msgObj.message === intro)))
            msgList.push(msg);

        storeReducer({
            type: GlobalStoreActionType.ADD_NEW_MSG,
            payload: msgList
        });
    }

    store.startRecording = () => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_RECORDING_STATUS,
            payload: true
        });
    }

    store.stopRecording = () => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_RECORDING_STATUS,
            payload: false
        });
    }

    return (
        <GlobalStoreContext.Provider value={{ store }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}


export default GlobalStoreContext;
export { GlobalStoreContextProvider };