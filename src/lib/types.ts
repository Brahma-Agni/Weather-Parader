import type { ReactNode } from 'react';

export type Waypoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  weatherData: string;
};

export type CurrentWeather = {
  temp: number;
  description: string;
  icon: ReactNode;
  details: string;
  rawDescription: string;
};

export type HourlyForecast = {
  time: string;
  temp: number;
  icon: ReactNode;
};

export type DailyForecast = {
  day: string;
  high: number;
  low: number;
  icon: ReactNode;
};

export type WeatherData = {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
};
