import os

# Ruta al directorio que contiene las imágenes
directorio = './assets/images/Test_14'

# Recorrer todos los archivos en el directorio
for filename in os.listdir(directorio):
    # Verificar si el archivo tiene la extensión .PNG
    if filename.endswith('.PNG'):
        # Crear el nuevo nombre del archivo con extensión .png
        nuevo_nombre = filename[:-4] + '.png'
        # Obtener la ruta completa de los archivos
        ruta_vieja = os.path.join(directorio, filename)
        ruta_nueva = os.path.join(directorio, nuevo_nombre)
        # Renombrar el archivo
        os.rename(ruta_vieja, ruta_nueva)
        print(f'Renombrado: {ruta_vieja} -> {ruta_nueva}')

print('Renombrado completado.')