const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const FILES_DIR = path.join(__dirname, 'files');

app.use('/files', express.static(FILES_DIR));

app.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(FILES_DIR, fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    res.download(filePath);
});

app.listen(PORT, () => {
    console.log(`File server http://localhost:${PORT}`);
});