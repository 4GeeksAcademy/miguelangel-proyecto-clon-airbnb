# Clon web Airbnb

## Páginas a crear

### Página de inicio
La página de inicio es la primera impresión del usuario. Muestra una cuadrícula de alojamientos disponibles con sus fotos, precios y valoraciones. En la parte superior, una barra de navegación permite buscar destinos y filtrar por categorías (Playa, Mansiones, Tendencias, etc.). El usuario puede explorar visualmente las opciones y hacer clic en cualquier tarjeta para ver los detalles del alojamiento.

### Página de catálogo
La página de catálogo muestra los resultados de búsqueda del usuario. Presenta una lista de alojamientos con un control para ordenarlos por precio (ascendente o descendente) y una cabecera que indica cuántos resultados hay. En escritorio, un mapa a la derecha muestra la ubicación de los alojamientos; en móvil, el mapa aparece debajo de las tarjetas.

### Vista de detalle de una habitación
Esta vista muestra toda la información de un alojamiento específico. El usuario puede navegar por las fotos, ver el precio por noche, leer la descripción, consultar las valoraciones de otros huéspedes y conocer al anfitrión. Incluye una tarjeta de reserva con selector de huéspedes y un botón para reservar.

## Componentes

### Inicio
- Navbar con logo, barra de búsqueda y menú de usuario a la derecha
- Fila horizontal de filtros por categoría (icono + etiqueta)
- Cuadrícula responsiva de tarjetas de alojamiento (1 columna en móvil, varias en escritorio)
- Card de alojamiento: foto, título, precio por noche, valoración con estrellas
- Botón de favorito en cada tarjeta
- Indicador de carga mientras se obtienen los datos

### Página de catálogo
- Cabecera de resultados: número de alojamientos encontrados
- Control de ordenación (Ascendente / Descendente por precio)
- Cards de alojamiento (reutilizadas desde la página de inicio)
- Área de mapa con ubicación de alojamientos (placeholder o mapa real)
- Botón de filtros en el navbar

### Vista de detalle de una habitación
- Galería de fotos con botones Anterior / Siguiente
- Botones de compartir y guardar encima de las fotos
- Cabecera: título, valoración con estrellas, número de reseñas, ubicación
- Descripción de la habitación
- Precio por noche
- Calendario para reservar
- Valoraciones de huéspedes anteriores
- Tarjeta de reserva con contador de huéspedes (mín/máx) y botón para reservar
- Card del anfitrión: nombre, foto, evaluaciones, valoración, años de experiencia
- Información del anfitrión: índice de respuesta y botón para escribir al anfitrión

## Perfil de Usuario y Objetivos

El usuario de esta plataforma es un viajero o turista (ya sea solitario, en pareja o en familia) que busca alojamiento para sus próximas vacaciones. Su objetivo principal es encontrar un lugar cómodo, seguro y con personalidad local que se adapte a su presupuesto, permitiéndole reservar de forma rápida y sencilla.

## Especificaciones de componentes (generadas desde capturas de Airbnb a 375px)

### Página de Inicio

#### Layout

    <HomePage>
      ├── <SearchBar />
      ├── <CategoryFilters />
      ├── <ListingSection title="Alojamientos populares en Madrid">
      │     ├── <ListingCard />
      │     ├── <ListingCard />
      │     └── <ListingCard />
      ├── <ListingSection title="Grandes ofertas en hoteles">
      │     ├── <ListingCard />
      │     └── <ListingCard />
      └── <BottomNav />
    </HomePage>

#### Componentes

**SearchBar**
- Sin props (estado interno con useState)
- Barra redondeada blanca con icono de lupa y placeholder "Empieza a buscar"
- Filtra las tarjetas visibles en tiempo real mientras el usuario escribe

**CategoryFilters**
- categories: { id: string, label: string, icon: string }[]
- activeCategory: string
- onCategoryChange: (id: string) => void
- Fila horizontal scrollable: "Todo" (globo), "Alojamientos" (casa), "Experiencias" (globo aerostático)
- La categoría activa se resalta visualmente

