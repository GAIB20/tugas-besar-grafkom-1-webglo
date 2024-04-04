/** 
 * Implementation of toolshandler, including changing color, transform, etc.
*/
import Shape from "../object/shape/Shape";


export default class ToolsHandler{
    private enabled: boolean = false;
    private selectedShape : Shape | null = null;
    private document: Document = document;

    public constructor(){
        this.enabled = false;
    }

    public enable(): void{
        this.enabled = true;
    }

    public init(): void{
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

        /**
         * FOR TRANSLATION
         */
        let secondToolContainer = this.document.createElement("div");
        secondToolContainer.id = "second-tool"
        secondToolContainer.className = "second-tools";

        let translateXLabel = this.document.createElement("label");
        translateXLabel.innerHTML = "Translate X: ";
        let translateXInput = this.document.createElement("input");
        translateXInput.type = "range";
        translateXInput.id = "translateX";  
        translateXInput.className = "translate-input";
        translateXInput.value = "0";
        translateXInput.min = "-100";
        translateXInput.max = "100";
        translateXInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            let valueSpan = this.document.getElementById("translateXLabel");
            if(valueSpan){
                valueSpan.innerHTML = value;
            }
        });
        let translateXValue = this.document.createElement("span");
        translateXValue.id = "translateXLabel";
        translateXValue.innerHTML = "0";
        
        let translateYLabel = this.document.createElement("label");
        translateYLabel.innerHTML = "Translate Y: ";
        let translateYInput = this.document.createElement("input");
        translateYInput.type = "range";
        translateYInput.id = "translateY";
        translateYInput.className = "translate-input";
        translateYInput.value = "0";
        translateYInput.min = "-100";
        translateYInput.max = "100";
        translateYInput.addEventListener("input", (event: Event) => {
            let target = event.target as HTMLInputElement;
            let value = target.value;
            let valueSpan = this.document.getElementById("translateYLabel");
            if(valueSpan){
                valueSpan.innerHTML = value;
            }
        });
        let translateYValue = this.document.createElement("span");
        translateYValue.innerHTML = "0";
        translateYValue.id = "translateYLabel";

        //append
        secondToolContainer.appendChild(translateXLabel);
        secondToolContainer.appendChild(translateXInput);
        secondToolContainer.appendChild(translateXValue);
        secondToolContainer.appendChild(translateYLabel);
        secondToolContainer.appendChild(translateYInput);
        secondToolContainer.appendChild(translateYValue);

        //search for the tools
        let tools = this.document.getElementById("tools");
        tools?.appendChild(secondToolContainer);

        /** FOR ROTATION */
        let thirdToolContainer = this.document.createElement("div");
        thirdToolContainer.id = "third-tool"
        thirdToolContainer.className = "third-tools";

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
        });
        let rotateValue = this.document.createElement("span");
        rotateValue.innerHTML = "0";
        rotateValue.id = "rotateLabel";

        //append
        thirdToolContainer.appendChild(rotateLabel);
        thirdToolContainer.appendChild(rotateInput);
        thirdToolContainer.appendChild(rotateValue);
        tools?.appendChild(thirdToolContainer);
    }

    public setShape(shape: Shape): void{
        this.selectedShape = shape;
    }

    public validChange(): boolean{
        return this.selectedShape != null && this.enabled;
    }

    public changeColor(value: string): void{
        if(this.validChange()){
            let colorPicker = this.document.getElementById("colorpicker") as HTMLInputElement;
          
        }
    }
}