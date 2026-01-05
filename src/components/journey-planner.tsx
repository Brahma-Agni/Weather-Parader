"use client";

import React, { useState } from 'react';
import type { Waypoint, WeatherData } from '@/lib/types';
import LocationForm from '@/components/location-form';
import { ScrollArea } from './ui/scroll-area';
import JourneyDetails from './journey-details';

const JourneyPlanner = () => {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    { id: '1', name: 'New York, NY', lat: 40.7128, lng: -74.0060, weatherData: 'Clear skies, 22°C. Light winds from the North.' },
    { id: '2', name: 'Philadelphia, PA', lat: 39.9526, lng: -75.1652, weatherData: 'Scattered showers with a chance of thunderstorms in the afternoon. Temperature around 19°C. Strong gusts of wind up to 40 km/h expected.' },
  ]);
  const [selectedLocation, setSelectedLocation] = useState<Waypoint | null>(waypoints[0]);

  const handleLocationSelect = (location: Waypoint | null) => {
    setSelectedLocation(location);
  };
  
  const handleWaypointsChange = (newWaypoints: Waypoint[]) => {
    setWaypoints(newWaypoints);
     if (newWaypoints.length > 0 && !newWaypoints.find(wp => wp.id === selectedLocation?.id)) {
      setSelectedLocation(newWaypoints[0]);
    } else if (newWaypoints.length === 0) {
      setSelectedLocation(null);
    }
  };

  return (
    <div className="flex h-full w-full bg-background">
      <div className="w-full max-w-md flex flex-col border-r border-border bg-card">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            <LocationForm
              waypoints={waypoints}
              onWaypointsChange={handleWaypointsChange}
              onLocationSelect={handleLocationSelect}
            />
          </div>
        </ScrollArea>
      </div>
      <main className="flex-1 h-full bg-muted/20">
        <JourneyDetails waypoints={waypoints} />
      </main>
    </div>
  );
};

export default JourneyPlanner;
