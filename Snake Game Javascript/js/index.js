// Constants & Variables
let inputDir = { x: 0, y: 0 } // ??
const foodSound = new Audio('food.mp3')
const gameOverSound = new Audio('gameover.mp3')
const moveSound = new Audio('move.mp3')
const musicSound = new Audio('music.mp3')
const collideSound = new Audio('collide.wav')
let score = 0
let hiScore = 0
let speed = 10
let lastPaintTime = 0
let snakeArray = [
    { x: 13, y: 15 }
]
// let food = { x: 5, y: 6 }
let p = 2
let q = 16
let food = {
    x: Math.round(p + (q - p) * Math.random()),
    y: Math.round(p + (q - p) * Math.random())
}

// Functions
// requestAnimationFrame better than setInterval or setTimeout

function main(ctime) { // ctime: current time
    window.requestAnimationFrame(main) // recursion of main function
    // console.log(ctime)
    // console.log(typeof(snakeElement));

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return
    }
    lastPaintTime = ctime
    // musicSound.play()
    gameEngine();
}

function isCollide(array) {

    // If the snake crashes into its tail
    for (let i = 1; i < snakeArray.length; i++) {
        if (array[i].x == array[0].x && array[i].y == array[0].y) {
            return true
        }


    }

    // If the snake hits the wall
    if (array[0].x >= 18 || array[0].x <= 0
        || array[0].y >= 18 || array[0].y <= 0
    ) {
        return true
    }


    return false
}

function gameEngine() {
    // 1. Update snake array and food
    // update snake
    if (isCollide(snakeArray)) {
        gameOverSound.play()
        musicSound.pause()
        inputDir = { x: 0, y: 0 }
        alert("Game Over! Press any key to play again")

        snakeArray = [{ x: 13, y: 15 }]
        // musicSound.play()
        if(score>hiScore){
            hiScore = score
        }
        score = 0
        scoreBox.innerHTML = "score: "+ score
    }

    // If snake eats  food, increment score and give new food
    if (snakeArray[0].y == food.y && snakeArray[0].x == food.x) {
        score += 1
        scoreBox.innerHTML = "score: "+ score
        foodSound.play()
        // unshift add element at the starting of array
        snakeArray.unshift({
            x: snakeArray[0].x + inputDir.x,
            y: snakeArray[0].y + inputDir.y
        })
        // new food location
        let a = 2
        let b = 16
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
    }

    // Moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };// ??
    }

    snakeArray[0].x += inputDir.x
    snakeArray[0].y += inputDir.y



    // 2. Display snake and food
    //Display Snake
    board.innerHTML = "" // ?
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div') // ?
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index == 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)

    })
    // Display food
    foodElement = document.createElement('div') // ?
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement) // ?
    
    // Display hiScore
    hiscoreBox.innerHTML = "Hi Score: "+hiScore


}


// Main logic

window.requestAnimationFrame(main) // continue game window
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 }
    if (e.key == "ArrowUp" ||
        e.key == "ArrowDown" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight"

    ) {
        moveSound.play()
    }
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "Space":

            break;

        default:
            break;
    }
})