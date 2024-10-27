export class InputHandler {
  constructor(canvas) {
    this.expected_keys = new Set([
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
      "Enter",
    ]);

    this.keys = new Set();
    const buttons = document.querySelectorAll("#controls button");
    buttons.forEach((button) => {
      ["pointerenter"].forEach((event) => {
        button.addEventListener(event, (event) => {
          this.keys.add(event.target.value);
        });
      });
      ["pointerup", "pointerleave"].forEach((event) => {
        button.addEventListener(event, (event) => {
          this.keys.delete(event.target.value);
        });
      });
    });

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
