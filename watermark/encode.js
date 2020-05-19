const dw = require('digital-watermarking');
if(!process.argv[2]) {
    console.log('process.argv[2] is null');
    return;
}
const watermarkText = 'tiktok';
let srcFileName = process.argv[2];
let enCodeFileName = `en.png`;

dw.transformImageWithText(srcFileName,watermarkText,1.6,enCodeFileName);
