import { Player } from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  let lastTime = 0;

  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(canvas) {
      this.width = canvas.width;
      this.height = canvas.height;
      this.player = new Player(this);
      this.input = new InputHandler(canvas);
    }

    update(deltaTime) {
      this.player.update(this.input.keys, deltaTime);
    }

    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas);

  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
