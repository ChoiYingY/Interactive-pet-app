import { createContext, useState } from 'react';

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    ADD_NEW_MSG: "ADD_NEW_MSG",
    IS_CHOOSING_EMOJI: "IS_CHOOSING_EMOJI"
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        messageList: [],
        is_choosing_emoji: false
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.ADD_NEW_MSG: {
                console.log("ADD_NEW_MSG");
                return setStore({
                    messageList: payload,
                    is_choosing_emoji: store.is_choosing_emoji
                });
            }
            case GlobalStoreActionType.IS_CHOOSING_EMOJI: {
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: payload
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

    store.respondMessage = function(){
        store.addMessage('Rilakkuma', "No.");
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

    store.startChoosingEmoji = () => {
        storeReducer({
            type: GlobalStoreActionType.IS_CHOOSING_EMOJI,
            payload: true
        });
    }

    store.stopChoosingEmoji = () => {
        storeReducer({
            type: GlobalStoreActionType.IS_CHOOSING_EMOJI,
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