import {IContent} from "../Common/Interfaces/IContent";

export class GitHubService {
    // static repositoryPath: string = "https://api.github.com/repos/RavidGolan/Sola";

    static async getContents(path: string): Promise<IContent[]> {
        console.log("GitHubService getContents with path: " + path);
        const response = await fetch(path, {
            method: "GET"
        });
        if (!response.ok) {
            console.error(`Failed to fetch from path: ${path}`);
            return [];
        }
        const data = await response.json();
        // Extract only the relevant properties to match IContent
        // @ts-ignore
        const contents: IContent[] = data.map((item: any) => ({
            name: item.name,
            type: item.type,
            path: item.path
        }));
        console.log(contents);
        return contents as IContent[];
    }
}
