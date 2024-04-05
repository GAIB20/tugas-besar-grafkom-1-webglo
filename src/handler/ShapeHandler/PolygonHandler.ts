
import Shape from "../../object/shape/Shape";
import Polygon from "../../object/shape/Polygon";
import Vertex from "../../object/base/Vertex";
import ShapeEnum from "../../enum/ShapeEnum";
import _ from "lodash"

export default class PolygonHandler {

    private document: Document;
    private polygon: Polygon | null = null;
    public renderProps: RenderProps | null = null;
    public isAddPoint: boolean = false;
    public pivotPoint : Vertex | null = null;
    

    public constructor(document: Document){
        this.document = document;
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

                    this.renewPoints();
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
           
            this.renewPoints();
            
        }
    }

    public renewPoints(): void{
        let currentOpt = this.document.getElementById("points") as HTMLSelectElement;
        currentOpt.innerHTML = "";
            let currentPoints = this.polygon!.countRealVertex();
            for(let i = 0; i < currentPoints; i++){
                let opt = this.document.createElement("option");
                opt.value = i.toString();
                opt.innerHTML = (i < 10 ? "0" : "") + i.toString();
                currentOpt.appendChild(opt);
         }
    }

    public polygonMethodHTML(container : HTMLDivElement): void{
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
            let newVertex = _.cloneDeep(this.pivotPoint!);
            let pointsSelected = parseInt((this.document.getElementById("points") as HTMLSelectElement).value);
            this.polygon!.removeVertex(pointsSelected);
            newVertex.coor.x += parseInt(value);
            this.polygon!.addVertex(newVertex);
            this.polygon!.setPosition(this.renderProps!.gl);
            this.polygon!.setColor(this.renderProps!.gl);
            this.polygon!.render(this.renderProps!);
            this.renewPoints();
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

            let newVertex = _.cloneDeep(this.pivotPoint!);
            let pointsSelected = parseInt((this.document.getElementById("points") as HTMLSelectElement).value);
            this.polygon!.removeVertex(pointsSelected);
            newVertex.coor.y += parseInt(value);
            this.polygon!.addVertex(newVertex);
            this.polygon!.setPosition(this.renderProps!.gl);
            this.polygon!.setColor(this.renderProps!.gl);
            this.polygon!.render(this.renderProps!);
            this.renewPoints();
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


    public eventListener() : void{
        this.pivotPoint = _.cloneDeep(this.polygon!.getRealVertices()[0]);
        let pointOpt = this.document.getElementById("points") as HTMLSelectElement;
        pointOpt.addEventListener("change", (event: Event) => {
            let val = event.target as HTMLSelectElement;
            let value = parseInt(val.value);
            this.pivotPoint = _.cloneDeep(this.polygon!.getRealVertices()[value]);
            let sliderX = this.document.getElementById("sliderPointX") as HTMLInputElement;
            let sliderY = this.document.getElementById("sliderPointY") as HTMLInputElement;
            sliderX.value = "0";
            sliderY.value = "0";
            let sliderXValue = this.document.getElementById("SliderPointXLabel") as HTMLSpanElement;
            let sliderYValue = this.document.getElementById("SliderPointYLabel") as HTMLSpanElement;
            sliderXValue.innerHTML = "0";
            sliderYValue.innerHTML = "0";
        });
    }

}