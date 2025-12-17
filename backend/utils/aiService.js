const axios = require('axios');

async function analyzeJournal(journalText) {
    if (!process.env.OPENAI_API_KEY) {
        // fallback: very small naive analysis
        const keywords = Array.from(new Set(journalText.match(/\b\w{4,}\b/g) || [])).slice(0, 10);
        return {
            summary: journalText.slice(0, 240) + (journalText.length > 240 ? '…' : ''),
            keywords,
            recommendation: 'No AI provider configured. Provide OPENAI_API_KEY to enable deeper analysis.'
        };
    }

    // Example using OpenAI ChatCompletions (you can replace with official SDK)
    try {
        const prompt = `You are a supportive therapist-like assistant. Given the user's journal below, provide:
1) A brief 2-3 sentence empathetic summary.
2) Top 3 emotions likely present.
3) One practical coping suggestion.
Journal:
"""${journalText}"""`;

        const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini', // replace with available model
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const content = resp.data.choices?.[0]?.message?.content || '';
        return { raw: content };
    } catch (err) {
        console.error('AI analyze error', err?.response?.data || err.message);
        return { error: 'AI service error' };
    }
}

module.exports = { analyzeJournal };
