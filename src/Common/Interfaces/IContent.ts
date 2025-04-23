import {ContentType} from "../Enums/ContentType";

export interface IContent {
    name: string,
    path: string,
    type: ContentType,
    children?: IContent[]
}
