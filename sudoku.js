"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boards = void 0;
exports.facit = facit;
exports.is_valid = is_valid;
exports.contains_zero = contains_zero;
exports.solve = solve;
exports.apply = apply;
exports.hint = hint;
var boards = {
    A: [
        [0, 4, 5, 8, 7, 0, 0, 0, 6],
        [0, 2, 6, 0, 4, 0, 0, 0, 1],
        [0, 9, 0, 2, 5, 6, 4, 0, 0],
        [9, 0, 0, 4, 0, 0, 5, 6, 0],
        [2, 0, 4, 6, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 3, 0, 0],
        [0, 0, 9, 1, 3, 2, 6, 8, 0],
        [1, 6, 0, 0, 0, 8, 0, 3, 4],
        [0, 0, 8, 0, 0, 4, 2, 1, 0]
    ],
    B: [
        [0, 0, 0, 0, 0, 0, 0, 0, 7],
        [7, 0, 6, 0, 8, 0, 4, 0, 2],
        [0, 0, 0, 0, 0, 3, 0, 1, 0],
        [1, 0, 5, 6, 9, 0, 8, 0, 0],
        [0, 0, 9, 0, 0, 0, 0, 5, 0],
        [0, 4, 8, 0, 5, 0, 0, 6, 0],
        [0, 2, 0, 1, 0, 0, 0, 4, 0],
        [0, 1, 0, 0, 0, 6, 0, 0, 5],
        [0, 0, 0, 7, 0, 8, 6, 3, 1]
    ],
    C: [
        [0, 6, 0, 0, 0, 0, 0, 4, 0],
        [0, 9, 0, 1, 7, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 3, 0, 5, 0, 0],
        [0, 0, 0, 0, 5, 9, 6, 0, 0],
        [0, 0, 0, 0, 0, 0, 8, 2, 4],
        [8, 0, 2, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0],
        [4, 0, 0, 0, 0, 8, 0, 0, 6]
    ]
};
exports.boards = boards;
/**
 * Solves the given Sudoku board.
 * @example
 * returns a solved version of board B
 * facit(boards.B);
 * @param {Board} board - The Sudoku board to solve.
 * @returns {Board} The solved board.
 */
function facit(board) {
    solve(board);
    return board;
}
/**
 * Checks if a number can be placed at a given position.
 * @example
 * // returns true if number 5 can be placed at position (0, 0)
 * is_valid(boards.B, 0, 0, 5);
 * @param {Board} board - The Sudoku board.
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @param {number} num - The number to check.
 * @precondition row and col must be between 0 and 8 inclusive.
 * @returns {boolean} True if the number is valid, false otherwise.
 */
function is_valid(board, row, col, num) {
    // checks rows and columns for duplicates
    for (var i = 0; i < 9; i++) {
        if (board[i][col] === num || board[row][i] === num) {
            return false;
        }
    }
    // checks 3x3 subgird for duplicates
    var x0 = Math.floor(row / 3) * 3;
    var y0 = Math.floor(col / 3) * 3;
    for (var k = y0; k < y0 + 3; k++) {
        for (var j = x0; j < x0 + 3; j++) {
            if (board[j][k] === num) {
                return false;
            }
        }
    }
    return true;
}
/**
 * Finds the first empty cell in the board.
 * @example
 * returns the position of the first empty cell
 * contains_zero(boards.B);
 * @param {Board} board - The Sudoku board.
 * @precondition The board must be a valid sudoku board.
 * @returns {[number, number] | null} Coordinates of the empty cell or null if no empty cell is found.
 */
function contains_zero(board) {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}
/**
 * Recursively solves the Sudoku board using backtracking.
 * @example
 * solves the puzzle on board B and returns a boolean if it is solvable
 * solve(boards.B);
 * @param {Board} board - The Sudoku board.
 * @precondition The board must be a valid sudoku board.
 * variant the number of empty cells in the board.
 * @returns {boolean} True if a solution is found, false otherwise.
 */
function solve(board) {
    // Find the next empty cell
    var empty = contains_zero(board);
    // Base case: if no empty cells available the board is solved
    if (!empty) {
        return true;
    }
    var row = empty[0], col = empty[1];
    // Try placing numbers in an empty cell
    for (var num = 1; num <= 9; num++) {
        if (is_valid(board, row, col, num)) {
            board[row][col] = num; // Place the number
            // Recursively solve the rest of the board
            if (solve(board)) {
                return true;
            }
            board[row][col] = 0; // Backtrack if solution not found
        }
    }
    return false;
}
/**
 * Applies a value to a cell on the sudoku board, and checks if it is correct.
 * @example
 * // applies value 5 to board B at position (0, 0)
 * apply(boards.B, 5, 0, 0);
 * @param {Board} board - the sudoku board
 * @param {number} value - the value to apply (1-9)
 * @param {number} x - the x coordinate (column)
 * @param {number} y - the y coordinate (row)
 * @precondition The board must be a valid sudoku board.
 * @returns {string | void} Returns a string or void if an error occurs
 */
function apply(board, value, x, y) {
    if (value > 9 || value < 1) { // Checks for valid value between 1 and 9
        return "Invalid input: Value must be between 1 and 9";
    }
    else if (x > 8 || x < 0 || y > 8 || y < 0) { // Checks for valid x and y coordinates
        return "Invalid position: Coordinates must be between 0 and 8";
    }
    if (board[y][x] !== 0) { // When the space is occupied
        return "Sorry cannot replace an existing number";
    }
    else if (board[y][x] === 0) {
        var answerboard = facit(board.map(function (row) { return __spreadArray([], row, true); }));
        if (value !== answerboard[y][x]) { // When the numbers are not the same
            return "Nope, not this number. Try again";
        }
        else { // Number is correct if none of the above apply
            return "Good job, right number!";
        }
    }
}
/**
 * Provides a hint for a given cell.
 * @example
 * returns a hint for the cell at (0, 0) on board B
 * hint(boards.B, 0, 0);
 * @param {Board} board - The Sudoku board.
 * @param {number} x - The x-coordinate.
 * @param {number} y - The y-coordinate.
 * @returns {number} The correct value for the given cell, or -1 if the cell is not empty.
 */
function hint(board, x, y) {
    if (board[y][x] !== 0) {
        return -1; // indicates that the cell is occupied and no hint could be given
    }
    var solved = facit(board.map(function (row) { return __spreadArray([], row, true); })); // creates a clone of the board instead changing the original
    return solved[y][x];
}
