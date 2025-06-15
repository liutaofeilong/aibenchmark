import { serve } from "./deps.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { company } = await req.json();
    if (!company) {
      return new Response(JSON.stringify({
        error: "Missing company name"
      }), {
        status: 400,
        headers: {
          ...corsHeaders
        }
      });
    }

    const prompt = `请用结构化方式分析公司：${company}，包括：解决的问题、目标用户、用例、用户反馈、获客、变现、增长、优化、评分。`;
    const deepseekRes = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("DEEPSEEK_API_KEY")}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!deepseekRes.ok) {
      const err = await deepseekRes.text();
      return new Response(JSON.stringify({
        error: "DeepSeek API error",
        detail: err
      }), {
        status: 500,
        headers: {
          ...corsHeaders
        }
      });
    }

    const data = await deepseekRes.json();
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
      headers: {
        ...corsHeaders
      }
    });
  }
}); 