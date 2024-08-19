const express = require('express');
var app = express();

var bodyParser = require('body-parser');

var urlencoderParser = bodyParser.urlencoded({ extended: false });

app.use('/', express.static(__dirname));

const path = require('path');
const mime = require('mime-types');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
        
});
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false); 
    }
};

const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
});

app.post('/uploads', upload.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.sendFile(path.join(__dirname, 'error-upload.html'));
    }
    res.sendFile(path.join(__dirname, 'file-uploaded.html'));
});

app.get('/file-upload', (req, res) => {
    res.sendFile(__dirname + '/' + 'file-upload.html');
});

app.listen(2000, function(){
    console.log("Server is running on port 2000");
});