export interface INewContract {
    companyName: string;
    softwareName: string;
    softwareCategory: string;
    unit: string;
    type: string;
}

export default interface IContract extends INewContract {
    _id: string;
}
