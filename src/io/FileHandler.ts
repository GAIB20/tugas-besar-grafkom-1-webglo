import { resolve } from "../../webpack.config";
import ShapeEnum from "../enum/ShapeEnum";
import Line from "../object/shape/Line";
import Shape from "../object/shape/Shape";
import { ShapeFactory } from "./ShapeFactory";

class FileHandler {
    public static write = (listOfShape: Shape[], document: Document) => {
        const data = FileHandler.convertToJSON(listOfShape);
        const blob: Blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const time = new Date(Date.now());
        const formattedDate = `${time
            .getSeconds()
            .toString()
            .padStart(2, "0")}-${time
            .getMinutes()
            .toString()
            .padStart(2, "0")}-${time
            .getHours()
            .toString()
            .padStart(2, "0")}.${time.getDate().toString().padStart(2, "0")}-${(
            time.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${time.getFullYear().toString().slice(-2)}`;
        console.log(formattedDate);

        const a = document.createElement("a");
        a.href = url;
        a.download = `WEBGlo${formattedDate}.json`;
        a.click();
    };

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
        console.log(data);
        return data;
    }

    public static convertToJSON(shape: Shape[]) {
        return JSON.stringify(shape);
    }
}

export default FileHandler;
