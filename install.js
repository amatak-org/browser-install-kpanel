#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoUrl = 'https://github.com/amatak-org/install-from-browser.git';
const destDir = '/var/www/html';

// Clone the repository
exec(`git clone ${repoUrl} temp-clone`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error cloning repository: ${error}`);
    return;
  }

  console.log('Repository cloned successfully');

  // Copy files to destination
  fs.readdir('temp-clone', (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach(file => {
      const srcPath = path.join('temp-clone', file);
      const destPath = path.join(destDir, file);

      fs.copyFile(srcPath, destPath, (err) => {
        if (err) {
          console.error(`Error copying file ${file}: ${err}`);
        } else {
          console.log(`Copied ${file} to ${destDir}`);
        }
      });
    });

    // Run install.js
    exec('node /var/www/html/install.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running install.js: ${error}`);
        return;
      }
      console.log('install.js executed successfully');

      // Clean up
      exec('rm -rf temp-clone', (error) => {
        if (error) {
          console.error(`Error removing temp directory: ${error}`);
        } else {
          console.log('Temporary clone directory removed');
        }
      });
    });
  });
});
