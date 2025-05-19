
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { User } from '@supabase/supabase-js';

// Types
export interface Experiment {
  id: string;
  name: string;
  algorithm: string;
  dataset: string;
  performance: Record<string, any>;
  created_at: string;
}

export interface Dataset {
  id: string;
  name: string;
  rows: number;
  features: string[];
  type: 'sample' | 'custom';
  algorithms: string[];
}

export const useDashboardData = (user: User | null) => {
  // Data state
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoadingExperiments, setIsLoadingExperiments] = useState(true);
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(true);
  const { toast } = useToast();

  // Fetch experiments
  useEffect(() => {
    const fetchExperiments = async () => {
      if (!user) return;
      
      try {
        setIsLoadingExperiments(true);
        const { data, error } = await supabase
          .from('experiments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Transform data to match experiment interface
        const formattedExperiments: Experiment[] = data.map(exp => ({
          id: exp.id,
          name: exp.name,
          algorithm: exp.algorithm,
          dataset: exp.dataset,
          performance: exp.performance as Record<string, any> || {},
          created_at: exp.created_at
        }));

        setExperiments(formattedExperiments);
      } catch (error) {
        console.error('Error fetching experiments:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your experiments',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingExperiments(false);
      }
    };

    fetchExperiments();
  }, [user, toast]);

  // Fetch datasets
  useEffect(() => {
    const fetchDatasets = async () => {
      if (!user) return;
      
      try {
        setIsLoadingDatasets(true);
        const { data, error } = await supabase
          .from('datasets')
          .select('*')
          .or(`user_id.eq.${user.id},public.eq.true`);

        if (error) {
          throw error;
        }

        // Sample datasets (hardcoded as they come from the system)
        const sampleDatasets: Dataset[] = [
          { id: 'ds1', name: 'Iris', rows: 150, features: ['sepal_length', 'sepal_width', 'petal_length', 'petal_width'], type: 'sample', algorithms: ['logistic-regression', 'k-nn', 'svm'] },
          { id: 'ds2', name: 'Boston Housing', rows: 506, features: ['CRIM', 'ZN', 'INDUS', 'CHAS', 'NOX', 'RM', 'AGE', 'DIS', 'RAD', 'TAX', 'PTRATIO', 'B', 'LSTAT'], type: 'sample', algorithms: ['linear-regression'] },
          { id: 'ds3', name: 'Moons', rows: 1000, features: ['X', 'Y'], type: 'sample', algorithms: ['logistic-regression', 'svm', 'neural-network'] },
          { id: 'ds4', name: 'Titanic', rows: 891, features: ['PassengerId', 'Survived', 'Pclass', 'Name', 'Sex', 'Age', 'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked'], type: 'sample', algorithms: ['decision-tree'] },
        ];

        // Transform custom datasets to match Dataset interface
        const customDatasets: Dataset[] = data.map(ds => ({
          id: ds.id,
          name: ds.name,
          rows: Array.isArray(ds.data) ? ds.data.length : 0,
          features: ds.features,
          type: 'custom',
          algorithms: ds.suitable_algorithms
        }));

        // Combine sample and custom datasets
        setDatasets([...sampleDatasets, ...customDatasets]);
      } catch (error) {
        console.error('Error fetching datasets:', error);
        toast({
          title: 'Error',
          description: 'Failed to load datasets',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingDatasets(false);
      }
    };

    fetchDatasets();
  }, [user, toast]);

  return {
    experiments,
    datasets,
    isLoadingExperiments,
    isLoadingDatasets,
    setExperiments,
    setDatasets
  };
};
