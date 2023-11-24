import { paletteColors } from "./querySelectors.js";
import { IMAGE_DATA } from "./globalVar.js";
import { mainColorDiv, rgbColor, hexColor } from "./querySelectors.js";
import { rgbToHex } from "./rgbToHex.js";
import { changeShowcaseColor } from "./changeShowcaseColor.js";

export const generateColorPalette = () => {
  const colorThief = new ColorThief();
  const colors = colorThief.getPalette(IMAGE_DATA.image, 5);

  paletteColors.forEach((color, index) => {
    color.removeEventListener("click", chosenColorFromPalette);
    color.style.backgroundColor = `rgb(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]})`;
    color.addEventListener("click", chosenColorFromPalette);
  });
};

const chosenColorFromPalette = (e) => {
  const backgroundColor = getComputedStyle(e.target).backgroundColor;

  const rgb = backgroundColor
    .replace(/rgb\((\d+,) (\d+,) (\d+)\)/, "$1$2$3")
    .split(",");

  const [red, green, blue] = rgb;

  changeShowcaseColor({ red, green, blue });
};
