import ShapeEnum from "../../enum/ShapeEnum";
import Matrix from "../../math/Matrix";
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
    public abstract changeColor(color: [number, number, number, number]): void;

    public render(render: RenderProps) {
        if (!this.isNullVertex()) {
            return;
        }

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
        const colorLoc = render.gl.getAttribLocation(render.program, "a_color");
        render.gl.enableVertexAttribArray(colorLoc);
        render.gl.bindBuffer(render.gl.ARRAY_BUFFER, render.colorBuffer);
        this.setColor(render.gl);
        render.gl.vertexAttribPointer(
            colorLoc,
            4,
            render.gl.FLOAT,
            false,
            0,
            0
        );

    public matrixProc({ gl, program }: RenderProps) {
        const centroid = this.centroid();

        const mat = this.transform
            .projectionMat(gl.canvas.width, gl.canvas.height)
            .multiply(this.transform.translationMat())
            .multiply(this.transform.inputTransMat(centroid[0], centroid[1]))
            .multiply(this.transform.rotationMat())
            .multiply(this.transform.scaleMat())
            .multiply(this.transform.inputTransMat(-centroid[0], -centroid[1]));

        const matrixLoc = gl.getUniformLocation(program, "u_matrix");

        gl.uniformMatrix3fv(matrixLoc, false, mat.toArray());
    }

    public drawProc({ gl }: RenderProps) {
        const primitive = this.getGLType(gl);
        const offset = 0;
        const count = this.countVertex();

        gl.drawArrays(primitive, offset, count);
    }

    public render(r: RenderProps) {
        if (!this.isNullVertex()) return;
        this.positionProc(r);
        this.colorProc(r);
        this.matrixProc(r);
        this.drawProc(r);
    }
}

export default Shape;
