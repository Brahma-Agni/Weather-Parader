"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, LocateFixed } from 'lucide-react';
import type { WeatherData } from '@/lib/types';
import CurrentWeather from './current-weather';
import HourlyForecast from './hourly-forecast';
import DailyForecast from './daily-forecast';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import ProbabilisticAnalysis from './probabilistic-analysis';

// Mock Data
const mockWeatherData: WeatherData = {
  current: {
    temp: 25,
    description: 'Partly Cloudy',
    icon: <Cloud size={48} />,
    details: 'Feels like 27°. Wind 15 km/h. Humidity 60%.',
    rawDescription: 'Partly cloudy skies are expected throughout the day, with a high of 28 degrees Celsius. Winds will be coming from the southwest at approximately 15 kilometers per hour. There is a low chance of precipitation, around 10-20% in the late afternoon.'
  },
  hourly: [
    { time: '3 PM', temp: 25, icon: <Cloud size={24} /> },
    { time: '4 PM', temp: 24, icon: <Cloud size={24} /> },
    { time: '5 PM', temp: 23, icon: <Sun size={24} /> },
    { time: '6 PM', temp: 22, icon: <Sun size={24} /> },
    { time: '7 PM', temp: 21, icon: <CloudRain size={24} /> },
    { time: '8 PM', temp: 20, icon: <Cloud size={24} /> },
  ],
  daily: [
    { day: 'Today', high: 28, low: 18, icon: <Cloud size={24} /> },
    { day: 'Tomorrow', high: 29, low: 19, icon: <Sun size={24} /> },
    { day: 'Wednesday', high: 26, low: 17, icon: <CloudRain size={24} /> },
  ],
};

const MyWeather: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(mockWeatherData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [locationName, setLocationName] = useState('Default Location');

    const handleGetCurrentLocation = () => {
        setLoading(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // In a real app, you would use a reverse geocoding service here.
                setLocationName(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
                // Then fetch weather data for these coordinates.
                setWeatherData(mockWeatherData);
                setLoading(false);
            },
            (error) => {
                console.error("Error getting current location:", error);
                setError("Could not get current location. Please grant permission and try again.");
                setLoading(false);
            }
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-2xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-headline">Weather for {locationName}</h1>
                <Button onClick={handleGetCurrentLocation} variant="outline" size="sm">
                    <LocateFixed className="mr-2 h-4 w-4" />
                    Get My Location
                </Button>
            </div>
            {loading && (
                <div className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            )}
            {error && !loading && (
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleGetCurrentLocation}>
                            <LocateFixed className="mr-2 h-4 w-4" />
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            )}
            {!loading && weatherData && (
                <div className="space-y-6">
                    <CurrentWeather weather={weatherData.current} />
                    <HourlyForecast forecast={weatherData.hourly} />
                    <DailyForecast forecast={weatherData.daily} />
                    <ProbabilisticAnalysis forecastText={weatherData.current.rawDescription} />
                </div>
            )}
        </div>
    );
};

export default MyWeather;
