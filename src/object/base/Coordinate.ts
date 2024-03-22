export type Coordinate = {
    x: number;
    y: number;
    p: number;
};

const dot = (vec1: Coordinate, vec2: Coordinate): number => {
    return vec1.x * vec2.x + vec1.y * vec2.y * vec1.p * vec2.p;
};

export default dot;
