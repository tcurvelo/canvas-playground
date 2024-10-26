const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  STANDING: 4,
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

export class Standing extends State {
  constructor(player) {
    super(states.STANDING);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 0;
    this.player.maxFrame = 6;
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
    this.player.frameY = 5;
    this.player.maxFrame = 4;
  }

  handleInput(input) {
    if (input.has("ArrowLeft") || input.has("ArrowRight")) {
      this.player.setState(states.RUNNING);
    }
    if (input.has("ArrowUp") && this.player.onGround()) {
      this.player.setState(states.JUMPING);
    }
    if (!input.has("ArrowDown") && this.player.onGround()) {
      this.player.setState(states.STANDING);
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
    this.player.frameY = 3;
    this.player.maxFrame = 8;
  }

  handleInput(input) {
    if (!input.has("ArrowLeft") && !input.has("ArrowRight")) {
      if (input.has("ArrowDown") && this.player.onGround()) {
        this.player.setState(states.SITTING);
      } else {
        this.player.setState(states.STANDING);
      }
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
    this.player.frameY = 1;
    this.player.maxFrame = 6;
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
    this.player.frameY = 2;
    this.player.maxFrame = 6;
  }

  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING);
    }
  }
}
