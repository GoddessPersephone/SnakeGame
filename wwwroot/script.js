const gameBoard = document.getElementById("game-board");
const pontuacaoElem = document.getElementById("pontuacao");
const boardSize = 400;
const tileSize = 20;
let snake, direction, food, pontuacao, gameInterval;
let isGameStarted = false;
function restartGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    food = getRandomFoodPosition();
    pontuacao = 0;
    pontuacaoElem.textContent = `Pontuação: ${pontuacao}`;
    isGameStarted = false;
    clearInterval(gameInterval);
    startGame();
}

function moveSnake() {
    if (!isGameStarted) return;

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || isCollidingWithSnake(head)) {
        clearInterval(gameInterval);
        alert("Fim de jogo! Pontuação final: " + pontuacao);
        restartGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        pontuacao += 10;
        pontuacaoElem.textContent = `Pontuação: ${pontuacao}`;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }

    render();
}
function isCollidingWithSnake(position) {
    return snake.some(segment => segment.x === position.x && segment.y === position.y);
}

function getRandomFoodPosition() {
    const x = Math.floor(Math.random() * (boardSize / tileSize)) * tileSize;
    const y = Math.floor(Math.random() * (boardSize / tileSize)) * tileSize;
    return { x, y };
}

function render() {
    gameBoard.innerHTML = "";

    snake.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.left = segment.x + "px";
        snakeElement.style.top = segment.y + "px";
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement("div");
    foodElement.style.left = food.x + "px";
    foodElement.style.top = food.y + "px";
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

document.addEventListener("keydown", (event) => {
    if (!isGameStarted) {
        isGameStarted = true;
    }

    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -tileSize };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: tileSize };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -tileSize, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: tileSize, y: 0 };
            break;
    }
});

function startGame() {
    render();
    gameInterval = setInterval(moveSnake, 200);
}

restartGame();