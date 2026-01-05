import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { HourlyForecast as HourlyForecastType } from '@/lib/types';

const HourlyForecast = ({ forecast }: { forecast: HourlyForecastType[] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="font-headline text-lg">Hourly Forecast</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {forecast.map(hour => (
            <div key={hour.time} className="inline-flex flex-col items-center p-2 rounded-lg bg-secondary/50 min-w-[60px]">
              <p className="text-sm font-medium">{hour.time}</p>
              <div className="text-primary my-1">{hour.icon}</div>
              <p className="text-lg font-bold">{hour.temp}°</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);

export default HourlyForecast;
