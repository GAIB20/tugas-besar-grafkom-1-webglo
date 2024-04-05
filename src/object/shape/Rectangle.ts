/**
 *
 * @todo Buat class Rectangle Extend dari Shape, masukin semua point nya
 *
 */

import ShapeEnum from "../../enum/ShapeEnum";
import Shape from "./Shape";
import Point from "../base/Vertex";
import Vertex from "../base/Vertex";

class Rectangle extends Shape {
    readonly shape: ShapeEnum = ShapeEnum.RECTANGLE;
    public p0: Point | null;
    public p1: Point | null;
    public p2: Point | null;
    public p3: Point | null;

    public constructor(id: number, initialPoint: Point) {
        super(id);

        this.p0 = initialPoint;
        this.p1 = null;
        this.p2 = null;
        this.p3 = null;
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

    public setVertex(vertex: Vertex, index: number): void {
        if (index === 2) {
            this.p2 = vertex;

            this.p1 = new Vertex([this.p2.coor.x, this.p0!.coor.y, 0], [0, 0, 0, 1]);
            this.p3 = new Vertex([this.p0!.coor.x, this.p2.coor.y, 0], [0, 0, 0, 1]);

        }
    }


    public setColor(gl: WebGLRenderingContext): void {
        const colors = new Float32Array([
            ...this.p0?.colorArray() as [number, number, number, number],
            ...this.p1?.colorArray() as [number, number, number, number],
            ...this.p2?.colorArray() as [number, number, number, number],
            ...this.p0?.colorArray() as [number, number, number, number],
            ...this.p2?.colorArray() as [number, number, number, number],
            ...this.p3?.colorArray() as [number, number, number, number]
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
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

    public countVertex(): number {
        return 6;
    }

    public countRealVertex(): number {
        return 4;
    }

    public getPoint(num : number) : Point{
        switch(num){
            case 0:
                return this.p0!;
            case 1:
                return this.p1!;
            case 2:
                return this.p2!;
            case 3:
                return this.p3!;
            default:
                return this.p0!;
        }
    }

    public getSameXPoint(num : number) : Point{
        let arr = [this.p0!, this.p1!, this.p2!, this.p3!];
        for(let i = 0; i < arr.length; i++){
                if(this.getPoint(num).coor.x === arr[i].coor.x && this.getPoint(num).coor.y !== arr[i].coor.y){
                    return arr[i];
                }
            
        }
        return this.p0!;
    }

    public getSameYPoint(num : number) : Point{
        let arr = [this.p0!, this.p1!, this.p2!, this.p3!];
        for(let i = 0; i < arr.length; i++){
                if(this.getPoint(num).coor.y === arr[i].coor.y && this.getPoint(num).coor.x !== arr[i].coor.x){
                    return arr[i];
                }
            
        }
        return this.p0!;
    }

    public centroid(): [number, number] {
        if (this.p0 && this.p2) {
            const centroidX = (this.p0.coor.x + this.p2.coor.x) / 2;
            const centroidY = (this.p0.coor.y + this.p2.coor.y) / 2;
            return [centroidX, centroidY];
        } else {
            return [0, 0];
        }
    }

    public changeColor(color: [number, number, number, number]): void {
        if (this.p0 != null) {
            this.p0.color = { r: color[0], g: color[1], b: color[2], a: color[3] };
        }
        if (this.p1 != null) {
            this.p1.color = { r: color[0], g: color[1], b: color[2], a: color[3] };
        }
        if (this.p2 != null) {
            this.p2.color = { r: color[0], g: color[1], b: color[2], a: color[3] };
        }
        if (this.p3 != null) {
            this.p3.color = { r: color[0], g: color[1], b: color[2], a: color[3] };
        }
    }

}

export default Rectangle;
