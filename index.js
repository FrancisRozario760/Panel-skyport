const { exec } = require("child_process");

module.exports = async (req, res) => {
    let sshInfo = "Starting tmate session... Please wait.";

    exec("tmate -S /tmp/tmate.sock new-session -d", (err) => {
        if (err) {
            sshInfo = "Error starting tmate session: " + err.message;
        } else {
            exec("tmate -S /tmp/tmate.sock wait tmate-ready", () => {
                exec("tmate -S /tmp/tmate.sock display -p '#{tmate_ssh}'", (err, stdout) => {
                    if (err) {
                        sshInfo = "Error retrieving SSH info: " + err.message;
                    } else {
                        sshInfo = `SSH Access: <br><pre>${stdout}</pre>`;
                    }
                });
            });
        }
    });

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
        <html>
            <head><title>Vercel SSH Access</title></head>
            <body>
                <h1>SSH Session</h1>
                <p>${sshInfo}</p>
            </body>
        </html>
    `);
};
