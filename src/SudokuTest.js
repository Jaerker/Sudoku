/*

SUDOKU TEST

Vad vill jag ha gjort med denna uppgiften? 

- Rita upp en sudoku plan
- Generera en färdig spelplan som man kan köra på
- Röd färg om du skriver i fel siffra och grön om rätt, om du väljer det som alternativ
- Tidtagning
- Grid som lyses upp både lodrätt, vågrätt och 9x9 rutan

Kolla Sudoku genereraren i C# och utgå från den. 

*/


class SudokuGenerator
{
    //* Set up grid for entire map
    Grid = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];
    GridSize = 9;
    numList = [1,2,3,4,5,6,7,8,9];

        //* check if a number is valid for a given row and column
        #_IsValid(row, col, num) {
            //* see if num exists in row or column
            for (let i = 0; i < this.GridSize; i++) 
            {
                if(this.Grid[row][i] == num || this.Grid[i][col] == num)
                {
                    return false;
                }
                
            }

            //* check the same, but in 3x3 grid
            const subGridRow = Math.floor(row/3)*3;
            const subGridCol = Math.floor(col/3)*3;
            //* console.log('Row:' + row + ', Col: ' + col + ', subGridRow: ' + subGridRow + ', subGridCol: ' + subGridCol)
            for (let i = subGridRow; i < subGridRow+3; i++) 
            {

                for (let j = subGridCol; j < subGridCol+3; j++) 
                {
                    if(this.Grid[i][j] == num)
                    {
                        return false;
                    }
                
                }   
                
            }

            //* If it could go through it all, return true
            return true;

        }

        //* Method to solve the Sudoku grid recursively using backtracking
        #_Solve(row, col)  
        {
            //* End of grid, solution done!
            if(row == this.GridSize)
            {
                return true;
            }

            //* End of row, move to next
            if(col == this.GridSize)
            {
                return this._Solve(row+1,0);
            }

            //* If cell already filled, move on to next
            if(this.Grid[row][col] != 0)
            {
                return this._Solve(row,col+1);
            }
             
            this.numList = this.numList.sort(()=>Math.random()-0.5);
            //* Try each number in current cell
            this.numList.forEach(num => 
            {
                //* Check if number is valid for the current cell
                if(this._IsValid(row,col,num))
                {
                    //* Valid number = fill cell with the number
                    this.Grid[row][col] = num;

                    //* Move to next cell
                    if(this._Solve(row,col+1))
                    {
                        return true;
                    }

                    //* If a solution was not found, backtrack by resetting the cell to Zero
                    this.Grid[row][col] = 0;
                    
                }
            });
            //* If no number is valid for the current cell, backtrack by returning false

            return false;
        }

        GenerateSudoku() {

         this._Solve(0,0);
         return this.Grid;
        }

    

}

let sudoku = new SudokuGenerator();

sudoku.GenerateSudoku();
