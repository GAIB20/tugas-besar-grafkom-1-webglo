
import Shape from "../../object/shape/Shape";
import Square from "../../object/shape/Square";
import Vertex from "../../object/base/Vertex";
import ShapeEnum from "../../enum/ShapeEnum";
import Transform from "../../math/Transform";
import Matrix from "../../math/Matrix";
import _ from "lodash"

export default class SquareHandler{
    private document: Document;
    private square: Square | null = null;
    public renderProps: RenderProps | null = null;


    public constructor(document: Document){
        this.document = document;

    }

    public setSquare(square: Square): void{
        this.square = square;
    }

    public setRenderProps(renderProps: RenderProps): void{
        this.renderProps = renderProps;
    }

    public squareMethodHTML(container : HTMLDivElement): void{
        let sliderScaleLabel = this.document.createElement("label");
        sliderScaleLabel.innerHTML = "Slider Scale: ";
        let sliderScaleInput = this.document.createElement("input");
        sliderScaleInput.type = "range";
        sliderScaleInput.id = "sliderScale";
        sliderScaleInput.className = "slider-input";
        sliderScaleInput.value = "20";
        sliderScaleInput.min = "-100";
        sliderScaleInput.max = "100";

        let sliderScaleValue = this.document.createElement("span");
        sliderScaleValue.innerHTML = "1";
        sliderScaleValue.id = "SliderScaleLabel";
        let sliderScaleInputValue = this.document.createElement("span");
        sliderScaleInputValue.appendChild(sliderScaleInput);
        sliderScaleInputValue.appendChild(sliderScaleValue);

        container.appendChild(sliderScaleLabel);
        container.appendChild(sliderScaleInputValue);
    }
    
    public eventListener() : void{
        let sliderScaleInput = this.document.getElementById("sliderScale") as HTMLInputElement;
        sliderScaleInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = this.scaleValue(parseInt(target.value));
            let valueSpan = this.document.getElementById("SliderScaleLabel");
            if(valueSpan){
                valueSpan.innerHTML = value.toPrecision(2).toString();
            }
            this.handleScale(value);
        });
    }

    private handleScale(value: number): void{
        if(this.square){
            this.square.transform.scaleX(value);
            this.square.transform.scaleY(value);
        }
    }

    private scaleValue(value: number, scale: number = 1/5): number{
        return value * scale;
    }
}