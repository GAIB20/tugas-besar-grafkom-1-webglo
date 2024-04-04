export type Coordinate = {
    x: number;
    y: number;
    p: number;
};

export const dot = (vec1: Coordinate, vec2: Coordinate): number => {
    return vec1.x * vec2.x + vec1.y * vec2.y + vec1.p * vec2.p;
};

export const arctan = (vec2: Coordinate, vec1: Coordinate): number => {
    return Math.atan2(vec2.y-vec1.y, vec2.x-vec1.x);
}

export default dot;
