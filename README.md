# Sitio web — René Fernando Chisco Ríos, Psicólogo & Coach

Sitio estático (HTML + CSS + JS, sin frameworks ni build step) listo para desplegar en Vercel/Netlify/GitHub Pages.

## Estructura

```
.
├── index.html            Inicio
├── sobre-mi.html         Biografía, formación y publicaciones
├── especialidades.html   Enfoque clínico y áreas de acompañamiento
├── retos.html            Los 7 Retos de 30 días + cuestionario interactivo
├── precios.html          Tarifas de consulta
├── opiniones.html        Testimonios de pacientes
├── multimedia.html       Galería de fotos y videos
├── contacto.html         Datos de contacto y ubicación
├── robots.txt
├── sitemap.xml
├── vercel.json
└── assets/
    ├── css/style.css     Todos los estilos (una sola hoja compartida)
    └── js/
        ├── nav.js            Menú móvil (todas las páginas)
        ├── wheel.js          Rueda de la Vida interactiva (solo index.html)
        ├── quiz.js           Cuestionario de los 7 Retos (solo retos.html)
        └── testimonials.js   Carrusel de opiniones (solo opiniones.html)
```

## Cómo editar contenido

Cada página es HTML plano: abre el archivo `.html` correspondiente y edita el texto directamente.
Los estilos viven todos en `assets/css/style.css` — cambia colores en las variables `:root` al inicio del archivo.

## Cómo desplegar (Vercel + GitHub)

1. Sube este repositorio a GitHub (ver pasos abajo).
2. Entra a [vercel.com](https://vercel.com) → **Add New → Project** → importa el repositorio de GitHub.
3. Vercel detecta que es un sitio estático automáticamente (no necesita build command).
4. Cada `git push` a la rama principal despliega automáticamente en producción.
5. En **Settings → Domains**, agrega `psrenechisco.com` y sigue las instrucciones de DNS que te muestre Vercel (registros A/CNAME) para configurarlos en tu proveedor de dominio (DonDominio).

## Subir a GitHub por primera vez

```bash
git init
git add .
git commit -m "Sitio inicial: René Chisco, psicólogo y coach"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/psrenechisco.git
git push -u origin main
```
