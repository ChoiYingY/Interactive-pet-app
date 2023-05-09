import api from './SendRequest';

import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import GlobalStoreContext from './Store';

export const GlobalBotContext = createContext({});

export const GlobalBotActionType = {
    RENAME: "RENAME"
}

function GlobalBotContextProvider(props) {
    const history = useHistory();
    const {store} = useContext(GlobalStoreContext);

    const [bot, setBot] = useState({
        name: "Rilakkuma"
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalBotActionType.RENAME: {
                console.log("RENAME");
                return setBot({
                    name: payload
                })
            }
            default:
                return bot;
        }
    }

    bot.rename = (name) => {
        if(name === null || name.length === 0)
            return;
            
        storeReducer({
            type: GlobalBotActionType.RENAME,
            payload: name
        });
    }

    bot.isFreeSquare = function(gameGrid, index){
        if(gameGrid === null || index === null)
            return;
        return gameGrid[index] === null;
    }
    
    bot.chooseSquare = function(gameGrid, index, squareValue){
        if(gameGrid === null || index === null || !bot.isFreeSquare(gameGrid, index))
            return false;
    
        gameGrid[index] = squareValue;
        return true;
    }
    
    bot.allFreeSquares = function(gameGrid){
        if(gameGrid === null)
            return;
    
        let freeSquares = [];
        for(let i = 0; i < gameGrid.length; i++){
            if(bot.isFreeSquare(gameGrid, i))
                freeSquares.push(i);
        }
        return freeSquares;
    }
    
    bot.copyGrid = function(gameGrid){
        if(gameGrid === null)
            return null;
    
        console.log("copyGrid");
        return gameGrid.slice(0);
    }
    
    bot.calculateWinner = function(gameGrid){
        console.log("calculateWinner");
    
        if(gameGrid){
            const possibleStreak = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            for (let i = 0; i < possibleStreak.length; i++) {
                const [a, b, c] = possibleStreak[i];
    
                let winning = gameGrid[a] !== null && gameGrid[a] === gameGrid[b] && gameGrid[a] === gameGrid[c];
                console.log(`winning: ${winning}`);
    
                if(winning) {
                    return gameGrid[a];
                }
            }
            return null;
        }
    }
    
    bot.selectSquare = function(gameGrid){
        if(gameGrid === null)
            return -1;
    
        console.log("selectSquare");
        console.log(gameGrid);
    
        const possibleChoices = bot.allFreeSquares(gameGrid);
        const length = possibleChoices.length;
    
        console.log(possibleChoices)
        console.log(length)
    
        for(let i = 0; i < length; i++){
            let simulationGrid = bot.copyGrid(gameGrid);
            if(simulationGrid === null)
                continue;
            let index = possibleChoices[i];
            // console.log(`Start simulation @ index ${index}`);
            console.log(simulationGrid);
    
            let possibleMove = bot.chooseSquare(simulationGrid, index, 0);
            if(possibleMove){
                // console.log("chooseSquare");
                // console.log(simulationGrid);
                let winner = bot.calculateWinner(simulationGrid);
                console.log(`winner: ${winner} at simulationGrid of index ${index}`);
            
                if(winner !== null && winner === 0){
                    // console.log("break: ${i}");
                    return index;
                }
    
                console.log("---------------------------------------------------------------")
                console.log("guess user's move");
                const nextPossibleChoices = bot.allFreeSquares(simulationGrid);
                console.log(nextPossibleChoices);
                console.log("nextPossibleChoices^");
                for(let j = 0; j < nextPossibleChoices.length; j++){
                    let simulationGrid2 = bot.copyGrid(simulationGrid);
                    if(simulationGrid2 === null)
                        continue;
                    let index2 = nextPossibleChoices[j];
    
                    // console.log(`Start simulation2 @ index ${j}`);
                    console.log(simulationGrid2);
                    console.log("---------------------------------------------------------------")
    
                    let nextPossibleMove = bot.chooseSquare(simulationGrid2, index2, 1);
                    if(nextPossibleMove){
                        // console.log("user chooseSquare");
                        console.log(simulationGrid2);
                        console.log("*******************************************************");
    
                        let winner2 = bot.calculateWinner(simulationGrid2);
                        console.log(`winner: ${winner2} at simulationGrid2 of index ${j}`);
                        if(winner2 !== null && winner2 === 1){
                            console.log("user may win here! I'm going to block.");
                            return index2;
                        }
                    }
                }
            }
        }
        if(length > 0){
            const index = Math.floor(Math.random() * length);
            console.log(index);
            console.log("do a random pick")
            return possibleChoices[index];
        }
        else
            return -1;
    }

    bot.startGame = () => {
        store.clearGrid();
        history.push('/game');
    }

    bot.selfIntroduction = function(){
        if(!store)
            return;

        console.log(bot.name);

        var bearName = bot.name;
        var intro = `Welcome! My name is ${bearName}. Nice to meet you!`;

        const msg = {
            id: store.messageList.length+1,
            sender: bearName,
            message: intro
        }

        store.addIntroduction(bearName, msg);        
    }

    bot.respondMessage = function(msg){
        console.log("respondMessage");
        console.log(msg);
        store.addMessage(bot.name, msg);
    }

    bot.respond = function(senderMsg){
        console.log("bot will respond");
        
        let bearName = bot.name.toLowerCase();
        console.log(bearName);
        console.log(senderMsg);

        let match = null;

        const greetRegex = /^\W*(hii*|helloo*)\W*[\w\W]*$/i
        const farewellRegex = /^\W*(((goo+d)*byee*)|farewell+)\W*[\w\W]*$/i
        const gameRegex = /^\W*(let(')?s\s*play\s*(a\s)?)?(gamee*|ti+c+[-\s]ta+c+[-\s]to+e+)\W*[\w\W]*$/i
        const introduceRegex = /^\W*my\s+name\s+is\s+([\w\s]*)\W*[\w\W]*$/i
        const askNameRegex = /^\W*(what['s\s]*(is\s+)?your\s+)?namee*\??\W*[\w\W]*$/i
        const askStatusegex = /^\W*how\s+(are+|r+)\s+(you+|u+)(\s+(feeling+|doing+)\??)?\W*[\w\W]*$/i
        const askDateRegex = /^\W*(what['s\s]*(is\s+)?(today'?s|the)\s+)?(date+|day+)\??\W*[\w\W]*$/i
        const askTimeRegex = /^\W*(what['s\s]*(is\s+)?(current'?s|the(\s+current)?)\s+)?(time+)\??\W*[\w\W]*$/i
        const askJokeRegex = /^\W*(((can|could)\s*you\s*)?tell\s*me\s*a\s*)?(joke+).*(please+|plz+)?\??\W*$/i

        var msg = ""

        if(gameRegex.exec(senderMsg) !== null){
            console.log("gameee")
            // bot.respondMessage("Okay! Let's play tic-tac-toe with me!");
            bot.startGame();
            return;
        }
        else if(askDateRegex.exec(senderMsg) !== null){
            msg = `Today is ${new Date()}.`;
        }
        else if(askTimeRegex.exec(senderMsg) !== null){
            msg = `It is ${new Date().toLocaleTimeString()} right now.`;
        }
        else if(askJokeRegex.exec(senderMsg) !== null){
            async function tellJoke(){
                console.log("Tell joke");
                const response = await api.tellJoke();
                console.log(response);
                if(!response || response.status !== 200){
                    msg = "Sorry, I have failed to come up with a joke （´㉨｀*)";
                }
                if(response.status === 200){
                    const joke = response.data.joke;
                    console.log(joke);
                    bot.respondMessage(joke);
                }
            }
            tellJoke();
            return;
        }
        else if((match = senderMsg.match(introduceRegex)) !== null){
            if(match && match[1])
                msg = `Hi ${match[1]}! You have such a cute name.`;
        }
        else if(askNameRegex.exec(senderMsg) !== null){
            msg = `My name is ${bot.name}🧸. What about you?`;
        }
        else if(greetRegex.exec(senderMsg) !== null || senderMsg.includes(bearName)){
            msg = `Hi User! I am ${bot.name}. How are you doing? (*￣(ｴ)￣*)ﾉ`;
        }
        else if(askStatusegex.exec(senderMsg)){
            msg = `Awwwwwww, I'm feeling good, thank you! (*￣(ｴ)￣*)ﾉ`;
        }
        else if(farewellRegex.exec(senderMsg) !== null){
            msg = `Bye User👋! I will miss you. Take care!`;
        }
        else{
            async function analyzeEmotion(){
                console.log("Analyze emotion");
                const response = await api.analyzeEmotion(senderMsg);
                if(!response || response.status !== 200){
                    msg = "Sorry, I'm just a silly bear who don't understead complex human sentences. （´㉨｀*)";
                }
                if(response.status === 200){
                    const result = response.data.result;
                    console.log(result);
                    console.log(result.score);
                    if(result.score > 0){
                        msg = "I can see your overall positive tone here. If you're happy, I'm happy for you too! （´㉨｀*)💕";
                    }
                    else if(result.score < 0){
                        msg = "I can see your overall negative tone here. Feel better if you are not happy! （´㉨｀*) 💖";
                    }
                    else{
                        if(msg.includes("?"))
                            msg = "I notice you have a neutral tone & asking question here. But sorry! I'm a silly bear who don't understand complex human language. Please Google your question （´㉨｀*)";
                        else
                            msg = "I notice you have a neutral tone here. But sorry! I'm a silly bear who don't understand complex human language. （´㉨｀*)";
                    }
                    bot.respondMessage(msg);
                }
            }
            analyzeEmotion();
            return;
        }
        console.log(msg);
        bot.respondMessage(msg);
    }

    return (
        <GlobalBotContext.Provider value={{ bot }}>
            {props.children}
        </GlobalBotContext.Provider>
    );
}


export default GlobalBotContext;
export { GlobalBotContextProvider };