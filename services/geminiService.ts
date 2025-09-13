
import { GoogleGenAI, Type } from "@google/genai";
import type { Report } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reportSchema = {
    type: Type.OBJECT,
    properties: {
        competitorResearch: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    products: { type: Type.STRING },
                    audience: { type: Type.STRING },
                    adStyle: { type: Type.STRING }
                },
                required: ["name", "products", "audience", "adStyle"]
            }
        },
        trendInsights: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    insight: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                },
                required: ["insight", "explanation"]
            }
        },
        targetAudience: {
            type: Type.OBJECT,
            properties: {
                location: { type: Type.STRING },
                ageRanges: { type: Type.ARRAY, items: { type: Type.STRING } },
                gender: { type: Type.STRING },
                languages: { type: Type.ARRAY, items: { type: Type.STRING } },
                interests: { type: Type.ARRAY, items: { type: Type.STRING } },
                behaviors: { type: Type.ARRAY, items: { type: Type.STRING } },
                rationale: { type: Type.STRING }
            },
            required: ["location", "ageRanges", "gender", "languages", "interests", "behaviors", "rationale"]
        },
        creativeRecommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    direction: { type: Type.STRING },
                    hook: { type: Type.STRING },
                    adCopy: { type: Type.STRING },
                    cta: { type: Type.STRING },
                    visualSuggestion: { type: Type.STRING },
                    trendingStyles: { type: Type.STRING }
                },
                required: ["direction", "hook", "adCopy", "cta", "visualSuggestion", "trendingStyles"]
            }
        },
        placementsAndBudget: {
            type: Type.OBJECT,
            properties: {
                placements: { type: Type.STRING },
                dailyBudgetINR: { type: Type.NUMBER },
                scalingStrategy: { type: Type.STRING }
            },
            required: ["placements", "dailyBudgetINR", "scalingStrategy"]
        },
        actionPlan: {
            type: Type.OBJECT,
            properties: {
                days1_3: { type: Type.STRING },
                days4_5: { type: Type.STRING },
                days6_7: { type: Type.STRING }
            },
            required: ["days1_3", "days4_5", "days6_7"]
        },
        proTips: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    tip: { type: Type.STRING }
                },
                required: ["tip"]
            }
        }
    },
    required: [
        "competitorResearch", "trendInsights", "targetAudience", 
        "creativeRecommendations", "placementsAndBudget", "actionPlan", "proTips"
    ]
};


export const generateReport = async (niche: string, cityState: string): Promise<Report> => {
    const prompt = `
    You are an expert Meta Ads Media Buyer and Market Research Analyst.
    Your task is to generate a complete Meta Ads Strategy Report for a business based only on the provided niche and city/state.
    Do competitor analysis, trend analysis, and audience targeting recommendations automatically.
    
    INPUTS:
    Niche/Product: ${niche}
    City/State: ${cityState}
    
    OUTPUT:
    Generate a complete, structured, professional JSON output that follows the provided schema.
    
    RULES:
    - Always be practical and data-driven.
    - If exact real-time data is not available, infer logically and label as "inferred". For example, a competitor name could be "Inferred Local Boutique".
    - Do not fabricate URLs.
    - Make the output ready to use for launching ads in Meta Ads Manager.
    - Provide at least 3-5 competitors, 3 trend insights, 6-10 interests, 2-3 behaviors, 2 creative directions, and 2-3 pro tips.
    - The budget must be in INR.
    - For creative recommendations, combine trending styles into a single string for the 'trendingStyles' field.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: reportSchema,
            },
        });
        
        const jsonText = response.text;
        if (!jsonText) {
            throw new Error("API returned an empty response.");
        }

        const reportData = JSON.parse(jsonText);
        return reportData as Report;

    } catch (error) {
        console.error("Error generating report from Gemini API:", error);
        throw new Error("Failed to parse or retrieve the report from the AI. The model may have returned an invalid format.");
    }
};
