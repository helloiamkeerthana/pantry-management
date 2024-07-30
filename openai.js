// utils/openai.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getRecipeRecommendations = async (ingredients) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Recommend recipes using these ingredients: ${ingredients.join(', ')}`,
        max_tokens: 100,
    });
    return response.data.choices[0].text;
};
