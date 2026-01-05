'use server';
/**
 * @fileOverview A flow to express weather forecasts as probabilities using generative AI.
 *
 * - expressForecastsAsProbabilities - A function that handles the conversion of weather forecasts to probabilities.
 * - ExpressForecastsAsProbabilitiesInput - The input type for the expressForecastsAsProbabilities function.
 * - ExpressForecastsAsProbabilitiesOutput - The return type for the expressForecastsAsProbabilities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExpressForecastsAsProbabilitiesInputSchema = z.object({
  forecast: z.string().describe('The weather forecast as a text string.'),
});
export type ExpressForecastsAsProbabilitiesInput = z.infer<typeof ExpressForecastsAsProbabilitiesInputSchema>;

const ExpressForecastsAsProbabilitiesOutputSchema = z.object({
  probabilities: z.string().describe('The weather forecast expressed as probabilities.'),
});
export type ExpressForecastsAsProbabilitiesOutput = z.infer<typeof ExpressForecastsAsProbabilitiesOutputSchema>;

export async function expressForecastsAsProbabilities(
  input: ExpressForecastsAsProbabilitiesInput
): Promise<ExpressForecastsAsProbabilitiesOutput> {
  return expressForecastsAsProbabilitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'expressForecastsAsProbabilitiesPrompt',
  input: {schema: ExpressForecastsAsProbabilitiesInputSchema},
  output: {schema: ExpressForecastsAsProbabilitiesOutputSchema},
  prompt: `You are a weather expert. Convert the following weather forecast into probabilities.

Forecast: {{{forecast}}}

Express the forecast as probabilities, including the potential range of weather conditions.`,
});

const expressForecastsAsProbabilitiesFlow = ai.defineFlow(
  {
    name: 'expressForecastsAsProbabilitiesFlow',
    inputSchema: ExpressForecastsAsProbabilitiesInputSchema,
    outputSchema: ExpressForecastsAsProbabilitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
