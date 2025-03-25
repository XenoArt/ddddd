const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

let bot; // Use 'let' to allow recreation on disconnect

// Web server to keep Render alive
app.get('/', (req, res) => {
    res.send('Minecraft Bot is Running!');
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

function createBot() {
    bot = mineflayer.createBot({
        host: "pzdcaaa.aternos.me", // Aternos server IP
        port: 41405, // Server port
        username: "YleBot", // Bot name
        version: "1.21.4" // Minecraft version
    });

    bot.once('spawn', () => {
        bot.setControlState('forward', true); // Moves forward non-stop
        console.log("Bot has joined and is moving forward!");
    });

    bot.on('end', () => {
        console.log("Bot disconnected! Reconnecting in 5 seconds...");
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.log("Bot error:", err);
    });
}

createBot();
