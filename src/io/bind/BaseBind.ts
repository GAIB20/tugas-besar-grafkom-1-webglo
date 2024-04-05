import { Color } from "../../object/base/Color";
import { Coordinate } from "../../object/base/Coordinate";

export interface TransformBinding {
    translate: number[];
    rotate: number;
    scale: number[];
}

export interface VertexBinding {
    coor: Coordinate;
    color: Color;
}
