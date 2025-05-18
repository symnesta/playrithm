
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Share } from "lucide-react";

interface AlgorithmPageProps {
  title: string;
  description: string;
  children: ReactNode;
  visualizationPanel: ReactNode;
  parametersPanel: ReactNode;
  datasetSelector: ReactNode;
}

const AlgorithmPage = ({
  title,
  description,
  children,
  visualizationPanel,
  parametersPanel,
  datasetSelector,
}: AlgorithmPageProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-muted-foreground mt-1">{description}</p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Panel - Dataset and Parameters */}
            <div className="space-y-6">
              {/* Dataset Selector */}
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-4">Dataset</h3>
                {datasetSelector}
              </div>
              
              {/* Parameters Panel */}
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-4">Parameters</h3>
                {parametersPanel}
              </div>
            </div>
            
            {/* Right Panel - Visualization and Results */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-card p-4 rounded-lg border border-border min-h-[500px]">
                <Tabs defaultValue="visualization">
                  <TabsList className="mb-4">
                    <TabsTrigger value="visualization">Visualization</TabsTrigger>
                    <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="visualization" className="min-h-[400px]">
                    {visualizationPanel}
                  </TabsContent>
                  
                  <TabsContent value="metrics">
                    <div className="h-[400px] flex items-center justify-center">
                      <p className="text-muted-foreground">Performance metrics will display here as your model trains.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="insights">
                    <div className="h-[400px] flex items-center justify-center">
                      <p className="text-muted-foreground">Model insights and explanations will appear here.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Additional Content */}
              {children}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
        <p>PlayRithm - Interactive Machine Learning Playground</p>
      </footer>
    </div>
  );
};

export default AlgorithmPage;
