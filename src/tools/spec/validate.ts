import fs from "fs";
import { featureFilePath } from "../../spec/paths.js";
import { extractListItemsFromSection } from "../../spec/markdown.js";

const fallbackValidation = [
    "Feature behaves as described in the spec.",
    "All listed goals are met and verifiable.",
    "UI or API interactions perform as expected without errors.",
    "Edge cases and invalid inputs are handled gracefully.",
    "No unexpected side effects or regressions occur."
] as const;

export const validate = (repoRoot: string, feature: string) => {
    const specPath = featureFilePath(repoRoot, feature, "spec.md");
    if (!fs.existsSync(specPath)) throw new Error(`spec.md not found for feature '${feature}'`);

    const spec = fs.readFileSync(specPath, "utf-8");
    const items = extractListItemsFromSection(spec, "Validation");

    return {
        items: items.length ? items : [...fallbackValidation],
    };
};
