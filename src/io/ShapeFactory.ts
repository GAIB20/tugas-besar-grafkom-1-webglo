import ShapeEnum from "../enum/ShapeEnum";
import Transform from "../math/Transform";
import Vertex from "../object/base/Vertex";
import Line from "../object/shape/Line";
import Polygon from "../object/shape/Polygon";
import Rectangle from "../object/shape/Rectangle";
import Shape from "../object/shape/Shape";
import Square from "../object/shape/Square";
import { TransformBinding, VertexBinding } from "./bind/BaseBind";
import {
    LineBinding,
    PolygonBinding,
    RectangleBinding,
    SquareBinding,
} from "./bind/ShapeBind";

export class ShapeFactory {
    public static create(object: any): Shape | null {
        switch (object.shape) {
            case ShapeEnum.LINE:
                return ShapeFactory.line(object as LineBinding);
            case ShapeEnum.SQUARE:
                return ShapeFactory.square(object as SquareBinding);
            case ShapeEnum.RECTANGLE:
                console.log("rectange");
                return ShapeFactory.rectangle(object as RectangleBinding);
            case ShapeEnum.POLYGON:
                return ShapeFactory.polygon(object as PolygonBinding);
            default:
                return null;
        }
    }

    public static polygon(raw: PolygonBinding): Polygon {
        const vertexs: Vertex[] = [];
        for (let v of raw.points) {
            vertexs.push(ShapeFactory.vertex(v));
        }
        const transform = ShapeFactory.transform(raw.transform);

        const polygon = new Polygon(raw.id, vertexs);
        polygon.transform = transform;

        return polygon;
    }

    public static square(raw: SquareBinding): Square {
        const p0 = ShapeFactory.vertex(raw.p0);
        const p1 = ShapeFactory.vertex(raw.p1);
        const p2 = ShapeFactory.vertex(raw.p2);
        const p3 = ShapeFactory.vertex(raw.p3);
        const centroid = ShapeFactory.vertex(raw.the_centroid);
        const transform = ShapeFactory.transform(raw.transform);

        const square = new Square(raw.id, centroid);
        square.p0 = p0;
        square.p1 = p1;
        square.p2 = p2;
        square.p3 = p3;
        square.transform = transform;

        return square;
    }

    public static rectangle(raw: RectangleBinding): Rectangle {
        console.log("rectangle");
        console.log(raw);

        const p0 = ShapeFactory.vertex(raw.p0);
        const p1 = ShapeFactory.vertex(raw.p1);
        const p2 = ShapeFactory.vertex(raw.p2);
        const p3 = ShapeFactory.vertex(raw.p3);
        const transform = ShapeFactory.transform(raw.transform);

        const rect = new Rectangle(raw.id, p0);
        rect.p1 = p1;
        rect.p2 = p2;
        rect.p3 = p3;
        rect.transform = transform;
        console.log(rect);

        return rect;
    }

    public static line(raw: LineBinding): Line {
        console.log(raw);
        const v1 = ShapeFactory.vertex(raw.v1);
        const v2 = ShapeFactory.vertex(raw.v2);

        const transform = ShapeFactory.transform(raw.transform);
        const line = new Line(raw.id, v1, v2);
        line.transform = transform;

        return line;
    }

    public static vertex(raw: VertexBinding): Vertex {
        console.log(raw);
        const coor: [number, number, number] = [
            raw.coor.x,
            raw.coor.y,
            raw.coor.p,
        ];
        const color: [number, number, number, number] = [
            raw.color.r,
            raw.color.g,
            raw.color.b,
            raw.color.a,
        ];

        return new Vertex(coor, color);
    }

    public static transform(raw: TransformBinding): Transform {
        const transform = new Transform();
        transform.translate = raw.translate as [number, number];
        transform.rotate = raw.rotate;
        transform.scale = raw.scale as [number, number];
        return transform;
    }
}
