import { specInit } from "../tools/spec/specInit.js";
import { listFeatures } from "../tools/spec/listFeatures.js";
import { getDocs } from "../tools/spec/docs.js";
import { start } from "../tools/spec/start.js";
import { nextTask } from "../tools/spec/tasks.js";
import { validate } from "../tools/spec/validate.js";
import { addFeature } from "../tools/spec/addFeature.js";
import { DEFAULT_GUIDELINES } from "./guidelines.js";


export class SpecTools {
    private readonly repoRoot: string;

    constructor(repoRoot: string = process.cwd()) {
        this.repoRoot = repoRoot;
    }

    getGuidelines() {
        return DEFAULT_GUIDELINES;
    }

    addFeature(feature: string) {
        return addFeature(this.repoRoot, feature);
    }

    specInit() {
        return specInit(this.repoRoot);
    }

    listFeatures() {
        return listFeatures(this.repoRoot);
    }

    getDocs(feature: string) {
        return getDocs(this.repoRoot, feature);
    }

    start(feature: string) {
        return start(this.repoRoot, feature);
    }

    nextTask(feature: string) {
        return nextTask(this.repoRoot, feature);
    }

    validate(feature: string) {
        return validate(this.repoRoot, feature);
    }
}