**ListingSection**
- title: string
- subtitle?: string
- children: ReactNode
- Contenedor con título, subtítulo opcional, flecha para ver más y scroll horizontal de tarjetas

**ListingCard**
- id: string
- image: string
- title: string
- dates: string
- hostType: string
- totalPrice: string
- rating: number
- badge?: string
- isFavorite: boolean
- onFavoriteToggle: (id: string) => void
- Tarjeta con imagen, corazón para favoritos, datos del alojamiento y precio

**BottomNav**
- activeTab: "explore" | "favorites" | "login"
- Barra fija inferior: Explorar (lupa roja = activo), Favoritos (corazón gris), Iniciar sesión (perfil gris)

---

### Página de Catálogo

#### Layout

    <CatalogPage>
      ├── <CatalogHeader>
      │     ├── <BackButton />
      │     ├── <SearchSummary />
      │     └── <FilterButton />
      ├── <CategoryPills />
      ├── <MapArea />
      ├── <ResultsSheet>
      │     ├── <ResultsHeader />
      │     └── <ListingCard />  (reutilizado de Home)
      └── <BottomNav />
    </CatalogPage>

#### Componentes

**CatalogHeader**
- Sin props
- Flecha de retroceso, barra de búsqueda con resumen (destino, fechas, huéspedes) e icono de filtros

**SearchSummary**
- destination: string
- dates: string
- guests: string
- Resumen compacto de la búsqueda activa dentro del header

**CategoryPills**
- categories: { id: string, label: string }[]
- activeCategory: string
- onCategoryChange: (id: string) => void
- Botones pill horizontales: "Todos" (seleccionado), "Alojamiento", "Hotel"

**MapArea**
- listings: { id: string, lat: number, lng: number, price: string }[]
- Mapa con pins de precio. En la implementación puede ser un placeholder gris con texto "Mapa"

**ResultsSheet**
- totalResults: string
- children: ReactNode
- Panel blanco sobre el mapa con handle superior y contador de resultados

**ResultsHeader**
- totalResults: string
- sortOrder: "asc" | "desc"
- onSortChange: (order: "asc" | "desc") => void
- Total de resultados y control de ordenación por precio

---

### Vista de Detalle de Habitación

#### Layout

    <RoomDetailPage>
      ├── <PhotoGallery />
      ├── <DetailContent>
      │     ├── <ListingHeader />
      │     ├── <ListingSpecs />
      │     ├── <RatingBadge />
      │     ├── <PromotionBanner />
      │     ├── <AmenitiesGrid />
      │     ├── <HostCard />
      │     └── <ReviewsSection />
      └── <BookingFooter />
    </RoomDetailPage>

#### Componentes

**PhotoGallery**
- images: string[]
- currentIndex: number (estado con useState)
- onPrev: () => void
- onNext: () => void
- Foto a ancho completo con indicador "1 / 30" y botones de navegación

**GalleryOverlay**
- onBack: () => void
- onShare: () => void
- onSave: () => void
- isSaved: boolean
- Iconos superpuestos: flecha atrás (izquierda), compartir y corazón (derecha)

**ListingHeader**
- title: string
- type: string
- location: string

**ListingSpecs**
- guests: number
- bedrooms: number
- beds: number
- bathrooms: number
- Fila: "5 viajeros · 3 dormitorios · 3 camas · 2 baños"

**RatingBadge**
- rating: number
- reviewCount: number
- Estrella + puntuación + número de evaluaciones

**PromotionBanner**
- message: string
- Caja gris con icono de diamante y texto promocional

**AmenitiesGrid**
- amenities: { icon: string, label: string }[]
- Cuadrícula de pares icono + etiqueta con los servicios del alojamiento

**HostCard**
- name: string
- avatar: string
- rating: number
- reviewCount: number
- yearsHosting: number
- responseRate: string
- Tarjeta con info del anfitrión y botón para contactar

**BookingFooter**
- totalPrice: string
- dates: string
- onReserve: () => void
- Barra fija inferior con precio a la izquierda y botón magenta "Reservar" a la derecha

