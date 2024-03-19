export type Coordinate = {
    x: number;
    y: number;
    w: number;
};

const toVector = (coor: Coordinate): Coordinate => {
    coor.w = 0;
    return coor;
};

const dot = (vec1: Coordinate, vec2: Coordinate): number => {
    return vec1.x * vec2.x + vec1.y * vec2.y + vec1.w * vec2.w;
};

export default { toVector, dot };
