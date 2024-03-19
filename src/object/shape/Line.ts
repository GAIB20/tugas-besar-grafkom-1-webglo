import ShapeEnum from "../../enum/ShapeEnum";
import Point from "../base/Point";
import Shape from "./Shape";

class Line extends Shape {
    readonly shape: ShapeEnum = ShapeEnum.LINE;
    public p1: Point;
    public p2: Point;

    public constructor(id: number, p1: Point, p2: Point) {
        super(id);

        this.p1 = p1;
        this.p2 = p2;
    }
}
