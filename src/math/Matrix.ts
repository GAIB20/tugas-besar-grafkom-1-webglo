import { Coordinate } from "../object/base/Coordinate";
import dot from "../object/base/Coordinate";

class Matrix {
    public xAxis: Coordinate;
    public yAxis: Coordinate;
    public point: Coordinate;

    public constructor(
        _xAxis: Coordinate,
        _yAxis: Coordinate,
        _point: Coordinate
    ) {
        this.xAxis = _xAxis;
        this.yAxis = _yAxis;
        this.point = _point;
    }

    public toArray(): number[] {
        return [
            this.xAxis.x,
            this.xAxis.y,
            this.xAxis.p, // x_axis
            this.yAxis.x,
            this.yAxis.y,
            this.yAxis.p, // y_axis
            this.point.x,
            this.point.y,
            this.point.p, // point
        ];
    }

    public multiply(mat: Matrix /* B */): Matrix {
        /* this = A */
        /* Result = BA */
        const xAxis_t = { x: this.xAxis.x, y: this.yAxis.x, p: this.point.x };
        const yAxis_t = { x: this.xAxis.y, y: this.yAxis.y, p: this.point.y };
        const point_t = { x: this.xAxis.p, y: this.yAxis.p, p: this.point.p };

        const m00 = dot(mat.xAxis, xAxis_t);
        const m01 = dot(mat.xAxis, yAxis_t);
        const m02 = dot(mat.xAxis, point_t);
        const m10 = dot(mat.yAxis, xAxis_t);
        const m11 = dot(mat.yAxis, yAxis_t);
        const m12 = dot(mat.yAxis, point_t);
        const m20 = dot(mat.point, xAxis_t);
        const m21 = dot(mat.point, yAxis_t);
        const m22 = dot(mat.yAxis, point_t);

        return new Matrix(
            { x: m00, y: m01, p: m02 },
            { x: m10, y: m11, p: m12 },
            { x: m20, y: m21, p: m22 }
        );
    }
}

export default Matrix;
