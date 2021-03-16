document.addEventListener('DOMContentLoaded', () => {
    //targeting the grid and score areas 
    const grid =  document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28 //28 x 28 = 784 squares
    let score = 0
    //layout area
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

const squares = []

//Legend
//0 - pac-dot 1- wall 2-ghost-lair 3 - power pellet 4 - empty

//draw the grid function
function createBoard() {
    //for loop to creat all 784 sq
    for (let i=0; i < layout.length; i++){
        const square = document.createElement('div') //JS built in function
        grid.appendChild(square)
        squares.push(square) //push to new squares array

        //add layout styling
        if (layout[i] === 0){ //if first item === 0 go into squares array
            squares[i].classList.add('pac-dot') //find that same item and add the styling class
        } else if (layout[i] === 1){
            squares[i].classList.add('wall')
        } else if (layout[i] === 2){
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3){
            squares[i].classList.add('power-pellet')
        }
    }
}
createBoard()

//starting position of pac-man
let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add('pac-man')

//move pac-man logic
function movePacman(e){
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
        case 37:
            if(
                pacmanCurrentIndex % width !== 0 && 
                !squares[pacmanCurrentIndex -1].classList.contains('wall') && 
                !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')) pacmanCurrentIndex -=1

                //check if pacman is in the left exit
                if(pacmanCurrentIndex -1 === 363){
                    pacmanCurrentIndex = 391
                }
            break
        case 38:
            if(
                pacmanCurrentIndex - width >= 0 && 
                !squares[pacmanCurrentIndex -width].classList.contains('wall') && 
                !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')) pacmanCurrentIndex -=width
            break
        case 39:
                if(
                    pacmanCurrentIndex % width < width -1 && 
                    !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')) pacmanCurrentIndex +=1

                    //check if pacman is in the right exit
                    if(pacmanCurrentIndex +1 === 392){
                        pacmanCurrentIndex = 364
                    }
                break
        case 40:
                if(
                    pacmanCurrentIndex + width < width * width && 
                    !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')) pacmanCurrentIndex +=width
                break
    }

    squares[pacmanCurrentIndex].classList.add('pac-man')

    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
}
document.addEventListener('keyup', movePacman)

//what happens when pac-man eats a pacdot
function pacDotEaten(){
    //if the current index is a green dot
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        //add to the score
        score++
        //display it on the page
        scoreDisplay.innerHTML = score
        //and remove the dot
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}

//pacman eats a power pellet
function powerPelletEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        score +=10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
}

//make the ghosts stop flashing
function unScareGhosts(){
    ghosts.forEach(ghost => ghost.isScared = false)
}

//create our standard ghost template using constructor method
class Ghost {
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
        this.isScared = false
    }
}
//creating ghosts
ghosts = [
    //name, starting position, and speed moves every blank milliseconds
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//draw my ghosts onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move ghosts around randomly
ghosts.forEach(ghost => moveGhost(ghost))

//write the function to move ghosts
function moveGhost(ghost){
    //direction options
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function(){
        //if the next sq your ghost is going to go in doesnt contain a wall and ghost, you can go there
        if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
            //you can go here
            //remove related class
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            //move into that space
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            //else find a new direction
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared
    if(ghost.isScared){
        squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    //if the ghosts scared and pacman runs into it
    if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score +=100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
    checkForGameOver()
    }, ghost.speed)
}

//check for a game over
function checkForGameOver(){
    if(squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function(){ alert('Game Over');}, 500)
    }
}

//check for a win when this score is reached
function checkForWin(){
    if(score >= 274){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function(){ alert('WINNER!!'); }, 500)
    }
  }
})

