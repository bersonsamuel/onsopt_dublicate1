const { Jimp } = require("jimp");

async function removeBg() {
  try {
    const imagePath = "C:\\Users\\berso\\.gemini\\antigravity-ide\\brain\\912e68dc-c987-4b9a-9406-0af60b51ae40\\.user_uploaded\\media_1791021549838.jpg";
    console.log("Reading image:", imagePath);
    const image = await Jimp.read(imagePath);
    
    // Iterate over every pixel
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Black background means r,g,b are all low. The logo is mint green (high G, medium B, low/med R).
      // Calculate a rough brightness/luminance
      const lum = (r + g + b) / 3;
      
      if (lum < 30) {
        // Pure black or very dark grey: make fully transparent
        this.bitmap.data[idx + 3] = 0;
      } else if (lum < 60) {
        // Anti-aliasing fringe: make partially transparent
        const alpha = Math.floor(((lum - 30) / 30) * 255);
        this.bitmap.data[idx + 3] = alpha;
      }
    });
    
    const outPath = "assets/onspot-logo-transparent.png";
    await image.writeAsync(outPath);
    console.log("Successfully created transparent PNG at:", outPath);
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

removeBg();
