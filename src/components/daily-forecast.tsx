import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DailyForecast as DailyForecastType } from '@/lib/types';

const DailyForecast = ({ forecast }: { forecast: DailyForecastType[] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="font-headline text-lg">Daily Forecast</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {forecast.map(day => (
          <div key={day.day} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/20">
            <p className="font-medium w-1/3">{day.day}</p>
            <div className="text-primary">{day.icon}</div>
            <div className="flex gap-2 w-1/3 justify-end">
              <p className="font-bold">{day.high}°</p>
              <p className="text-muted-foreground">{day.low}°</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default DailyForecast;
