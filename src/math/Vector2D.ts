import { Coordinate } from "../object/base/Coordinate";
import {dot} from "../object/base/Coordinate";

class Vector2D{
    public x : number;
    public y : number;

    public constructor(p1 : Coordinate, p2: Coordinate){
        this.x = p2.x - p1.x
        this.y = p2.y - p1.y
    }

    cross(vecb :Vector2D) : number{
        // perform cross product between two vectors (this x vecb)
        return this.x * vecb.y - this.y * vecb.x
    }
}

export default Vector2D;