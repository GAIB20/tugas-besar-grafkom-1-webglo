import ShapeEnum from "../../enum/ShapeEnum";
import Vertex from "../base/Vertex";
import Point from "../base/Vertex";
import Shape from "./Shape";
import _ from 'lodash';
import Transform from "../../math/Transform";
import VertexOperation from "../../math/VertexOperation";

// import { arctan } from "../base/Coordinate";
// import { quickSort } from "../../utils/algorithm";

class Square extends Shape{
    readonly shape: ShapeEnum = ShapeEnum.LINE;
    public the_centroid: Point;
    public p0 : Point | null;
    public p1 : Point | null;
    public p2 : Point | null;
    public p3 : Point | null;
    private tf1: Transform;
    private tf3: Transform;
    

    public constructor(id: number, cent : Point) {
        super(id);

        this.the_centroid = cent;
        this.p0 = null;
        this.p1 = null;
        this.p2 = null;
        this.p3 = null;

        //set for point 1 and 3
        this.tf1 = new Transform();
        this.tf1.rotation(90);
        this.tf3 = new Transform();
        this.tf3.rotation(-90);
    }

    public setPosition(gl: WebGLRenderingContext): void {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                ...this.p0?.coorArray() as [number, number],
                ...this.p1?.coorArray() as [number, number],
                ...this.p2?.coorArray() as [number, number],
                ...this.p0?.coorArray() as [number, number],
                ...this.p2?.coorArray() as [number, number],
                ...this.p3?.coorArray() as [number, number]
            ]),
            gl.STATIC_DRAW
        );
    }

    public setColor(gl: WebGLRenderingContext): void {
        
        gl.ARRAY_BUFFER,
            new Float32Array([
                ...this.p0?.colorArray() as [number, number, number, number],
                ...this.p1?.colorArray() as [number, number, number, number],
                ...this.p2?.colorArray() as [number, number, number, number],
                ...this.p0?.colorArray() as [number, number, number, number],
                ...this.p2?.colorArray() as [number, number, number, number],
                ...this.p3?.colorArray() as [number, number, number, number]
            ]),
            gl.STATIC_DRAW;
    }

    public isNullVertex(): boolean {
        return this.p0 != null && this.p1 != null && this.p2 != null && this.p3 != null;
    }
    
    public setAllNullVertex(): void {
        this.p0 = null;
        this.p1 = null;
        this.p2 = null;
        this.p3 = null;
    }

    public getGLType(gl: WebGLRenderingContext): number {
        return gl.TRIANGLES
    }

    /**
     * Applied when "mousemove" on canvas
     * @param vertex - new P0
     * @param index - new P1
     */
    public setVertex(vertex: Vertex, index: number): void {
        if(index == 0){
            this.p0 = vertex;
            
            // set base vector, centroid - p0
            let v2 = VertexOperation.minusP(this.the_centroid, this.p0);
            // rotate base vector 90 degree and -90 degree
            let v1 = VertexOperation.transform(v2, this.tf1.rotationMat());
            let v3 = VertexOperation.transform(v2, this.tf3.rotationMat());
        

            //set p1, p2, p3
            this.p1 = VertexOperation.addP(this.the_centroid, v1);
            this.p2 = VertexOperation.addP(this.the_centroid, v2);
            this.p3 = VertexOperation.addP(this.the_centroid, v3);
        }
    }


    public countVertex(): number {
        return 6;
    }

    public centroid(): [number, number] {
        return [this.the_centroid.coor.x, this.the_centroid.coor.y];
    }

    /**
     * Update this.points by adding the new vertex
     */
    

}

export default Square;