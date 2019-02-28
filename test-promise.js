const path = require('path');
const fs = require('fs');
let dir = path.join(__dirname, '../static/project-demos/number-guessing-game')

console.log(__dirname)
function mkdirByPathSync (dir,{isRelativeToScript = false} = {}) {
    console.log(dir)
    let sep = path.sep;
    console.log(sep)
    let initDir = path.isAbsolute(dir) ? sep: '';
    console.log('init',initDir)
    const baseDir = isRelativeToScript ? __dirname : '.';
    console.log('base',baseDir)

    return dir.split(sep).reduce((parentDir, childDir) => {
        console.log(parentDir)
        console.log(childDir)
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir)
        } catch (error) {
            console.log(error);
        }
        return curDir;
    }, initDir)



   

}

mkdirByPathSync(dir)