"use server";

import { 
  expressForecastsAsProbabilities as expressForecasts,
  type ExpressForecastsAsProbabilitiesInput,
  type ExpressForecastsAsProbabilitiesOutput
} from "@/ai/flows/express-forecasts-as-probabilities";
import { 
  generateWeatherRiskScore as generateRisk,
  type GenerateWeatherRiskScoreInput,
  type GenerateWeatherRiskScoreOutput
} from "@/ai/flows/generate-weather-risk-score";

export async function expressForecastsAsProbabilities(input: ExpressForecastsAsProbabilitiesInput): Promise<ExpressForecastsAsProbabilitiesOutput> {
    return await expressForecasts(input);
}

export async function generateWeatherRiskScore(input: GenerateWeatherRiskScoreInput): Promise<GenerateWeatherRiskScoreOutput> {
    return await generateRisk(input);
}
