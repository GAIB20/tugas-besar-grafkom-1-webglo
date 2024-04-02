import ShapeEnum from "../../enum/ShapeEnum";
import Vertex from "../base/Vertex";
import Point from "../base/Vertex";
import Shape from "./Shape";
import _ from 'lodash';

class Polygon extends Shape{
    readonly shape: ShapeEnum = ShapeEnum.LINE;
    public points: Point[];

    public constructor(id: number, points: Point[] = []) {
        super(id);

        this.points = points;
    }

    public setPosition(gl: WebGLRenderingContext): void {
        var points = this.points.map((point) => point.coorArray()).flat();

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(points),
            gl.STATIC_DRAW
        );
    }

    public setColor(gl: WebGLRenderingContext): void {
        const colors = this.points.map((point) => point.colorArray()).flat();
        gl.ARRAY_BUFFER,
            new Float32Array(colors),
            gl.STATIC_DRAW;
    }

    public isNullVertex(): boolean {
        return this.points.length > 0;
    }

    public getGLType(gl: WebGLRenderingContext): number {
        return gl.TRIANGLES;
    }

    public setVertex(vertex: Vertex, index: number): void {
        if(this.points.length < index){
            this.addVertex(vertex);
        }
        else{
            this.points[index - 1] = vertex;
        }
    }

    public addVertex(vertex: Vertex): void {
        if(this.points.length >= 3){
            // there is 3 triangles, perform convex hull algorithm
            //do the triple push
            const p2 =  _.cloneDeep(this.points[this.points.length - 1])
            const p1 = _.cloneDeep(this.points[this.points.length - 2]);
            this.points.push(p2)
            this.points.push(p1)
        }
        this.points.push(vertex);
        console.log(this.points);
        
    }

    public countVertex(): number {
        return this.points.length;
    }

    public centroid(): [number, number] {
        let x = 0;
        let y = 0;
        this.points.forEach((point) => {
            x += point.coor.x;
            y += point.coor.y;
        });

        return [x / this.points.length, y / this.points.length];
    }
}

export default Polygon;