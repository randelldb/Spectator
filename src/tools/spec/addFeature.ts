import fs from "fs";
import path from "path";
import { specsDirPath, featureDirPath, featureFilePath } from "../../spec/paths.js";

const defaultTemplates = {
    "spec.md": (featureTitle: string) => `# Feature: ${featureTitle}\n\n## Context\nDescribe the context and motivation for the ${featureTitle} feature.\n\n## Goals\n- Define the primary objectives of this feature.\n\n## Functional Description\nDescribe the intended behavior and user flows for the ${featureTitle} feature.\n\n## Visual Design\nDocument any visual or UX considerations.\n\n## Technical Details\n- Outline constraints, integrations, and key implementation notes.\n\n## Validation\n- List the criteria that must be met for this feature to be considered complete.\n`,
    "plan.md": (featureTitle: string) => `# Implementation Plan — ${featureTitle}\n\n## Tech Stack\n- Follow the project’s default stack and conventions.\n\n## Approach\nDescribe how the ${featureTitle} feature will be implemented at a high level.\n\n## Architecture\nExplain how this feature integrates with the current system.\n\n## UI Design\nOutline structure, assets, and interaction details (if applicable).\n\n## Testing Plan\n- Define unit/integration/E2E tests that validate the spec’s Validation section.\n`,
    "tasks.md": (featureTitle: string) => `# Tasks — ${featureTitle}\n\n1. Define clear scope and acceptance criteria based on the spec.\n2. Implement the minimal vertical slice aligned with the plan.\n3. Add tests reflecting the Validation section of the spec.\n4. Document configuration and usage notes if needed.\n5. Review for consistency with project guidelines and architecture.\n6. Validate UX and behavior across supported environments.\n`,
} as const;

const toTitleCase = (input: string) =>
    input
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
        || input;

const renderTemplate = (raw: string, featureName: string, featureTitle: string) => {
    let output = raw;
    output = output.replace(/\{\{FEATURE_NAME\}\}/g, featureName);
    output = output.replace(/\{\{FEATURE_TITLE\}\}/g, featureTitle);
    output = output.replace(/\bTest\b/g, featureTitle);
    output = output.replace(/\btest\b/g, featureTitle);
    return output;
};

const loadTemplate = (repoRoot: string, fileName: keyof typeof defaultTemplates, featureTitle: string, featureName: string) => {
    const templatePath = path.join(repoRoot, "src", "templates", "feature", fileName);
    if (fs.existsSync(templatePath)) {
        const raw = fs.readFileSync(templatePath, "utf-8");
        return renderTemplate(raw, featureName, featureTitle);
    }
    return defaultTemplates[fileName](featureTitle);
};

export const addFeature = (repoRoot: string, feature: string) => {
    const normalized = feature?.trim();
    if (!normalized) throw new Error("feature name is required");

    const featureTitle = toTitleCase(normalized);

    const specsDir = specsDirPath(repoRoot);
    if (!fs.existsSync(specsDir)) {
        fs.mkdirSync(specsDir, { recursive: true });
    }

    const featureDir = featureDirPath(repoRoot, normalized);
    if (fs.existsSync(featureDir)) {
        throw new Error(`Feature '${normalized}' already exists`);
    }

    fs.mkdirSync(featureDir, { recursive: true });

    const createdFiles = ["spec.md", "plan.md", "tasks.md"].map(fileName => {
        const filePath = featureFilePath(repoRoot, normalized, fileName);
        const content = loadTemplate(repoRoot, fileName as keyof typeof defaultTemplates, featureTitle, normalized);
        fs.writeFileSync(filePath, content, { encoding: "utf-8" });
        return path.relative(repoRoot, filePath);
    });

    return {
        feature: normalized,
        created: createdFiles,
    };
};
