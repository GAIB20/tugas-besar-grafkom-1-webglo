/** 
 * Implementation of toolshandler, including changing color, transform, etc.
*/
import Shape from "../object/shape/Shape";
import ShapeEnum from "../enum/ShapeEnum";
import { hexToRgb } from "../utils/algorithm";
import PolygonHandler from "./ShapeHandler/PolygonHandler";
import RectangleHandler from "./ShapeHandler/RectangleHandler";
import Polygon from "../object/shape/Polygon";
import Rectangle from "../object/shape/Rectangle";


export default class ToolsHandler{
    private enabled: boolean = false;
    private selectedShape : Shape | null = null;
    private document: Document;
    public polygonHandler: PolygonHandler;
    public rectangleHandler : RectangleHandler;

    public constructor(document: Document){
        this.enabled = false;
        this.document = document;
        this.polygonHandler = new PolygonHandler(this.document);
        this.rectangleHandler = new RectangleHandler(this.document);

    }

    public enable(): void{
        this.enabled = true;
    }

    public initHTML(): void{
        //add color picker

        let firstToolContainer = this.document.getElementById("first-tool");

        let title = this.document.createElement("h3");
        title.innerHTML = "Color: ";

        let colorPicker = this.document.createElement("input");
        colorPicker.type = "color";
        colorPicker.id = "colorpicker";
        colorPicker.className = "color-picker";
        colorPicker.value = "#000000";
        colorPicker.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            this.changeColor(value);
        });
        
        // add color picker into the first tool container
        firstToolContainer?.appendChild(title);
        firstToolContainer?.appendChild(colorPicker);
        this.specialMethodHTML()
        this.generalMethodHTML()
        this.eventListener();
        
    }

    public eventListener(): void{
        switch(this.selectedShape?.shape){
            case ShapeEnum.POLYGON:
                this.polygonHandler.eventListener();
                break;
            case ShapeEnum.RECTANGLE:
                this.rectangleHandler.eventListener();
            default:
                break;
        }
    }

    private generalMethodHTML(): void{
        /**
         * FOR TRANSLATION
         */
        let translateContainer = this.document.createElement("div");
        translateContainer.id = "translate-tools"
        translateContainer.className = "translate-tools";

        let translateXLabel = this.document.createElement("label");
        translateXLabel.innerHTML = "Translate X: ";
        let translateXInput = this.document.createElement("input");
        translateXInput.type = "range";
        translateXInput.id = "translateX";  
        translateXInput.className = "translate-input";
        translateXInput.value = "0";
        translateXInput.min = "-200";
        translateXInput.max = "200";
        translateXInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            let valueSpan = this.document.getElementById("translateXLabel");
            if(valueSpan){
                valueSpan.innerHTML = value;
            }
            this.translateX(parseInt(value));
        });
        let translateXValue = this.document.createElement("span");
        translateXValue.id = "translateXLabel";
        translateXValue.innerHTML = "0";
        
        let translateXInputValue = this.document.createElement("span");
        translateXInputValue.appendChild(translateXInput);
        translateXInputValue.appendChild(translateXValue);
        
        let translateYLabel = this.document.createElement("label");
        translateYLabel.innerHTML = "Translate Y: ";
        let translateYInput = this.document.createElement("input");
        translateYInput.type = "range";
        translateYInput.id = "translateY";
        translateYInput.className = "translate-input";
        translateYInput.value = "0";
        translateYInput.min = "-200";
        translateYInput.max = "200";
        translateYInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            let valueSpan = this.document.getElementById("translateYLabel");
            if(valueSpan){
                valueSpan.innerHTML = value;
            }
            this.translateY(parseInt(value));
        });
        let translateYValue = this.document.createElement("span");
        translateYValue.innerHTML = "0";
        translateYValue.id = "translateYLabel";
        let translateYInputValue = this.document.createElement("span");
        translateYInputValue.appendChild(translateYInput);
        translateYInputValue.appendChild(translateYValue);

        //append
        translateContainer.appendChild(translateXLabel);
        translateContainer.appendChild(translateXInputValue);
        translateContainer.appendChild(translateYLabel);
        translateContainer.appendChild(translateYInputValue);

        //search for the tools
        let tools = this.document.getElementById("tools");
        tools?.appendChild(translateContainer);

        /** FOR ROTATION */
        let rotationContainer = this.document.createElement("div");
        rotationContainer.id = "rotation-tool"
        rotationContainer.className = "rotation-tool";

        let rotateLabel = this.document.createElement("label");
        rotateLabel.innerHTML = "Rotate: ";
        let rotateInput = this.document.createElement("input");
        rotateInput.type = "range";
        rotateInput.id = "rotate";
        rotateInput.className = "rotate-input";
        rotateInput.value = "0";
        rotateInput.min = "-180";
        rotateInput.max = "180";
        rotateInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            let valueSpan = this.document.getElementById("rotateLabel");
            if(valueSpan){
                valueSpan.innerHTML = value;
            }
            this.rotate(parseInt(value));    
        });
        let rotateValue = this.document.createElement("span");
        rotateValue.innerHTML = "0";
        rotateValue.id = "rotateLabel";
        let rotateInputValue = this.document.createElement("span");
        rotateInputValue.appendChild(rotateInput);
        rotateInputValue.appendChild(rotateValue);

        //append
        rotationContainer.appendChild(rotateLabel);
        rotationContainer.appendChild(rotateInputValue);
        tools?.appendChild(rotationContainer);

        //points
        let pointsContainer = this.document.createElement("div");
        pointsContainer.id = "points-container";
        pointsContainer.className = "points-container";

        let pointsLabel = this.document.createElement("label");
        pointsLabel.innerHTML = "Points: ";
        let pointsInput = this.document.createElement("select");
        pointsInput.id = "points";
        pointsInput.className = "points-input";
        let num_of_points = this.selectedShape!.countRealVertex();
        for(let i = 0; i < num_of_points; i++){
            let option = this.document.createElement("option");
            option.value = i.toString();
            option.text = (i < 10 ? "0" : "") + i.toString();
            pointsInput.appendChild(option);
        }


        //add points to the container
        pointsContainer.appendChild(pointsLabel);
        pointsContainer.appendChild(pointsInput);

        tools?.appendChild(pointsContainer);

    }

    private specialMethodHTML(): void{
        let specialContainer = this.document.createElement("div");
        specialContainer.id = "special-tools";
        specialContainer.className = "special-tools";
        switch(this.selectedShape?.shape){
            case ShapeEnum.POLYGON:
                this.polygonHandler.setPolygon(this.selectedShape as Polygon)
                this.polygonHandler.polygonMethodHTML(specialContainer);
                break;
            case ShapeEnum.SQUARE:
                this.squareMethod(specialContainer);
                break;
            case ShapeEnum.LINE:
                this.lineMethod(specialContainer);
                break;
            case ShapeEnum.RECTANGLE:
                this.rectangleHandler.setRectangle(this.selectedShape as Rectangle)
                this.rectangleHandler.rectangleMethodHTML(specialContainer);
                break;
            default:
                break;
        }
        let tools = this.document.getElementById("tools");
        tools?.appendChild(specialContainer);
    }

    

    private squareMethod(container : HTMLDivElement): void{
        let sliderScaleLabel = this.document.createElement("label");
        sliderScaleLabel.innerHTML = "Slider Scale: ";
        let sliderScaleInput = this.document.createElement("input");
        sliderScaleInput.type = "range";
        sliderScaleInput.id = "sliderScale";
        sliderScaleInput.className = "slider-input";
        sliderScaleInput.value = "0";
        sliderScaleInput.min = "-100";
        sliderScaleInput.max = "100";
        sliderScaleInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            let valueSpan = this.document.getElementById("SliderScaleLabel");
            if(valueSpan){
                valueSpan.innerHTML = value;
            }
        });
        let sliderScaleValue = this.document.createElement("span");
        sliderScaleValue.innerHTML = "0";
        sliderScaleValue.id = "SliderScaleLabel";
        let sliderScaleInputValue = this.document.createElement("span");
        sliderScaleInputValue.appendChild(sliderScaleInput);
        sliderScaleInputValue.appendChild(sliderScaleValue);

        container.appendChild(sliderScaleLabel);
        container.appendChild(sliderScaleInputValue);
    }

    private lineMethod(container : HTMLDivElement): void{
        let sliderLengthScaleLabel = this.document.createElement("label");
        sliderLengthScaleLabel.innerHTML = "Slider Length: ";
        let sliderLengthScaleInput = this.document.createElement("input");
        sliderLengthScaleInput.type = "range";
        sliderLengthScaleInput.id = "sliderLengthScale";
        sliderLengthScaleInput.className = "slider-input";
        sliderLengthScaleInput.value = "0";
        sliderLengthScaleInput.min = "-100";
        sliderLengthScaleInput.max = "100";
        sliderLengthScaleInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            let valueSpan = this.document.getElementById("sliderLengthScaleLabel");
            if(valueSpan){
                valueSpan.innerHTML = value;
            }
        });
        let sliderLengthScaleValue = this.document.createElement("span");
        sliderLengthScaleValue.innerHTML = "0";
        sliderLengthScaleValue.id = "sliderLengthScaleLabel";
        let sliderLengthScaleInputValue = this.document.createElement("span");
        sliderLengthScaleInputValue.appendChild(sliderLengthScaleInput);
        sliderLengthScaleInputValue.appendChild(sliderLengthScaleValue);

        container.appendChild(sliderLengthScaleLabel);
        container.appendChild(sliderLengthScaleInputValue);
    }

    
    /**
     * Change shape when shape selector is changed
     * @param shape 
     */
    public setShape(shape: Shape): void{
        if(this.selectedShape !== null){
            this.selectedShape = shape;
            // delete rotation-tool, translate-tools, special-tools
            let tools = this.document.getElementById("tools");
            let rotationTool = this.document.getElementById("rotation-tool");
            let translateTools = this.document.getElementById("translate-tools");
            let specialTools = this.document.getElementById("special-tools");
            if(rotationTool){
                tools?.removeChild(rotationTool);
            }
            if(translateTools){
                tools?.removeChild(translateTools);
            }
            if(specialTools){
                tools?.removeChild(specialTools);
            }
            this.specialMethodHTML();
            this.generalMethodHTML(); 
        }
        else{
            this.selectedShape = shape;
        }
        
    }

    public validChange(): boolean{
        return this.selectedShape != null && this.enabled;
    }

    public changeColor(value: string): void{
        if(this.validChange()){
            this.selectedShape!.changeColor(hexToRgb(value));
        }
    }

    public translateX(value: number): void{
        if(this.validChange()){
            this.selectedShape!.transform.translateX(value);
        }
    }

    public translateY(value: number): void{
        if(this.validChange()){
            this.selectedShape!.transform.translateY(value);
        }
    }

    public rotate(value: number): void{
        if(this.validChange()){
            this.selectedShape!.transform.rotation(value);
        }
    }
}