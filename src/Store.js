import { createContext, useState } from 'react';

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    ADD_NEW_MSG: "ADD_NEW_MSG"
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        messageList: []
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.ADD_NEW_MSG: {
                console.log("ADD_NEW_MSG");
                return setStore({
                    messageList: payload
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

    return (
        <GlobalStoreContext.Provider value={{ store }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}


export default GlobalStoreContext;
export { GlobalStoreContextProvider };