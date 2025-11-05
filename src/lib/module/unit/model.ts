import mongoose, { model, Schema } from "mongoose";
import { INewUnit } from "./unit.types";

const unitSchema = new Schema<INewUnit>({
    name: {
        type: String,
        require: true,
    },
    adminstrator: {
        type: String,
    },
});

const Unit = (mongoose.models && mongoose.models.Unit) || model('Units', unitSchema);
export default Unit;
