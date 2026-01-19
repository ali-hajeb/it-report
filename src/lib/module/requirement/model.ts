import mongoose, { model, Schema } from "mongoose";
import { INewRequirement } from "./requirement.types";

const requirementSchema = new Schema<INewRequirement>({
    location: {
        ref: 'Locations',
        type: Schema.Types.ObjectId
    },
    unit: {
        type: String,
    },
    user: {
        type: String,
    },
    requirement: {
        type: String,
    },
    count: {
        type: Number,
    },
    desc: {
        type: String,
    },
    status: {
        type: String,
        default: 'در حال بررسی',
    },
    note: {
        type: String,
    },
}, 
{
    timestamps: true
});

const Requirement = (mongoose.models && mongoose.models.Requirements) || model('Requirements', requirementSchema);
export default Requirement;
