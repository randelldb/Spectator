import fs from "fs";
import { specsDirPath } from "../../spec/paths.js";

export const listFeatures = (repoRoot: string) => {
    const specsDir = specsDirPath(repoRoot);
    if (!fs.existsSync(specsDir)) return { features: [] };

    const features = fs
        .readdirSync(specsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .sort();

    return { features };
};
