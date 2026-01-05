"use client";

import React from 'react';
import Header from '@/components/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JourneyPlanner from './journey-planner';
import MyWeather from './my-weather';
import CustomLocation from './custom-location';

const WeatherParaderApp = () => {
  return (
    <div className="flex h-dvh w-full bg-background flex-col">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="my-weather" className="h-full flex flex-col">
          <div className="p-4 border-b">
            <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
              <TabsTrigger value="my-weather">My Weather</TabsTrigger>
              <TabsTrigger value="custom-location">Custom Location</TabsTrigger>
              <TabsTrigger value="journey-planner">Journey Planner</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="my-weather" className="flex-1 overflow-auto">
            <MyWeather />
          </TabsContent>
          <TabsContent value="custom-location" className="flex-1 overflow-auto">
            <CustomLocation />
          </TabsContent>
          <TabsContent value="journey-planner" className="flex-1 overflow-auto">
            <JourneyPlanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WeatherParaderApp;
