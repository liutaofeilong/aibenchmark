import { defineEventHandler, readBody } from 'file://D:/develop/project/aibenchmark/node_modules/h3/dist/index.mjs';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const analysisPrompt = (companyName) => `
Analyze the company "${companyName}" using the following framework:

1. Problem
- What problem does this product solve?

2. Target Users
- Who are the target users?
- Why do they need it?
- What are their use cases?

3. User Experience
- How do users rate it?
- How does it find users?

4. Business Model
- Is it profitable?
- How much revenue does it generate?
- What is its monetization strategy?

5. Product Analysis
- What can we learn from this product?
- What aspects are challenging?
- How would you pitch this product in one sentence?
- What makes it unique?
- What is its growth engine?

6. Future Development
- How can the product be optimized?

Please provide a comprehensive analysis with specific details and examples.
Score the following aspects out of 10:
- Innovation
- Growth Potential
- Business Model

Format the response in a structured way with clear sections and bullet points.
`;
const analyze = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { companyName } = body;
    if (!companyName) {
      return {
        statusCode: 400,
        body: { error: "Company name is required" }
      };
    }
    if (!DEEPSEEK_API_KEY) {
      return {
        statusCode: 500,
        body: { error: "DeepSeek API key is not configured" }
      };
    }
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: analysisPrompt(companyName)
          }
        ],
        temperature: 0.7,
        max_tokens: 2e3
      })
    });
    if (!response.ok) {
      const error = await response.json();
      return {
        statusCode: response.status,
        body: { error: error.message || "Failed to analyze company" }
      };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: {
        analysis: data.choices[0].message.content
      }
    };
  } catch (error) {
    console.error("Error analyzing company:", error);
    return {
      statusCode: 500,
      body: { error: "Internal server error" }
    };
  }
});

export { analyze as default };
//# sourceMappingURL=analyze.mjs.map
