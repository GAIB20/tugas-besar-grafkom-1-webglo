import { Coordinate } from "./Coordinate";

class Point {
    public coor: Coordinate;
    public color: Color;

    public constructor(
        coor: [number, number],
        color: [number, number, number, number]
    ) {
        const [x, y] = coor;
        const [r, g, b, a] = color;

        this.coor = { x: x, y: y, w: 0 };
        this.color = { r: r, g: g, b: b, a: a };
    }
}
