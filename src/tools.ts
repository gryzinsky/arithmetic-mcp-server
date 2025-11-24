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
server.tool(
  "add",
  "Add two numbers",
  {
    a: z.number(),
    b: z.number()
  },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `Resultado da soma de ${a} e ${b}: ${a + b}`
    }]
  })
);

// 引き算ツール
server.tool(
  "subtract",
  "Subtract two numbers",
  {
    a: z.number(),
    b: z.number()
  },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `Resultado da subtração de ${a} e ${b}: ${a - b}`
    }]
  })
);

// 掛け算ツール
server.tool(
  "multiply",
  "Multiply two numbers",
  {
    a: z.number(),
    b: z.number()
  },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `Resultado da multiplicação de ${a} e ${b}: ${a * b}`
    }]
  })
);

// 割り算ツール
server.tool(
  "divide",
  "Divide two numbers",
  {
    a: z.number(),
    b: z.number()
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

    return {
      content: [{
        type: "text",
        text: `Resultado da divisão de ${a} e ${b}: ${a / b}`
      }]
    };
  }
);

// 複数数の足し算ツール
server.tool(
  "add-many",
  "Add multiple numbers together",
  {
    numbers: z.array(z.number())
  },
  async ({ numbers }) => {
    const result = numbers.reduce((sum: number, num: number) => sum + num, 0);
    return {
      content: [{
        type: "text",
        text: `Resultado da soma: ${result}`
      }]
    };
  }
);

// 複数数の引き算ツール
server.tool(
  "subtract-many",
  "Subtract multiple numbers from the first number",
  {
    numbers: z.array(z.number())
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

    const result = numbers.reduce((diff: number, num: number) => diff - num);
    return {
      content: [{
        type: "text",
        text: `Resultado da subtração: ${result}`
      }]
    };
  }
);

// 平均値ツール
server.tool(
  "mean",
  "Calculate the mean (average) of multiple numbers",
  {
    numbers: z.array(z.number())
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

    const sum = numbers.reduce((acc: number, num: number) => acc + num, 0);
    const result = sum / numbers.length;
    return {
      content: [{
        type: "text",
        text: `Média: ${result}`
      }]
    };
  }
);

// 中央値ツール
server.tool(
  "median",
  "Calculate the median of multiple numbers",
  {
    numbers: z.array(z.number())
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
    const result = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];

    return {
      content: [{
        type: "text",
        text: `Mediana: ${result}`
      }]
    };
  }
);

// サーバーを起動
export default server;
