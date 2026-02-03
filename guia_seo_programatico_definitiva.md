# 🔧 GUÍA DEFINITIVA: SEO PROGRAMÁTICO
## Todo lo que debes implementar en CADA página para dominar Google

---

# PARTE 1: FUNDAMENTOS

El SEO programático consiste en crear miles de páginas optimizadas automáticamente usando templates + datos dinámicos.

**Fórmula básica:**
```
PÁGINA = Template HTML + Variables de BD + Contenido Dinámico + Schema + Internal Links
```

---

# PARTE 2: ESTRUCTURA DE URLs

## Patrones de URL

```
Nivel 1 - Categoría:         /saunas/
Nivel 2 - Subcategoría:      /saunas/finlandesas/
Nivel 3 - Atributo:          /saunas/finlandesas/4-personas/
Nivel 4 - Ciudad:            /saunas-madrid/
Nivel 5 - Producto+Ciudad:   /sauna-finlandesa-madrid/
Nivel 6 - Long-tail:         /sauna-para-jardin-pequeño/
Nivel 7 - Comparativa:       /sauna-finlandesa-vs-infrarroja/
Nivel 8 - Informacional:     /cuanto-cuesta-sauna/
```

## Generador de URLs (Python)

```python
productos = ['saunas', 'jacuzzis', 'futbolines', 'mesas-billar']
tipos = {
    'saunas': ['finlandesas', 'infrarrojos', 'exterior', 'barril'],
    'jacuzzis': ['exterior', 'hinchables', 'acrilico'],
    'futbolines': ['profesionales', 'baratos', 'exterior'],
    'mesas-billar': ['americano', 'ingles', 'snooker']
}
ciudades = ['madrid', 'barcelona', 'valencia', 'sevilla', ...] # 250 ciudades

urls = []

# Categorías
for p in productos:
    urls.append(f'/{p}/')

# Subcategorías  
for p, subtipos in tipos.items():
    for t in subtipos:
        urls.append(f'/{p}/{t}/')

# Producto + Ciudad
for p in productos:
    for c in ciudades:
        urls.append(f'/{p}-{c}/')

# Total: 15,000+ URLs
```

---

# PARTE 3: ELEMENTO POR ELEMENTO - QUÉ IMPLEMENTAR

---

## 3.1 TITLE TAG

**Reglas:**
- Máximo 60 caracteres
- Keyword principal al inicio
- Único por página

**Fórmulas por tipo:**

| Tipo página | Fórmula | Ejemplo |
|-------------|---------|---------|
| Categoría | `{Producto} - Guía Compra y Mejores {Año}` | Saunas - Guía Compra y Mejores 2026 |
| Producto+Ciudad | `{Producto} en {Ciudad} | Precio desde {€}` | Saunas en Madrid | Precio desde 1.999€ |
| Subcategoría | `{Producto} {Tipo} | {Beneficio} - {Marca}` | Saunas Finlandesas | Envío Gratis - TuMarca |
| Comparativa | `{A} vs {B}: ¿Cuál Elegir? [{Año}]` | Sauna vs Jacuzzi: ¿Cuál Elegir? [2026] |
| Informacional | `¿Cuánto Cuesta {Producto}? Precios {Año}` | ¿Cuánto Cuesta Sauna? Precios 2026 |
| Local | `Tienda {Producto} {Ciudad} | Instalación` | Tienda Saunas Madrid | Instalación |

**Código generador:**

```python
def generar_title(tipo, datos):
    templates = {
        'categoria': f"{datos['producto']} - Guía Compra y Mejores {datos['año']}",
        'producto_ciudad': f"{datos['producto']} en {datos['ciudad']} | Desde {datos['precio']}€",
        'subcategoria': f"{datos['producto']} {datos['tipo']} | {datos['beneficio']}",
        'comparativa': f"{datos['a']} vs {datos['b']}: ¿Cuál Elegir? [{datos['año']}]",
        'informacional': f"¿Cuánto Cuesta {datos['producto']}? Precios {datos['año']}",
        'local': f"Tienda {datos['producto']} {datos['ciudad']} | Instalación"
    }
    title = templates[tipo]
    return title[:60] if len(title) > 60 else title
```

