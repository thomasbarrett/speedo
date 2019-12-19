const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer');
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const colors = [];
const palettes = [];
const designs = [];

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
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
app.get('/palettes', (req, res) => res.json({palettes}))
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
        designs.push(req.file.path.substr('public'.length));
        res.status(200).end();
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))