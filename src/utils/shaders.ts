export default function createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
): WebGLShader {
    const shader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS) as boolean;
    if (!success) {
        gl.deleteShader(shader);

        throw Error("Failed to compile shader!");
    }

    return shader;
}
