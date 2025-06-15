import { serve } from "./deps.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { company } = await req.json();
    if (!company) {
      return new Response(JSON.stringify({
        error: "Missing company name"
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const prompt = `Analyze the company ${company} in a structured way, including:
1. Problem Solved
2. Target Users
3. Use Cases
4. User Reviews
5. User Acquisition
6. Monetization
7. Growth Strategy
8. Areas for Optimization
9. Scoring (Innovation, Growth, Business Model)

Please provide a detailed analysis for each aspect.`;

    const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENROUTER_API_KEY")}`,
        "HTTP-Referer": "https://uqyqluzrukwoaeciupka.supabase.co", // 你的 Supabase URL
        "X-Title": "AI Company Analysis Platform" // 你的应用名称
      },
      body: JSON.stringify({
        model: "openai/gpt-4-turbo", // 或者使用其他模型如 "anthropic/claude-2"
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!openRouterRes.ok) {
      const err = await openRouterRes.text();
      return new Response(JSON.stringify({
        error: "OpenRouter API error",
        detail: err
      }), {
        status: 500,
        headers: corsHeaders
      });
    }

    const data = await openRouterRes.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({
      error: e.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}); 