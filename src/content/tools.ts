/** الأدوات اللي بتتدرّس — بتظهر في الشريط المتحرّك وصفحات الكورسات. */
import type { Tool } from "@/types";

export const tools: Tool[] = [
  { name: "ChatGPT", category: "نماذج", level: ["beginner", "intermediate"] },
  { name: "Claude", category: "نماذج", level: ["beginner", "intermediate", "advanced"] },
  { name: "Gemini", category: "نماذج", level: ["beginner"] },
  { name: "NotebookLM", category: "أدوات", level: ["beginner"] },
  { name: "Excel", category: "بيانات", level: ["beginner", "intermediate"] },
  { name: "Power Query", category: "بيانات", level: ["intermediate"] },
  { name: "VBA / Macros", category: "أطر عمل", level: ["intermediate"] },
  { name: "Python", category: "أطر عمل", level: ["intermediate", "advanced"] },
  { name: "pandas", category: "بيانات", level: ["intermediate"] },
  { name: "Plotly", category: "بيانات", level: ["intermediate"] },
  { name: "VS Code", category: "أدوات", level: ["intermediate", "advanced"] },
  { name: "Claude Code", category: "أدوات", level: ["intermediate", "advanced"] },
  { name: "FastAPI", category: "أطر عمل", level: ["intermediate"] },
  { name: "GitHub", category: "نشر", level: ["advanced"] },
  { name: "Ollama", category: "نشر", level: ["advanced"] },
  { name: "MCP", category: "أطر عمل", level: ["advanced"] },
  { name: "LangGraph", category: "أطر عمل", level: ["advanced"] },
  { name: "Docker", category: "نشر", level: ["advanced"] },
];
