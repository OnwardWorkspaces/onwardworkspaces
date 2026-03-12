let { spawn } = require('child_process');

// Function to spawn a child process which is used to execute shell command
exports.executeCommand = async (cmd) => {

    return new Promise((resolve, reject) => {
        var command = spawn(cmd, { shell: true })
        var result = ''
        command.stdout.on('data', function (data) {
            result += data.toString()
        })
        command.on('close', function (code) {
            resolve({ data : result, code : code})
        })
        command.on('error', function (err) { reject(err) })
    })
}
