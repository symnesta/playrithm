
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter } from "recharts";

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

// Sample performance metrics for display
const samplePerformanceMetrics = {
  accuracy: 0.87,
  precision: 0.89,
  recall: 0.83,
  f1Score: 0.86,
  auc: 0.92,
  mse: 0.034,
  rmse: 0.184,
  mae: 0.124
};

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  trainingMetrics,
  modelType,
  isTraining
}) => {
  const [activeTab, setActiveTab] = useState("metrics");
  
  // Sample data for decision boundary visualization
  const scatterData = [
    { x: 1, y: 2, class: "A" },
    { x: 2, y: 3, class: "A" },
    { x: 3, y: 3, class: "A" },
    { x: 1, y: 1, class: "A" },
    { x: 2, y: 2, class: "A" },
    { x: 7, y: 8, class: "B" },
    { x: 8, y: 7, class: "B" },
    { x: 6, y: 9, class: "B" },
    { x: 9, y: 6, class: "B" },
    { x: 8, y: 8, class: "B" },
  ];
  
  // Sample weights data
  const weightsData = [
    { name: 'Weight 1', value: 0.25 },
    { name: 'Weight 2', value: -0.54 },
    { name: 'Weight 3', value: 0.82 },
    { name: 'Weight 4', value: -0.12 },
    { name: 'Weight 5', value: 0.44 },
    { name: 'Bias', value: -0.21 },
  ];

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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="X" 
                  tick={{fill: '#aaa'}}
                  label={{ value: 'Feature 1', position: 'insideBottomRight', offset: -5, fill: '#aaa' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Y" 
                  tick={{fill: '#aaa'}}
                  label={{ value: 'Feature 2', angle: -90, position: 'insideLeft', fill: '#aaa' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 36, 0.9)', borderColor: '#333' }}
                />
                <Legend />
                <Scatter 
                  name="Class A" 
                  data={scatterData.filter(d => d.class === "A")} 
                  fill="#4285F4" 
                  shape="circle"
                />
                <Scatter 
                  name="Class B" 
                  data={scatterData.filter(d => d.class === "B")} 
                  fill="#EA4335" 
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="weights" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weightsData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  type="number" 
                  tick={{fill: '#aaa'}}
                  domain={[-1, 1]}
                  label={{ value: 'Weight Value', position: 'insideBottom', offset: -5, fill: '#aaa' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{fill: '#aaa'}}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 36, 0.9)', borderColor: '#333' }}
                />
                <Legend />
                <Bar dataKey="value" name="Weight Value" fill="#4285F4" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="activations" className="h-[300px] pt-4">
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <div className="text-muted-foreground mb-2">
                Activation maps visualization
              </div>
              <div className="grid grid-cols-4 gap-3 w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div 
                    key={i} 
                    className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded border border-border flex items-center justify-center"
                  >
                    <span className="text-xs text-muted-foreground">Unit {i}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VisualizationPanel;
