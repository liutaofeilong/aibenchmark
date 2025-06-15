// @deno-types="https://deno.land/x/types/globals.d.ts"
import { serve } from "./deps.ts";

// Environment type definition
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

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

    const prompt = `分析公司: ${company}

请从以下几个方面进行详细分析:

1. 问题与解决方案
- 主要问题是什么?
- 如何解决这些问题?
- 创新点在哪里?

2. 目标用户
- 主要用户群体
- 用户需求
- 使用场景

3. 市场定位
- 竞争优势
- 市场份额
- 行业地位

4. 商业模式
- 收入来源
- 成本结构
- 定价策略

5. 增长策略
- 当前阶段
- 增长引擎
- 未来规划

6. 挑战与风险
- 当前挑战
- 潜在风险
- 应对策略

请提供简洁明了的分析，每个要点用一句话概括。

同时请给出以下三个维度的评分(1-10分):
- 创新评分：[1-10]
- 增长评分：[1-10]
- 商业评分：[1-10]`;

    const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENROUTER_API_KEY")}`,
        "HTTP-Referer": "https://uqyqluzrukwoaeciupka.supabase.co",
        "X-Title": "AI Company Analysis Platform"
      },
      body: JSON.stringify({
        model: "openai/gpt-4-turbo-preview",
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
    
    // Extract scores from the content
    const content = data.choices[0].message.content;
    const scores = {
      innovation: extractScore(content, '创新评分'),
      growth: extractScore(content, '增长评分'),
      business: extractScore(content, '商业评分')
    };

    // Format response
    const response = {
      timestamp: new Date().toISOString(),
      company,
      analysis: content,
      scores,
      model: data.model,
      usage: data.usage
    };

    return new Response(JSON.stringify(response), {
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

// Helper function to extract scores from analysis content
function extractScore(content: string, scoreType: string): number {
  const regex = new RegExp(`${scoreType}[：:](\\s*)(\\d+)`);
  const match = content.match(regex);
  return match ? parseInt(match[2], 10) : 0;
} 