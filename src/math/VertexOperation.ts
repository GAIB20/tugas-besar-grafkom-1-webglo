import { Coordinate } from "../object/base/Coordinate";
import Vertex from "../object/base/Vertex";
import Matrix from "./Matrix";
import {dot} from "../object/base/Coordinate";

class VertexOperation{

    /**
     * Minus two vertex, result "vector (p1 - p2)"
     * @param p1 
     * @param p2 
     */
    public static minusP(p1 : Vertex, p2: Vertex) : Vertex{
        return new Vertex([p1.coor.x - p2.coor.x, p1.coor.y - p2.coor.y, 0], [0,0,0,0]);    
    }

    public static addP(p1 : Vertex, v1: Vertex) : Vertex{
        return new Vertex([p1.coor.x + v1.coor.x, p1.coor.y + v1.coor.y, 1], [p1.color.r, p1.color.g, p1.color.b, p1.color.a]);    
    }

    public static addV(v1 : Vertex, v2: Vertex) : Vertex{
        return new Vertex([v1.coor.x + v2.coor.x, v1.coor.y + v2.coor.y, 0], [0,0,0,0]);    
    }

    public static transform(p1 : Vertex, tf: Matrix) : Vertex{
        const coor0 = dot(p1.coor,tf.xAxis)
        const coor1 = dot(p1.coor,tf.yAxis)
        const coor2 = dot(p1.coor,tf.point)
        return new Vertex([coor0, coor1, coor2], [p1.color.r, p1.color.g, p1.color.b, p1.color.a]);
    }

}

export default VertexOperation