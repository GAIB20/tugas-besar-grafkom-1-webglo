enum ShapeEnum {
    RECTANGLE,
    LINE,
    SQUARE,
    POLYGON,
}

export function shapeToString(shape: ShapeEnum): string {
    switch (shape) {
        case ShapeEnum.RECTANGLE:
            return "Rectangle";
        case ShapeEnum.LINE:
            return "Line";
        case ShapeEnum.SQUARE:
            return "Square";
        case ShapeEnum.POLYGON:
            return "Polygon";
    }
}

export default ShapeEnum;
