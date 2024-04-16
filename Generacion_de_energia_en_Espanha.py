# Importación de las bibliotecas necesarias para trabajar con Selenium y BeautifulSoup
from selenium import webdriver 
from selenium.webdriver.chrome.service import Service as ChromeService 
from webdriver_manager.chrome import ChromeDriverManager 
from bs4 import BeautifulSoup

# URL de la página de la que extraemos los datos, existe la posibilidad de modificar la fecha
url = 'https://demanda.ree.es/visiona/peninsula/demandaqh/tablas/2024-04-13/2' 

# Configuración de Selenium para usar el navegador Chrome con un driver gestionado automáticamente
driver = webdriver.Chrome(service=ChromeService( 
	ChromeDriverManager().install())) 

# Navegamos por la URL especificada
driver.get(url) 

# Utilizamos BeautifulSoup para parsear el código fuente de la página cargada
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Buscamos todas las filas (<tr>) dentro de la tabla con el ID 'tabla_generacion'
rows = (soup.find('table', id='tabla_generacion').find_all('tr'))
print(len(rows))

# Buscamos todos los encabezados de columna (<th>) dentro de la misma tabla
header = (soup.find('table', id='tabla_generacion').find_all('th'))

# Extraemos el texto de cada encabezado y almacenarlos en una lista si tienen atributo de clase
column_titles = [th.get_text(strip=True) for th in header if th.get('class')]

# Mostrar cada título de columna
for title in column_titles:
    print(title)

# Unimos todos los títulos de las columnas con comas para formar la cabecera del archivo CSV
csv = ", ".join(column_titles)
print(csv)

# Iteramos sobre cada fila de la tabla
for row in rows:
    # Buscamos todas las celdas (<td>) dentro de cada fila
    columns = row.find_all("td")
    print(columns , "\n")
    # Para cada celda en la fila, extraemos el texto y lo añadimos a la cadena CSV seguido de una coma
    for column in columns:
        print(column.text)
        csv = csv + column.text + ","
    # Añadimos un salto de línea al final de cada fila procesada en el CSV    
    csv = csv + "\n"

print(csv)

# Guardamos el contenido del CSV en un archivo llamado 'energia2.csv'
with open("Generacion_de_energia_en_Espanha.csv" , "+w") as csv_file:
    csv_file.write(csv)