---

## 3.2 META DESCRIPTION

**Reglas:**
- Máximo 155 caracteres
- Incluir CTA
- Emojis/símbolos para CTR (✓ ★ € ☎)
- Único por página

**Fórmulas:**

| Tipo | Fórmula |
|------|---------|
| Transaccional | `Compra {producto} en {ciudad} al mejor precio. ✓ Envío gratis ✓ Instalación ✓ Garantía {años} años. Desde {precio}€` |
| Informacional | `Todo sobre {producto}: tipos, precios y guía completa. ✓ Comparativas ✓ Consejos expertos. Actualizado {año}` |
| Local | `{Producto} en {ciudad} con instalación incluida. ✓ Presupuesto gratis ✓ Servicio 24h. ☎ {teléfono}` |
| Comparativa | `{A} o {B}: ¿cuál elegir? Comparamos precio, calidad y más. Descubre cuál es mejor para ti en {año}` |

**Código:**

```python
def generar_meta_description(tipo, datos):
    templates = {
        'transaccional': f"Compra {datos['producto']} en {datos['ciudad']} al mejor precio. ✓ Envío gratis ✓ Instalación ✓ Garantía {datos['garantia']} años. Desde {datos['precio']}€",
        'informacional': f"Todo sobre {datos['producto']}: tipos, precios y guía completa. ✓ Comparativas ✓ Consejos expertos. Actualizado {datos['año']}",
        'local': f"{datos['producto']} en {datos['ciudad']} con instalación. ✓ Presupuesto gratis ✓ Servicio 24h. ☎ {datos['telefono']}",
        'comparativa': f"{datos['a']} o {datos['b']}: ¿cuál elegir? Comparamos precio, calidad y más. Guía {datos['año']}"
    }
    desc = templates[tipo]
    return desc[:155] if len(desc) > 155 else desc
```

---

## 3.3 H1 (ENCABEZADO PRINCIPAL)

**Reglas:**
- Solo 1 H1 por página
- Keyword principal incluida
- Diferente del Title (pero relacionado)

**Fórmulas:**

| Tipo | H1 |
|------|-----|
| Categoría | `{Producto}: Guía de Compra y Mejores Modelos {Año}` |
| Producto+Ciudad | `{Producto} en {Ciudad} | Venta, Precio e Instalación` |
| Subcategoría | `{Producto} {Tipo}: Comparativa y Precios {Año}` |
| Comparativa | `{A} vs {B}: ¿Cuál Elegir en {Año}?` |
| Informacional | `¿Cuánto Cuesta {Producto}? Guía de Precios {Año}` |

---

## 3.4 PÁRRAFO INTRO (Featured Snippet)

**Reglas:**
- 40-60 palabras
- Responde la pregunta principal directamente
- Primera posición del contenido (bajo H1)

**Templates optimizados para Featured Snippet:**

**Para precios:**
```
El precio de {producto} en {ciudad} varía entre {min}€ y {max}€ 
dependiendo del {factor}. Los modelos {tipo_económico} cuestan 
{rango_bajo}, mientras que los {tipo_premium} oscilan entre 
{rango_alto}. El precio {incluye/no incluye} instalación.
```

**Para definiciones:**
```
{Producto} es {definición_corta}. Se caracteriza por 
{característica_principal} y se utiliza principalmente para 
{uso_principal}. Los modelos más populares son {modelos} y 
los precios van desde {precio_min}€.
```

**Para comparativas:**
```
{A} es mejor para {caso_a}, mientras que {B} destaca en 
{caso_b}. En precio, {más_económico} es más asequible 
({precio_a}€ vs {precio_b}€). La principal diferencia es 
{diferencia_clave}.
```

---

## 3.5 ESTRUCTURA DE HEADINGS (H2, H3)

**Jerarquía correcta:**

