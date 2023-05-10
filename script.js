//--Part 1: select our cells on the board --//

//create X and O classes
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8], 
    [0,3,6], 
    [1,4,7],
    [2,5,8], 
    [0,4,8], 
    [2,4,6]
]

//select cells so that we can mark the cell with an 'X' or 'O' 
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')

//create variable to know who's turn it is.
let circleTurn 

startGame()

//add hover feature at beginning of game by creating fnc startGame

function startGame(){
    //start with X 
    circleTurn = false;

    cellElements.forEach((cell) =>{
        //only fire this event listener once for each cell.
        cell.addEventListener('click', handleClick, {once: true})
    })

    setBoardHoverClass()
}

function handleClick(e){
    console.log('clicked')
    //1. Place Mark
    //set cell to whatever cell we click on, i.e. the 'event'
    //The target property returns the element where the event occured. 
    const cell = e.target
    //console.log(cell)
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    console.log(currentClass)

   placeMark(cell,currentClass)

 
    //2. Check for a Win
    if(checkWin(currentClass)){
        console.log("winner")
    }
    //3. Check for a Draw

    //4. Switch Turns
    swapTurns()
    setBoardHoverClass()
}



function placeMark(cell, currentClass){
    //adds a 'x' or an 'o' to class  = 'cell'
    cell.classList.add(currentClass)
    console.log(cell)
    
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    //console.log(board.classList)

    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    //check all the winning combinations
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every( index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}