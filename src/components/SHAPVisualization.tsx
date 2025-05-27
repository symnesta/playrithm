
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Cell, ReferenceLine
} from "recharts";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface FeatureImportance {
  feature: string;
  importance: number;
  contribution: number;
}

interface SHAPVisualizationProps {
  modelType: string;
  baseValue?: number;
}

const SHAPVisualization: React.FC<SHAPVisualizationProps> = ({ 
  modelType, 
  baseValue = 0.5 
}) => {
  const [selectedPrediction, setSelectedPrediction] = useState(0);

  // Generate mock SHAP values based on model type
  const generateSHAPValues = () => {
    const features = modelType === 'linear-regression' 
      ? ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Bias']
      : ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'];
    
    return features.map(feature => ({
      feature,
      importance: Math.abs(Math.random() * 2 - 1),
      contribution: Math.random() * 2 - 1
    }));
  };

  const [shapValues] = useState<FeatureImportance[]>(generateSHAPValues());

  // Calculate waterfall data for force plot
  const calculateWaterfallData = () => {
    let cumulativeValue = baseValue;
    const waterfallData = [];
    
    // Add base value
    waterfallData.push({
      feature: 'Base Value',
      value: baseValue,
      cumulative: baseValue,
      type: 'base'
    });

    // Add contributions
    shapValues.forEach((item, index) => {
      const prevCumulative = cumulativeValue;
      cumulativeValue += item.contribution;
      waterfallData.push({
        feature: item.feature,
        value: item.contribution,
        cumulative: cumulativeValue,
        prevCumulative: prevCumulative,
        type: item.contribution >= 0 ? 'positive' : 'negative'
      });
    });

    // Add final prediction
    waterfallData.push({
      feature: 'Prediction',
      value: cumulativeValue,
      cumulative: cumulativeValue,
      type: 'prediction'
    });

    return waterfallData;
  };

  const waterfallData = calculateWaterfallData();

  const customTooltipFormatter = (value: any, name: string) => {
    if (typeof value === 'number') {
      return [value.toFixed(3), name];
    }
    return [value, name];
  };

  const getBarColor = (value: number) => {
    return value >= 0 ? '#4285F4' : '#EA4335';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              SHAP Explanations
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="h-6 w-6 p-0"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </CardTitle>
            <CardDescription>
              Understand how features contribute to model predictions
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="importance" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="importance">Feature Importance</TabsTrigger>
            <TabsTrigger value="waterfall">Force Plot</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
          </TabsList>

          <TabsContent value="importance" className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={shapValues.sort((a, b) => b.importance - a.importance)}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  type="number"
                  tick={{ fill: '#aaa' }}
                  label={{ value: 'Importance', position: 'insideBottom', offset: -5, fill: '#aaa' }}
                />
                <YAxis 
                  type="category"
                  dataKey="feature"
                  tick={{ fill: '#aaa' }}
                  width={100}
                />
                <Tooltip 
                  formatter={customTooltipFormatter}
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 36, 0.9)', borderColor: '#333' }}
                />
                <Bar dataKey="importance" name="Importance">
                  {shapValues.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#4285F4" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="waterfall" className="h-[280px]">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Prediction: {waterfallData[waterfallData.length - 1]?.cumulative.toFixed(3)}
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={waterfallData.slice(1, -1)} // Exclude base value and final prediction for cleaner view
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="feature"
                  tick={{ fill: '#aaa', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fill: '#aaa' }}
                  label={{ value: 'Contribution', angle: -90, position: 'insideLeft', fill: '#aaa' }}
                />
                <Tooltip 
                  formatter={customTooltipFormatter}
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 36, 0.9)', borderColor: '#333' }}
                />
                <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
                <Bar dataKey="value" name="Contribution">
                  {waterfallData.slice(1, -1).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="contributions" className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={shapValues}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="feature"
                  tick={{ fill: '#aaa', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fill: '#aaa' }}
                  label={{ value: 'SHAP Value', angle: -90, position: 'insideLeft', fill: '#aaa' }}
                />
                <Tooltip 
                  formatter={customTooltipFormatter}
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 36, 0.9)', borderColor: '#333' }}
                />
                <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
                <Bar dataKey="contribution" name="SHAP Value">
                  {shapValues.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.contribution)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SHAPVisualization;
