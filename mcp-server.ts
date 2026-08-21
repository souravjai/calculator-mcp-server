import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "calculator",
  version: "1.0.0",
});

const add = (op1: number, op2: number) => op1 + op2;
const sub = (op1: number, op2: number) => op1 - op2;
const mul = (op1: number, op2: number) => op1 * op2;
const div = (op1: number, op2: number) => {
  if (op2 === 0) {
    throw new Error("Cannot divide by 0");
  }

  return op1 / op2;
};

const inputSchema = z.object({
  op1: z.number(),
  op2: z.number(),
});

server.registerTool(
  "add",
  {
    title: "Add Two Numbers",
    description: "Add two numbers and return their sum.",
    inputSchema,
  },
  async ({ op1, op2 }) => ({
    content: [{ type: "text", text: String(add(op1, op2)) }],
  }),
);

server.registerTool(
  "sub",
  {
    title: "Subtract Two Numbers",
    description: "Subtract the second number from the first number.",
    inputSchema,
  },
  async ({ op1, op2 }) => ({
    content: [{ type: "text", text: String(sub(op1, op2)) }],
  }),
);

server.registerTool(
  "mul",
  {
    title: "Multiply Two Numbers",
    description: "Multiply two numbers and return their product.",
    inputSchema,
  },
  async ({ op1, op2 }) => ({
    content: [{ type: "text", text: String(mul(op1, op2)) }],
  }),
);

server.registerTool(
  "div",
  {
    title: "Divide Two Numbers",
    description:
      "Divide the first number by the second number. The divisor cannot be zero.",
    inputSchema,
  },
  async ({ op1, op2 }) => {
    try {
      const result = div(op1, op2);
      return { content: [{ type: "text", text: String(result) }] };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown Error Occurred";

      return { content: [{ type: "text", text: message }], isError: true };
    }
  },
);

const transport = new StdioServerTransport();

await server.connect(transport);
