var path = require('path');
var spawn = require('child_process').spawn;

const OPTIONS = { stdio: 'inherit', cwd: path.resolve(__dirname, '..', 'public') };
const POLYMER_URL = 'git://github.com/Polymer/polymer.git';
const TOOLKIT_URL = 'git://github.com/Polymer/toolkit-ui.git';

function cyan(str) {
  return '\x1b[36m' + str + '\x1b[0m';
}

function clone(name, url, cb) {
  console.log(cyan('Cloning %s...'), name);
  var child = spawn('git', ['clone', url, '--recursive'], OPTIONS);

  child.on('close', function(code) {
    if (code !== 0) {
      console.log('Cloning %s failed with code', url, code);
      process.exit(1);
    } else {
      if(cb) {
        cb();
      }
    }
  });
}

var toolkit = clone.bind(null, 'toolkit', TOOLKIT_URL);
var polymer = clone.bind(null, 'polymer', POLYMER_URL);

polymer(toolkit);
