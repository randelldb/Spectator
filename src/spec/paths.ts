import path from "path";

export const specsDirPath = (repoRoot: string) => path.join(repoRoot, "specs");

export const featureDirPath = (repoRoot: string, feature: string) =>
    path.join(specsDirPath(repoRoot), feature);

export const featureFilePath = (repoRoot: string, feature: string, fileName: string) =>
    path.join(featureDirPath(repoRoot, feature), fileName);
