const { exec } = require("child_process");
const express = require("express");

const app = express();
let sshInfo = "Starting tmate session... Please wait.";

function startTmateSession() {
    exec("tmate -S /tmp/tmate.sock new-session -d", (err) => {
        if (err) {
            sshInfo = "Error starting tmate session: " + err.message;
            return;
        }
        
        exec("tmate -S /tmp/tmate.sock wait tmate-ready", () => {
            exec("tmate -S /tmp/tmate.sock display -p '#{tmate_ssh}'", (err, stdout) => {
                if (err) {
                    sshInfo = "Error retrieving SSH info: " + err.message;
                    return;
                }
                sshInfo = `SSH Access: <br><pre>${stdout}</pre>`;
            });
        });
    });
}

// Start the tmate session
startTmateSession();

app.get("/", (req, res) => {
    res.send(`
        <html>
            <head><title>Vercel SSH Access</title></head>
            <body>
                <h1>SSH Session</h1>
                <p>${sshInfo}</p>
            </body>
        </html>
    `);
});

app.listen(3000, () => console.log("Server running on port 3000"));
