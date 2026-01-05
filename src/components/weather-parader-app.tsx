"use client";

import React, { useState } from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';
import Header from '@/components/header';
import LocationForm from '@/components/location-form';
import MapView from '@/components/map-view';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProbabilisticAnalysis from '@/components/probabilistic-analysis';
import type { Waypoint, WeatherData } from '@/lib/types';
import CurrentWeather from './current-weather';
import HourlyForecast from './hourly-forecast';
import DailyForecast from './daily-forecast';
import { ScrollArea } from './ui/scroll-area';

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

const WeatherParaderApp = () => {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    { id: '1', name: 'New York, NY', lat: 40.7128, lng: -74.0060, weatherData: 'Clear skies, 22°C. Light winds from the North.' },
    { id: '2', name: 'Philadelphia, PA', lat: 39.9526, lng: -75.1652, weatherData: 'Scattered showers with a chance of thunderstorms in the afternoon. Temperature around 19°C. Strong gusts of wind up to 40 km/h expected.' },
  ]);
  const [selectedLocation, setSelectedLocation] = useState<Waypoint | null>(waypoints[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(mockWeatherData);

  const handleLocationSelect = (location: Waypoint | null) => {
    setSelectedLocation(location);
    // In a real app, you would fetch weather data for the new location
    setWeatherData(location ? mockWeatherData : null);
  };
  
  const handleWaypointsChange = (newWaypoints: Waypoint[]) => {
    setWaypoints(newWaypoints);
  };

  return (
    <div className="flex h-dvh w-full bg-background">
      <div className="w-full max-w-md flex flex-col border-r border-border bg-card">
        <Header />
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            <LocationForm
              waypoints={waypoints}
              onWaypointsChange={handleWaypointsChange}
              onLocationSelect={handleLocationSelect}
            />
            
            {weatherData && selectedLocation && (
              <div>
                <h2 className="text-2xl font-headline mb-4">Weather for {selectedLocation.name}</h2>
                <Tabs defaultValue="forecast" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="forecast">Forecast</TabsTrigger>
                    <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                  </TabsList>
                  <TabsContent value="forecast">
                    <div className="space-y-4 pt-4">
                      <CurrentWeather weather={weatherData.current} />
                      <HourlyForecast forecast={weatherData.hourly} />
                      <DailyForecast forecast={weatherData.daily} />
                    </div>
                  </TabsContent>
                  <TabsContent value="analysis">
                    <div className="pt-4">
                      <ProbabilisticAnalysis forecastText={weatherData.current.rawDescription} />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <main className="flex-1 h-dvh">
        <MapView waypoints={waypoints} />
      </main>
    </div>
  );
};

export default WeatherParaderApp;
