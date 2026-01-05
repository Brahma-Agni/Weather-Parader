"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, CheckCircle, ArrowRight } from 'lucide-react';
import type { Waypoint } from '@/lib/types';

interface JourneyDetailsProps {
  waypoints: Waypoint[];
}

const JourneyDetails: React.FC<JourneyDetailsProps> = ({ waypoints }) => {
  return (
    <div className="p-8 h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2 text-2xl">
            <Route className="text-primary" />
            Your Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          {waypoints.length > 0 ? (
            <div className="space-y-6">
              {waypoints.map((waypoint, index) => (
                <div key={waypoint.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    {index < waypoints.length - 1 && (
                      <div className="w-px h-12 bg-border my-2" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{waypoint.name}</h3>
                    <p className="text-sm text-muted-foreground">{waypoint.weatherData}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                  <p className="font-semibold text-lg">Destination Reached!</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-16">
              <Route size={48} className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No journey planned</h3>
              <p className="text-sm">Add some waypoints using the form to start your journey.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneyDetails;
