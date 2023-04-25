import { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    ADD_NEW_MSG: "ADD_NEW_MSG",
    IS_CHOOSING_EMOJI: "IS_CHOOSING_EMOJI",
    UPDATE_GAME_GRID: "UPDATE_GAME_GRID",
    IS_EDITING_NAME: "IS_EDITING_NAME",
    UPDATE_NAME: "UPDATE_NAME"
}

function GlobalStoreContextProvider(props) {
    const history = useHistory();

    const [store, setStore] = useState({
        messageList: [],
        is_choosing_emoji: false,
        gameGrid: Array(9).fill(null),
        name: 'Rilakkuma',
        edit_name: false,
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.ADD_NEW_MSG: {
                // console.log("ADD_NEW_MSG");
                return setStore({
                    messageList: payload,
                    is_choosing_emoji: store.is_choosing_emoji,
                    gameGrid: store.gameGrid,
                    name: store.name,
                    edit_name: false
                });
            }
            case GlobalStoreActionType.IS_CHOOSING_EMOJI: {
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: payload,
                    gameGrid: store.gameGrid,
                    name: store.name,
                    edit_name: false
                });
            }
            case GlobalStoreActionType.UPDATE_GAME_GRID: {
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: store.is_choosing_emoji,
                    gameGrid: payload,
                    name: store.name,
                    edit_name: false
                });
            }
            case GlobalStoreActionType.IS_EDITING_NAME: {
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: store.is_choosing_emoji,
                    gameGrid: store.gameGrid,
                    name: store.name,
                    edit_name: payload
                });
            }
            case GlobalStoreActionType.UPDATE_NAME: {
                console.log(`UPDATE NAME to ${payload}`);
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: store.is_choosing_emoji,
                    gameGrid: store.gameGrid,
                    name: payload,
                    edit_name: false
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

    store.chooseSquare = function(chooser, index){
        if(index === null)
            return;
        let newGameGrid = store.gameGrid;

        console.log(`index:${index}`);
        newGameGrid[index] = (chooser === 'User') ? 1: 0;

        storeReducer({
            type: GlobalStoreActionType.UPDATE_GAME_GRID,
            payload: newGameGrid
        });
    }

    store.clearGrid = () => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_GAME_GRID,
            payload: Array(9).fill(null)
        });
    }

    store.startGame = () => {
        store.clearGrid();
        history.push('/game');
    }

    store.respondMessage = function(senderMsg){
        senderMsg = senderMsg.toLowerCase();
        let bearName = store.name.toLowerCase();
        console.log(bearName);

        if(senderMsg === "game" || senderMsg === "tic-tac-toe" || senderMsg.includes("let's play") || senderMsg.includes("let's play game") || senderMsg.includes("let's play tic-tac-toe")){
            store.addMessage(store.name, "Okay! Let's play tic-tac-toe with me!");
            store.startGame();
            return;
        }
        else if(senderMsg === "hi" || senderMsg === "hello" || senderMsg.includes(`hi ${bearName}`) || senderMsg.includes(`hello ${bearName}`)){
            store.addMessage(store.name, `Hi User! I am ${store.name}. How are you doing? (*￣(ｴ)￣*)ﾉ`);
            return;
        }
        store.addMessage(store.name, "No.");
    }

    store.selfIntroduction = function(){
        var msgList = store.messageList;

        var bearName = store.name;
        var intro = `Welcome! My name is ${bearName}. Nice to meet you!`;

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

    store.startEnteringName = () => {
        console.log("edit name");
        storeReducer({
            type: GlobalStoreActionType.IS_EDITING_NAME,
            payload: true
        });
    }

    store.stopEnteringName = () => {
        storeReducer({
            type: GlobalStoreActionType.IS_EDITING_NAME,
            payload: false
        });
    }

    store.updateName = (name) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_NAME,
            payload: name
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