#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 四則演算のMCPサーバーを作成
const server = new McpServer({
  name: "arithmetic-server",
  version: "1.0.0"
});

// 足し算ツール
server.registerTool(
  "add",
  {
    title: "Add two numbers",
    description: "Add two numbers",
    inputSchema: z.object({
      a: z.number(),
      b: z.number()
    }),
    outputSchema: z.object({
      result: z.number()
    })
  },
  async ({ a, b }) => {
    const output = {
      result: a + b
    }
    return {
      content: [{
        type: "text",
        text: JSON.stringify(output)
      }],
      structuredOutput: output,
    }
  }
);

// 引き算ツール
server.registerTool(
  "subtract",
  {
    title: "Subtract two numbers",
    description: "Subtract two numbers",
    inputSchema: z.object({
      a: z.number(),
      b: z.number()
    }),
    outputSchema: z.object({
      result: z.number()
    })
  },
  async ({ a, b }) => {
    const output = {
      result: a - b
    }
    return {
      content: [{
        type: "text",
        text: JSON.stringify(output)
      }],
      structuredOutput: output,
    }
  }
);

// 掛け算ツール
server.registerTool(
  "multiply",
  {
    title: "Multiply two numbers",
    description: "Multiply two numbers",
    inputSchema: z.object({
      a: z.number(),
      b: z.number()
    }),
    outputSchema: z.object({
      result: z.number()
    })
  },
  async ({ a, b }) => {
    const output = {
      result: a * b
    }
    return {
      content: [{
        type: "text",
        text: JSON.stringify(output)
      }],
      structuredOutput: output,
    }
  }
);

// 割り算ツール
server.registerTool(
  "divide",
  {
    title: "Divide two numbers",
    description: "Divide two numbers",
    inputSchema: z.object({
      a: z.number(),
      b: z.number()
    }),
    outputSchema: z.object({
      result: z.number()
    })
  },
  async ({ a, b }) => {
    if (b === 0) {
      return {
        content: [{
          type: "text",
          text: "Erro: Não é possível dividir por zero"
        }],
        isError: true
      };
    }

    const output = {
      result: a / b
    }
    return {
      content: [{
        type: "text",
        text: JSON.stringify(output)
      }],
      structuredOutput: output,
    };
  }
);

// 複数数の足し算ツール
server.registerTool(
  "add-many",
  {
    title: "Add many numbers",
    description: "Add multiple numbers together",
    inputSchema: z.object({
      numbers: z.array(z.number())
    }),
    outputSchema: z.object({
      result: z.number()
    })
  },
  async ({ numbers }) => {
    const output = {
      result: numbers.reduce((sum, num) => sum + num, 0)
    }
    return {
      content: [{
        type: "text",
        text: JSON.stringify(output)
      }],
      structuredOutput: output,
    }
  }
);

// 複数数の引き算ツール
server.registerTool(
  "subtract-many",
  {
    title: "Subtract many numbers",
    description: "Subtract multiple numbers from the first number",
    inputSchema: z.object({
      numbers: z.array(z.number())
    }),
    outputSchema: z.object({
      result: z.number()
    })
  },
  async ({ numbers }) => {
    if (numbers.length === 0) {
      return {
        content: [{
          type: "text",
          text: "Erro: É necessário pelo menos um número"
        }],
        isError: true
      };
    }

    const output = {
      result: numbers.reduce((diff, num) => diff - num)
    }
    return {
      content: [{
        type: "text",
        text: JSON.stringify(output)
      }],
      structuredOutput: output,
    }
  }
);

// 平均値ツール
server.registerTool(
  "mean",
  {
    title: "Calculate mean",
    description: "Calculate the mean (average) of multiple numbers",
    inputSchema: z.object({
      numbers: z.array(z.number())
    }),
    outputSchema: z.object({
      result: z.number()
    })
  },
  async ({ numbers }) => {
    if (numbers.length === 0) {
      return {
        content: [{
          type: "text",
          text: "Erro: É necessário pelo menos um número"
        }],
        isError: true
      };
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const output = {
      result: sum / numbers.length
    }
    return {
      content: [{
        type: "text",
        text: JSON.stringify(output)
      }],
      structuredOutput: output,
    }
  }
);

// 中央値ツール
server.registerTool(
  "median",
  {
    title: "Calculate median",
    description: "Calculate the median of multiple numbers",
    inputSchema: z.object({
      numbers: z.array(z.number())
    }),
    outputSchema: z.object({
      result: z.number()
    })
  },
  async ({ numbers }) => {
    if (numbers.length === 0) {
      return {
        content: [{
          type: "text",
          text: "Erro: É necessário pelo menos um número"
        }],
        isError: true
      };
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const output = {
      result: sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid]
    }
    return {
      content: [{
        type: "text",
        text: JSON.stringify(output)
      }],
      structuredOutput: output,
    }
  }
);

// サーバーを起動
export default server;
