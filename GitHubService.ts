import {IContent} from "./Common/Interfaces/IContent";

export class GitHubService {
    static repositoryPath: string = "https://api.github.com/repos/RavidGolan/Sola";

    static async getContents(partialPath: string): Promise<IContent[]> {
        const response = await fetch(GitHubService.repositoryPath + "/contents/" + partialPath);
        if (!response.ok) {
            return [];
        }
        return await response.json() as Promise<IContent[]>;
    }
}
