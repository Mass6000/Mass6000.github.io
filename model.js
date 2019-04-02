class Teebox {
    constructor(box) {
        this.hcp = box.hcp;
        this.par = box.par;
        this.teeType = box.teeType;
        this.teeHexColor = box.teeHexColor;
        this.yards = box.yards;
    }
}

class Holes {
    constructor(hole, teebox) {
        this.hole = hole;
        this.teebox = teebox;
    }
}

