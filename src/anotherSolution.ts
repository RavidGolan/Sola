type GitHubFile = {
    name: string;
    path: string;
    type: 'file' | 'dir';
};

type FileTreeNode = {
    name: string;
    path: string;
    type: 'file' | 'dir';
    children?: FileTreeNode[];
};

async function fetchGitHubFiles(
    owner: string,
    repo: string,
    path: string = '',
    token?: string // optional GitHub token
): Promise<FileTreeNode[]> {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    // @ts-ignore
    const data: GitHubFile[] = await res.json();

    const files: FileTreeNode[] = [];

    for (const item of data) {
        const node: FileTreeNode = {
            name: item.name,
            type: item.type,
            path: item.path
        };

        if (item.type === 'dir') {
            node.children = await fetchGitHubFiles(owner, repo, item.path, token);
        }

        files.push(node);
    }

    return files;
}


(async () => {
    const owner = 'RavidGolan';
    const repo = 'Sola';
    const startPath = ''; // or a subfolder like 'src'
    const token = ""; // optional but recommended

    try {
        const structure = await fetchGitHubFiles(owner, repo, startPath, token);
        console.log(JSON.stringify(structure, null, 2));
    } catch (err) {
        console.error(err);
    }
})();
