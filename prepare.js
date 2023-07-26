const fs = require('fs');
const distPackage = require('./package.json');

// remove dev dependencies
delete distPackage.devDependencies;

// include all 'dist/*' files
distPackage.files = ['*'];

// updates source flags removing 'dist' path
['main', 'module', 'types'].forEach((prop) => {
  distPackage[prop] = distPackage[prop].replace('dist/', '');
});

fs.mkdirSync('./dist', { recursive: true });
fs.copyFileSync('./README.md', './dist/README.md');
fs.copyFileSync('./LICENSE', './dist/LICENSE');
fs.writeFileSync(
  './dist/package.json',
  JSON.stringify(distPackage, undefined, 2)
);
