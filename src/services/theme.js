
export const getRGBColor = (hex, type) => {
  let color = hex.replace(/#/g, "")
  // rgb values
  var r = parseInt(color.substr(0, 2), 16)
  var g = parseInt(color.substr(2, 2), 16)
  var b = parseInt(color.substr(4, 2), 16)

  const ctype = `--color-${type}`;
  const crgb = `${r}, ${g}, ${b};`

  return `${ctype}: ${crgb}`;
}

export const getAccessibleColor = (hex) => {
  let color = hex.replace(/#/g, "")
  // rgb values
  var r = parseInt(color.substr(0, 2), 16)
  var g = parseInt(color.substr(2, 2), 16)
  var b = parseInt(color.substr(4, 2), 16)
  var yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#000000" : "#FFFFFF"
}