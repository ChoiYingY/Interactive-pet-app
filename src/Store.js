import { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    ADD_NEW_MSG: "ADD_NEW_MSG",
    IS_CHOOSING_EMOJI: "IS_CHOOSING_EMOJI",
    UPDATE_GAME_GRID: "UPDATE_GAME_GRID",
    IS_EDITING_NAME: "IS_EDITING_NAME",
    UPDATE_NAME: "UPDATE_NAME",
    GAME_FINISH: "GAME_FINISH"
}

function GlobalStoreContextProvider(props) {
    const history = useHistory();

    const [store, setStore] = useState({
        messageList: [],
        is_choosing_emoji: false,
        gameGrid: Array(9).fill(null),
        name: 'Rilakkuma',
        edit_name: false,
        finish_game: -1,
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
                    edit_name: false,
                    finish_game: -1,
                });
            }
            case GlobalStoreActionType.IS_CHOOSING_EMOJI: {
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: payload,
                    gameGrid: store.gameGrid,
                    name: store.name,
                    edit_name: false,
                    finish_game: -1,
                });
            }
            case GlobalStoreActionType.UPDATE_GAME_GRID: {
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: store.is_choosing_emoji,
                    gameGrid: payload.gameGrid,
                    name: store.name,
                    edit_name: false,
                    finish_game: payload.finish_game
                });
            }
            case GlobalStoreActionType.IS_EDITING_NAME: {
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: store.is_choosing_emoji,
                    gameGrid: store.gameGrid,
                    name: store.name,
                    edit_name: payload,
                    finish_game: -1,
                });
            }
            case GlobalStoreActionType.UPDATE_NAME: {
                console.log(`UPDATE NAME to ${payload}`);
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: store.is_choosing_emoji,
                    gameGrid: store.gameGrid,
                    name: payload,
                    edit_name: false,
                    finish_game: -1,
                });
            }
            case GlobalStoreActionType.GAME_FINISH: {
                console.log(`GAME_FINISH: ${payload}`);
                return setStore({
                    messageList: store.messageList,
                    is_choosing_emoji: store.is_choosing_emoji,
                    gameGrid: store.gameGrid,
                    name: store.name,
                    edit_name: false,
                    finish_game: payload
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
        
        let newMsgList = [...msgList, msg]
        console.log(newMsgList);

        storeReducer({
            type: GlobalStoreActionType.ADD_NEW_MSG,
            payload: newMsgList
        });
    }

    store.chooseSquare = function(chooser, index){
        if(index === null)
            return;
        let gameGrid = store.gameGrid;

        console.log(`index:${index}`);
        let squareValue = (chooser === 'User') ? 1: 0;
        // newGameGrid[index] = (chooser === 'User') ? 1: 0;
        const newGameGrid = [...gameGrid.slice(0, index), squareValue, ...gameGrid.slice(index + 1)]

        storeReducer({
            type: GlobalStoreActionType.UPDATE_GAME_GRID,
            payload: {
                gameGrid: newGameGrid,
                finish_game: store.finish_game
            }
        });
    }

    store.clearGrid = () => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_GAME_GRID,
            payload: {
                gameGrid: Array(9).fill(null),
                finish_game: -1
            }
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
        console.log(senderMsg);

        if(senderMsg === "game" || senderMsg === "tic-tac-toe" || senderMsg.includes("let's play") || senderMsg.includes("let's play game") || senderMsg.includes("let's play tic-tac-toe")){
            store.addMessage(store.name, "Okay! Let's play tic-tac-toe with me!");
            store.startGame();
            return;
        }
        else if(senderMsg === "hi" || senderMsg === "hello" || senderMsg.includes(`hi ${bearName}`) || senderMsg.includes(`hello ${bearName}`)){
            store.addMessage(store.name, `Hi User! I am ${store.name}. How are you doing? (*￣(ｴ)￣*)ﾉ`);
            return;
        }
        store.addMessage(store.name, "Sorry, I'm just a silly bear who don't understead complex human sentences. （´㉨｀*)");
    }

    store.selfIntroduction = function(){
        var msgList = store.messageList;
        let newMsgList = msgList

        var bearName = store.name;
        var intro = `Welcome! My name is ${bearName}. Nice to meet you!`;

        const msg = {
            id: msgList.length+1,
            sender: bearName,
            message: intro
        }

        if(!msgList.some(msgObj => (msgObj.sender === bearName && msgObj.message === intro))){
            newMsgList = [...msgList, msg]
        }

        storeReducer({
            type: GlobalStoreActionType.ADD_NEW_MSG,
            payload: newMsgList
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

    store.concludeGame = (flag) =>{
        storeReducer({
            type: GlobalStoreActionType.GAME_FINISH,
            payload: flag
        });
    }

    // store.calculateWinner = () => {
    //     console.log("calculateWinner");

    //     const gameGrid = store.gameGrid;
    //     const possibleStreak = [
    //       [0, 1, 2],
    //       [3, 4, 5],
    //       [6, 7, 8],
    //       [0, 3, 6],
    //       [1, 4, 7],
    //       [2, 5, 8],
    //       [0, 4, 8],
    //       [2, 4, 6]
    //     ];
    //     for (let i = 0; i < possibleStreak.length; i++) {
    //       const [a, b, c] = possibleStreak[i];
    //       if (gameGrid[a] && gameGrid[a] === gameGrid[b] && gameGrid[a] === gameGrid[c]) {
    //         if(gameGrid[a] === 1){
    //             console.log("You win!");
    //             storeReducer({
    //                 type: GlobalStoreActionType.GAME_FINISH,
    //                 payload: 1
    //             });
    //         }
    //         else{
    //             console.log("You lose!");
    //             storeReducer({
    //                 type: GlobalStoreActionType.GAME_FINISH,
    //                 payload: 0
    //             });
    //         }
    //       }
    //     }
    //     // if(!gameGrid.includes(-1)){
    //     //     console.log("Tie!");
    //     //         storeReducer({
    //     //             type: GlobalStoreActionType.GAME_FINISH,
    //     //             payload: 2
    //     //         });
    //     // }
    // }

    return (
        <GlobalStoreContext.Provider value={{ store }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}


export default GlobalStoreContext;
export { GlobalStoreContextProvider };