const { exec } = require('child_process');
const dw = require('digital-watermarking');
const fs = require('fs');

function sortForPng(a, b) {
    const numberA = Number(a.split('.')[0]);
    const numberB = Number(b.split('.')[0]);

    return numberA - numberB;
}
let watermarkText = "tiktok";
let fontSize = 1.6;
console.log('Start to split images from mp4');

exec('ffmpeg -i ./img/video.mp4 -q:a 0 -map a video.mp3', (err, out, e) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(out);

    exec('ffmpeg -i ./img/video.mp4 ./extract_png/%04d.png', (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }

        const dir = fs.readdirSync('./extract_png').sort(sortForPng);

        console.log('start to encode png');
        dir.forEach((item) => {
            let srcFileName = `./extract_png/${item}`;
            let enCodeFileName = `./encode_png/${item}`;

            dw.transformImageWithText(srcFileName,watermarkText,fontSize,enCodeFileName);
            console.log('encode png ', item);
        });
        console.log('enconde success, start to convert mp4');

        exec('ffmpeg -r 30 -f image2 -i ./encode_png/%04d.png -i video.mp3 -b 800k output.avi', (error, stdout, stderr) => {
            if(error) {
                console.log(error);
                return;
            }
            console.log(stdout);
            console.log('done');
        });
    });
});


