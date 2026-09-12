# UOC · Tipología y Ciclo de Vida del Dato

Repositorio de la **PR1** de la asignatura, más la **web personal de portfolio**.

## 1. Práctica: generación de energía en España

- `Generacion_de_energia_en_Espanha.py` — scraper de [demanda.ree.es](https://demanda.ree.es)
  (Red Eléctrica) con Selenium + BeautifulSoup: abre la tabla que se dibuja por
  JavaScript y vuelca las 12 tecnologías de generación a CSV.
- `Generacion_de_energia_en_Espanha.csv` — 361 registros a resolución de 5 minutos
  (12–14 de abril de 2024).
- `requirements.txt` — dependencias.

## 2. Web personal (`docs/`)

Sitio estático, sin dependencias ni build: HTML, CSS y un archivo JS.

```
docs/
├── index.html              # todo el contenido
├── CONTENIDO.md            # qué editar antes de publicar
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/avatar.svg, favicon.svg
```

### Verla en local

```bash
python3 -m http.server 8000 --directory docs
# http://localhost:8000
```

### Publicarla en GitHub Pages

Dos formas; elige una.

**A. Servir la carpeta `docs/` (la más simple)**

1. `Settings` → `Pages`.
2. *Source*: **Deploy from a branch**.
3. Rama `main`, carpeta **`/docs`** → `Save`.

**B. Con GitHub Actions** (workflow ya incluido en `.github/workflows/pages.yml`)

1. `Settings` → `Pages` → *Source*: **GitHub Actions**.
2. Cada push a `main` que toque `docs/` publica la web.

En ambos casos la dirección será:

```
https://jlazzar.github.io/UOC_Tipolog-a_energia/
```

Para tenerla en `https://jlazzar.github.io` (sin subcarpeta), crea un repositorio
llamado `jlazzar.github.io` y copia dentro el contenido de `docs/`. Todas las
rutas del sitio son relativas, así que funciona igual en los dos casos.
