const path = require('path');
const { spawn } = require('child_process');

module.exports = function runModel(input, fileName) {

    return new Promise((resolve, reject) => {
        console.log("input: ",input);
        console.log("running model:", fileName);
        const script = path.join(__dirname, fileName);

        const childPython = spawn(
            'python',
            [script],
            { stdio: ['pipe', 'pipe', 'pipe'] }
        );
        let stdout = '';
        let stderr = '';


        childPython.stdout.on('data', chunk => {
            stdout += chunk.toString();

        });

        childPython.stderr.on('data', chunk => {
            stderr += chunk.toString();
            console.log("{PY}",chunk.toString().trim())
        });

        childPython.on('close', code => {
            if (code !== 0) {
                return reject(new Error(`Python exited ${code}\n${stderr}`));
            }
            try {
                const data = JSON.parse(stdout);
                const response = data.response ?? data.summary ?? data.result ?? data;;
                resolve(response);
            } catch (err) {
                reject(new Error(`JSON parse error: ${err.message}\nOutput was: ${stdout}`));
            }
        });
        childPython.on('error', err => {
            reject(new Error(err.message));
        });

        childPython.stdin.write(JSON.stringify({ input }),'utf8');
        childPython.stdin.end();

    })
}