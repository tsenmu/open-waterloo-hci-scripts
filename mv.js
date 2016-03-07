var fs = require('fs');
var path = require('path');


var src = '/home/tsenmu/Dropbox/hci-window-display';
var dest = '/home/tsenmu/open-waterloo-hci/dist/scripts/processing.pde';
// var src = '/Users/tsenmu/Work/open-waterloo-hci-scripts/test/src';
// var dest = '/Users/tsenmu/Work/open-waterloo-hci-scripts/test/dest/processing.pde';

var get_pde_files = function() {
    var files = fs.readdirSync(src); 
    var result = [];
    for (var i = 0; i < files.length; ++i) {
        var file = files[i];
        if (path.extname(file, 'pde')) {
            result.push(path.join(src, file));
        }
    }
    files = result;
    for (var i = 0; i < files.length; ++i) {
        var file = files[i];
        if (file.indexOf('run_') !== -1) {
            return [file];
        }
    }
    return files;
}

var copy_file = function(from, to) {
    fs.createReadStream(from).pipe(fs.createWriteStream(to)); 
} 


var fileIndex = 0;

var shuffle = function() {
    var files = get_pde_files();
    console.log(files);
    if (files.length !== 0) {
        if (fileIndex >= files.length) {
            fileIndex = 0;
        }
        copy_file(files[fileIndex], dest);
        fileIndex++;
    } 
}


setInterval(shuffle, 1000 * 60 * 10);


