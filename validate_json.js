const fs = require('fs');
const path = 'c:\\website\\website\\eco-tech\\server\\data\\members.json';

try {
    const data = fs.readFileSync(path, 'utf8');
    JSON.parse(data);
    console.log('JSON is valid');
} catch (e) {
    console.log('JSON error:', e.message);
    if (e.message.includes('position')) {
        const pos = parseInt(e.message.match(/position (\d+)/)[1]);
        const lines = fs.readFileSync(path, 'utf8').substring(0, pos).split('\n');
        console.log('Error at line:', lines.length, 'column:', lines[lines.length - 1].length);
    }
}
