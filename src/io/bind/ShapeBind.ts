import ShapeEnum from "../../enum/ShapeEnum";
import { TransformBinding, VertexBinding } from "./BaseBind";

export interface LineBinding {
    id: number;
    transform: TransformBinding;
    shape: ShapeEnum;
    v1: VertexBinding;
    v2: VertexBinding;
}

export interface PolygonBinding {
    id: number;
    transform: TransformBinding;
    shape: ShapeEnum;
    points: VertexBinding[];
}

export interface SquareBinding {
    id: number;
    transform: TransformBinding;
    shape: ShapeEnum;
    the_centroid: VertexBinding;
    p0: VertexBinding;
    p1: VertexBinding;
    p2: VertexBinding;
    p3: VertexBinding;
    tf1: TransformBinding;
    tf3: TransformBinding;
}
