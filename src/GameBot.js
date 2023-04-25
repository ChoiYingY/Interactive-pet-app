export function isFreeSquare(gameGrid, index){
    if(gameGrid === null || index === null)
        return;

    console.log("isFreeSquare");
    console.log(index, gameGrid[index] === null);
    return gameGrid[index] === null;
}

export function chooseSquare(gameGrid, index){
    if(gameGrid === null || index === null || !isFreeSquare(gameGrid, index))
        return false;

    console.log("chooseSquare");
    gameGrid[index] = 0;
    return true;
}

export function allFreeSquares(gameGrid){
    if(gameGrid === null)
        return;

    console.log("allFreeSquares");
    
    let freeSquares = []
    for(let i = 0; i < gameGrid.length; i++){
        console.log(i);
        if (isFreeSquare(gameGrid, i))
            freeSquares.push(i);
    }
    return freeSquares
}

export function copyGrid(gameGrid){
    if(gameGrid === null)
        return;

    console.log("copyGrid");
    return gameGrid.slice(0);
}

export function calculateWinner(gameGrid){
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
            if (gameGrid[a] && gameGrid[a] === gameGrid[b] && gameGrid[a] === gameGrid[c]) {
                return gameGrid[a];
            }
        }
        return null;
    }
}


export function selectSquare(gameGrid){
    if(gameGrid === null)
        return -1;

    console.log("selectSquare");
    console.log(gameGrid);

    const possibleChoices = allFreeSquares(gameGrid);
    const length = possibleChoices.length;
    console.log(possibleChoices)
    console.log(length)

    for(let i = 0; i < length; i++){
        let simulationGrid = copyGrid(gameGrid);
        console.log("Start simulation");
        console.log(simulationGrid);

        let possibleMove = chooseSquare(simulationGrid, i);
        if(possibleMove){
            console.log("chooseSquare");
            console.log(simulationGrid);
            if(calculateWinner(simulationGrid)){
                console.log("break");
                return i;
            }
        }
    }
    if(length > 0){
        const index = Math.floor(Math.random() * length);
        console.log(index);
        return possibleChoices[index];
    }
    else
        return -1;
}