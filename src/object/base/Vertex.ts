import { Color } from "./Color";
import { Coordinate } from "./Coordinate";

class Vertex {
    public coor: Coordinate;
    public color: Color;

    public constructor(
        coor: [number, number, number],
        color: [number, number, number, number]
    ) {
        const [x, y, p] = coor;
        const [r, g, b, a] = color;

        this.coor = { x, y, p };
        this.color = { r, g, b, a };
    }

    public setColor(color: [number, number, number, number]) {
        const [r, g, b, a] = color;
        this.color = { r, g, b, a };
    }

    public coorArray(): [number, number] {
        return [this.coor.x, this.coor.y];
    }

    public colorArray(): [number, number, number, number] {
        return [this.color.r, this.color.g, this.color.b, this.color.a];
    }
}

export default Vertex;
