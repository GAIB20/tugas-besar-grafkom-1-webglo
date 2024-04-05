import Matrix from "./Matrix";

class Transform {
    private translate: [number, number]; // [0] -> x, [1] -> y
    private rotate: number; // degree
    private scale: [number, number]; // [0] -> x, [1] -> y
    private customMat : Matrix | null = null;

    public constructor() {
        this.translate = [0, 0];
        this.rotate = 0;
        this.scale = [1, 1];
    }

    /* SETTER */
    public translateX(trans_x: number): void {
        this.translate[0] = trans_x;
    }

    public translateY(trans_y: number): void {
        this.translate[1] = trans_y;
    }

    /**
     *  @param scale_x scale in percent
     */
    public scaleX(scale_x: number): void {
        this.scale[0] = 1 + scale_x;
    }

    /**
     *  @param scale_y scale in percent
     */
    public scaleY(scale_y: number): void {
        this.scale[1] = 1 + scale_y;
    }

    public rotation(deg: number): void {
        this.rotate = (deg * Math.PI) / 180;
    }

    public setCustomMatrix(mat : Matrix) : void{
        this.customMat = mat
    }

    /* MATRIX */
    public translationMat(): Matrix {
        return new Matrix(
            { x: 1, y: 0, p: 0 },
            { x: 0, y: 1, p: 0 },
            { x: this.translate[0], y: this.translate[1], p: 1 }
        );
    }
    public inputTransMat(trans_x: number, trans_y: number): Matrix {
        return new Matrix(
            { x: 1, y: 0, p: 0 },
            { x: 0, y: 1, p: 0 },
            { x: trans_x, y: trans_y, p: 1 }
        );
    }
    public scaleMat(): Matrix {
        return new Matrix(
            { x: this.scale[0], y: 0, p: 0 },
            { x: 0, y: this.scale[1], p: 0 },
            { x: 0, y: 0, p: 1 }
        );
    }
    public inputScaleMat(scale_x : number, scale_y : number): Matrix {
        return new Matrix(
            { x: scale_x, y: 0, p: 0 },
            { x: 0, y: scale_y, p: 0 },
            { x: 0, y: 0, p: 1 }
        );
    }   

    public rotationMat(): Matrix {
        return new Matrix(
            { x: Math.cos(this.rotate), y: Math.sin(this.rotate), p: 0 },
            { x: -Math.sin(this.rotate), y: Math.cos(this.rotate), p: 0 },
            { x: 0, y: 0, p: 1 }
        );
    }
    public projectionMat(width: number, height: number): Matrix {
        return new Matrix(
            { x: 2 / width, y: 0, p: 0 },
            { x: 0, y: -2 / height, p: 0 },
            { x: -1, y: 1, p: 1 }
        );
    }

    public customTransformMat() : Matrix{
        if(this.customMat == null){
            return new Matrix(
                { x: 1, y: 0, p: 0 },
                { x: 0, y: 1, p: 0 },
                { x: 0, y: 0, p: 1 }
            );
        }
        else return this.customMat
    }
}

export default Transform;