```
H1: {Producto} en {Ciudad} | Venta y Precio
  │
  ├── H2: Tipos de {producto} disponibles en {ciudad}
  │     ├── H3: {Tipo 1}
  │     ├── H3: {Tipo 2}
  │     └── H3: {Tipo 3}
  │
  ├── H2: Precios de {producto} en {ciudad} {año}
  │
  ├── H2: Cómo elegir {producto} en {ciudad}
  │     ├── H3: Factor 1: {nombre}
  │     ├── H3: Factor 2: {nombre}
  │     └── H3: Factor 3: {nombre}
  │
  ├── H2: Instalación de {producto} en {ciudad}
  │     ├── H3: Proceso de instalación
  │     └── H3: Zonas de servicio
  │
  ├── H2: Preguntas frecuentes sobre {producto} en {ciudad}
  │
  └── H2: {Producto} en ciudades cercanas a {ciudad}
```

---

## 3.6 CONTENIDO DE SECCIONES

### Sección: Tipos de producto

```html
<section>
    <h2>Tipos de {producto} disponibles en {ciudad}</h2>
    
    <p>En {ciudad} puedes encontrar {número} tipos de {producto}:</p>
    
    <div class="grid">
        <!-- Por cada tipo -->
        <article>
            <h3>{tipo_nombre}</h3>
            <img src="{imagen}" alt="{tipo_nombre} en {ciudad}" loading="lazy">
            <p>{descripción_corta}</p>
            <ul>
                <li><strong>Precio:</strong> desde {precio}€</li>
                <li><strong>Ideal para:</strong> {uso}</li>
                <li><strong>Espacio:</strong> {medidas}</li>
            </ul>
            <a href="/{producto}/{tipo_slug}/">Ver modelos</a>
        </article>
    </div>
</section>
```

### Sección: Tabla de precios

```html
<section>
    <h2>Precios de {producto} en {ciudad} {año}</h2>
    
    <p>Los precios varían según {factores}:</p>
    
    <table>
        <thead>
            <tr>
                <th>Modelo</th>
                <th>Precio desde</th>
                <th>Precio hasta</th>
                <th>Instalación</th>
            </tr>
        </thead>
        <tbody>
            <!-- Por cada producto -->
            <tr>
                <td>{nombre}</td>
                <td>{precio_min}€</td>
                <td>{precio_max}€</td>
                <td>{incluida/no incluida}</td>
            </tr>
        </tbody>
    </table>
    
    <p><small>Precios actualizados a {fecha}. IVA incluido.</small></p>
</section>
```

### Sección: Guía de compra

```html
<section>
    <h2>Cómo elegir {producto} en {ciudad}</h2>
    
    <h3>1. {Factor_1}</h3>
    <p>{Explicación con datos específicos}</p>
    
    <h3>2. {Factor_2}</h3>
    <p>{Explicación con datos específicos}</p>
    
    <h3>3. {Factor_3}</h3>
    <p>{Explicación con datos específicos}</p>
    
    <aside class="tip">
        <strong>💡 Consejo experto:</strong> {consejo_útil}
    </aside>
</section>
```

### Sección: Contenido local

```html
<section>
    <h2>{Producto} en {ciudad}: Servicio local</h2>
    
    <p>Ofrecemos servicio de {producto} en {ciudad} y toda la 
    provincia de {provincia}. Cubrimos: {lista_localidades}.</p>
    
    <h3>El clima de {ciudad} y tu {producto}</h3>
    <p>{ciudad} tiene {tipo_clima}. Por eso, {producto} 
    {recomendación_según_clima}.</p>
    
    <h3>Zonas de servicio cerca de {ciudad}</h3>
    <ul>
        <!-- Por cada ciudad cercana -->
        <li><a href="/{producto}-{slug}/">{nombre}</a> ({km} km)</li>
    </ul>
    
    <h3>Instaladores en {ciudad}</h3>
    <p>Contamos con {número} instaladores certificados en {ciudad}. 
    Tiempo de instalación: {tiempo}.</p>
</section>
```

---

## 3.7 SECCIÓN FAQ

**Implementación con Schema:**

