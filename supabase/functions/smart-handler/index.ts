// @deno-types="https://deno.land/x/types/globals.d.ts"
import { serve } from "https://deno.land/std@0.218.0/http/server.ts";

// Environment type definition
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

// Type definitions
interface CompanyAnalysis {
  name: string;
  analysis: string;
  scores: {
    innovation: number;
    growth: number;
    business: number;
  };
}

interface ErrorResponse {
  error: string;
  detail?: string;
}

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Analysis prompt template
const getAnalysisPrompt = (company: string) => `
Please analyze ${company} and provide the analysis in a structured format suitable for a mindmap. Use the following format:

Central Topic: ${company}

1. Problem & Solution
- Main Problem: [brief description]
- Solution Features: [key points]
- Innovation: [key points]

2. Target Users
- Primary Segments: [list]
- User Needs: [key points]
- Use Cases: [list]

3. Market Position
- Competitive Advantages: [list]
- Market Share: [data if available]
- Industry Position: [description]

4. Business Model
- Revenue Streams: [list]
- Cost Structure: [key points]
- Pricing Strategy: [description]

5. Growth Strategy
- Current Stage: [description]
- Growth Engines: [list]
- Future Plans: [key points]

6. Challenges & Risks
- Current Challenges: [list]
- Potential Risks: [key points]
- Mitigation Strategies: [brief points]

Please provide concise, clear points that can be easily converted into a mindmap structure.
Also provide numerical scores (1-10) for:
- Innovation Score: [1-10]
- Growth Potential: [1-10]
- Business Model: [1-10]

Format each point as a brief phrase or single line, making it suitable for mindmap visualization.`;

// Helper function to extract scores from analysis content
function extractScore(content: string, scoreType: string): number {
  const regex = new RegExp(`${scoreType}:\\s*(\\d+)`);
  const match = content.match(regex);
  return match ? parseInt(match[1], 10) : 0;
}

// Main handler function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { company } = await req.json();
    
    // Validate input
    if (!company || typeof company !== 'string') {
      return new Response(
        JSON.stringify({ error: "Missing or invalid company name" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get API key
    const deepseekKey = Deno.env.get("DEEPSEEK_API_KEY");
    if (!deepseekKey) {
      return new Response(
        JSON.stringify({ error: "DeepSeek API key not configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Call DeepSeek API
    const deepseekRes = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${deepseekKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: getAnalysisPrompt(company)
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "text" }
      })
    });

    // Handle API errors
    if (!deepseekRes.ok) {
      const error = await deepseekRes.text();
      console.error("DeepSeek API error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to analyze company",
          detail: error
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Process successful response
    const data = await deepseekRes.json();
    const analysisContent = data.choices[0].message.content;
    
    // Extract scores from the content
    const scores = {
      innovation: extractScore(analysisContent, 'Innovation Score'),
      growth: extractScore(analysisContent, 'Growth Potential'),
      business: extractScore(analysisContent, 'Business Model')
    };

    // Format response
    const response = {
      timestamp: new Date().toISOString(),
      company,
      analysis: analysisContent,
      scores,
      model: data.model,
      usage: data.usage
    };

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    // Log error for debugging
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        detail: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
}); 