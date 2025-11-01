export interface INewUnit {
    name: string;
    location: string;
}

export interface IUnit extends INewUnit {
    _id: string;
}
