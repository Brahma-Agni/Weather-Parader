"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { expressForecastsAsProbabilities } from '@/lib/actions';
import { Wand2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';

interface ProbabilisticAnalysisProps {
  forecastText: string;
}

const ProbabilisticAnalysis: React.FC<ProbabilisticAnalysisProps> = ({ forecastText }) => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await expressForecastsAsProbabilities({ forecast: forecastText });
      setResult(response.probabilities);
    } catch (e) {
      setError("Failed to generate analysis. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">AI Probabilistic Analysis</CardTitle>
        <CardDescription>Convert textual forecasts into probabilities using AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Original Forecast:</h4>
            <p className="text-sm p-3 bg-secondary/50 rounded-md text-muted-foreground italic">"{forecastText}"</p>
          </div>
          
          {result === null && !loading && (
            <Button onClick={handleAnalysis} disabled={loading}>
              <Wand2 className="mr-2 h-4 w-4" />
              {loading ? 'Analyzing...' : 'Generate Probabilities'}
            </Button>
          )}

          {loading && (
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          )}
          
          {error && (
             <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}

          {result && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Probabilistic Result:</h4>
              <div className="p-3 bg-primary/10 border-l-4 border-primary rounded-md">
                <p className="text-sm whitespace-pre-wrap font-medium">{result}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProbabilisticAnalysis;
