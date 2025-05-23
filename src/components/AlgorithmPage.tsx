
import React from "react";
import Header from "./Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface AlgorithmPageProps {
  title: string;
  description: string;
  datasetSelector: React.ReactNode;
  parametersPanel: React.ReactNode;
  visualizationPanel: React.ReactNode;
  children?: React.ReactNode;
}

const AlgorithmPage: React.FC<AlgorithmPageProps> = ({
  title,
  description,
  datasetSelector,
  parametersPanel,
  visualizationPanel,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[500px] rounded-lg border border-border"
          >
            <ResizablePanel defaultSize={20} minSize={15} className="p-4 border-r border-border">
              <h2 className="font-semibold mb-4">Dataset</h2>
              <div className="dataset-selector">
                {datasetSelector}
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={55}>
              <div className="h-full flex flex-col">
                <div className="flex-1 visualization-panel p-4">
                  {visualizationPanel}
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={25} minSize={15} className="p-4 border-l border-border">
              <h2 className="font-semibold mb-4">Parameters</h2>
              <div className="parameters-panel">
                {parametersPanel}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          
          <div className="mt-6">
            {children}
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
