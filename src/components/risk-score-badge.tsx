"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { generateWeatherRiskScore } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface RiskScoreBadgeProps {
  weatherData: string;
}

const RiskScoreBadge: React.FC<RiskScoreBadgeProps> = ({ weatherData }) => {
  const [risk, setRisk] = useState<{ score: number; explanation: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRiskScore = async () => {
      setLoading(true);
      try {
        const result = await generateWeatherRiskScore({ weatherData });
        setRisk({ score: result.riskScore, explanation: result.explanation });
      } catch (error) {
        console.error("Failed to generate risk score:", error);
        setRisk({ score: -1, explanation: "Could not calculate risk score." });
      } finally {
        setLoading(false);
      }
    };
    if (weatherData) {
        getRiskScore();
    }
  }, [weatherData]);

  if (loading) {
    return <Skeleton className="h-6 w-10 rounded-full" />;
  }

  if (!risk || risk.score === -1) {
    return (
       <Popover>
        <PopoverTrigger>
           <Badge variant="destructive" className="cursor-pointer">
            <AlertCircle className="h-3 w-3" />
           </Badge>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm">{risk?.explanation || "An unknown error occurred."}</p>
        </PopoverContent>
      </Popover>
    );
  }

  const getBadgeVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score > 66) return "destructive";
    if (score > 33) return "secondary";
    return "default";
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge variant={getBadgeVariant(risk.score)} className="cursor-pointer">
          {risk.score}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Weather Risk Explanation</h4>
            <p className="text-sm text-muted-foreground">
              {risk.explanation}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RiskScoreBadge;
