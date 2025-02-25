import {ContentType} from "../Enums/ContentType";

export interface IContent {
    name: string,
    type: ContentType,
    fullPath: string
}
