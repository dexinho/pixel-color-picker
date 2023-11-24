import {
  canvas,
  uploadPictureInput,
  mainColorDiv,
  rgbColor,
  hexColor,
} from "./querySelectors.js";
import { CANVAS_DATA, IMAGE_DATA } from "./globalVar.js";
import { generateColorPalette } from "./generateColorPalette.js";
import { rgbToHex } from "./rgbToHex.js";
import { changeShowcaseColor } from "./changeShowcaseColor.js";

export const uploadedImageSettings = async () => {
  uploadPictureInput.addEventListener("change", async (e) => {
    try {
      const loadedFile = await loadFile(e.target.files[0]);
      IMAGE_DATA.image = await loadImage(loadedFile);
      prepareCanvas({ width: 640, height: 360 });
      canvasDrawImage();
      generateColorPalette();
    } catch (err) {
      console.log(err);
    }
  });
};

const prepareCanvas = ({ width, height }) => {
  CANVAS_DATA.width = width;
  CANVAS_DATA.height = height;
  canvas.width = CANVAS_DATA.width;
  canvas.height = CANVAS_DATA.height;
};

export const canvasDrawImage = ({
  ctx = CANVAS_DATA.ctx,
  image = IMAGE_DATA.image,
} = {}) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

const loadFile = (fileToLoad) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileToLoad);
    reader.onload = (e) => {
      res(e.target.result);
    };
    reader.onerror = () => {
      rej("Failed to load file");
    };
  });
};

const loadImage = (imageSource) => {
  return new Promise((res, rej) => {
    const image = new Image();
    image.src = imageSource;
    image.onload = (e) => {
      res(e.target);
    };
    image.onerror = () => {
      rej("Failed to load image");
    };
  });
};

export const showPixelColor = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  const showSize = 75;
  const { ctx, offset } = CANVAS_DATA;
  const [red, green, blue] = ctx.getImageData(x, y, 1, 1).data;
  IMAGE_DATA.rgbColors = {
    red,
    green,
    blue,
  };
  let moveByX = x + offset;
  let moveByY = y + offset;

  canvasDrawImage();

  if (y + showSize + offset >= CANVAS_DATA.height)
    moveByY -= offset * 2 + showSize;
  if (x + showSize + offset >= CANVAS_DATA.width)
    moveByX -= offset * 2 + showSize;

  ctx.beginPath();
  ctx.rect(moveByX, moveByY, showSize, showSize);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
  ctx.fillRect(moveByX, moveByY, showSize, showSize);
};

export const capturePixelColor = () => {
  const { rgbColors: {red, green, blue}} = IMAGE_DATA;

  changeShowcaseColor({red, green, blue});
};
