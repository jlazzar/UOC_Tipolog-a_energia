# CLAUDE.md

This file provides guidance for AI assistants working on this repository.

## Project Overview

**UOC_Tipología_energia** is an academic data scraping project (PR1 – Tipología y Ciclo de los datos) that extracts Spanish electricity generation data from the REE (Red Eléctrica de España) visualization portal and saves it to CSV.

- **Language:** Python 3.11
- **Purpose:** Web scraping + data collection for academic analysis
- **Output:** Time-series CSV of energy generation by type (MW, 5-minute intervals)

---

## Repository Structure

```
/
├── Generacion_de_energia_en_Espanha.py   # Main scraper script
├── Generacion_de_energia_en_Espanha.csv  # Scraped output data
├── requirements.txt                       # Python dependencies (UTF-16 LE encoded)
├── README.md                              # Minimal project title
└── CLAUDE.md                              # This file
```

There are no subdirectories, test files, CI/CD pipelines, or build tooling.

---

## Key File Details

### `Generacion_de_energia_en_Espanha.py`
The only source file. It:
1. Launches a headless Chrome browser via Selenium + `webdriver-manager`
2. Navigates to a hardcoded REE URL (`https://demanda.ree.es/visiona/peninsula/demandaqh/tablas/2024-04-13/2`)
3. Parses the HTML table (`id="tabla_generacion"`) with BeautifulSoup
4. Builds a CSV string from headers + rows using string concatenation
5. Writes the result to `Generacion_de_energia_en_Espanha.csv`

**Known limitations (do not "fix" without being asked):**
- URL is hardcoded — changing the date requires editing the source
- No error handling (try/except)
- Browser is not explicitly closed after use
- CSV is built via string concatenation rather than pandas/csv module

### `requirements.txt`
- Encoded in **UTF-16 LE with CRLF** line endings — read/edit carefully to avoid encoding corruption
- Contains 148 pinned packages including `selenium==4.19.0`, `beautifulsoup4==4.12.0`, `pandas==2.0.0`, `matplotlib==3.7.1`, and full Jupyter stack

### `Generacion_de_energia_en_Espanha.csv`
Generated output. **Do not commit manual edits** — it is produced by running the script.

Energy columns (all in MW):
`Hora`, `Eólica`, `Nuclear`, `Fuel/gas`, `Carbón`, `Ciclo combinado`, `Hidráulica`, `Intercambios int`, `Enlace balear`, `Solar fotovoltaica`, `Solar térmica`, `Térmica renovable`, `Cogeneración y residuos`

---

## Development Workflow

### Setup

```bash
pip install -r requirements.txt
```

> Note: `requirements.txt` is UTF-16 LE encoded. If pip fails to parse it, convert first:
> ```bash
> iconv -f UTF-16 -t UTF-8 requirements.txt > requirements_utf8.txt
> pip install -r requirements_utf8.txt
> ```

### Running the scraper

```bash
python Generacion_de_energia_en_Espanha.py
```

Requires Chrome/Chromium to be installed. `webdriver-manager` downloads ChromeDriver automatically.

### Changing the target date

Edit the URL in the script (line with `driver.get(...)`). The date format in the URL is `YYYY-MM-DD`:

```
https://demanda.ree.es/visiona/peninsula/demandaqh/tablas/YYYY-MM-DD/2
```

---

## Conventions

- **Language:** Variable names and comments are in Spanish; follow this convention when editing the script
- **Style:** Procedural (no classes), simple and direct — keep changes minimal and consistent with existing style
- **No tests:** There is no test suite; do not add one unless explicitly requested
- **No linter/formatter config:** No `.flake8`, `pyproject.toml`, or similar files exist

---

## Branch Strategy

- `master` / `main` — stable base
- `claude/*` — branches used by AI assistants for automated changes

Always develop on the branch specified in the task and push there. Never push to `master`/`main` without explicit user approval.
