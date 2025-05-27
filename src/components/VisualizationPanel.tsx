import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter, 
  PieChart, Pie, Cell, TooltipProps
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import SHAPVisualization from "./SHAPVisualization";

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

// Performance metrics with explanations
const performanceMetrics = {
  accuracy: {
    value: 0.87,
    description: "The proportion of correct predictions among the total number of predictions."
  },
  precision: {
    value: 0.89,
    description: "The proportion of true positive predictions among all positive predictions."
  },
  recall: {
    value: 0.83,
    description: "The proportion of true positive predictions among all actual positives."
  },
  f1Score: {
    value: 0.86,
    description: "Harmonic mean of precision and recall, providing a balance between the two metrics."
  },
  auc: {
    value: 0.92,
    description: "Area Under the ROC Curve - measures the model's ability to distinguish between classes."
  },
  mse: {
    value: 0.034,
    description: "Mean Squared Error - average squared difference between predicted and actual values."
  },
  rmse: {
    value: 0.184,
    description: "Root Mean Squared Error - square root of MSE, in the same units as the target variable."
  },
  mae: {
    value: 0.124,
    description: "Mean Absolute Error - average absolute difference between predicted and actual values."
  }
};

const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8F44AD'];

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  trainingMetrics,
  modelType,
  isTraining
}) => {
  const [activeTab, setActiveTab] = useState("metrics");
  const [showMetricsInfo, setShowMetricsInfo] = useState<string | null>(null);
  
  // Generate scatter data with more points for better visualization
  const generateScatterData = () => {
    const classAPoints = [];
    const classBPoints = [];
    
    // Generate class A points (cluster 1)
    for (let i = 0; i < 30; i++) {
      classAPoints.push({
        x: Math.random() * 3 + 1,
        y: Math.random() * 3 + 1,
        class: "A"
      });
    }
    
    // Generate class B points (cluster 2)
    for (let i = 0; i < 30; i++) {
      classBPoints.push({
        x: Math.random() * 3 + 6,
        y: Math.random() * 3 + 6,
        class: "B"
      });
    }
    
    return [...classAPoints, ...classBPoints];
  };
  
  // Sample weights data
  const weightsData = [
    { name: 'Weight 1', value: 0.25 },
    { name: 'Weight 2', value: -0.54 },
    { name: 'Weight 3', value: 0.82 },
    { name: 'Weight 4', value: -0.12 },
    { name: 'Weight 5', value: 0.44 },
    { name: 'Bias', value: -0.21 },
  ];
  
  const scatterData = generateScatterData();
  
  // Pie chart data for performance metrics visualization
  const pieData = [
    { name: "Accuracy", value: performanceMetrics.accuracy.value },
    { name: "Precision", value: performanceMetrics.precision.value },
    { name: "Recall", value: performanceMetrics.recall.value },
    { name: "F1 Score", value: performanceMetrics.f1Score.value }
  ];

  // Custom formatter for tooltip values to handle both string and number types
  const customTooltipFormatter = (value: any) => {
    // Check if the value is a number before using toFixed
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  };

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
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Training...</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="metrics">Learning Curves</TabsTrigger>
            <TabsTrigger value="decision-boundary">Decision Boundary</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="weights">Model Parameters</TabsTrigger>
            <TabsTrigger value="shap">SHAP Explanations</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="h-[300px] pt-4">
            {trainingMetrics.length > 0 ? (
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
                    formatter={customTooltipFormatter}
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
                    animationDuration={1000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#4285F4" 
                    strokeWidth={2} 
                    yAxisId="right" 
                    dot={false}
                    name="Training Accuracy"
                    animationDuration={1000}
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
                      animationDuration={1000}
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
                      animationDuration={1000}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Train the model to see learning curves</p>
              </div>
            )}
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
                  formatter={customTooltipFormatter}
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

          <TabsContent value="performance" className="h-[300px] pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={1000}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={customTooltipFormatter}
                      contentStyle={{ backgroundColor: 'rgba(24, 24, 36, 0.9)', borderColor: '#333' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Performance Metrics</h4>
                <div className="space-y-2">
                  {Object.entries(performanceMetrics).map(([key, { value, description }]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <Info 
                          className="h-4 w-4 text-muted-foreground cursor-pointer" 
                          onMouseEnter={() => setShowMetricsInfo(key)}
                          onMouseLeave={() => setShowMetricsInfo(null)}
                        />
                      </div>
                      <span>{value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                {showMetricsInfo && (
                  <Alert className="mt-2 py-2">
                    <AlertDescription className="text-xs">
                      {performanceMetrics[showMetricsInfo as keyof typeof performanceMetrics].description}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
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
                  formatter={customTooltipFormatter}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Weight Value" 
                  fill="#4285F4" 
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="shap" className="h-[300px] pt-4">
            <SHAPVisualization modelType={modelType} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VisualizationPanel;
