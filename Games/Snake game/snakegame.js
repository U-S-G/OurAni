class SnakeGameAI {
    constructor(w = 360, h = 400) {
        this.w = w;
        this.h = h;
        this.blockSize = 10;
        this.reset();
    }

    reset() {
        this.pos = { x: 5, y: 8 }; // Snake's starting position
        this.snakeArr = [this.pos, this.pos, this.pos];
        this.score = 0;
        this.frameRate = 10;
        this.colors = ["#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#FFFF00", "#00FFFF"];
        this.#placeFood(); // Ensure food is placed when the game resets
    }

    playStep(key) {
        // Move the snake
        for (let i = this.snakeArr.length - 1; i > 0; i--) {
            this.snakeArr[i] = { ...this.snakeArr[i - 1] };
        }
        this.#move(key);

        // Check for collision with food
        if (this.pos.x === this.foodPos.x && this.pos.y === this.foodPos.y) {
            this.#placeFood(); // Generate new food position
            this.snakeArr.push(this.pos); // Grow the snake
            this.score++;
            if (this.score % 5 === 0) {
                this.frameRate += 2; // Increase speed every 5 points
            }
        }

        // Check for game over
        if (this.#gameover()) {
            this.reset();
            return { gameOver: true, score: this.score };
        }

        return { gameOver: false, score: this.score };
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.w, this.h); // Clear the canvas

        // Draw the snake
        for (let i = 0; i < this.snakeArr.length; i++) {
            ctx.fillStyle = this.colors[i % this.colors.length];
            ctx.fillRect(
                this.snakeArr[i].x * this.blockSize,
                this.snakeArr[i].y * this.blockSize,
                this.blockSize,
                this.blockSize
            );
        }

        // Draw the food
        ctx.fillStyle = 'blue';
        ctx.fillRect(
            this.foodPos.x * this.blockSize,
            this.foodPos.y * this.blockSize,
            this.blockSize,
            this.blockSize
        );
    }

    #placeFood() {
        let validPosition = false;
        while (!validPosition) {
            this.foodPos = {
                x: Math.floor(Math.random() * (this.w / this.blockSize)),
                y: Math.floor(Math.random() * (this.h / this.blockSize)),
            };

            // Check if the food overlaps with the snake
            validPosition = !this.snakeArr.some(
                segment => segment.x === this.foodPos.x && segment.y === this.foodPos.y
            );
        }
    }

    #move(key) {
        if (key === Direction.LEFT) this.pos.x -= 1;
        else if (key === Direction.UP) this.pos.y -= 1;
        else if (key === Direction.RIGHT) this.pos.x += 1;
        else if (key === Direction.DOWN) this.pos.y += 1;
    }

    #gameover() {
        const headPos = { ...this.snakeArr[0] };
        // Check for collision with walls
        if (headPos.x < 0 || headPos.x >= this.w / this.blockSize ||
            headPos.y < 0 || headPos.y >= this.h / this.blockSize) {
            return true;
        }

        // Check for collision with itself
        for (let i = 1; i < this.snakeArr.length; i++) {
            if (headPos.x === this.snakeArr[i].x && headPos.y === this.snakeArr[i].y) {
                return true;
            }
        }
        return false;
    }

    getFrameRate() {
        return this.frameRate;
    }
}
