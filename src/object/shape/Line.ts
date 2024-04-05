import ShapeEnum from "../../enum/ShapeEnum";
import Vertex from "../base/Vertex";
import Shape from "./Shape";

class Line extends Shape {
    readonly shape: ShapeEnum = ShapeEnum.LINE;
    public v1: Vertex;
    public v2: Vertex | null;

    public constructor(id: number, v1: Vertex, v2: Vertex | null = null) {
        super(id);

        this.v1 = v1;
        this.v2 = v2;
    }

    public setPosition(gl: WebGLRenderingContext): void {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                ...this.v1.coorArray(),
                ...(this.v2?.coorArray() as [number, number]),
            ]),
            gl.STATIC_DRAW
        );
    }

    public setColor(gl: WebGLRenderingContext): void {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                ...this.v1.colorArray(),
                ...(this.v2?.colorArray() as [number, number, number, number]),
            ]),
            gl.STATIC_DRAW
        );
    }

    public isNullVertex(): boolean {
        return this.v1 != null && this.v2 != null;
    }

    public getGLType(gl: WebGLRenderingContext): number {
        return gl.LINES;
    }

    public countVertex(): number {
        return 2;
    }

    public setVertex(vertex: Vertex, index: number): void {
        if (index == 1) this.v1 = vertex;
        else if (index == 2) this.v2 = vertex;
    }

    public changeColor(color: [number, number, number, number]): void {
        const [r, g, b, a] = color;
        this.v1.color = { r, g, b, a };
        this.v2!.color = { r, g, b, a };
    }

    public centroid(): [number, number] {
        return [
            (this.v1.coor.x + (this.v2?.coor.x as number)) / 2,
            (this.v1.coor.y + (this.v2?.coor.y as number)) / 2,
        ];
    }
}

export default Line;
