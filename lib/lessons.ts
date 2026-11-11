// Lesson content. Add one entry per level as courses are written.
// A level counts as complete when all 4 steps (Concept, Post-mortem, Lab, Deliverable) are done.

export interface ConceptQuiz {
  kicker: string;
  question: string;
  options: { id: string; value: string }[];
  correct: string;
  hints: Record<string, string>;
  solved: {
    without: { label: string; title: string; text: string };
    with: { label: string; title: string; text: string };
  };
  bubbles: { start: string; wrong: string; right: string };
  next: string;
  xp: number;
}

export interface LessonContent {
  concept?: ConceptQuiz;
}

export const LESSONS: Record<number, LessonContent> = {
  4: {
    concept: {
      kicker: "Interactive concept · How many cables?",
      question:
        "Your company deploys 4 agents and relies on 6 tools. Without a shared standard, how many custom integrations do you need to build?",
      options: [
        { id: "a", value: "10" },
        { id: "b", value: "24" },
        { id: "c", value: "6" },
        { id: "d", value: "4" },
      ],
      correct: "b",
      hints: {
        a: "You added. Without a standard, every agent has to connect to every tool: that's a multiplication, not an addition.",
        c: "You counted one side only. Every agent must talk to every tool, not just the 6 tools.",
        d: "You counted one side only. Every tool must be wired to each agent, not just the 4 agents.",
      },
      solved: {
        without: {
          label: "Without MCP",
          title: "4 × 6 = 24 connectors",
          text: "Every agent wires every tool by hand. It explodes as soon as you add an agent or a tool.",
        },
        with: {
          label: "With MCP",
          title: "6 servers, 1 protocol",
          text: "Each tool exposes an MCP server. Every agent speaks the same client–host–server language.",
        },
      },
      bubbles: { start: "Mission: plug 4 agents into 6 tools.", wrong: "Hmm, recount the links!", right: "Plugged in! Nicely done." },
      next: "Continue: Knight Capital post-mortem",
      xp: 20,
    },
  },
};
