export const rgbToHex = ({ red, green, blue }) => {
  const hexRed = red.toString(16).padStart(2, "0");
  const hexGreen = green.toString(16).padStart(2, "0");
  const hexBlue = blue.toString(16).padStart(2, "0");

  return {
    hexRed,
    hexGreen,
    hexBlue,
  };
};
