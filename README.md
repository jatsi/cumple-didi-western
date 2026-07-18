# Feliz cumpleaños DIDI — Vite estático

Página responsiva e interactiva preparada para Vite y GitHub Pages.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Añadir la canción

Coloca el archivo MP3 en:

```text
public/music.mp3
```

## Generar la versión de producción

```bash
npm run build
```

Vite creará la página terminada en la carpeta `dist/`.

## Publicar en GitHub Pages

1. Sube este proyecto a un repositorio de GitHub.
2. En **Settings → Pages**, selecciona **GitHub Actions** como fuente.
3. El flujo incluido en `.github/workflows/deploy.yml` publicará el sitio automáticamente.
