import { serve } from "./deps.ts";

// Type definitions
interface CompanyAnalysis {
  name: string;
  mindmap: string;
  scores: {
    innovation: number;
    growth: number;
    business: number;
  };
}

// ... rest of the code stays the same ... 