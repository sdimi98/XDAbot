
module.exports = (rawLines) =>  {
  const combinedLines = [];
  for (let i = 0; i < rawLines.length; i++) {
    const words = rawLines[i].split(' ');
    if (words.length === 2 && i + 1 < rawLines.length) {
      combinedLines.push(rawLines[i] + ' ' + rawLines[i + 1]);
      i++;
    } else {
      combinedLines.push(rawLines[i]);
    }
  }
  return combinedLines;
}