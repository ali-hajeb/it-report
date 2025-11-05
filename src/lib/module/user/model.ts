import mongoose, { Model, Schema } from "mongoose";
import { IUserSchema } from "./user.types";
import { passwordReg } from "@/src/utils";

const userSchema = new Schema<IUserSchema>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: [6, 'Password must be longer than 6 characters!'],
        validate: {
            validator(password) {
                return passwordReg.test(password);
            },
            message: '{VALUE} is not a valid password!',
        },
        required: true,
    },
    location: {
        ref: 'Location',
        type: Schema.Types.ObjectId,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'MANAGER'],
        default: 'ADMIN',
    },
}
    // , {
    //     methods: {
    //         hashPassword(password) {
    //             return hashSync(password);
    //         },
    //         authenticateUser(password) {
    //             return compareSync(password, this.password);
    //         },
    //         createToken(expiresIn) {
    //             return jwt.sign({
    //                 _id: this._id,
    //                 username: this.username,
    //                 role: this.role
    //             }, jwtSec, { expiresIn })
    //         }
    //     }
    // }
);

const User: Model<IUserSchema> = (mongoose.models && mongoose.models.User) || mongoose.model('User', userSchema);

export default User;
