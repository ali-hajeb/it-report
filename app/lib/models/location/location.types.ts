export interface INewLocation {
    name: string;
    city: string;
    address: string;
}

export interface ILocation extends INewLocation {
    _id: string;
}
