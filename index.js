import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

async function generateQR() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Enter URL to generate a QR code:',
        validate: function(value) {
          var pass = value.match(
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
          );
          if (pass) {
            return true;
          }
          return 'Enter a valid URL.';
        }
      }
    ]);

    const url = answers.url;

    const qrCode = qr.image(url, { type: 'png' });
    const output = fs.createWriteStream('qr_img.png');
    qrCode.pipe(output);

    fs.writeFile('URL.txt', url, err => {
      if (err) {
        console.error('Error saving URL to file:', err);
      } else {
        console.log('URL saved to URL.txt');
      }
    });
  } catch (error) {
    console.error('Error during prompt or QR generation:', error);
  }
}

generateQR();
