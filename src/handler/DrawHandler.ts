import ShapeEnum from "../enum/ShapeEnum";
import { Coordinate } from "../object/base/Coordinate";
import Vertex from "../object/base/Vertex";
import Line from "../object/shape/Line";
import Shape from "../object/shape/Shape";

class DrawHandler {
    /** WEBGL */
    public renderProps: RenderProps;
    // public gl: WebGLRenderingContext;
    public canvas: HTMLCanvasElement;
    public document: Document;

    /** STATE */
    public onDraw: boolean = false;
    public colorBuffer: WebGLBuffer;
    public positionBuffer: WebGLBuffer;
    public selectShape: ShapeEnum | null = null;
    public listOfShape: Shape[] = [];

    /** COMPONENT */
    public lineBtn: HTMLElement | null = null;

    public constructor(
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        canvas: HTMLCanvasElement,
        document: Document
    ) {
        // this.gl = gl;
        this.canvas = canvas;
        this.document = document;

        this.colorBuffer = gl.createBuffer() as WebGLBuffer;
        this.positionBuffer = gl.createBuffer() as WebGLBuffer;

        this.renderProps = {
            gl,
            program,
            positionBuffer: this.positionBuffer,
            colorBuffer: this.colorBuffer,
        };
        this.initComponent();
        this.btnListener();
        this.canvasListener();
    }

    private initComponent() {
        this.lineBtn = this.document.getElementById("line");
    }

    private btnListener() {
        this.lineBtn?.addEventListener("click", () => {
            this.onDraw = false;
            this.selectShape = ShapeEnum.LINE;
            console.log(`onDraw: ${this.onDraw}, ${this.selectShape}`);
        });
    }

    private canvasListener() {
        this.canvas.addEventListener("mousedown", (event: MouseEvent) => {
            const point = new Vertex(
                [event.clientX, event.clientY, 0],
                [0, 0, 0, 0]
            );
            console.log(`coor: x: ${point.coor.x}, y: ${point.coor.y}`);
            switch (this.selectShape) {
                case ShapeEnum.LINE:
                    if (!this.onDraw) {
                        const line = new Line(this.listOfShape.length, point);
                        this.listOfShape.push(line);

                        this.onDraw = true;
                    } else {
                        const preLine = this.listOfShape[
                            this.listOfShape.length - 1
                        ] as Line;
                        preLine.setVertex(point, 2);
                        preLine.render(this.renderProps);

                        this.onDraw = false;
                    }
                    break;

                default:
                    break;
            }
        });

        this.canvas.addEventListener("mousemove", (event: MouseEvent) => {
            if (!this.onDraw) return;
            console.log("move");
            const point = new Vertex(
                [event.clientX, event.clientY, 0],
                [0, 0, 0, 0]
            );
            switch (this.selectShape) {
                case ShapeEnum.LINE:
                    const preLine = this.listOfShape[
                        this.listOfShape.length - 1
                    ] as Line;
                    preLine.setVertex(point, 2);
                    preLine.render(this.renderProps);
                    break;

                default:
                    break;
            }

            console.log(`object ${(this.listOfShape[0] as Line).p1}`);
        });
    }
}

export default DrawHandler;
