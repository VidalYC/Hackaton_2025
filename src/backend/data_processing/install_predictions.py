# install_predictions.py - Ejecutar ANTES de usar las predicciones

import subprocess
import sys
import os


def install_dependencies():
    """Instalar dependencias necesarias"""

    print("🔧 INSTALANDO DEPENDENCIAS PARA PREDICCIONES")
    print("=" * 50)

    # Dependencias esenciales (funcionan siempre)
    essential_packages = [
        "pandas>=1.5.0",
        "numpy>=1.21.0",
        "scikit-learn>=1.1.0",
        "python-dateutil>=2.8.0",
    ]

    # Dependencias opcionales
    optional_packages = ["prophet>=1.1.0"]  # Puede fallar en algunos sistemas

    print("📦 Instalando paquetes esenciales...")
    success_count = 0

    for package in essential_packages:
        try:
            print(f"   Instalando {package}...")
            subprocess.check_call(
                [sys.executable, "-m", "pip", "install", package],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            print(f"   ✅ {package}")
            success_count += 1
        except subprocess.CalledProcessError:
            print(f"   ❌ Error con {package}")

    print(f"\n📦 Instalando paquetes opcionales...")
    for package in optional_packages:
        try:
            print(f"   Intentando {package}...")
            subprocess.check_call(
                [sys.executable, "-m", "pip", "install", package],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            print(f"   ✅ {package}")
        except subprocess.CalledProcessError:
            print(f"   ⚠️ {package} no disponible (no es crítico)")
            print(f"      Las predicciones ML seguirán funcionando")

    if success_count >= 3:
        print(f"\n🎉 ¡Instalación exitosa!")
        print(
            f"✅ {success_count}/{len(essential_packages)} paquetes esenciales instalados"
        )
    else:
        print(f"\n⚠️ Instalación parcial")
        print(f"❌ Solo {success_count}/{len(essential_packages)} paquetes instalados")


def test_imports():
    """Verificar que las importaciones funcionen"""
    print(f"\n🧪 VERIFICANDO INSTALACIÓN...")
    print("-" * 30)

    test_results = {}

    # Test pandas
    try:
        import pandas as pd

        test_results["pandas"] = "✅ OK"
    except ImportError:
        test_results["pandas"] = "❌ Falta"

    # Test numpy
    try:
        import numpy as np

        test_results["numpy"] = "✅ OK"
    except ImportError:
        test_results["numpy"] = "❌ Falta"

    # Test scikit-learn
    try:
        from sklearn.ensemble import RandomForestRegressor

        test_results["scikit-learn"] = "✅ OK"
    except ImportError:
        test_results["scikit-learn"] = "❌ Falta"

    # Test prophet (opcional)
    try:
        from prophet import Prophet

        test_results["prophet"] = "✅ OK"
    except ImportError:
        test_results["prophet"] = "⚠️ No disponible (opcional)"

    print("Estado de dependencias:")
    for package, status in test_results.items():
        print(f"   {package}: {status}")

    # Evaluar funcionalidades disponibles
    essential_ok = all(
        test_results.get(pkg, "").startswith("✅")
        for pkg in ["pandas", "numpy", "scikit-learn"]
    )

    if essential_ok:
        print(f"\n🚀 ¡Sistema listo para predicciones!")
        print(f"📋 Funcionalidades disponibles:")
        print(f"   • Machine Learning: ✅")

        if test_results.get("prophet", "").startswith("✅"):
            print(f"   • Prophet (Series temporales): ✅")
        else:
            print(f"   • Prophet (Series temporales): ⚠️ No disponible")

        print(f"\n▶️ SIGUIENTE PASO:")
        print(f"   python main.py")

        return True
    else:
        print(f"\n❌ Faltan dependencias esenciales")
        print(f"💡 Ejecuta manualmente:")
        print(f"   pip install pandas numpy scikit-learn")
        return False


def create_requirements_file():
    """Crear archivo requirements.txt"""
    requirements_content = """# Dependencias para predicciones de energía
pandas>=1.5.0
numpy>=1.21.0
scikit-learn>=1.1.0
python-dateutil>=2.8.0

# Opcional - Prophet para series temporales avanzadas
# prophet>=1.1.0

# Opcional - Para visualizaciones
# matplotlib>=3.5.0
# seaborn>=0.11.0
"""

    with open("requirements.txt", "w") as f:
        f.write(requirements_content)

    print(f"📄 Archivo requirements.txt creado")


def main():
    """Función principal de instalación"""

    if len(sys.argv) > 1:
        if sys.argv[1] == "test":
            test_imports()
            return
        elif sys.argv[1] == "requirements":
            create_requirements_file()
            return

    # Instalación completa
    install_dependencies()

    print(f"\n" + "=" * 50)
    success = test_imports()

    if success:
        create_requirements_file()

        print(f"\n📋 ARCHIVOS CREADOS:")
        print(f"   • requirements.txt")

        print(f"\n🎯 PRÓXIMOS PASOS:")
        print(f"   1. Crea los archivos de código (config.py, predictor.py, etc.)")
        print(f"   2. Modifica tu main.py")
        print(f"   3. Ejecuta: python main.py")
    else:
        print(f"\n🔧 Necesitas resolver las dependencias primero")


if __name__ == "__main__":
    main()
