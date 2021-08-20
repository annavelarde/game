class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT;
  }

  preload() {}

  draw() {
    this.y += 11;

    image(background, this.x, this.y, this.width, this.height);
    image(background, this.x, this.y - this.height, this.width, this.height);
    if (this.y >= this.height) {
      this.y = 0;
    }
  }
}
