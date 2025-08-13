import pandas as pd

def cross_analysis(df):
    insights = {}
    cross_matrix = pd.crosstab(
        df["departamento"],
        df["tecnologia"],
        values=df["produccion_mwh"],
        aggfunc="sum"
    ).fillna(0)

    insights["analisis_cruzado"] = {
        "matriz_cruzada": cross_matrix.to_dict()
    }

    print("\n" + "=" * 50)
    print("🔄 ANÁLISIS CRUZADO AVANZADO")
    print("=" * 50)
    print("Matriz de especialización tecnológica por departamento calculada")

    return insights
