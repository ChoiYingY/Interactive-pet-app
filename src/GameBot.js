export function isFreeSquare(gameGrid, index){
    if(gameGrid === null || index === null)
        return;
    return gameGrid[index] === null;
}

export function chooseSquare(gameGrid, index, squareValue){
    if(gameGrid === null || index === null || !isFreeSquare(gameGrid, index))
        return false;

    gameGrid[index] = squareValue;
    return true;
}

export function allFreeSquares(gameGrid){
    if(gameGrid === null)
        return;

    let freeSquares = []
    for(let i = 0; i < gameGrid.length; i++){
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
    // console.log("calculateWinner");

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

            // console.log(`*******************************************************`);
            // console.log(`[${a}, ${b}, ${c}]`);
            // console.log(`a: ${gameGrid[a]}`);
            // console.log(`b: ${gameGrid[b]}`);
            // console.log(`c: ${gameGrid[c]}`);
            // console.log(`*******************************************************`);

            let winning = gameGrid[a] !== null && gameGrid[a] === gameGrid[b] && gameGrid[a] === gameGrid[c];
            console.log(`winning: ${winning}`);

            if(winning) {
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
        let index = possibleChoices[i];
        // console.log(`Start simulation @ index ${index}`);
        console.log(simulationGrid);

        let possibleMove = chooseSquare(simulationGrid, index, 0);
        if(possibleMove){
            // console.log("chooseSquare");
            // console.log(simulationGrid);
            let winner = calculateWinner(simulationGrid);
            console.log(`winner: ${winner} at simulationGrid of index ${index}`);
        
            if(winner !== null && winner === 0){
                // console.log("break: ${i}");
                return index;
            }

            console.log("---------------------------------------------------------------")
            console.log("guess user's move");
            const nextPossibleChoices = allFreeSquares(simulationGrid);
            console.log(nextPossibleChoices);
            console.log("nextPossibleChoices^");
            for(let j = 0; j < nextPossibleChoices.length; j++){
                let simulationGrid2 = copyGrid(simulationGrid);
                let index2 = nextPossibleChoices[j];

                // console.log(`Start simulation2 @ index ${j}`);
                console.log(simulationGrid2);
                console.log("---------------------------------------------------------------")

                let nextPossibleMove = chooseSquare(simulationGrid2, index2, 1);
                if(nextPossibleMove){
                    // console.log("user chooseSquare");
                    console.log(simulationGrid2);
                    console.log("*******************************************************");

                    let winner2 = calculateWinner(simulationGrid2);
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