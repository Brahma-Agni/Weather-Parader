import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { WeatherData } from '@/lib/types';

const CurrentWeather = ({ weather }: { weather: WeatherData['current'] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="font-headline">Current Weather</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-4">
        <div className="text-primary">{weather.icon}</div>
        <div>
          <p className="text-5xl font-bold">{weather.temp}°C</p>
          <p className="text-muted-foreground">{weather.description}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{weather.details}</p>
    </CardContent>
  </Card>
);

export default CurrentWeather;
