# 🌱 Análisis de Energía Renovable - Colombia

## 📋 Resumen del Proyecto

Sistema integral de análisis y predicción para energía renovable en Colombia, enfocado en la producción de energía **Solar** y **Eólica** en los departamentos de **Atlántico**, **Cesar**, **La Guajira** y **Magdalena**. 

El proyecto combina análisis exploratorio de datos (EDA), predicciones con Machine Learning y una interfaz web interactiva para visualización de dashboards y reportes.

### 🎯 Características Principales

- **📊 Análisis Exploratorio Completo**: Patrones temporales, estacionales y geográficos
- **🤖 Predicciones Avanzadas**: Machine Learning (Random Forest) y Prophet para series temporales  
- **📈 Dashboard Interactivo**: Interfaz web para visualización de datos y predicciones
- **💡 Insights Estratégicos**: Recomendaciones basadas en análisis comparativo histórico vs futuro
- **📄 Reportes Automatizados**: Exportación en JSON, CSV y resúmenes ejecutivos

## 🏗️ Arquitectura del Sistema

```
📦 energy-analysis/
├── 📁 data/
│   ├── raw/                    # Datos originales
│   ├── processed/              # Datos procesados EDA
│   └── predictions/            # Resultados predicciones
├── 📁 data_processing/
│   ├── config/                 # Configuraciones
│   ├── eda/                    # Análisis exploratorio
│   └── import_export_Data/     # Carga y exportación
├── 📁 machine_learning/
│   ├── predictor/              # Modelos predictivos
│   └── predictor_insights/     # Análisis comparativo
├── 📁 web_interface/           # Dashboard web
├── 📄 main.py                  # Script principal
└── 📄 requirements.txt         # Dependencias
```

## 📊 Dataset

**Energía Renovable Colombia (2024)**
- **2,050 registros** de producción energética
- **Período**: Enero - Diciembre 2024
- **Tecnologías**: Solar (54.7%) y Eólica (45.3%)
- **Departamentos**: Atlántico, Cesar, La Guajira, Magdalena
- **Variables**: fecha, departamento, tecnología, producción_mwh

### 🏆 Hallazgos Clave

- **Líder Histórico**: La Guajira (26.5% de la producción total)
- **Tecnología Dominante**: Solar con 1,439,113 MWh 
- **Mejor Mes**: Enero (239,770 MWh de producción)
- **Crecimiento Histórico**: +3.8% entre periodos

## 🚀 Instalación y Configuración

### 1️⃣ Prerrequisitos

```bash
# Python 3.8 o superior
python --version

# Git (opcional)
git --version
```

### 2️⃣ Clonar Repositorio

```bash
git clone https://github.com/tu-usuario/energy-analysis.git
cd energy-analysis
```

### 3️⃣ Instalar Dependencias

```bash
# Opción 1: Instalación automática
python machine_learning/install_predictions.py

# Opción 2: Instalación manual
pip install -r requirements.txt

# Opción 3: Dependencias mínimas
pip install pandas numpy scikit-learn matplotlib seaborn
```

### 4️⃣ Verificar Instalación

```bash
python machine_learning/install_predictions.py test
```

## 🎮 Guía de Uso

### 💻 Ejecución Completa (Recomendado)

```bash
# Ejecuta EDA + Predicciones + Dashboard
python main.py
```

**Salida esperada:**
```
🚀 ANÁLISIS COMPLETO DE ENERGÍA RENOVABLE
📊 EDA + 🔮 Predicciones + 💡 Insights Comparativos
✅ Datos cargados: 2,050 registros
🤖 Predicciones ML: R² = 0.605
📂 Resultados guardados en: data/predictions/
```

### 🌐 Dashboard Web

```bash
# Iniciar servidor web (si está implementado)
python web_interface/app.py

# Acceder en navegador
http://localhost:5000
```

### 📊 Solo Análisis EDA

```python
from data_processing.import_export_Data.data_loader import DataLoader
from data_processing.eda.eda import EnergyEDA

# Cargar y analizar datos
loader = DataLoader("data/raw/dataset_energia_completo_2050_registros.csv")
loader.load_data()

eda = EnergyEDA(loader.df)
eda.basic_info()
eda.analyze_temporal_patterns()
eda.analyze_departments()
```

### 🤖 Solo Predicciones

```python
from machine_learning.predictor.energy_predictor import EnergyPredictor

# Crear predictor
predictor = EnergyPredictor(df)

# Predicciones a 24 semanas
ml_pred = predictor.predict_with_ml(horizon_weeks=24)
prophet_pred = predictor.predict_with_prophet(horizon_weeks=24)

# Exportar resultados
predictor.export_predictions("resultados/")
```

