"use client";

import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import type { Waypoint } from '@/lib/types';

interface MapViewProps {
  waypoints: Waypoint[];
}

const MapView: React.FC<MapViewProps> = ({ waypoints }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <div className="text-center p-4">
            <h3 className="text-lg font-semibold">Map Unavailable</h3>
            <p className="text-sm text-muted-foreground">Google Maps API key is not configured. Please add <code className="bg-secondary/50 px-1 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment variables.</p>
        </div>
      </div>
    );
  }

  const center = waypoints.length > 0 ? { lat: waypoints[0].lat, lng: waypoints[0].lng } : { lat: 40.7128, lng: -74.0060 };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        center={center}
        zoom={waypoints.length > 1 ? 6 : 8}
        mapId="weather_parader_map"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        className="w-full h-full"
      >
        {waypoints.map(waypoint => (
          <Marker key={waypoint.id} position={{ lat: waypoint.lat, lng: waypoint.lng }} />
        ))}
      </Map>
    </APIProvider>
  );
};

export default MapView;
