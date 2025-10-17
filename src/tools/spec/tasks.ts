import fs from "fs";
import { featureFilePath } from "../../spec/paths.js";

const taskLinePattern = /^\s*(?:\d+[\.\)]\s+|[-*+]\s+)\s*(.+)$/;

export const nextTask = (repoRoot: string, feature: string) => {
    const tasksPath = featureFilePath(repoRoot, feature, "tasks.md");
    if (!fs.existsSync(tasksPath)) throw new Error(`tasks.md not found for feature '${feature}'`);

    const lines = fs.readFileSync(tasksPath, "utf-8").split(/\r?\n/);
    const index = lines.findIndex(line => line.trim() && taskLinePattern.test(line));
    if (index < 0) throw new Error("No tasks found in tasks.md");

    const text = (lines[index].match(taskLinePattern)?.[1] || "").trim();
    return { index: index + 1, text };
};