## 📈 Funcionalidades del Dashboard

### 📊 Visualizaciones Disponibles

1. **Producción Total por Departamento**
   - Gráfico de barras interactivo
   - Filtros por período y tecnología

2. **Trends Temporales**
   - Series de tiempo con patrones estacionales
   - Comparación histórico vs predicciones

3. **Análisis Geográfico**  
   - Mapa de calor de producción por región
   - Concentración tecnológica

4. **Métricas de Performance**
   - KPIs principales (producción, eficiencia, crecimiento)
   - Indicadores de diversificación

### 🎛️ Controles Interactivos

- **Filtros de Tiempo**: Rango de fechas personalizable
- **Selector de Departamento**: Análisis individual o comparativo  
- **Selector de Tecnología**: Solar, Eólica o ambas
- **Modo Predicción**: Alternar entre histórico y futuro

## 📄 Reportes Generados

### 📋 Archivos de Salida

```
📁 data/predictions/
├── 📊 predicciones_ml.csv              # Predicciones Machine Learning
├── 🔮 predicciones_prophet.csv         # Predicciones Prophet  
├── 📈 metricas_modelos.csv             # Métricas de precisión
├── 🎯 importancia_caracteristicas.csv  # Feature importance
├── 📄 reporte_completo.json            # Análisis integral
└── 📋 resumen_ejecutivo.txt            # Resumen para directivos
```

### 💡 Insights Clave Incluidos

- **Liderazgo Departamental**: Cambios en ranking histórico vs futuro
- **Tendencias Tecnológicas**: Proyección de Solar vs Eólica
- **Estacionalidad**: Patrones mensuales y trimestrales
- **Recomendaciones Estratégicas**: Basadas en análisis predictivo

## ⚙️ Configuración Avanzada

### 🔧 Parámetros de Predicción

```python
# data_processing/config/config.py
PREDICTION_CONFIG = {
    "default_horizon_weeks": 24,        # Horizonte de predicción
    "lags": [1, 2, 4],                 # Lags para features
    "min_data_points": 30,             # Mínimo datos por serie
}

ML_CONFIG = {
    "n_estimators": 200,               # Árboles Random Forest
    "max_depth": 15,                   # Profundidad máxima
    "test_size": 0.2,                  # % datos para testing
}
```

### 📊 Personalización Dashboard

```javascript
// web_interface/static/config.js
const DASHBOARD_CONFIG = {
    refresh_interval: 30000,           // Auto-refresh (ms)
    default_chart_type: 'line',        // Tipo gráfico por defecto  
    color_palette: ['#1f77b4', '#ff7f0e'], // Colores Solar/Eólica
    animation_duration: 500            // Transiciones (ms)
}
```

## 🔍 Resultados y Métricas

### 📊 Performance Modelos

| Modelo | MAE | RMSE | R² | MAPE |
|--------|-----|------|----|----- |
| **Random Forest** | 258.5 | 321.2 | **0.605** | 27.0% |

### 🎯 Precisión por Departamento

- **La Guajira**: R² = 0.68 (Mejor performance)
- **Atlántico**: R² = 0.61  
- **Magdalena**: R² = 0.58
- **Cesar**: R² = 0.52

### 📈 Proyecciones 2025

- **Crecimiento General**: +6.0% (Prophet) vs -2.2% (ML)
- **Nuevo Líder**: Atlántico (proyectado)
- **Tecnología Emergente**: Eólica ganando terreno

## 🛠️ Troubleshooting

### ❌ Errores Comunes

**Error: Prophet no disponible**
```bash
# Solución: Usar solo ML
pip install prophet
# o continuar sin Prophet (ML funciona independiente)
```

**Error: Datos insuficientes**
```python
# Verificar dataset
print(f"Registros: {len(df)}")
print(f"Columnas requeridas: {['fecha', 'departamento', 'tecnologia', 'produccion_mwh']}")
```

**Error: Dashboard no carga**
```bash
# Verificar puerto
netstat -an | grep 5000
# Cambiar puerto si está ocupado
python web_interface/app.py --port 8080
```

## 🚀 Próximas Mejoras

- [ ] **Predicciones Multivariate**: Incorporar variables climáticas
- [ ] **Dashboard Tiempo Real**: Conexión con APIs de datos en vivo  
- [ ] **Alertas Automáticas**: Notificaciones por anomalías
- [ ] **Análisis Económico**: ROI y análisis financiero
- [ ] **Mobile App**: Versión móvil del dashboard

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **Autores**:
    - Yoriel Carvajalino 
    - Mariana Perez 
    - Adriana Castro
    - Diego Maza


---

### ⭐ Si este proyecto te fue útil, ¡no olvides darle una estrella! ⭐
