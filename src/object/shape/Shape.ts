import ShapeEnum from "../../enum/ShapeEnum";
import Transform from "../../math/Transform";
import Vertex from "../base/Vertex";

abstract class Shape {
    readonly id: number;
    readonly transform: Transform;

    abstract readonly shape: ShapeEnum;

    public constructor(id: number) {
        this.id = id;
        this.transform = new Transform();
    }

    public abstract setPosition(gl: WebGLRenderingContext): void;
    public abstract setColor(gl: WebGLRenderingContext): void;
    public abstract isNullVertex(): boolean;
    public abstract countVertex(): number;
    public abstract centroid(): [number, number];
    public abstract getGLType(gl: WebGLRenderingContext): number;
    public abstract setVertex(vertex: Vertex, index: number): void;

    public render(render: RenderProps) {
        if (!this.isNullVertex()) {
            console.log("incomplete");
            return;
        }

        console.log("render");

        /** Position */
        const positionLoc = render.gl.getAttribLocation(
            render.program,
            "a_position"
        );
        render.gl.enableVertexAttribArray(positionLoc);
        render.gl.bindBuffer(render.gl.ARRAY_BUFFER, render.positionBuffer);
        this.setPosition(render.gl);
        render.gl.vertexAttribPointer(
            positionLoc,
            2,
            render.gl.FLOAT,
            false,
            0,
            0
        );

        /** Color */
        // const colorLoc = render.gl.getAttribLocation(render.program, "a_color");
        // render.gl.enableVertexAttribArray(colorLoc);
        // render.gl.bindBuffer(render.gl.ARRAY_BUFFER, render.colorBuffer);
        // this.setColor(render.gl);
        // render.gl.vertexAttribPointer(
        //     colorLoc,
        //     4,
        //     render.gl.FLOAT,
        //     false,
        //     0,
        //     0
        // );

        const centroid = this.centroid();

        const mat = this.transform
            .projectionMat(render.gl.canvas.width, render.gl.canvas.height)
            .multiply(this.transform.translationMat())
            .multiply(this.transform.inputTransMat(centroid[0], centroid[1]))
            .multiply(this.transform.rotationMat())
            .multiply(this.transform.scaleMat())
            .multiply(this.transform.inputTransMat(-centroid[0], -centroid[1]));

        const matrixLoc = render.gl.getUniformLocation(
            render.program,
            "u_matrix"
        );

        render.gl.uniformMatrix3fv(matrixLoc, false, mat.toArray());

        const primitive = this.getGLType(render.gl);
        const offset = 0;
        const count = this.countVertex();

        render.gl.drawArrays(primitive, offset, count);
    }

    // public abstract perfectShape(): boolean;
    // public abstract deletePoint(index: number): void;
    // public abstract method(gl: WebGLRenderingContext): number;
    // public abstract count(): number;
}

export default Shape;
