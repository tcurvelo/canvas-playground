export const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  IDLE: 4,
};

class State {
  constructor(state) {
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

export class Idle extends State {
  constructor(player) {
    super(states.IDLE);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = states.IDLE;
    this.player.maxFrame = 20;
  }

  handleInput(input) {
    if (input.has("ArrowLeft") || input.has("ArrowRight")) {
      this.player.setState(states.RUNNING);
    }
    if (input.has("ArrowUp") && this.player.onGround()) {
      this.player.setState(states.JUMPING);
    }
    if (input.has("ArrowDown") && this.player.onGround()) {
      this.player.setState(states.SITTING);
    }
  }
}

export class Sitting extends State {
  constructor(player) {
    super(states.SITTING);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = states.SITTING;
    this.player.maxFrame = 20;
  }

  handleInput(input) {
    if (input.has("ArrowLeft") || input.has("ArrowRight")) {
      this.player.setState(states.RUNNING);
    }
    if (input.has("ArrowUp") && this.player.onGround()) {
      this.player.setState(states.JUMPING);
    }
    if (!input.has("ArrowDown") && this.player.onGround()) {
      this.player.setState(states.IDLE);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super(states.RUNNING);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = states.RUNNING;
    this.player.maxFrame = 12;
  }

  handleInput(input) {
    if (!input.has("ArrowLeft") && !input.has("ArrowRight")) {
      this.player.setState(states.IDLE);
    }

    if (input.has("ArrowUp") && this.player.onGround()) {
      this.player.vy = -this.player.jump;
      this.player.setState(states.JUMPING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super(states.JUMPING);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    if (this.player.onGround()) {
      this.player.vy = -this.player.jump;
    }
    this.player.frameY = states.JUMPING;
    this.player.maxFrame = 10;
  }

  handleInput(input) {
    if (this.player.vy >= this.player.weight) {
      this.player.setState(states.FALLING);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super(states.FALLING);
    this.player = player;
  }

  enter() {
    this.player.frameY = states.FALLING;
    this.player.maxFrame = 10;
  }

  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING);
    }
  }
}
