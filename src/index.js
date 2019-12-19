var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var app = express();
var port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var colors = [];
var palettes = [];
var designs = [];
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});
var upload = multer({ storage: storage });
/**
 * Represents any c
 *
 */
var Color = /** @class */ (function () {
    /**
     * Constructs a Color from the given hexcode.
     * @param hexcode a string representation n the form #000000
     */
    function Color(hexcode) {
        if (hexcode[0] === '#' && hexcode.length === 7) {
            this.hexcode = hexcode;
        }
        else {
            throw new TypeError("parameter 'hexcode' invalid " + hexcode);
        }
    }
    return Color;
}());
app.get('/designs', function (req, res) { return res.json({ designs: designs }); });
app.get('/colors', function (req, res) { return res.json({ colors: colors }); });
app.get('/palettes', function (req, res) { return res.json({ palettes: palettes }); });
app.post('/colors', function (req, res) {
    var color = new Color(req.body.color);
    colors.push(color);
    res.status(200).end();
});
app.post('/palettes', function (req, res) {
    palettes.push(req.body);
    res.status(200).end();
});
app.post('/publish', upload.single('file'), function (req, res) {
    if (!req.file) {
        res.status(400).end();
    }
    else {
        designs.push(req.file.path.substr('public'.length));
        res.status(200).end();
    }
});
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
