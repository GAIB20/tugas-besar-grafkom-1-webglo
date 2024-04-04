
import Shape from "../../object/shape/Shape";
import Polygon from "../../object/shape/Polygon";
import Vertex from "../../object/base/Vertex";
import ShapeEnum from "../../enum/ShapeEnum";

export default class PolygonHandler {

    private document: Document = document;
    private polygon: Polygon | null = null;
    public renderProps: RenderProps | null = null;
    public isAddPoint: boolean = false;
    

    public constructor(){
        this.HandleAddPoint();
    }

    public setPolygon(polygon: Polygon): void{
        this.polygon = polygon;
    }

    public setRenderProps(renderProps: RenderProps): void{
        this.renderProps = renderProps;
    } 

    public HandleAddPoint(): void{
        
            let canvas = this.document.getElementById("gl-canvas") as HTMLCanvasElement;
            canvas.addEventListener("click", (event: MouseEvent) => {
                if(this.isAddPoint){
                    const point = new Vertex(
                        [event.clientX, event.clientY, 0],
                        [0, 0, 0, 1]
                    );
                    this.polygon!.addVertex(point);
                    this.polygon!.setPosition(this.renderProps!.gl);
                    this.polygon!.setColor(this.renderProps!.gl);
                    this.polygon!.render(this.renderProps!);
                }
            });
        
    }

    public HandleDeletePoint(): void{
        let currentOpt = this.document.getElementById("points") as HTMLSelectElement;
        if(currentOpt){
            let currentOptValue = parseInt(currentOpt.value);
            this.polygon!.removeVertex(currentOptValue);
            this.polygon!.setPosition(this.renderProps!.gl);
            this.polygon!.setColor(this.renderProps!.gl);
            this.polygon!.render(this.renderProps!);
           
            // reevaluate option
            currentOpt.innerHTML = "";
            let currentPoints = this.polygon!.countRealVertex();
            for(let i = 0; i < currentPoints; i++){
                let opt = this.document.createElement("option");
                opt.value = i.toString();
                opt.innerHTML = (i < 10 ? "0" : "") + i.toString();
                currentOpt.appendChild(opt);
            }
            
        }
    }

    public polygonMethod(container : HTMLDivElement): void{
        container.className = "polygon-tools";
        let div1 = this.document.createElement("div");
        div1.className = "div-tools";

        // create add and remove button
        let addButton = this.document.createElement("button");
        addButton.innerHTML = "Add Point";
        addButton.className = "add-point-button";
        addButton.addEventListener("click", (event: Event) => {

            //change button color
            let target = event.target as HTMLButtonElement;
            if(!this.isAddPoint){
                target.style.backgroundColor = "green";            
            }
            else{
                target.style.backgroundColor = "greenyellow";
            }
            this.isAddPoint = !this.isAddPoint;
        });

        let removeButton = this.document.createElement("button");
        removeButton.innerHTML = "Remove Point";
        removeButton.className = "remove-point-button";
        removeButton.addEventListener("click", (event: Event) => {
            this.HandleDeletePoint();
        });

        div1.appendChild(addButton);
        div1.appendChild(removeButton);

        let div2 = this.document.createElement("div");
        div2.className = "div-tools";

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
        });
        let sliderPointXValue = this.document.createElement("span");
        sliderPointXValue.innerHTML = "0";
        sliderPointXValue.id = "SliderPointXLabel";
        let sliderPointXInputValue = this.document.createElement("span");
        sliderPointXInputValue.appendChild(sliderPointXInput);
        sliderPointXInputValue.appendChild(sliderPointXValue);

        div2.appendChild(sliderPointXLabel);
        div2.appendChild(sliderPointXInputValue);

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
        });
        let sliderPointYValue = this.document.createElement("span");
        sliderPointYValue.innerHTML = "0";
        sliderPointYValue.id = "SliderPointYLabel";
        let sliderPointYInputValue = this.document.createElement("span");
        sliderPointYInputValue.appendChild(sliderPointYInput);
        sliderPointYInputValue.appendChild(sliderPointYValue);

        div2.appendChild(sliderPointYLabel);
        div2.appendChild(sliderPointYInputValue);

        container.appendChild(div1);
        container.appendChild(div2);
        
    }

}