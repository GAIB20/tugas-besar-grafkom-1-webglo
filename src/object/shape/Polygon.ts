import ShapeEnum from "../../enum/ShapeEnum";
import Vertex from "../base/Vertex";
import Point from "../base/Vertex";
import Shape from "./Shape";
import _ from 'lodash';
import Vector2D from "../../math/Vector2D";
import { arctan } from "../base/Coordinate";
import { quickSort } from "../../utils/algorithm";

class Polygon extends Shape{
    readonly shape: ShapeEnum = ShapeEnum.POLYGON;
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
       gl.bufferData( gl.ARRAY_BUFFER,
        new Float32Array(colors),
        gl.STATIC_DRAW);
    }

    public changeColor(color: [number, number, number, number]): void {
        const [r, g, b, a] = color;
        this.points.forEach((point) => {
            point.color = { r, g, b, a };
        });
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
            // perform convex hull
            let currentPoints : Vertex[] = this.getRealVertices();
            currentPoints.push(vertex);
            this.convexHull(currentPoints);
        }
        else{
            this.points.push(vertex);
            
        }
        
    }

    public removeVertex(index: number): void {
        let realVertices = this.getRealVertices();
        // delete the realVertices[index]
        if(this.countRealVertex() > 3){
            realVertices.splice(index, 1);
            this.convexHull(realVertices);
        }
        else{
            this.points = [];
        }
    }

    public countVertex(): number {
        return this.points.length;
    }

    public countRealVertex(): number {
        return (this.points.length < 3) ? 0 : 2 + this.points.length/3;
    }

    public getRealVertices(): Vertex[] {
        let currentPoints : Vertex[] = [];
        for(let i = 0; i < this.points.length; i++){

            //evaluate by "if" condition because points buffer is triangle (multiple of 3)
            if(i < 3 || (i >=3 && i % 3 == 2)){
                currentPoints.push(_.cloneDeep(this.points[i]));
            }
        }
        return currentPoints;
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

    /**
     * Update this.points by adding the new vertex
     */
    public convexHull(vertices: Vertex[]): void{

        /**
         * Preprocess the points to get the current points
         */
        
   
        this.polygonYQuickSort(vertices);




        const reference = vertices[0];
        //first sort, vertices[0] is the reference, the rest is sorted based on the angle
        this.polygonAngleQuickSort(vertices, reference);

        /**
         * Do the convex hull algorithm here, output : the convex hull of the current points
         */

        let S = [];
        S.push(vertices[0]);
        S.push(vertices[1]);
        S.push(vertices[2]);
        for(let i = 3; i < vertices.length; i++){
            while(S.length >= 2){
                const p1 = S[S.length-2];
                const p2 = S[S.length-1];
                const p3 = vertices[i];
                const vec1 = new Vector2D(p1.coor, p2.coor);
                const vec2 = new Vector2D(p2.coor, p3.coor);
                const cross = vec1.cross(vec2);
                if(cross < 0){
                    S.pop();
                }
                else{
                    break;
                }
            }
            S.push(vertices[i]);
        }

        // clear the points
        this.points = [];
        // push the convex hull to the points, triangle by triangle
        for(let i = 0; i < S.length-2; i++){
            this.points.push(S[0]);
            this.points.push(S[i+1])
            this.points.push(S[i+2])
        }
    }

    /**
     * Implementation for sorting the points based on their y-coordinate (from smallest to largest)
     * @param points 
     * @returns 
     */
    public polygonYQuickSort(points: Vertex[]): void {
        const yPredicate = (a: Vertex) => {
            return a.coor.y;
        }

        quickSort(points, yPredicate);
    }

    public polygonAngleQuickSort(points: Vertex[], reference : Vertex): void{
        const anglePredicate = (a: Vertex) => {
            return arctan(a.coor, reference.coor);
        }

        quickSort(points, anglePredicate);
     
    }


}

export default Polygon;