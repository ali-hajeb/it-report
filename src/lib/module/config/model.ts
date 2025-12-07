import mongoose, { model, Schema } from "mongoose";
import ISiteConfig from "./types";

const configSchema = new Schema<ISiteConfig>({
    copyright: {
        type: [String],
        default: ['Copyright © 2025 - 2026 By Ali Hajeb.', 'نسخه آزمایشی']
    },
});

const Config = (mongoose.models && mongoose.models.Config) || model('Config', configSchema);
export default Config;
