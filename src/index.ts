import DrawHandler from "./handler/DrawHandler";
import createProgram from "./utils/program";
import resizeCanvasToDisplaySize from "./utils/resize";
import createShader from "./utils/shaders";

const canvas = document.getElementById("gl-canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl") as WebGLRenderingContext;

const vertexShaderSource = document.getElementById("vertex-shader-2d")
    ?.textContent as string;
const fragmentShaderSource = document.getElementById("fragment-shader-2d")
    ?.textContent as string;

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
);

const program = createProgram(gl, vertexShader, fragmentShader);

gl.useProgram(program);

resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clear(gl.COLOR_BUFFER_BIT);

const drawHandler = new DrawHandler(gl, program, canvas, document);
