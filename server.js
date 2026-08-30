const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Proxy endpoint to bypass CORS
app.get('/api/proxy', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('Missing url parameter');
    
    https.get(targetUrl, (targetRes) => {
        if (targetRes.statusCode >= 300 && targetRes.statusCode < 400 && targetRes.headers.location) {
            // Handle redirect (e.g. 307 redirect)
            https.get(targetRes.headers.location, (redirectRes) => {
                let data = '';
                redirectRes.on('data', (chunk) => { data += chunk; });
                redirectRes.on('end', () => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.send(data);
                });
            }).on('error', (err) => {
                res.status(500).send(err.message);
            });
            return;
        }

        let data = '';
        targetRes.on('data', (chunk) => { data += chunk; });
        targetRes.on('end', () => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(data);
        });
    }).on('error', (err) => {
        res.status(500).send(err.message);
    });
});

// Send dashboard.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
