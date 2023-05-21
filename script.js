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
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')


//create variable to know who's turn it is.
let circleTurn

//call startGame function. 
startGame()

//restart button
restartButton.addEventListener('click', startGame)

//add hover feature at beginning of game by creating fnc startGame
function startGame(){
    //start with X 
    circleTurn = false;

    //loop thru the elements to remove prev.event listener and classes and then add new event listener to each cell
    cellElements.forEach((cell) =>{
        //reset game 
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)

        //only fire this event listener once for each cell.
        cell.addEventListener('click', handleClick, {once: true})
    })

    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    console.log('clicked')
    //1. Place Mark
    //set cell to whatever cell we click on, i.e. the 'event'
    //The target property returns the element where the event occured. 
    const cell = e.target
    //console.log(cell)
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //console.log(currentClass)

   placeMark(cell,currentClass)

 
    //2. Check for a Win
    //3. Check for a Draw
    if(checkWin(currentClass)){
        console.log("winner")
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    }else{
    //4. Switch Turns
    swapTurns()
    setBoardHoverClass()
    }
}

function endGame(draw){

    if(draw){
        winningMessageTextElement.innerText = 'Draw!'

    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's "} Wins!`
    }

    winningMessageElement.classList.add('show')

}

function isDraw(){
    //returns true if every cell element is filled. 

    //check if every cell element is filled aka if every cell has a class
    //destructure cellElements into an array 
    return [...cellElements].every(cell=> {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    //adds a 'x' or an 'o' to class, 'cell'
    //Element.classList.add() - adds class attributes to the element. 
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
    //returns true if there is at least one winning combo

    //loop through each combo aka inner array  and check if the elements in each combo have the same class.
    //if all three elements in the combo have the same class ( "X" or 'O') then that is the winning combo.
    

    //The some() method tests whether AT LEAST ONE element in the array passes the test implemented by the provided function.
    //The every() method tests whether ALL elements in the array pass the test implemented by the provided function.

    return WINNING_COMBINATIONS.some(combination => {
        return combination.every( index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}