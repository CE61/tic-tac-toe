"use strict"

const game = (()=>{
    const gridSquareList = document.getElementsByClassName("square");
    const title = document.getElementsByClassName("title")[0];
    const container = document.getElementsByClassName("grid-container")[0];
    var playerOnesTurn = true;
    const squareArray = [];
    const player = (name) =>{
        name: name;
        return{name};
    }
    const playerOne = player("playerOne");
    const playerTwo = player("playerTwo");
    const gridSquare = () =>{
        spaceFilled : false;
        whichPlayer : 0;
        return{spaceFilled, player};
    }
    for(let i = 0; i < gridSquareList.length; i++){
        squareArray[i] = Object.create(gridSquare);
    }
    function resetGame(){
        title.textContent = "Tic-Tac-Toe!";
        container.style.opacity = "1";
        playerOne.name = window.prompt("Name of Player One");
        playerTwo.name = window.prompt("Name of Player Two");
        for(let i = 0; i < gridSquareList.length; i++){
            gridSquareList[i].innerHTML = "";
            gridSquareList[i].style.backgroundColor = "white";
            squareArray[i].spaceFilled = false;
            gridSquareList[i].addEventListener("click", ()=>{
                if(!squareArray[i].spaceFilled){
                    if(playerOnesTurn){
                        gridSquareList[i].innerHTML = 
                        "<img src=\"images/x-symbol-svgrepo-com.svg\" alt=\"cross\">";
                        squareArray[i].whichPlayer = 1;
                        playerOnesTurn = false;
                    }else{
                        gridSquareList[i].innerHTML = 
                        "<img src=\"images/circle-svgrepo-com.svg\" alt=\"circle\">";
                        squareArray[i].whichPlayer = 2;
                        playerOnesTurn = true;
                    }
                    squareArray[i].spaceFilled = true;
                }
                const topAcross = 
                [squareArray[0].whichPlayer, squareArray[1].whichPlayer, squareArray[2].whichPlayer];
                const middleAcross = 
                [squareArray[3].whichPlayer, squareArray[4].whichPlayer, squareArray[5].whichPlayer];
                const bottomAcross = 
                [squareArray[6].whichPlayer, squareArray[7].whichPlayer, squareArray[8].whichPlayer];

                const leftVertical = 
                [squareArray[0].whichPlayer, squareArray[3].whichPlayer, squareArray[6].whichPlayer];
                const middleVertical = 
                [squareArray[1].whichPlayer, squareArray[4].whichPlayer, squareArray[7].whichPlayer];
                const rightVertical = 
                [squareArray[2].whichPlayer, squareArray[5].whichPlayer, squareArray[8].whichPlayer];

                const leftDiagonal = 
                [squareArray[0].whichPlayer, squareArray[4].whichPlayer, squareArray[8].whichPlayer];
                const rightDiagonal = 
                [squareArray[2].whichPlayer, squareArray[4].whichPlayer, squareArray[6].whichPlayer];

                function isPlayerWin(array){
                    if(array.every(item => item !== undefined)){
                        return array.every(item => item === array[0]);
                    }
                }

                if(isPlayerWin(topAcross)
                ||isPlayerWin(middleAcross)
                ||isPlayerWin(bottomAcross)
                ||isPlayerWin(leftVertical)
                ||isPlayerWin(middleVertical)
                ||isPlayerWin(rightVertical)
                ||isPlayerWin(leftDiagonal)
                ||isPlayerWin(rightDiagonal)){
                    if(!playerOnesTurn){
                        title.textContent = playerOne.name + " has won!";
                        squareArray.forEach(square => square.spaceFilled = true);
                        squareArray.forEach(square => square.whichPlayer = undefined);
                        container.style.opacity = "0.5";
                    }else{
                        title.textContent = playerTwo.name + " has won!";
                        squareArray.forEach(square => square.spaceFilled = true);
                        squareArray.forEach(square => square.whichPlayer = undefined);
                        container.style.opacity = "0.5";
                    }
                }else if(squareArray.every(gridSquare => gridSquare.spaceFilled == true)
                &&squareArray.every(gridSquare => gridSquare.whichPlayer !== undefined)){
                    title.textContent = "It's a draw!";
                    squareArray.forEach(square => square.spaceFilled = true);
                    squareArray.forEach(square => square.whichPlayer = undefined);
                    container.style.opacity = "0.5";
                }
            });
        }
        playerOnesTurn = true;
    }
    return{resetGame};
})();

const button = document.getElementById("reset");
button.addEventListener("click", ()=>{
    game.resetGame();
});