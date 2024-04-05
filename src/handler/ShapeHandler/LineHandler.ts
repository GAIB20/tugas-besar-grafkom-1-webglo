
import Shape from "../../object/shape/Shape";
import Line from "../../object/shape/Line";
import Vertex from "../../object/base/Vertex";
import ShapeEnum from "../../enum/ShapeEnum";
import Transform from "../../math/Transform";
import Matrix from "../../math/Matrix";
import _ from "lodash"

export default class LineHandler{
    private document: Document;
    private line: Line | null = null;
    public renderProps: RenderProps | null = null;

    public constructor(document: Document){
        this.document = document;

    }

    public setLine(line: Line): void{
        this.line = line;
    }

    public setRenderProps(renderProps: RenderProps): void{
        this.renderProps = renderProps;
    }

    public lineMethodHTML(container : HTMLDivElement): void{

        let sliderPointXLabel = this.document.createElement("label");
        sliderPointXLabel.innerHTML = "Slider P-X: ";
        let sliderPointXInput = this.document.createElement("input");
        sliderPointXInput.type = "range";
        sliderPointXInput.id = "sliderPointX";
        sliderPointXInput.className = "slider-input";
        sliderPointXInput.value = "0";
        sliderPointXInput.min = "-100";
        sliderPointXInput.max = "100";
        sliderPointXInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            let valueSpan = this.document.getElementById("SliderPointXLabel");
            if(valueSpan){
                valueSpan.innerHTML = value;
            }
            let selectedPoint = parseInt((this.document.getElementById("points") as HTMLSelectElement).value);
            let newVertex;
            if (selectedPoint === 1) {
                newVertex = _.cloneDeep(this.line!.v1);
            } else if (selectedPoint === 2) {
                newVertex = _.cloneDeep(this.line!.v2!);
            }
            newVertex!.coor.x += parseInt(value);
            if (selectedPoint === 1) {
                this.line?.setVertex(newVertex!, 1);
            } else if (selectedPoint === 2) {
                this.line?.setVertex(newVertex!, 2);
            }
            this.line?.setPosition(this.renderProps!.gl);
            this.line?.setColor(this.renderProps!.gl);
            this.line?.render(this.renderProps!);
        });
        let sliderPointXValue = this.document.createElement("span");
        sliderPointXValue.innerHTML = "0";
        sliderPointXValue.id = "SliderPointXLabel";
        let sliderPointXInputValue = this.document.createElement("span");
        sliderPointXInputValue.appendChild(sliderPointXInput);
        sliderPointXInputValue.appendChild(sliderPointXValue);

        container.appendChild(sliderPointXLabel);
        container.appendChild(sliderPointXInputValue);

        let sliderPointYLabel = this.document.createElement("label");
        sliderPointYLabel.innerHTML = "Slider P-Y: ";
        let sliderPointYInput = this.document.createElement("input");
        sliderPointYInput.type = "range";
        sliderPointYInput.id = "sliderPointY";
        sliderPointYInput.className = "slider-input";
        sliderPointYInput.value = "0";
        sliderPointYInput.min = "-100";
        sliderPointYInput.max = "100";
        sliderPointYInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            let valueSpan = this.document.getElementById("SliderPointYLabel");
            if(valueSpan){
                valueSpan.innerHTML = value;
            }
            let selectedPoint = parseInt((this.document.getElementById("points") as HTMLSelectElement).value);
            let newVertex;
            if (selectedPoint === 1) {
                newVertex = _.cloneDeep(this.line!.v1);
            } else if (selectedPoint === 2) {
                newVertex = _.cloneDeep(this.line!.v2!);
            }
            newVertex!.coor.y += parseInt(value);
            if (selectedPoint === 1) {
                this.line?.setVertex(newVertex!, 1);
            } else if (selectedPoint === 2) {
                this.line?.setVertex(newVertex!, 2);
            }
            this.line?.setPosition(this.renderProps!.gl);
            this.line?.setColor(this.renderProps!.gl);
            this.line?.render(this.renderProps!);
        });
        let sliderPointYValue = this.document.createElement("span");
        sliderPointYValue.innerHTML = "0";
        sliderPointYValue.id = "SliderPointYLabel";
        let sliderPointYInputValue = this.document.createElement("span");
        sliderPointYInputValue.appendChild(sliderPointYInput);
        sliderPointYInputValue.appendChild(sliderPointYValue);

        container.appendChild(sliderPointYLabel);
        container.appendChild(sliderPointYInputValue);

  
    }
    
}