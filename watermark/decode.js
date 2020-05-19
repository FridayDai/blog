const { exec } = require('child_process');
const dw = require('digital-watermarking');
const fs = require('fs');

exec('ffmpeg -i output.avi ./output/%04d.png', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
        console.log(`exec error: ${error}`);
    }

    const dir = fs.readdirSync('./output');
    dir.forEach((item) => {
        let enCodeFileName = `./output/${item}`;
        let deCodeFileName = `./output/de-${item}`;
        dw.getTextFormImage(enCodeFileName, deCodeFileName);
        console.log('decode png ', item);
    });
});
