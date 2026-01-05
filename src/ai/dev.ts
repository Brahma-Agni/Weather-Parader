import { config } from 'dotenv';
config();

import '@/ai/flows/express-forecasts-as-probabilities.ts';
import '@/ai/flows/generate-weather-risk-score.ts';