```html
<section itemscope itemtype="https://schema.org/FAQPage">
    <h2>Preguntas frecuentes: {producto} en {ciudad}</h2>
    
    <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name">¿Cuánto cuesta {producto} en {ciudad}?</summary>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">El precio de {producto} en {ciudad} va desde 
            {min}€ hasta {max}€ dependiendo de {factores}.</p>
        </div>
    </details>
    
    <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name">¿Dónde comprar {producto} en {ciudad}?</summary>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">Puedes comprar {producto} en {ciudad} en nuestra 
            tienda online con envío a {ciudad} y alrededores.</p>
        </div>
    </details>
    
    <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name">¿Cuánto tarda el envío a {ciudad}?</summary>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">El envío a {ciudad} tarda {tiempo}. 
            Productos en stock: 24-48h.</p>
        </div>
    </details>
    
    <!-- Mínimo 5 FAQs por página -->
</section>
```

**FAQs dinámicas por tipo de página:**

```python
faqs = {
    'producto_ciudad': [
        ('¿Cuánto cuesta {producto} en {ciudad}?', 
         'El precio va desde {min}€ hasta {max}€...'),
        ('¿Dónde comprar {producto} en {ciudad}?', 
         'Compra en nuestra tienda online con envío a {ciudad}...'),
        ('¿Cuánto tarda el envío a {ciudad}?', 
         'El envío a {ciudad} tarda {tiempo}...'),
        ('¿Incluye instalación?', 
         'Ofrecemos instalación profesional en {ciudad}...'),
        ('¿Qué garantía tiene?', 
         'Garantía de {años} años con servicio técnico en {ciudad}...')
    ],
    'informacional': [
        ('¿Qué es {producto}?', 
         '{Producto} es {definición}...'),
        ('¿Cuáles son los beneficios?', 
         'Los principales beneficios son: {lista}...'),
        ('¿Cuánto consume de electricidad?', 
         'El consumo es de {kw} kWh, unos {euros}€/mes...'),
        ('¿Necesito permiso para instalarlo?', 
         '{Información sobre permisos}...'),
        ('¿Cuánto espacio necesito?', 
         'Espacio mínimo: {m2}. Recomendado: {m2_rec}...')
    ]
}
```

---

## 3.8 INTERNAL LINKING

**Reglas:**
- 5-10 links internos por página
- Anchor text variado
- Links contextuales (dentro del contenido)
- Sección de relacionados al final

**Dónde colocar links:**

| Ubicación | Nº links | Tipo |
|-----------|----------|------|
| Breadcrumbs | 2-3 | Navegación |
| Intro | 1-2 | Contextual |
| Contenido | 3-5 | Contextual |
| Productos relacionados | 3-5 | Lista |
| Ciudades cercanas | 5-10 | Lista |
| Guías relacionadas | 2-3 | Lista |

**Implementación:**

```html
<!-- Breadcrumbs -->
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Inicio</a></li>
        <li><a href="/{categoria}/">{Categoría}</a></li>
        <li><a href="/{categoria}/{subcategoria}/">{Subcategoría}</a></li>
        <li>{Página actual}</li>
    </ol>
</nav>

<!-- Link contextual en párrafo -->
<p>Si buscas opciones más económicas, consulta nuestras 
<a href="/{producto}-baratos/">{producto} baratos</a>.</p>

<!-- Sección de relacionados -->
<section class="relacionados">
    <h2>También te puede interesar</h2>
    
    <h3>Productos similares</h3>
    <ul>
        <li><a href="{url}">{Producto} {tipo}</a></li>
        <li><a href="{url}">Ver {producto} {característica}</a></li>
    </ul>
    
    <h3>{Producto} en ciudades cercanas</h3>
    <ul>
        <li><a href="/{producto}-{ciudad}/">{Producto} en {Ciudad}</a></li>
    </ul>
    
    <h3>Guías útiles</h3>
    <ul>
        <li><a href="/como-elegir-{producto}/">Cómo elegir {producto}</a></li>
        <li><a href="/cuanto-cuesta-{producto}/">¿Cuánto cuesta {producto}?</a></li>
    </ul>
</section>
```

