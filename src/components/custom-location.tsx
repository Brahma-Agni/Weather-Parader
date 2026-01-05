"use client";

import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, MapPin, Search } from 'lucide-react';
import type { WeatherData } from '@/lib/types';
import CurrentWeather from './current-weather';
import HourlyForecast from './hourly-forecast';
import DailyForecast from './daily-forecast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import ProbabilisticAnalysis from './probabilistic-analysis';
import { Card, CardContent } from './ui/card';

// Mock Data
const mockWeatherData: WeatherData = {
  current: {
    temp: 18,
    description: 'Sunny',
    icon: <Sun size={48} />,
    details: 'Feels like 17°. Wind 10 km/h. Humidity 50%.',
    rawDescription: 'Clear, sunny skies are expected throughout the day, with a high of 20 degrees Celsius. Winds will be light and variable. There is a very low chance of precipitation.'
  },
  hourly: [
    { time: '3 PM', temp: 18, icon: <Sun size={24} /> },
    { time: '4 PM', temp: 17, icon: <Sun size={24} /> },
    { time: '5 PM', temp: 16, icon: <Sun size={24} /> },
    { time: '6 PM', temp: 15, icon: <Sun size={24} /> },
  ],
  daily: [
    { day: 'Today', high: 20, low: 12, icon: <Sun size={24} /> },
    { day: 'Tomorrow', high: 21, low: 13, icon: <Sun size={24} /> },
    { day: 'Wednesday', high: 19, low: 11, icon: <Cloud size={24} /> },
  ],
};

const CustomLocation: React.FC = () => {
    const [location, setLocation] = useState('');
    const [searchedLocation, setSearchedLocation] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const handleSearch = () => {
        if (location.trim() === '') return;
        // In a real app, you would fetch weather data for the location.
        setWeatherData(mockWeatherData);
        setSearchedLocation(location);
    };

    return (
        <div className="p-4 md:p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-headline mb-6">Custom Location Weather</h1>
            
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex gap-2">
                        <div className="relative flex-grow">
                             <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Enter a city or address..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="pl-10"
                            />
                        </div>
                        <Button onClick={handleSearch}>
                            <Search className="mr-2 h-4 w-4" /> Search
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {weatherData && searchedLocation && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-headline">Weather for {searchedLocation}</h2>
                    <CurrentWeather weather={weatherData.current} />
                    <HourlyForecast forecast={weatherData.hourly} />
                    <DailyForecast forecast={weatherData.daily} />
                    <ProbabilisticAnalysis forecastText={weatherData.current.rawDescription} />
                </div>
            )}
        </div>
    );
};

export default CustomLocation;
