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
    public abstract countRealVertex(): number;
    public abstract centroid(): [number, number];
    public abstract getGLType(gl: WebGLRenderingContext): number;
    public abstract setVertex(vertex: Vertex, index: number): void;
    public abstract changeColor(color: [number, number, number, number]): void;

    public positionProc({ gl, program, positionBuffer }: RenderProps) {
        const positionLoc = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        this.setPosition(gl);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    }

    public colorProc({ gl, program, colorBuffer }: RenderProps) {
        const colorLoc = gl.getAttribLocation(program, "a_color");
        gl.enableVertexAttribArray(colorLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        this.setColor(gl);
        gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    }

    public matrixProc({ gl, program }: RenderProps) {
        const centroid = this.centroid();

        const mat = this.transform
            .projectionMat(gl.canvas.width, gl.canvas.height)
            .multiply(this.transform.customTransformMat())
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
