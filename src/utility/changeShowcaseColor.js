import { rgbToHex } from "./rgbToHex.js";
import { mainColorDiv, rgbColor, hexColor } from "./querySelectors.js";

export const changeShowcaseColor = ({ red, green, blue }) => {

  const { hexRed, hexGreen, hexBlue } = rgbToHex({ red, green, blue });

  mainColorDiv.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  rgbColor.innerText = `RGB: ${red}, ${green}, ${blue}`;
  hexColor.innerText = `HEX: #${hexRed}${hexGreen}${hexBlue}`;
};
