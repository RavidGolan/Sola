import {GitHubService} from "./GitHubService";
import {IContent} from "./Common/Interfaces/IContent";
import {ContentType} from "./Common/Enums/ContentType";



export class ContentsTree {
    contents = new Map();

    async createContentsTree(partialPath: string): Promise<any> {
        const currentContents: IContent[] = await GitHubService.getContents(partialPath);
        currentContents.forEach((currentContent: IContent) => {
            if (currentContent.type === ContentType.dir) {

            } else {
                return currentContent;
            }
        })
        return currentContents;
    }


}
