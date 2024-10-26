import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Standing,
} from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.image = document.getElementById("player");
    this.image.style.transform = "scaleX(-1, 1)";
    // frames for sprite animation
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 6;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;

    this.speed = 0;
    this.maxSpeed = 5;
    this.weight = 1;
    this.jump = 20;
    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Standing(this),
    ];
    this.currentState = this.states[4];
    this.currentState.enter();
  }

  update(input, deltaTime) {
    this.currentState.handleInput(input);
    if (input.has("ArrowLeft")) {
      this.direction = "left";
    } else if (input.has("ArrowRight")) {
      this.direction = "right";
    }
    // horizontal movement
    this.x += this.speed;
    if (input.has("ArrowLeft")) {
      this.speed = -this.maxSpeed;
    } else if (input.has("ArrowRight")) {
      this.speed = this.maxSpeed;
    } else {
      this.speed = 0;
    }

    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    // vertical movement
    this.y += this.vy;
    if (this.y < 0) this.y = 0;
    if (!this.onGround()) {
      this.vy += this.weight;
    } else this.vy = 0;

    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameX = (this.frameX + 1) % this.maxFrame;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  onGround() {
    return this.y >= this.game.height - this.height;
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  draw(context) {
    if (this.direction === "left") {
      context.save();
      context.translate(this.width, 0);
      context.scale(-1, 1);
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        -this.x,
        this.y,
        this.width,
        this.height
      );
      context.restore();
    } else {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}
