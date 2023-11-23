import { CANVAS_DATA } from "./src/utility/globalVar.js";
import { canvas } from "./src/utility/querySelectors.js";
import {
  uploadPicture,
  showPixelColor,
  capturePixelColor,
  removeHighlightedColor,
} from "./src/utility/uploadPicture.js";

canvas.width = CANVAS_DATA.width;
canvas.height = CANVAS_DATA.width;

uploadPicture();
canvas.addEventListener("mousemove", showPixelColor);
canvas.addEventListener("mouseout", removeHighlightedColor);
canvas.addEventListener("click", capturePixelColor);
