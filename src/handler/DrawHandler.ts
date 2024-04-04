import ShapeEnum, {shapeToString} from "../enum/ShapeEnum";
import Vertex from "../object/base/Vertex";
import Line from "../object/shape/Line";
import Polygon from "../object/shape/Polygon";
import Square from "../object/shape/Square";
import Shape from "../object/shape/Shape";
import ToolsHandler from "./ToolsHandler";

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
    public selectedIdxShape : number = -1;
    // for polygon
    public polyCounter = 0; 
    public polyDrawTimeout: NodeJS.Timeout | null = null;

    /** COMPONENT */
    public lineBtn: HTMLElement | null = null;
    public squareBtn: HTMLElement | null = null;
    public polygonBtn: HTMLElement | null = null;
    public toolsHandler: ToolsHandler;

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
        this.toolsHandler = new ToolsHandler();

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
        this.polygonBtn = this.document.getElementById("polygon");
        this.squareBtn = this.document.getElementById("square");
        this.initTools()
    }

    private initTools(){
        let tools = this.document.getElementById("tools");
        let firstToolContainer = this.document.createElement("div");
        firstToolContainer.id = "first-tool";
        firstToolContainer.className = "first-tools";
        let shapeListLabel = this.document.createElement("h3");
        shapeListLabel.innerHTML = "List of Shapes:";
        let shapeList = this.document.createElement("select");
        shapeList.id = "shapelist";
        shapeList.className = "shape-list"

        // add event listener to shape list, console log the first option
        shapeList.addEventListener("change", (event: Event) => {
            let target = event.target as HTMLSelectElement;
            this.selectedIdxShape = parseInt(target.value);
            this.toolsHandler.setShape(this.listOfShape[this.selectedIdxShape]);
        });
        
        firstToolContainer.appendChild(shapeListLabel);
        firstToolContainer.appendChild(shapeList);
        tools?.appendChild(firstToolContainer);
    }

    private updateShapeList(){
        let shapeList = this.document.getElementById("shapelist");
        if(shapeList){
            if(shapeList.innerHTML===""){
                this.whenDrawFirstTime()
            }
            shapeList.innerHTML = "";
            for(let i = 0; i < this.listOfShape.length; i++){
                let shape = this.listOfShape[i];
                let option = this.document.createElement("option");
                option.value = i.toString();
                option.text = shapeToString(shape.shape) + "_" + (i < 10 ? "0" : "") + i.toString();
                shapeList.appendChild(option);
            }
        }
    }

    private whenDrawFirstTime(){
        this.selectedIdxShape = 0;
        this.toolsHandler.enable();
        this.toolsHandler.init();
        this.toolsHandler.setShape(this.listOfShape[0]);

    }

    private btnListener() {
        this.lineBtn?.addEventListener("click", () => {
            this.onDraw = false;
            this.selectShape = ShapeEnum.LINE;
        });
        this.polygonBtn?.addEventListener("click", () => {
            this.onDraw = false;
            this.selectShape = ShapeEnum.POLYGON;
        });
        this.squareBtn?.addEventListener("click", () => {
            this.onDraw = false;
            this.selectShape = ShapeEnum.SQUARE;
        });
    }

    private canvasListener() {
        this.canvas.addEventListener("mousedown", (event: MouseEvent) => {
            const point = new Vertex(
                [event.clientX, event.clientY, 0],
                [0, 0, 0, 1]
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
                        this.updateShapeList()
                    }
                    break;
                case ShapeEnum.POLYGON:
                    if (!this.onDraw) {
                        const poly = new Polygon(this.listOfShape.length);
                        
                        poly.addVertex(point);
                        this.listOfShape.push(poly);
                        ++this.polyCounter;
                        this.onDraw = true;
                    } else {
                        const prePoly = this.listOfShape[
                            this.listOfShape.length - 1
                        ] as Polygon;
                        prePoly.addVertex(point);
                        ++this.polyCounter;
                        if(this.polyCounter > 2){
                            console.log(prePoly.points)
                            prePoly.setPosition(this.renderProps.gl);
                            prePoly.setColor(this.renderProps.gl);
                            prePoly.render(this.renderProps);
                            this.polyDrawTimeout = setTimeout(() => {
                                this.onDraw = false;
                                this.polyCounter = 0;
                                this.updateShapeList()
                            }, 500);
                        } 
                    }
                    break;
                case ShapeEnum.SQUARE:
                    if(!this.onDraw){
                        const square = new Square(this.listOfShape.length, point);
                        this.listOfShape.push(square);
                        this.onDraw = true;
                    }
                    else{
                        const preSquare = this.listOfShape[
                            this.listOfShape.length - 1
                        ] as Square;
                        preSquare.setVertex(point, 0);
                        preSquare.setPosition(this.renderProps.gl);
                        preSquare.render(this.renderProps);
                        this.onDraw = false;
                        this.updateShapeList()
                    }
                    break;

                default:
                    break;
            }
        });

        this.canvas.addEventListener("mouseup", (event: MouseEvent) => {
            switch (this.selectShape) {
                case ShapeEnum.LINE:
                    break;
                case ShapeEnum.POLYGON:
                    if(this.onDraw && this.polyCounter > 2){
                        clearTimeout(this.polyDrawTimeout as NodeJS.Timeout);
                    }
                    break;
                case ShapeEnum.SQUARE:
                    break;
                default:
                    break;
            }
        });


        this.canvas.addEventListener("mousemove", (event: MouseEvent) => {
            if (!this.onDraw) return;
            const point = new Vertex(
                [event.clientX, event.clientY, 0],
                [0, 0, 0, 1]
            );
            switch (this.selectShape) {
                case ShapeEnum.LINE:
                    const preLine = this.listOfShape[
                        this.listOfShape.length - 1
                    ] as Line;
                    preLine.setVertex(point, 2);
                    preLine.render(this.renderProps);
                    break;
                
                case ShapeEnum.POLYGON:
                    break;
                case ShapeEnum.SQUARE:
                    const preSquare = this.listOfShape[
                        this.listOfShape.length - 1
                    ] as Square;
                    preSquare.setVertex(point, 0);
                    preSquare.setPosition(this.renderProps.gl);
                    preSquare.render(this.renderProps);
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
