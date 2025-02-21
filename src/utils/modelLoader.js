require('dotenv').config();
async function loadImageClassifier() {
  const { pipeline } = await import('@xenova/transformers');
  return pipeline('zero-shot-image-classification', 'Xenova/clip-vit-base-patch16');
}

module.exports = { loadImageClassifier };
