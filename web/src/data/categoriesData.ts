import { FileText, BarChart3, TrendingUp, MapPin } from 'lucide-react';

export const categories = [
  { id: 'all', label: 'Todos los Reportes', icon: FileText },
  { id: 'production', label: 'Producción', icon: BarChart3 },
  { id: 'growth', label: 'Crecimiento', icon: TrendingUp },
  { id: 'regional', label: 'Regional', icon: MapPin },
  { id: 'technology', label: 'Tecnología', icon: BarChart3 },
  { id: 'summary', label: 'Resúmenes', icon: FileText },
  { id: 'metrics', label: 'Métricas', icon: TrendingUp }
];
