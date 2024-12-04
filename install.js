const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

function cloneAndCopy() {
  const repoUrl = 'https://github.com/amatak-org/install-from-browser.git';
  const tempDir = path.join(__dirname, 'temp');
  const browserDir = path.join(tempDir, 'install-from-browser', 'browser');
  const destDir = '/var/www/html';

  // Clone the repository
  exec(`git clone ${repoUrl} ${tempDir}`, (error) => {
    if (error) {
      console.error(`Error cloning repository: ${error}`);
      return;
    }

    // Copy files from browser directory to destination
    fs.copy(browserDir, destDir, (err) => {
      if (err) {
        console.error(`Error copying files: ${err}`);
      } else {
        console.log('Files copied successfully');
      }

      // Clean up temporary directory
      fs.remove(tempDir, (removeErr) => {
        if (removeErr) {
          console.error(`Error removing temp directory: ${removeErr}`);
        }
      });
    });
  });
}

cloneAndCopy();
