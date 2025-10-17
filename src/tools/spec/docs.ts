import fs from "fs";
import path from "path";
import { featureDirPath } from "../../spec/paths.js";

const readIfExists = (filePath: string): string | null =>
    fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : null;

export const getDocs = (repoRoot: string, feature: string) => {
    const featureDir = featureDirPath(repoRoot, feature);

    return {
        spec: readIfExists(path.join(featureDir, "spec.md")),
        plan: readIfExists(path.join(featureDir, "plan.md")),
        tasks: readIfExists(path.join(featureDir, "tasks.md")),
    };
};
