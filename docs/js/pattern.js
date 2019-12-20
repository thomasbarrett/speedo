
class Pattern {

    /**
     * @param {string} uri the image location 
     */
    constructor(uri) {
        this.type = 'pattern';
        this.uri = uri;
    }
};

class Color {

    /**
     * Constructs a Color from the given hexcode.
     * @param {string} hexcode a string representation n the form #000000
     */
    constructor(hexcode) {
        if (hexcode[0] === '#' && hexcode.length === 7) {
            this.type = 'color';
            this.hexcode = hexcode;
        } else {
            throw new TypeError(`parameter 'hexcode' invalid ${hexcode}`);
        }
    }
}

export { Pattern, Color };