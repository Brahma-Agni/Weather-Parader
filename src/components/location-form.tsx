"use client";

import React, { useState } from 'react';
import { Plus, X, MapPin, LocateFixed, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Waypoint } from '@/lib/types';
import RiskScoreBadge from './risk-score-badge';
import { ScrollArea } from './ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface LocationFormProps {
  waypoints: Waypoint[];
  onWaypointsChange: (waypoints: Waypoint[]) => void;
  onLocationSelect: (waypoint: Waypoint) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ waypoints, onWaypointsChange, onLocationSelect }) => {
  const [newLocation, setNewLocation] = useState('');

  const handleAddWaypoint = () => {
    if (newLocation.trim() === '') return;
    const newWaypoint: Waypoint = {
      id: new Date().toISOString(),
      name: newLocation,
      // In a real app, you'd geocode the location name to get lat/lng
      lat: Math.random() * 180 - 90,
      lng: Math.random() * 360 - 180,
      weatherData: `Weather for ${newLocation}`,
    };
    onWaypointsChange([...waypoints, newWaypoint]);
    setNewLocation('');
  };

  const handleRemoveWaypoint = (id: string) => {
    onWaypointsChange(waypoints.filter(wp => wp.id !== id));
  };
  
  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const newWaypoint: Waypoint = {
        id: new Date().toISOString(),
        name: 'Current Location',
        lat: latitude,
        lng: longitude,
        weatherData: `Weather at lat: ${latitude.toFixed(2)}, lon: ${longitude.toFixed(2)}`,
      };
      onWaypointsChange([...waypoints, newWaypoint]);
      onLocationSelect(newWaypoint);
    }, (error) => {
      console.error("Error getting current location:", error);
      alert("Could not get current location.");
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <MapPin className="text-primary" />
          Journey Planner
        </CardTitle>
        <CardDescription>
            Plan your multi-stop journey and see weather risks for each leg of the trip.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Add a location or waypoint..."
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddWaypoint()}
          />
          <Button onClick={handleAddWaypoint} size="icon" aria-label="Add location">
            <Plus />
          </Button>
        </div>
        <Button variant="outline" className="w-full mb-4" onClick={handleGetCurrentLocation}>
          <LocateFixed className="mr-2 h-4 w-4" /> Use Current Location
        </Button>
        
        <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
          Waypoints
          <Popover>
            <PopoverTrigger asChild>
                <Info className="h-3 w-3 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="text-xs">
                Click on a waypoint to see its detailed weather forecast. The badge indicates the AI-calculated risk score.
            </PopoverContent>
          </Popover>
        </h3>
        <ScrollArea className="h-40">
          <div className="space-y-2">
            {waypoints.length > 0 ? waypoints.map(waypoint => (
              <div key={waypoint.id} className="flex items-center gap-2 p-2 rounded-md bg-secondary/50 cursor-pointer hover:bg-accent/20" onClick={() => onLocationSelect(waypoint)}>
                <div className="flex-grow">
                  <p className="font-semibold">{waypoint.name}</p>
                </div>
                <RiskScoreBadge weatherData={waypoint.weatherData} />
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); handleRemoveWaypoint(waypoint.id); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )) : (
              <div className="text-center text-muted-foreground text-sm py-4">No waypoints added yet.</div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LocationForm;
