import {GitHubService} from "./Services/GitHubService";
import {IContent} from "./Common/Interfaces/IContent";
import {ContentType} from "./Common/Enums/ContentType";

/*contents
    Common
        enums
            ContentType
        interfaces
            IContent
    ContentsTree
    Services
        GitHubService
    tsconfig*/


export class ContentsTree {
    rootPath = "https://api.github.com/repos/RavidGolan/Sola/contents";
    rootContent: IContent = {
        name: "contents",
        type: ContentType.dir,
        path: ""
    }

    async getContentsTree(content: IContent): Promise<IContent> {
        if (content.type !== ContentType.dir) {
            return content
        } else {
            const path: string = content.path === "" ? this.rootPath : `${this.rootPath}/${content.path}`;
            const currentContents: IContent[] = await GitHubService.getContents(path);
            if (currentContents.length == 1) {
                return currentContents[0];
            } else {
                /*const children = [];
                for (const currentContent of currentContents) {
                    children.push(this.getContentsTree(currentContent));
                }
                content.children = children;*/

                // Use Promise.all to await all recursive calls
                content.children = await Promise.all(currentContents.map(async (currentContent) => {
                    return this.getContentsTree(currentContent);
                }));
            }
            return content;
        }
    }
}
