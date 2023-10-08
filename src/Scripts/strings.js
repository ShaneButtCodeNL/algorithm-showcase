const defaultContent = "You need to select a problem first.",
  pathFindingContent =
    "Dijkstra's algorithm is an algorithm for finding the shortest distance between two points./br" +
    "The algorithm expands from the source traveling to the node with least traveling distance from the source./br" +
    "Thinking of the grid as a graph with n*m nodes, and unweighted edges between orthogonal nodes. This just turns into a simple Bredth First Search traversal of the grid./br" +
    "The main advantages of this algorithm are if there exists a path between two nodes it will find it, and it will be guarenteed to be a shortest path./br" +
    "The runtime is O(n*m) where n is the length and m is the height of the grid.",
  searchingContent =
    "Searching is the problem of finding if a certain object exists in a collection of items./br Linear search iterates over the list one item at a time until either it reaches the end of the list or finds an item that matches the search criteria./brThis algorithm runs in O(n), Linear time",
  sortingContent =
    "Sorting is the problem of arranging the items of a collection in a certain order./brBubble Sort works by iterateing through the list and compareing the current value to the next value, moving the largest/smallest element towards the end of the list./brThe RunTime of Bubble sort is O(n^2).",
  encryptionContent =
    "Shift Encryption works by shifting the characters in a word by a set distance./br" +
    'If a character "A" is encrypted by 3 places it becomes "D" from "A"->"B"->"C"->"D"./br' +
    "Decryption works by shifting the character in the opposite direction./br" +
    'If a character "D" is decrypted by 3 places it becomes "A" from "D"->"C"->"B"->"A"./br' +
    "For instances where the new position is beyond the range of the dictionary we just loop around to the beginning./br" +
    'If a character "Y" is encrypted by 3 places it becomes "B" from "Y"->"Z"->"A"->"B"./br' +
    "This also applyies to decryption, we just loop to the end of the dictionary./br" +
    'If a character "B" is decrypted 3 places it becomes "Y" from "B"->"A"->"Z"->"Y"./br' +
    'In this project only alpha characters are en/decrypted using two dictionaries ["A","B",...,"Y","Z"] and ["a","b",...,"y","z"] used for lower and upper characters/br' +
    "This Algorythm is not good to use to encrypt important data as a computer can break this very fast.",
  sudokuSolverDescription =
    "Sudoku is a number game where every row, column and 3x3 box must have unique values in the range [1-9]./br" +
    "We will solve a sudoku board by using Back Tracking using the following steps./br" +
    "1. iterate through the board until we find an empty value./br" +
    "2. Put in a value that doesn't break the rules of sudoku./br" +
    "3. if no valid value can be placed go back to last empty value an enter the next valid value. If no valid value can be entered and cannot go back to a previous state then there is no solution. End/br" +
    "4. If board is solved END else go to one";

export {
  defaultContent,
  pathFindingContent,
  searchingContent,
  sortingContent,
  encryptionContent,
  sudokuSolverDescription,
};
