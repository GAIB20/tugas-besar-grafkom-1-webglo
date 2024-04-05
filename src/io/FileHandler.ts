import { resolve } from "../../webpack.config";
import ShapeEnum from "../enum/ShapeEnum";
import Line from "../object/shape/Line";
import Shape from "../object/shape/Shape";
import { ShapeFactory } from "./ShapeFactory";

class FileHandler {
    public static read = async (event: Event): Promise<any> => {
        return new Promise((resolve, reject) => {
            const files = (
                (event.target as HTMLInputElement).files as FileList
            )[0];
            const reader = new FileReader();

            reader.onload = (event: ProgressEvent<FileReader>) => {
                try {
                    const raw = event.target?.result as string;
                    const data = JSON.parse(raw);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = (error) => {
                reject(error);
            };

            if (files) {
                reader.readAsText(files);
            } else {
                reject(new Error("No file selected"));
            }
        });
    };
    public static convertToShape(raw: any) {
        const data: Shape[] = [];
        for (let obj of raw) {
            data.push(ShapeFactory.create(obj) as Shape);
        }
        return data;
    }

    public static convertToJSON(shape: Shape[]) {
        return JSON.stringify(shape);
    }
}

export default FileHandler;
