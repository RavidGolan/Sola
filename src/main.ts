import { ContentsTree } from "./ContentsTree";

async function main() {
    const contentsTree = new ContentsTree();
    const result = await contentsTree.getContentsTree(contentsTree.rootContent);
    console.log("********************** FINAL RESULT **********************")
    console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