**Variación de anchor text (evitar sobre-optimización):**

```python
anchors_producto_ciudad = [
    "{producto} en {ciudad}",
    "{producto} {ciudad}",
    "Comprar {producto} en {ciudad}",
    "Ver opciones en {ciudad}",
    "{producto} - {ciudad}",
    "Tienda de {producto} en {ciudad}"
]

def generar_anchor(producto, ciudad, seed):
    random.seed(seed)  # Consistente por página
    template = random.choice(anchors_producto_ciudad)
    return template.format(producto=producto, ciudad=ciudad)
```

---

## 3.9 IMÁGENES

**Reglas:**
- Alt text único y descriptivo
- Nombre archivo con keywords
- Formato WebP
- Lazy loading (excepto above-the-fold)
- Dimensiones especificadas

**Nomenclatura de archivos:**

```
{producto}-{característica}-{ciudad}.webp

Ejemplos:
sauna-finlandesa-4-personas-madrid.webp
jacuzzi-exterior-acrilico-barcelona.webp
futbolin-profesional-negro.webp
```

**Alt text dinámico:**

```python
def generar_alt(imagen_tipo, producto, ciudad=None):
    alts = {
        'principal': f"{producto.nombre} - Vista principal",
        'detalle': f"Detalle de {producto.nombre}",
        'instalacion': f"{producto.nombre} instalado en {ciudad.nombre}" if ciudad else f"{producto.nombre} instalado",
        'medidas': f"Medidas de {producto.nombre}",
        'uso': f"Persona usando {producto.nombre}"
    }
    return alts.get(imagen_tipo, producto.nombre)
```

**HTML optimizado:**

```html
<!-- Imagen principal (sin lazy) -->
<img 
    src="/{producto}-{ciudad}.webp"
    alt="{producto.nombre} en {ciudad.nombre}"
    width="800" 
    height="600"
    fetchpriority="high"
>

<!-- Resto de imágenes (con lazy) -->
<img 
    src="/{producto}-detalle.webp"
    alt="Detalle de {producto.nombre}"
    width="400" 
    height="300"
    loading="lazy"
    decoding="async"
>
```

---

## 3.10 SCHEMA MARKUP

### Schema Product

```json
{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "{producto.nombre}",
    "image": ["{imagen_1}", "{imagen_2}", "{imagen_3}"],
    "description": "{producto.descripcion}",
    "brand": {
        "@type": "Brand",
        "name": "{producto.marca}"
    },
    "sku": "{producto.sku}",
    "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": "{producto.precio_min}",
        "highPrice": "{producto.precio_max}",
        "availability": "https://schema.org/InStock",
        "seller": {
            "@type": "Organization",
            "name": "{tu_tienda}"
        }
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "{producto.rating}",
        "reviewCount": "{producto.num_reviews}"
    }
}
```

### Schema LocalBusiness

```json
{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "{tienda} - {ciudad.nombre}",
    "url": "{url_pagina}",
    "telephone": "{telefono}",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "{ciudad.nombre}",
        "addressRegion": "{ciudad.provincia}",
        "postalCode": "{ciudad.cp}",
        "addressCountry": "ES"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "{ciudad.lat}",
        "longitude": "{ciudad.lng}"
    },
    "areaServed": [
        {"@type": "City", "name": "{ciudad.nombre}"},
        {"@type": "City", "name": "{ciudad_cercana_1}"},
        {"@type": "City", "name": "{ciudad_cercana_2}"}
    ],
    "priceRange": "€€€"
}
```

### Schema FAQPage

```json
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "{pregunta_1}",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "{respuesta_1}"
            }
        },
        {
            "@type": "Question",
            "name": "{pregunta_2}",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "{respuesta_2}"
            }
        }
    ]
}
```

### Schema BreadcrumbList

```json
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://tudominio.com/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "{categoria}",
            "item": "https://tudominio.com/{categoria}/"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "{pagina_actual}"
        }
    ]
}
```

