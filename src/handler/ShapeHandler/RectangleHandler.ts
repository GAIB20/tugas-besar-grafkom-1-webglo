
import Shape from "../../object/shape/Shape";
import Rectangle from "../../object/shape/Rectangle";
import Vertex from "../../object/base/Vertex";
import ShapeEnum from "../../enum/ShapeEnum";
import Transform from "../../math/Transform";
import Matrix from "../../math/Matrix";
import _ from "lodash"

export default class RectangleHandler{
    private document: Document;
    private rectangle: Rectangle | null = null;
    public renderProps: RenderProps | null = null;
    public pivotPointWidth : Vertex | null = null;
    public pivotPointHeight : Vertex | null = null;
    public scaleWidth : Matrix;
    public scaleHeight : Matrix;
    

    public constructor(document: Document){
        this.document = document;
        this.scaleWidth = Matrix.identity();
        this.scaleHeight = Matrix.identity();
    }

    public setRectangle(rect: Rectangle): void{
        this.rectangle = rect;
    }

    public setRenderProps(renderProps: RenderProps): void{
        this.renderProps = renderProps;
    } 

    public rectangleMethodHTML(container : HTMLDivElement): void{
        let sliderWidthLabel = this.document.createElement("label");
        sliderWidthLabel.innerHTML = "Width Scale: ";
        let sliderWidthInput = this.document.createElement("input");
        sliderWidthInput.type = "range";
        sliderWidthInput.id = "sliderWidth";
        sliderWidthInput.className = "slider-input";
        sliderWidthInput.value = "10";
        sliderWidthInput.min = "-100";
        sliderWidthInput.max = "100";
        sliderWidthInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = this.normalizeInputValue(parseInt(target.value));
            let valueSpan = this.document.getElementById("sliderWidthLabel");
            if(valueSpan){
                //2 precision
                valueSpan.innerHTML = value.toFixed(2).toString();
            }
            this.handleScaleWidth(value);
        });
        let sliderWidthValue = this.document.createElement("span");
        sliderWidthValue.innerHTML = "1";
        sliderWidthValue.id = "sliderWidthLabel";
        let sliderWidthInputValue = this.document.createElement("span");
        sliderWidthInputValue.appendChild(sliderWidthInput);
        sliderWidthInputValue.appendChild(sliderWidthValue);

        container.appendChild(sliderWidthLabel);
        container.appendChild(sliderWidthInputValue);

        let sliderHeightLabel = this.document.createElement("label");
        sliderHeightLabel.innerHTML = "Height Scale: ";
        let sliderHeightInput = this.document.createElement("input");
        sliderHeightInput.type = "range";
        sliderHeightInput.id = "sliderHeight";
        sliderHeightInput.className = "slider-input";
        sliderHeightInput.value = "10";
        sliderHeightInput.min = "-100";
        sliderHeightInput.max = "100";
        sliderHeightInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = this.normalizeInputValue(parseInt(target.value));
            let valueSpan = this.document.getElementById("SliderHeightLabel");
            if(valueSpan){
                valueSpan.innerHTML = value.toFixed(2).toString();
            }
            this.handleScaleHeight(value);
        });
        let sliderHeightValue = this.document.createElement("span");
        sliderHeightValue.innerHTML = "1";
        sliderHeightValue.id = "SliderHeightLabel";
        let sliderHeightInputValue = this.document.createElement("span");
        sliderHeightInputValue.appendChild(sliderHeightInput);
        sliderHeightInputValue.appendChild(sliderHeightValue);

        container.appendChild(sliderHeightLabel);
        container.appendChild(sliderHeightInputValue);

    }

    private normalizeInputValue(value: number, scale : number = 1/10): number{
        return value * scale;
    }

    public eventListener(){
        // initial
        this.setupNewPoint();

        //listener
        let pointOpt = this.document.getElementById("points") as HTMLSelectElement;
        pointOpt.addEventListener("change", (event: Event) => {
            this.setupNewPoint();
        });

    }

    private setupNewPoint(): void{
        let pointsSelected = parseInt((this.document.getElementById("points") as HTMLSelectElement).value);
        this.pivotPointWidth = _.cloneDeep(this.rectangle!.getSameXPoint(pointsSelected));
        this.pivotPointHeight = _.cloneDeep(this.rectangle!.getSameYPoint(pointsSelected));
        this.scaleWidth = Matrix.identity();
        this.scaleHeight = Matrix.identity();
    }

    public handleScaleWidth(value: number): void{
        let m0 = this.rectangle?.transform.inputTransMat(this.pivotPointWidth!.coor.x, this.pivotPointWidth!.coor.y);
        let m1 = this.rectangle?.transform.inputScaleMat(value, 1);
        let m2 = this.rectangle?.transform.inputTransMat(-this.pivotPointWidth!.coor.x, -this.pivotPointWidth!.coor.y);
        this.scaleWidth = m0!.multiply(m1!)
        this.scaleWidth = this.scaleWidth.multiply(m2!);
        this.rectangle!.transform.setCustomMatrix(this.scaleHeight.multiply(this.scaleWidth));
    }

    public handleScaleHeight(value: number): void{
        let m0 = this.rectangle?.transform.inputTransMat(this.pivotPointHeight!.coor.x, this.pivotPointHeight!.coor.y);
        let m1 = this.rectangle?.transform.inputScaleMat(1, value);
        let m2 = this.rectangle?.transform.inputTransMat(-this.pivotPointHeight!.coor.x, -this.pivotPointHeight!.coor.y);
        this.scaleHeight = m0!.multiply(m1!)
        this.scaleHeight = this.scaleHeight.multiply(m2!);
        this.rectangle!.transform.setCustomMatrix(this.scaleHeight.multiply(this.scaleWidth));
    }


}