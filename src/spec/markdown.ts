const escapeRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const sliceSection = (md: string, headingRegex: RegExp): string | null => {
    const lines = md.split(/\r?\n/);

    let start = -1;
    let level = 0;

    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(headingRegex);
        if (match) {
            start = i + 1;
            level = (match[1] || "").length;
            break;
        }
    }

    if (start < 0) return null;

    let end = lines.length;
    for (let i = start; i < lines.length; i++) {
        const match = lines[i].match(/^(#+)\s+\S/);
        if (match && match[1].length <= level) {
            end = i;
            break;
        }
    }

    return lines.slice(start, end).join("\n").trim();
};

export const firstFencedCode = (text: string): string | null => {
    const fence = text.match(/```[a-z0-9_-]*\s*([\s\S]*?)```/i);
    return fence ? fence[1].trim() : null;
};

export const extractListItemsFromSection = (md: string, heading: string): string[] => {
    const section = sliceSection(md, new RegExp(`^(#+)\\s*${escapeRegex(heading)}\\b`, "i"));
    if (!section) return [];

    const lines = section.split(/\r?\n/);
    const results: string[] = [];

    const bullet = /^\s*[-*+]\s+(.+)$/;
    const ordered = /^\s*\d+[\.\)]\s+(.+)$/;

    for (const line of lines) {
        const match = line.match(bullet) || line.match(ordered);
        if (match) results.push(match[1].trim());
        if (/^\s*#{1,6}\s+\S/.test(line)) break;
    }

    return results;
};
