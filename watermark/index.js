const dw = require('digital-watermarking');
//
// //EnCode Image add digital watermarking https://github.com/zy445566/node-digital-watermarking
// let srcFileName = "./img/unnamed.jpg";
// let watermarkText = "tiktok";
// let fontSize = 1.6;
// let enCodeFileName = "enCode.png";
// dw.transformImageWithText(srcFileName,watermarkText,fontSize,enCodeFileName);
//
// //DeCode Image get digital watermarking test
if(!process.argv[2]) {
    console.log('process.argv[2] is null');
    return;
}
let enCodeFileName = process.argv[2];
let deCodeFileName = `dec.png`;
dw.getTextFormImage(enCodeFileName,deCodeFileName);






