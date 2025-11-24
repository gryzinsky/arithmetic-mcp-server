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
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `${a} と ${b} の足し算の結果: ${a + b}`
    }]
  })
);

// 引き算ツール
server.tool(
  "subtract",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `${a} と ${b} の引き算の結果: ${a - b}`
    }]
  })
);

// 掛け算ツール
server.tool(
  "multiply",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `${a} と ${b} の掛け算の結果: ${a * b}`
    }]
  })
);

// 割り算ツール
server.tool(
  "divide",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => {
    if (b === 0) {
      return {
        content: [{
          type: "text",
          text: "エラー: ゼロで割ることはできません"
        }],
        isError: true
      };
    }

    return {
      content: [{
        type: "text",
        text: `${a} と ${b} の割り算の結果: ${a / b}`
      }]
    };
  }
);

// サーバーを起動
export default server;
