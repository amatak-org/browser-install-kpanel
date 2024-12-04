const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const cloneAndCopy = async () => {
  const repoUrl = 'https://github.com/amatak-org/install-from-browser.git';
  const cloneDir = 'install-from-browser';
  const sourceDir = path.join(cloneDir, 'browser');
  const destDir = '/var/www/html';

  try {
    // Clone the repository
    await execPromise(`git clone ${repoUrl}`);

    // Copy files
    await fs.copy(sourceDir, destDir);

    console.log('Files copied successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up: remove the cloned directory
    await fs.remove(cloneDir);
  }
};

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout ? stdout : stderr);
      }
    });
  });
};

cloneAndCopy();
