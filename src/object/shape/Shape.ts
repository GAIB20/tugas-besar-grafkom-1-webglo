import ShapeEnum from "../../enum/ShapeEnum";

abstract class Shape {
    readonly id: number;
    /** Sudut */
    public degree: number;
    /** Translasi */
    public tx: number;
    public ty: number;
    /** Size */
    public sx: number;
    public sy: number;
    /** Shear */
    public kx: number;
    public ky: number;

    abstract readonly shape: ShapeEnum;

    public constructor(id: number) {
        this.id = id;

        this.degree = 0;
        this.tx = 0;
        this.ty = 0;
        this.sx = 1;
        this.sy = 1;
        this.kx = 0;
        this.ky = 0;
    }
}

export default Shape;
