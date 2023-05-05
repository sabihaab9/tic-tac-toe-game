//--Part 1: select our cells on the board --//
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')

//create variables to know who's turn it is.
let circleTurn 

cellElements.forEach((cell) =>{
    //only fire this event listener once for each cell.
    cell.addEventListener('click', handleClick, {once: true})
} )

function handleClick(e){
    console.log('clicked')
    //1. Place Mark
    //set cell to whatever cell we click on, i.e. the 'event'
    //The target property returns the element where the event occured. 
    const cell = e.target
    //console.log(cell)
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    console.log(currentClass)

   placeMark(cell, currentClass)
 
    //2. Check for a Win
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
    console.log(board.classList)

    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}