const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer');
const https = require('https');
const fs = require('fs');
const app = express()
const port = 3000

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/triceratalk.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/triceratalk.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/triceratalk.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
  
// Create HTTP Server
const httpsServer = https.createServer(credentials, app);

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/static', express.static('docs/uploads'))

const colors = [];
const palettes = [];
const designs = [];

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'docs/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

var upload = multer({ storage: storage })
  
/**
 * Represents any c
 * 
 */
class Color {

    hexcode: string

    /**
     * Constructs a Color from the given hexcode.
     * @param hexcode a string representation n the form #000000
     */
    constructor(hexcode: string) {
        if (hexcode[0] === '#' && hexcode.length === 7) {
            this.hexcode = hexcode;
        } else {
            throw new TypeError(`parameter 'hexcode' invalid ${hexcode}`);
        }
    }
}

app.get('/designs', (req, res) => res.json({designs}))
app.get('/colors', (req, res) => res.json({colors}))
app.get('/palettes', (req, res) => {
    res.json({palettes})
});
app.post('/colors', (req, res) => {
    const color = new Color(req.body.color);
    colors.push(color);
    res.status(200).end();
});

app.post('/palettes', (req, res) => {
    palettes.push(req.body);
    res.status(200).end();
});

app.post('/publish', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).end();
    } else {
        designs.push('https://triceratalk.com/static/' + req.file.path.substr('/docs/uploads'.length));
        res.status(200).end();
    }
});

httpsServer.listen(443, () => console.log(`Server Started!`));
