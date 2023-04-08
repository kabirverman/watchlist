import config from "../config.json"



function RGBToHSL(r:number, g:number, b:number) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

  // Calculate hue
  // No difference
  if (delta === 0)
    h = 0;
  // Red is max
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

// Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h,s,l]
}


export function getAllHues() {
    return config.hues
}

export function getRandomHue() {
    let hues = config.hues
    let randomIndex = Math.floor(Math.random()*(hues.length - 1))

    return hues[randomIndex]
}

export function getNearestHue(rawHue:number) {
    let hues = config.hues
  
    let nearestHue = hues.reduce((previous, current) => {
      return Math.abs(current.hue - rawHue) < Math.abs(previous.hue - rawHue) ? current : previous
    })
  
    return nearestHue
  }
  
export function getHueFromRGB(r:number, g:number, b:number) {
let [h,s,l] = RGBToHSL(r, g, b)
let nearestHue = getNearestHue(h)
return nearestHue
}