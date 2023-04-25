import react, { useState } from 'react';

const GameBot = () => {
    function hasWinner(){
        // if (len(self.moves) < 5):
        //     return None
        
        // # check rows for win
        // for row in range(self.dimension):
        //     unique_rows = set(self.grid[row])
        //     if (len(unique_rows) == 1):
        //         value = unique_rows.pop()
        //         if (value != None):
        //             return value
                    
        // # check columns for win
        // for col in range(self.dimension):
        //     unique_cols = set()
        //     for row in range(self.dimension):
        //         unique_cols.add(self.grid[row][col])

        //     if (len(unique_cols) == 1):
        //         value = unique_cols.pop()
        //         if (value != None):
        //             return value

        // # check backwards diagonal (top left to bottom right) for win
        // backwards_diag = set()
        // backwards_diag.add(self.grid[0][0])
        // backwards_diag.add(self.grid[1][1])
        // backwards_diag.add(self.grid[2][2])

        // if (len(backwards_diag) == 1):
        //     value = backwards_diag.pop()
        //     if (value != None):
        //         return value

        // # check forwards diagonal (bottom left to top right) for win
        // forwards_diag = set()
        // forwards_diag.add(self.grid[2][0])
        // forwards_diag.add(self.grid[1][1])
        // forwards_diag.add(self.grid[0][2])

        // if (len(forwards_diag) == 1):
        //     value = forwards_diag.pop()
        //     if (value != None):
        //         return value
        
        // # found no winner, return None
        // return None
    }
}

export default GameBot;