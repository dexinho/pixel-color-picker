import {
  showPixelColor,
  capturePixelColor,
  canvasDrawImage,
} from "./uploadedImageSettings.js";
import { canvas } from "./querySelectors.js";
import { CANVAS_DATA, IMAGE_DATA } from "./globalVar.js";
import { generateColorPalette } from "./generateColorPalette.js";

export const initialCanvasSetup = () => {
  canvas.width = CANVAS_DATA.width;
  canvas.height = CANVAS_DATA.height;

  CANVAS_DATA.ctx = canvas.getContext("2d", { willReadFrequently: true });
  const image = new Image();
  image.src = "./src/assets/nature.jpg";
  image.onload = () => {
    IMAGE_DATA.image = image;
    CANVAS_DATA.ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    generateColorPalette();
  };

  canvas.addEventListener("mousemove", showPixelColor);
  canvas.addEventListener("mouseout", canvasDrawImage);
  canvas.addEventListener("click", capturePixelColor);
};
