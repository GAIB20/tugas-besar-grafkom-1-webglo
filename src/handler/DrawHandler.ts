import ShapeEnum from "../enum/ShapeEnum";
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
    public listOfShape: Shape[];

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
        this.listOfShape = [];
        this.colorBuffer = gl.createBuffer() as WebGLBuffer;
        this.positionBuffer = gl.createBuffer() as WebGLBuffer;

        this.renderProps = {
            gl,
            program,
            positionBuffer: this.positionBuffer,
            colorBuffer: this.colorBuffer,
        };

        this.document.addEventListener("DOMContentLoaded", this.rerender);
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
        });
    }

    private canvasListener() {
        this.canvas.addEventListener("mousedown", (event: MouseEvent) => {
            const point = new Vertex(
                [event.clientX, event.clientY, 0],
                [0, 0, 0, 0]
            );
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
        });
    }

    public rerender = (): void => {
        for (let i = 0; i < this.listOfShape.length; i++) {
            this.listOfShape[i].render(this.renderProps);
        }

        window.requestAnimationFrame(this.rerender);
    };
}

export default DrawHandler;