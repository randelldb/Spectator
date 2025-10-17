import fs from "fs";
import { featureFilePath } from "../../spec/paths.js";
import { firstFencedCode, sliceSection } from "../../spec/markdown.js";

const defaultStartPrompt = (feature: string): string => 
    `Before you do anything: call the tool "get_guidelines" and follow them strictly.

Read the files listed below (in order) and prepare to implement the ${feature} feature exactly as described.
Summarize behavior and approach in 3–5 bullets, list unknowns, then execute tasks sequentially from task 1.
For each task: show planned edits before applying; after changes, list edits and rationale; validate against the Validation section in spec.md; if anything is unclear, stop and request a spec/plan update.

Files (in order):
1. /specs/${feature}/spec.md
2. /specs/${feature}/plan.md
3. /specs/${feature}/tasks.md`

const fromStartMd = (content: string, feature: string): string => {
    const section = sliceSection(content, /^(#+)\s*(Start command|One[-\s]?liner)\b/i);
    if (!section) return defaultStartPrompt(feature);

    const fenced = firstFencedCode(section);
    if (fenced) return fenced;

    const firstLine = section.split(/\r?\n/).find(line => line.trim().length > 0)?.trim();
    return firstLine || defaultStartPrompt(feature);
};

export const start = (repoRoot: string, feature: string) => {
    const startPath = featureFilePath(repoRoot, feature, "start.md");
    const prompt = fs.existsSync(startPath)
        ? fromStartMd(fs.readFileSync(startPath, "utf-8"), feature)
        : defaultStartPrompt(feature);

    return { prompt };
};
