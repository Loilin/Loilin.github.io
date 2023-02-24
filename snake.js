const world = document.getElementById("world")
const pen = world.getContext("2d")

let tileSize = 20
let tileCount = world.width/tileSize

//скорость по х и по у змейки
let velocity = {
    x: 0,
    y: 0
}
//информация о расположении еды
let food = {
    x: 20,
    y: 20
}

let snake = []
//инофрмация о расположении головы змейки
let snakeHead = {
    x: 15,
    y: 15
}
//длинна змейки
let snakeTailCount = 1

function drawWorld () {
    pen.fillStyle = 'black'// цвет мира
    pen.fillRect(0, 0, world.width, world.height)
}
//функиция отрисовки змейки
function drawSnake () {
    pen.fillStyle = "red"
    for(let i = 0; i <snake.length; i++){
        pen.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize - 2, tileSize - 2)
        if(
            snake[i].x == snakeHead.x &&//столкновение змейки
            snake[i].y == snakeHead.y
        ){
            snakeTailCount = 1// уменьшение длины змейки при столкновении до 1
        }
    }
}
//функиция отрисовки еды
function drawFood() {
    pen.fillStyle = "darkgreen"// цвет еды
    pen.fillRect( food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2)
}
//функция обновления позиции головы относительно скорости
function updateSnakeHead () {
    snakeHead.x += velocity.x
    snakeHead.y += velocity.y
//появление змейки если она ушла за границу карты
    if(snakeHead.x < 0){
        snakeHead.x = tileCount - 1
    } //если ушла в лево по иксу

    if(snakeHead.x > tileCount - 1){
        snakeHead.x = 0
    }// если ушла в право по иксу

    if(snakeHead.y < 0){
        snakeHead.y = tileCount - 1
    }//вверх по игрику

    if(snakeHead.y > tileCount - 1){
        snakeHead.y = 0
    }//вниз по игрику
}

//обновление тела змейки
function updateSnakeBody (){
     snake.push({
        x: snakeHead.x,
        y: snakeHead.y
     })

     while(snake.length > snakeTailCount){
        snake.shift()
     }
}
//функция натыкания змейки 
function eatFood () {
    if(
        food.x == snakeHead.x &&
        food.y == snakeHead.y
    ){
        snakeTailCount++

        food.x = Math.floor( Math.random()*tileCount)//генерация еды в рандомном месте по иксу
        food.y = Math.floor( Math.random()*tileCount)//генерация еды в рандомном месте по игрику
    }
}
//обработка нажатий на клавиши
const keyDownHandlers = {
    "ArrowLeft": ()=>{
        velocity.x = -1
        velocity.y = 0
    },
    "ArrowRight": ()=>{
        velocity.x = 1
        velocity.y = 0
    },
    "ArrowUp": ()=>{
        velocity.x = 0
        velocity.y = -1
    },
    "ArrowDown": ()=>{
        velocity.x = 0
        velocity.y = 1
    }
    
}
//функция обрабатывания события
function onKeyDown (event) {
    if(keyDownHandlers.hasOwnProperty(event.key)){
        keyDownHandlers[event.key]()
    }
}
//функция обновления игрового мира
function updateGame (){
    updateSnakeHead()

    drawWorld()
    drawSnake()

    eatFood()
    drawFood()

    updateSnakeBody()

}
//обработка нажатия на клавиши
document.addEventListener( "keydown", onKeyDown)
setInterval(updateGame,  1000/5)
