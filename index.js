const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const inputFolder = "./input";
const outputFolder = "./output"; 

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}
if (!fs.existsSync(inputFolder)) {
  fs.mkdirSync(inputFolder);
}

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error("خطا در خواندن پوشه ورودی:", err);
    return;
  }

  files.forEach((file) => {
    const inputFilePath = path.join(inputFolder, file);
    const outputFilePath = path.join(outputFolder, path.parse(file).name + '.mp3');

    ffmpeg()
      .input(inputFilePath)
      .audioCodec('libmp3lame')
      .toFormat('mp3')
      .on('end', () => {
        console.log(`تبدیل ${file} به MP3 با موفقیت انجام شد.`);
      })
      .on('error', (err) => {
        console.error(err);
      })
      .save(outputFilePath);
  });
});
