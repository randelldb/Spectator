import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { SpecTools } from "./spec/specTools.js";

const tools = new SpecTools();

const server = new McpServer({
    name: "spec-tator-ts",
    version: "1.0.0",
});

/** Small helpers to keep types quiet across SDK minor changes */
const text = (t: string) =>
    ({ content: [{ type: "text", text: t }] }) as any;

const json = (j: unknown) =>
    ({ content: [{ type: "json", json: j }] }) as any;

// ---------------- Tools ----------------

server.registerTool(
    "ping",
    { description: "Health check" },
    async () => text("pong")
);

server.registerTool(
  "get_guidelines",
  { description: "Return the project guidelines for spec-driven workflow" },
  async () => json(tools.getGuidelines())
);

server.registerTool(
    "spec_init",
    { description: "Create a /specs folder if it does not exist" },
    async () => json(tools.specInit())
);

server.registerTool(
    "list_features",
    { description: "List feature folders under /specs" },
    async () => json(tools.listFeatures())
);

server.registerTool(
    "add_feature",
    {
        description: "Create a new feature folder with starter spec/plan/tasks files",
        inputSchema: { feature: z.string() },
    },
    async ({ feature }) => json(tools.addFeature(feature))
);

server.registerTool(
    "get_docs",
    {
        description: "Get spec/plan/tasks/start for a feature",
        // IMPORTANT: SDK 1.11.x wants a Zod SHAPE, not z.object(...)
        inputSchema: { feature: z.string() },
    },
    async ({ feature }) => json(tools.getDocs(feature))
);

server.registerTool(
    "start",
    {
        description: "Get the one-line start command for a feature",
        inputSchema: { feature: z.string() },
    },
    async ({ feature }) => json(tools.start(feature))
);

server.registerTool(
    "next_task",
    {
        description: "Return the next actionable task from tasks.md",
        inputSchema: { feature: z.string() },
    },
    async ({ feature }) => json(tools.nextTask(feature))
);

server.registerTool(
    "validate",
    {
        description: "Return checklist from spec.md 'Validation' section",
        inputSchema: { feature: z.string() },
    },
    async ({ feature }) => json(tools.validate(feature))
);

// --------------- Transport (STDIO) ---------------
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("✅ Spec-Tator MCP (TS) running via STDIO");
