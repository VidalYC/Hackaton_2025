import React, { useState, useEffect } from 'react';
import { BarChart3, Activity, Brain, Award } from 'lucide-react';
import HeaderSection from '../components/metrics/HeaderSection';
import FiltersSection from '../components/metrics/FiltersSection';
import KpiGrid from '../components/metrics/KpiGrid';
import ModelPerformance from '../components/metrics/ModelPerformance';
import FeatureImportance from '../components/metrics/FeatureImportance';
import DataQuality from '../components/metrics/DataQuality';
import LoadingSpinner from '../components/metrics/LoadingSpinner';

interface Metric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: string;
  description: string;
  category: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const modelMetrics = {
  mae: 258.5062826084352,
  rmse: 321.2280212390529,
  r2: 0.6054155334625084,
  mape: 27.046727230885146
};


const categories: Category[] = [
  { id: 'all', label: 'Todas', icon: Activity },
  { id: 'operational', label: 'Operacional', icon: Activity },
  { id: 'performance', label: 'Rendimiento', icon: BarChart3 },
  { id: 'analytics', label: 'Analítica', icon: Brain },
  { id: 'quality', label: 'Calidad', icon: Award },
];

const defaultMetrics: Metric[] = [
  {
    id: 'energy-generation',
    title: 'Generación de Energía',
    value: '2.5 GWh',
    change: '+12.3%',
    trend: 'up',
    description: 'Producción total de energía en el período',
    category: 'operational',
  },
  {
    id: 'operational-efficiency',
    title: 'Eficiencia Operacional',
    value: '92.5%',
    change: '+2.1%',
    trend: 'up',
    description: 'Rendimiento promedio de las operaciones',
    category: 'performance',
  },
  {
    id: 'prediction-accuracy',
    title: 'Precisión de Predicciones',
    value: '95.2%',
    change: '+1.5%',
    trend: 'up',
    description: 'Exactitud de los modelos de predicción energética',
    category: 'analytics',
  },
  {
    id: 'data-quality',
    title: 'Calidad de Datos',
    value: '98.7%',
    change: '-0.3%',
    trend: 'down',
    description: 'Porcentaje de datos válidos y consistentes',
    category: 'quality',
  },
];


const featureImportanceData = [
  { feature: 'Irradiancia Solar', importance: 0.35, description: 'Impacto de la irradiancia en la generación' },
  { feature: 'Velocidad del Viento', importance: 0.25, description: 'Influencia de la velocidad del viento' },
  { feature: 'Temperatura Ambiente', importance: 0.15, description: 'Relación con la eficiencia del sistema' },
  { feature: 'Humedad Relativa', importance: 0.12, description: 'Efecto en el rendimiento de equipos' },
  { feature: 'Presión Atmosférica', importance: 0.08, description: 'Condiciones de estabilidad ambiental' },
  { feature: 'Hora del Día', importance: 0.05, description: 'Patrón cíclico de generación' },
];

const MetricsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // simulación de carga de datos (2s)
    setTimeout(() => {
      setMetrics(defaultMetrics);
      setLoading(false);
    }, 2000);
  }, []);
  
  const filteredMetrics =
  activeCategory === 'all'
    ? metrics
    : metrics.filter((m) => m.category === activeCategory);
  

  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSection />
      <FiltersSection 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        categories={categories} 
      />
      <KpiGrid filteredMetrics={filteredMetrics} categories={categories} />
      <ModelPerformance modelMetrics={modelMetrics} />
      <FeatureImportance featureImportanceData={featureImportanceData} />
      <DataQuality />
    </div>
  );
};

export default MetricsPage;
