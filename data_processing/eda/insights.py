# data_processing/eda/insights.py - VERSIÓN MEJORADA
import pandas as pd

class InsightsGenerator:
    def __init__(self, df, insights):
        self.df = df
        self.insights = insights

    def generate_summary(self):
        """Generar resumen de insights más detallado"""
        print("\n" + "=" * 60)
        print("💡 INSIGHTS DETALLADOS PARA EL REPORTE")
        print("=" * 60)

        # Insights básicos existentes
        lider = self.insights.get("departamento_lider", {})
        print(f"🏆 LIDERAZGO DEPARTAMENTAL:")
        print(f"   • {lider.get('nombre')} domina con {lider.get('porcentaje')}% de la producción")
        print(f"   • Producción total: {lider.get('produccion_total', 0):,.2f} MWh")
        
        dominante = self.insights.get("tecnologia_dominante", {})
        print(f"\n⚡ DOMINANCIA TECNOLÓGICA:")
        print(f"   • {dominante.get('lider')} es la tecnología líder")
        print(f"   • Solar: {dominante.get('solar', 0):,.2f} MWh")
        print(f"   • Eólica: {dominante.get('eolica', 0):,.2f} MWh")
        
        estacional = self.insights.get("estacionalidad", {})
        print(f"\n📅 PATRONES ESTACIONALES:")
        print(f"   • Mejor mes: {self._get_month_name(estacional.get('mejor_mes', 1))}")
        print(f"   • Peor mes: {self._get_month_name(estacional.get('peor_mes', 1))}")
        print(f"   • Diferencia: {estacional.get('diferencia', 0):,.2f} MWh")
        
        # Nuevos insights detallados
        self._generate_efficiency_insights()
        self._generate_growth_insights()
        self._generate_risk_insights()
        self._generate_correlation_insights()
        
    def _generate_efficiency_insights(self):
        """Generar insights de eficiencia"""
        print(f"\n📊 ANÁLISIS DE EFICIENCIA:")
        print("-" * 25)
        
        # Eficiencia por departamento (producción vs registros)
        dept_efficiency = {}
        for dept in self.df["departamento"].unique():
            dept_data = self.df[self.df["departamento"] == dept]
            avg_production = dept_data["produccion_mwh"].mean()
            consistency = 1 - (dept_data["produccion_mwh"].std() / avg_production) if avg_production > 0 else 0
            
            dept_efficiency[dept] = {
                "produccion_promedio": avg_production,
                "consistencia": consistency,
                "total_registros": len(dept_data)
            }
            
            print(f"   • {dept}: {avg_production:.2f} MWh promedio (Consistencia: {consistency:.2f})")
        
        self.insights["eficiencia_departamental"] = dept_efficiency
        
        # Departamento más eficiente
        most_efficient = max(dept_efficiency.items(), key=lambda x: x[1]["produccion_promedio"])
        self.insights["departamento_mas_eficiente"] = {
            "nombre": most_efficient[0],
            "eficiencia": most_efficient[1]["produccion_promedio"]
        }
        
    def _generate_growth_insights(self):
        """Generar insights de crecimiento temporal"""
        print(f"\n📈 ANÁLISIS DE CRECIMIENTO:")
        print("-" * 28)
        
        # Análisis temporal si hay suficientes datos
        if len(self.df) > 50:  # Si hay suficientes registros
            self.df["fecha"] = pd.to_datetime(self.df["fecha"])
            
            # Dividir en periodos
            df_sorted = self.df.sort_values("fecha")
            mid_point = len(df_sorted) // 2
            
            first_period = df_sorted.iloc[:mid_point]
            second_period = df_sorted.iloc[mid_point:]
            
            first_avg = first_period["produccion_mwh"].mean()
            second_avg = second_period["produccion_mwh"].mean()
            
            if first_avg > 0:
                growth_rate = ((second_avg - first_avg) / first_avg) * 100
                
                self.insights["crecimiento_historico"] = {
                    "primer_periodo_promedio": first_avg,
                    "segundo_periodo_promedio": second_avg,
                    "tasa_crecimiento": growth_rate,
                    "tendencia": "positiva" if growth_rate > 0 else "negativa"
                }
                
                print(f"   • Crecimiento histórico: {growth_rate:+.1f}%")
                print(f"   • Primer período: {first_avg:.2f} MWh promedio")
                print(f"   • Segundo período: {second_avg:.2f} MWh promedio")
    
    def _generate_risk_insights(self):
        """Generar insights de riesgo y diversificación"""
        print(f"\n⚠️  ANÁLISIS DE RIESGOS:")
        print("-" * 24)
        
        # Concentración geográfica
        dept_production = self.df.groupby("departamento")["produccion_mwh"].sum()
        total_production = dept_production.sum()
        
        concentration_risk = []
        for dept, production in dept_production.items():
            percentage = (production / total_production) * 100
            if percentage > 40:  # Concentración alta
                concentration_risk.append({
                    "departamento": dept,
                    "porcentaje": percentage,
                    "nivel_riesgo": "alto" if percentage > 60 else "medio"
                })
        
        self.insights["riesgo_concentracion"] = concentration_risk
        
        if concentration_risk:
            for risk in concentration_risk:
                print(f"   • {risk['departamento']}: {risk['porcentaje']:.1f}% - Riesgo {risk['nivel_riesgo']}")
        else:
            print("   • Diversificación geográfica adecuada")
        
        # Diversificación tecnológica
        tech_production = self.df.groupby("tecnologia")["produccion_mwh"].sum()
        tech_diversity = len(tech_production)
        
        self.insights["diversificacion_tecnologica"] = {
            "tecnologias_activas": tech_diversity,
            "distribucion": {tech: float((prod / total_production) * 100) for tech, prod in tech_production.items()},
            "nivel_diversificacion": "alta" if tech_diversity >= 3 else "media" if tech_diversity == 2 else "baja"
        }
        
        print(f"   • Diversificación tecnológica: {self.insights['diversificacion_tecnologica']['nivel_diversificacion']}")
    
    def _generate_correlation_insights(self):
        """Generar insights de correlaciones"""
        print(f"\n🔗 ANÁLISIS DE CORRELACIONES:")
        print("-" * 30)
        
        # Correlación entre departamentos y tecnologías
        cross_analysis = self.df.pivot_table(
            index="departamento", 
            columns="tecnologia", 
            values="produccion_mwh", 
            aggfunc="sum"
        ).fillna(0)
        
        correlations = {}
        if cross_analysis.shape[1] > 1:  # Si hay más de una tecnología
            for tech1 in cross_analysis.columns:
                for tech2 in cross_analysis.columns:
                    if tech1 != tech2:
                        corr = cross_analysis[tech1].corr(cross_analysis[tech2])
                        if abs(corr) > 0.5:  # Correlación significativa
                            correlations[f"{tech1}_vs_{tech2}"] = {
                                "correlacion": corr,
                                "tipo": "positiva" if corr > 0 else "negativa",
                                "fuerza": "fuerte" if abs(corr) > 0.7 else "moderada"
                            }
        
        self.insights["correlaciones_tecnologicas"] = correlations
        
        if correlations:
            for pair, data in correlations.items():
                techs = pair.replace("_vs_", " vs ")
                print(f"   • {techs}: Correlación {data['tipo']} {data['fuerza']} ({data['correlacion']:.2f})")
        else:
            print("   • No se encontraron correlaciones significativas")
        
        # Patrón de complementariedad
        if len(cross_analysis.columns) == 2:  # Solo para dos tecnologías
            tech_names = list(cross_analysis.columns)
            complementarity_score = 1 - abs(cross_analysis[tech_names[0]].corr(cross_analysis[tech_names[1]]))
            
            self.insights["complementariedad"] = {
                "score": complementarity_score,
                "nivel": "alta" if complementarity_score > 0.7 else "media" if complementarity_score > 0.4 else "baja",
                "tecnologias": tech_names
            }
            
            print(f"   • Complementariedad {' + '.join(tech_names)}: {self.insights['complementariedad']['nivel']}")
    
    def _get_month_name(self, month_num):
        """Obtener nombre del mes"""
        months = {
            1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril",
            5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto",
            9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre"
        }
        return months.get(month_num, f"Mes {month_num}")
    
    def get_comprehensive_insights(self):
        """Obtener todos los insights de forma estructurada para el reporte"""
        return {
            "liderazgo": self.insights.get("departamento_lider", {}),
            "tecnologia": self.insights.get("tecnologia_dominante", {}),
            "estacionalidad": self.insights.get("estacionalidad", {}),
            "eficiencia": self.insights.get("eficiencia_departamental", {}),
            "crecimiento": self.insights.get("crecimiento_historico", {}),
            "riesgos": self.insights.get("riesgo_concentracion", []),
            "diversificacion": self.insights.get("diversificacion_tecnologica", {}),
            "correlaciones": self.insights.get("correlaciones_tecnologicas", {}),
            "complementariedad": self.insights.get("complementariedad", {})
        }