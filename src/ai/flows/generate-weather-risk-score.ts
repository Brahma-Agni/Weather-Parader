// This file is used to generate a weather risk score and explanation for a given timepoint.

'use server';

/**
 * @fileOverview Generates a weather risk score and explanation for a given journey timepoint.
 * This module defines a Genkit flow that uses generative AI to assess weather-related risks.
 *
 * @module src/ai/flows/generate-weather-risk-score
 *
 * @typedef {object} GenerateWeatherRiskScoreInput
 * @property {string} weatherData - A string containing weather data for a specific timepoint.
 *
 * @typedef {object} GenerateWeatherRiskScoreOutput
 * @property {number} riskScore - A numerical score representing the weather risk (0-100).
 * @property {string} explanation - A textual explanation of the risk score.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWeatherRiskScoreInputSchema = z.object({
  weatherData: z
    .string()
    .describe(
      'A string containing weather data for a specific timepoint, including temperature, precipitation, wind speed, and other relevant weather conditions.'
    ),
});
export type GenerateWeatherRiskScoreInput = z.infer<typeof GenerateWeatherRiskScoreInputSchema>;

const GenerateWeatherRiskScoreOutputSchema = z.object({
  riskScore: z
    .number()
    .describe('A numerical score representing the weather risk (0-100).'),
  explanation: z
    .string()
    .describe('A textual explanation of the risk score, detailing the factors contributing to the score.'),
});
export type GenerateWeatherRiskScoreOutput = z.infer<typeof GenerateWeatherRiskScoreOutputSchema>;

export async function generateWeatherRiskScore(input: GenerateWeatherRiskScoreInput): Promise<GenerateWeatherRiskScoreOutput> {
  return generateWeatherRiskScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWeatherRiskScorePrompt',
  input: {schema: GenerateWeatherRiskScoreInputSchema},
  output: {schema: GenerateWeatherRiskScoreOutputSchema},
  prompt: `You are an AI assistant that assesses weather-related risks for travelers.
  Given the following weather data for a specific timepoint in a journey, calculate a risk score (0-100) and provide an explanation for the score.

  Weather Data: {{{weatherData}}}

  Consider factors such as temperature, precipitation, wind speed, and any other relevant weather conditions that could impact travel safety and comfort.
  The risk score should reflect the overall severity of the weather conditions, with 0 being minimal risk and 100 being extremely high risk.
  The explanation should clearly articulate the reasons for the assigned risk score, highlighting the specific weather factors that contribute to the risk.
  The response should be concise and easily understandable for the average traveler.
  Format the final output as a JSON object with 'riskScore' (number between 0 and 100) and 'explanation' (string) fields. Adhere to the output schema.`,
});

const generateWeatherRiskScoreFlow = ai.defineFlow(
  {
    name: 'generateWeatherRiskScoreFlow',
    inputSchema: GenerateWeatherRiskScoreInputSchema,
    outputSchema: GenerateWeatherRiskScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
