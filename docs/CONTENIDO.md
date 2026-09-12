# Qué editar en la web

Todo el contenido está en `docs/index.html`. Los puntos marcados con
`<!-- EDITABLE -->` en el HTML son los que conviene revisar antes de enseñar
la web a nadie.

## 1. Datos que he sacado de fuentes públicas (revísalos)

| Dato | De dónde sale | Dónde se usa |
|---|---|---|
| Nombre completo | Tu petición | Título, perfil, pie |
| Usuario de GitHub `jlazzar` | Repositorio actual | Hero, contacto |
| Proyecto de generación eléctrica | Código y CSV de este repositorio | Sección Proyectos |
| Cifras del gráfico (12.815 MW de solar, 63,1 % renovable, 361 registros) | Calculadas sobre `Generacion_de_energia_en_Espanha.csv` | Hero, proyectos |
| Formación en la UOC | Asignatura "Tipología y ciclo de vida del dato" del repositorio | Hero, trayectoria |
| **Amazon** | Titular del perfil público de LinkedIn | Trayectoria, episodio 01 |
| Enlace a LinkedIn | Búsqueda web | Contacto |

**Amazon** y el enlace de LinkedIn salen de una búsqueda en internet, no de
información que me hayas dado: confirma que el perfil es el tuyo y ajusta el
puesto y las fechas.

## 2. Lo que falta por poner

- **Correo de contacto**: añade una fila más en la lista de contacto:
  ```html
  <li><a href="mailto:TU@CORREO.COM">Correo<span>TU@CORREO.COM ↗</span></a></li>
  ```
  (lo he dejado fuera a propósito para no publicar tu dirección sin permiso).
- **Foto real**: sustituye `assets/img/avatar.svg` por tu foto (`avatar.jpg`) y
  cambia el `src` de la etiqueta `<img>` en la sección Perfil. El retrato actual
  es una ilustración genérica en estilo anime, no un parecido tuyo.
- **Niveles de habilidad**: son una estimación. Cambia el texto `LV 80` y el
  valor `--lv:80%` de cada barra.
- **Trayectoria**: puestos, empresas y fechas reales.
- **Segundo proyecto**: sustituye la tarjeta "Próximo episodio".

## 3. Detalles de diseño

- Paleta y tipografías: variables CSS al principio de `assets/css/style.css`.
- Colores del gráfico: `--c-solar`, `--c-hidro`, `--c-eolica`, `--c-nuclear`
  (elegidos para que se distingan también con daltonismo sobre fondo oscuro).
- Los pétalos de sakura y las animaciones se desactivan solos si el sistema
  operativo pide menos movimiento.
