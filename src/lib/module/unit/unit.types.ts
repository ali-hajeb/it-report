export interface INewUnit {
    name: string;
    adminstrator: string;
}

export default interface IUnit extends INewUnit {
    _id: string;
}
