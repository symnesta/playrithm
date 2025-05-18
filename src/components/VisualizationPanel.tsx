
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface TrainingMetric {
  epoch: number;
  loss: number;
  accuracy: number;
  valLoss?: number;
  valAccuracy?: number;
}

interface VisualizationPanelProps {
  trainingMetrics: TrainingMetric[];
  modelType: string;
  isTraining: boolean;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  trainingMetrics,
  modelType,
  isTraining
}) => {
  return (
    <Card className="flex-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Model Performance</CardTitle>
            <CardDescription>
              Real-time visualization of model metrics
            </CardDescription>
          </div>
          {isTraining && (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-visualization-green animate-pulse" />
              <span className="text-xs text-muted-foreground">Training...</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics">
          <TabsList>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="decision-boundary">Decision Boundary</TabsTrigger>
            <TabsTrigger value="weights">Weights</TabsTrigger>
            <TabsTrigger value="activations">Activations</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="epoch" 
                  label={{ value: 'Epoch', position: 'insideBottomRight', offset: -5 }} 
                  tick={{fill: '#aaa'}}
                />
                <YAxis 
                  yAxisId="left" 
                  label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} 
                  tick={{fill: '#aaa'}}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  domain={[0, 1]} 
                  label={{ value: 'Accuracy', angle: 90, position: 'insideRight' }} 
                  tick={{fill: '#aaa'}}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 36, 0.9)', borderColor: '#333' }} 
                  labelStyle={{ color: '#eee' }}
                  itemStyle={{ color: '#eee' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line 
                  type="monotone" 
                  dataKey="loss" 
                  stroke="#EA4335" 
                  strokeWidth={2} 
                  yAxisId="left" 
                  dot={false}
                  name="Training Loss"
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#4285F4" 
                  strokeWidth={2} 
                  yAxisId="right" 
                  dot={false}
                  name="Training Accuracy"
                />
                {trainingMetrics.some(m => m.valLoss !== undefined) && (
                  <Line 
                    type="monotone" 
                    dataKey="valLoss" 
                    stroke="#F97316" 
                    strokeDasharray="5 5"
                    strokeWidth={2} 
                    yAxisId="left" 
                    dot={false}
                    name="Validation Loss"
                  />
                )}
                {trainingMetrics.some(m => m.valAccuracy !== undefined) && (
                  <Line 
                    type="monotone" 
                    dataKey="valAccuracy" 
                    stroke="#34A853" 
                    strokeDasharray="5 5"
                    strokeWidth={2} 
                    yAxisId="right" 
                    dot={false}
                    name="Validation Accuracy"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="decision-boundary" className="h-[300px] pt-4">
            <div className="visualization-container h-full flex items-center justify-center">
              <div className="relative h-full w-full">
                {/* This would be replaced with actual decision boundary visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-muted-foreground">
                    Decision boundary visualization will appear here
                  </div>
                </div>
                {/* Mock data points */}
                <div className="data-point bg-visualization-blue" style={{ top: '30%', left: '40%' }} />
                <div className="data-point bg-visualization-blue" style={{ top: '35%', left: '42%' }} />
                <div className="data-point bg-visualization-blue" style={{ top: '32%', left: '45%' }} />
                <div className="data-point bg-visualization-blue" style={{ top: '28%', left: '38%' }} />
                <div className="data-point bg-visualization-blue" style={{ top: '34%', left: '41%' }} />
                
                <div className="data-point bg-visualization-red" style={{ top: '60%', left: '60%' }} />
                <div className="data-point bg-visualization-red" style={{ top: '65%', left: '62%' }} />
                <div className="data-point bg-visualization-red" style={{ top: '62%', left: '65%' }} />
                <div className="data-point bg-visualization-red" style={{ top: '58%', left: '59%' }} />
                <div className="data-point bg-visualization-red" style={{ top: '63%', left: '64%' }} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weights" className="h-[300px] pt-4">
            <div className="visualization-container h-full flex items-center justify-center">
              <div className="text-muted-foreground">
                Weight distribution visualization will appear here
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activations" className="h-[300px] pt-4">
            <div className="visualization-container h-full flex items-center justify-center">
              <div className="text-muted-foreground">
                Activation maps visualization will appear here
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VisualizationPanel;
