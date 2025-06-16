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

    const prompt = `分析公司：${company}

请按照以下结构提供分析，使用Markdown格式：

**结构化分析**

**1. 问题解决**
- 产品解决的主要问题
- 解决方案特点
- 技术创新点

**2. 目标用户**
- 主要用户群体
- 用户需求
- 用户特征

**3. 应用场景**
- 主要使用场景
- 核心功能
- 应用领域

**4. 用户反馈**
- 用户评价
- 市场口碑
- 竞争优势

**5. 商业模式**
- 盈利方式
- 市场规模
- 发展战略

**6. 未来发展**
- 增长引擎
- 优化方向
- 发展挑战

**评分（1-10分）**
- 创新能力：[分数]/10
- 增长潜力：[分数]/10
- 商业模式：[分数]/10

请确保分析内容清晰、专业，避免使用特殊符号，保持格式整洁。`;

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
        ],
        temperature: 0.7,
        max_tokens: 2000
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