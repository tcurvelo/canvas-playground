export class InputHandler {
  constructor() {
    this.expected_keys = new Set([
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
      "Enter",
    ]);

    this.keys = new Set();
    window.addEventListener("keydown", (event) => {
      if (this.expected_keys.has(event.key) && !this.keys.has(event.key)) {
        this.keys.add(event.key);
      }
    });

    window.addEventListener("keyup", (event) => {
      if (this.expected_keys.has(event.key) && this.keys.has(event.key)) {
        this.keys.delete(event.key);
      }
    });
  }
}
