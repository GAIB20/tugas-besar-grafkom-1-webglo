import ShapeEnum from "../../enum/ShapeEnum";
import Vertex from "../base/Vertex";
import Point from "../base/Vertex";
import Shape from "./Shape";

class Line extends Shape {
    readonly shape: ShapeEnum = ShapeEnum.LINE;
    public p1: Point;
    public p2: Point | null;

    public constructor(id: number, p1: Point, p2: Point | null = null) {
        super(id);

        this.p1 = p1;
        this.p2 = p2;
    }

    public setPosition(gl: WebGLRenderingContext): void {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                ...this.p1.coorArray(),
                ...(this.p2?.coorArray() as [number, number]),
            ]),
            gl.STATIC_DRAW
        );
    }

    public setColor(gl: WebGLRenderingContext): void {
       gl.bufferData( gl.ARRAY_BUFFER,
        new Float32Array([
            ...this.p1.colorArray(),
            ...(this.p2?.colorArray() as [number, number, number, number]),
            ]),
        gl.STATIC_DRAW);
    }

    public isNullVertex(): boolean {
        return this.p1 != null && this.p2 != null;
    }

    public getGLType(gl: WebGLRenderingContext): number {
        return gl.LINES;
    }

    public countVertex(): number {
        return 2;
    }

    public countRealVertex(): number {
        return 2;
    }

    public setVertex(vertex: Vertex, index: number): void {
        if (index == 1) this.p1 = vertex;
        else if (index == 2) this.p2 = vertex;
    }

    public changeColor(color: [number, number, number, number]): void {
        const [r, g, b, a] = color;
        this.p1.color = { r, g, b, a };
        this.p2!.color = { r, g, b, a };
    }

    public centroid(): [number, number] {
        return [
            (this.p1.coor.x + (this.p2?.coor.x as number)) / 2,
            (this.p1.coor.y + (this.p2?.coor.y as number)) / 2,
        ];
    }
}

export default Line;
