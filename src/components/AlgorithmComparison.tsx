
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface AlgorithmResult {
  name: string;
  accuracy: number;
  loss: number;
  trainingTime: number;
  parameters: number;
}

interface AlgorithmComparisonProps {
  results: AlgorithmResult[];
}

const AlgorithmComparison: React.FC<AlgorithmComparisonProps> = ({ results }) => {
  const chartData = results.map(result => ({
    name: result.name,
    accuracy: result.accuracy * 100, // Convert to percentage
    loss: result.loss,
    trainingTime: result.trainingTime
  }));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Algorithm Comparison</CardTitle>
        <CardDescription>
          Compare performance across different algorithms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" tick={{fill: '#aaa'}} />
                <YAxis yAxisId="left" domain={[0, 100]} tick={{fill: '#aaa'}} />
                <YAxis yAxisId="right" orientation="right" domain={[0, Math.max(...results.map(r => r.loss)) * 1.2]} tick={{fill: '#aaa'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 36, 0.9)', borderColor: '#333' }} 
                  labelStyle={{ color: '#eee' }}
                  itemStyle={{ color: '#eee' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar 
                  dataKey="accuracy" 
                  name="Accuracy (%)" 
                  fill="#4285F4" 
                  yAxisId="left" 
                />
                <Bar 
                  dataKey="loss" 
                  name="Loss" 
                  fill="#EA4335" 
                  yAxisId="right" 
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="table" className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Algorithm</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                  <TableHead className="text-right">Loss</TableHead>
                  <TableHead className="text-right">Training Time</TableHead>
                  <TableHead className="text-right">Parameters</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.name}>
                    <TableCell className="font-medium">{result.name}</TableCell>
                    <TableCell className="text-right">{(result.accuracy * 100).toFixed(2)}%</TableCell>
                    <TableCell className="text-right">{result.loss.toFixed(4)}</TableCell>
                    <TableCell className="text-right">{result.trainingTime.toFixed(2)}s</TableCell>
                    <TableCell className="text-right">{result.parameters.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AlgorithmComparison;