---

## 3.11 CANONICAL Y HREFLANG

**Canonical:**

```html
<link rel="canonical" href="https://tudominio.com/{url_limpia}/">
```

Reglas:
- Sin parámetros (?sort=, ?filter=)
- Sin trailing slashes duplicados
- HTTPS siempre

**Hreflang (multi-idioma):**

```html
<link rel="alternate" hreflang="es" href="https://tudominio.com/es/saunas-madrid/">
<link rel="alternate" hreflang="pt" href="https://tudominio.com/pt/saunas-lisboa/">
<link rel="alternate" hreflang="fr" href="https://tudominio.com/fr/saunas-paris/">
<link rel="alternate" hreflang="x-default" href="https://tudominio.com/saunas/">
```

---

## 3.12 OPEN GRAPH Y TWITTER

```html
<!-- Open Graph -->
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:image" content="{imagen_1200x630}">
<meta property="og:url" content="{url_canonical}">
<meta property="og:type" content="product">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="{nombre_tienda}">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="{imagen_1200x630}">
```

---

# PARTE 4: TECHNICAL SEO

## 4.1 Robots.txt

```
User-agent: *
Allow: /

Disallow: /carrito/
Disallow: /checkout/
Disallow: /mi-cuenta/
Disallow: /buscar?
Disallow: /*?sort=
Disallow: /*?filter=
Disallow: /*?page=
Disallow: /api/

Sitemap: https://tudominio.com/sitemap.xml
```

## 4.2 Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://tudominio.com/{url}</loc>
        <lastmod>{fecha}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>{0.5-1.0}</priority>
    </url>
</urlset>
```

**Prioridades:**
```
1.0 = Homepage
0.9 = Categorías principales
0.8 = Productos, Subcategorías
0.7 = Páginas locales (top 50 ciudades)
0.6 = Páginas locales (resto)
0.5 = Blog, Guías
```

## 4.3 Velocidad (Core Web Vitals)

```html
<!-- Preload crítico -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{imagen_principal}" as="image">

<!-- Preconnect terceros -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">

<!-- CSS crítico inline -->
<style>
    /* Solo above-the-fold */
    body{font-family:system-ui;margin:0}
    header{...}
    h1{...}
</style>

<!-- CSS diferido -->
<link rel="preload" href="/css/main.css" as="style" onload="this.rel='stylesheet'">
```

**Métricas objetivo:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

# PARTE 5: EVITAR CONTENIDO DUPLICADO

## Sistema de variaciones

```python
variaciones_intro = [
    "¿Buscas {producto} en {ciudad}? Descubre nuestra selección...",
    "En {ciudad} ofrecemos {producto} de alta calidad...",
    "Encuentra el {producto} perfecto en {ciudad}...",
    "Somos especialistas en {producto} en {ciudad}...",
    "{Producto} en {ciudad}: calidad y servicio garantizados..."
]

sinonimos = {
    'comprar': ['adquirir', 'conseguir', 'obtener'],
    'precio': ['coste', 'valor', 'importe'],
    'mejor': ['ideal', 'óptimo', 'perfecto'],
    'incluye': ['incorpora', 'cuenta con', 'dispone de'],
    'envío': ['entrega', 'transporte'],
    'gratis': ['gratuito', 'sin coste', 'incluido'],
    'instalación': ['montaje', 'puesta en marcha']
}

def variar_contenido(texto, seed):
    """Genera variación consistente por página"""
    random.seed(seed)  # URL como seed
    
    for palabra, alternativas in sinonimos.items():
        if palabra in texto:
            reemplazo = random.choice([palabra] + alternativas)
            texto = texto.replace(palabra, reemplazo, 1)
    
    return texto
