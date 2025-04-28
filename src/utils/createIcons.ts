import sharp from "sharp";

// Example logo string (replace with your actual logo data)
const logoString = "data:image/png;base64,..."; // Base64-encoded image string

// Function to create icons of different sizes
export async function createIcons() {
  try {
    // Convert the base64 string to a Buffer
    const imageBuffer = Buffer.from(logoString, "base64");

    // Generate icons of different sizes
    const sizes = [192, 512]; // Example sizes for icons
    for (const size of sizes) {
      await sharp(imageBuffer)
        .resize(size, size)
        .toFile(`public/icons/icon-${size}.png`);
      console.log(`Generated icon-${size}.png`);
    }
  } catch (error) {
    console.error("Error generating icons:", error);
    throw error;
  }
}
