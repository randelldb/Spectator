import fs from "fs";
import { specsDirPath } from "../../spec/paths.js";

export const specInit = (repoRoot: string) => {
    const specsDir = specsDirPath(repoRoot);
    const existed = fs.existsSync(specsDir);
    if (!existed) {
        fs.mkdirSync(specsDir, { recursive: true });
    }
    return {
        created: !existed,
        path: specsDir,
    };
};