```

---

# PARTE 6: CHECKLIST POR PÁGINA

## ✅ Checklist obligatorio

### HEAD
- [ ] Title único (máx 60 chars)
- [ ] Meta description única (máx 155 chars)
- [ ] Canonical correcto
- [ ] Open Graph tags
- [ ] Schema JSON-LD

### CONTENIDO
- [ ] H1 único con keyword
- [ ] Párrafo intro (40-60 palabras)
- [ ] Estructura H2/H3 correcta
- [ ] Mínimo 300 palabras
- [ ] Tabla de precios
- [ ] FAQ (mín 5 preguntas)
- [ ] Contenido local único

### IMÁGENES
- [ ] Alt text descriptivo
- [ ] Formato WebP
- [ ] Lazy loading
- [ ] Dimensiones

### LINKS
- [ ] Breadcrumbs
- [ ] 5-10 internal links
- [ ] Links a ciudades cercanas
- [ ] Links a productos relacionados

### TÉCNICO
- [ ] URL limpia
- [ ] Velocidad < 3s
- [ ] Mobile responsive
- [ ] En sitemap

---

# PARTE 7: VELOCIDAD DE PUBLICACIÓN

| Semana | Páginas/semana | Acumulado |
|--------|----------------|-----------|
| 1-2 | 50 | 100 |
| 3-4 | 100 | 300 |
| 5-8 | 200 | 1,100 |
| 9-12 | 300 | 2,300 |
| 13-24 | 200 | 4,700 |

**Monitorizar:** Si Google no indexa, reducir velocidad y mejorar calidad.

---

# PARTE 8: TEMPLATE HTML COMPLETO

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <meta name="description" content="{{meta_description}}">
    <link rel="canonical" href="{{canonical}}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="{{title}}">
    <meta property="og:description" content="{{meta_description}}">
    <meta property="og:image" content="{{imagen_og}}">
    <meta property="og:url" content="{{canonical}}">
    <meta property="og:type" content="product">
    
    <!-- Schema -->
    <script type="application/ld+json">{{schema_producto}}</script>
    <script type="application/ld+json">{{schema_faq}}</script>
    <script type="application/ld+json">{{schema_breadcrumb}}</script>
    <script type="application/ld+json">{{schema_local}}</script>
    
    <!-- Velocidad -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preload" href="{{imagen_principal}}" as="image">
</head>
<body>
    <header><!-- Nav --></header>
    
    <!-- Breadcrumbs -->
    <nav aria-label="Breadcrumb">
        <ol>
            <li><a href="/">Inicio</a></li>
            <li><a href="/{{categoria}}/">{{Categoria}}</a></li>
            <li>{{Página actual}}</li>
        </ol>
    </nav>
    
    <main>
        <!-- H1 -->
        <h1>{{h1}}</h1>
        
        <!-- Intro (Featured Snippet) -->
        <p class="intro">{{intro_40_60_palabras}}</p>
        
        <!-- Sección Tipos -->
        <section>
            <h2>Tipos de {{producto}} en {{ciudad}}</h2>
            {{contenido_tipos}}
        </section>
        
        <!-- Sección Precios -->
        <section>
            <h2>Precios de {{producto}} en {{ciudad}}</h2>
            {{tabla_precios}}
        </section>
        
        <!-- Guía compra -->
        <section>
            <h2>Cómo elegir {{producto}}</h2>
            {{contenido_guia}}
        </section>
        
        <!-- Contenido local -->
        <section>
            <h2>{{producto}} en {{ciudad}}: Servicio local</h2>
            {{contenido_local}}
        </section>
        
        <!-- FAQ -->
        <section itemscope itemtype="https://schema.org/FAQPage">
            <h2>Preguntas frecuentes</h2>
            {{faqs_con_schema}}
        </section>
        
        <!-- Productos destacados -->
        <section>
            <h2>Mejores {{producto}} en {{ciudad}}</h2>
            {{productos_cards}}
        </section>
        
        <!-- Internal links -->
        <section class="relacionados">
            <h2>También te puede interesar</h2>
            {{links_productos_relacionados}}
            {{links_ciudades_cercanas}}
            {{links_guias}}
        </section>
    </main>
    
    <footer><!-- Footer --></footer>
</body>
</html>
```

---

*Documento: Guía SEO Programático v2.0*
*Fecha: Febrero 2026*
