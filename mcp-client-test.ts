import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "npx",
  args: ["tsx", "mcp-server.ts"],
});

const client = new Client({
  name: "calculator-client",
  version: "1.0.0",
});

await client.connect(transport);

const tools = await client.listTools();
console.log("Tools", tools);

const addition = await client.callTool({
  name: "add",
  arguments: { op1: 10, op2: 2 },
});

console.log("Addition", addition);

const subtraction = await client.callTool({
  name: "sub",
  arguments: { op1: 10, op2: 2 },
});

console.log("Subtraction", subtraction);

const multiplication = await client.callTool({
  name: "mul",
  arguments: { op1: 10, op2: 2 },
});

console.log("Multiplication", multiplication);

const division = await client.callTool({
  name: "div",
  arguments: { op1: 10, op2: 2 },
});

console.log("Division", division);
