# Sistema Electoral Digital - UWU

Sistema Electoral Digital escalable desarrollado para la Oficina Nacional de Procesos Electorales del Perú.

## 🏗️ Arquitectura Escalable

### 📁 Estructura de Carpetas

```
src/
├── components/          # Componentes UI reutilizables
│   ├── enhanced/       # Componentes mejorados y escalables
│   └── ui/            # Componentes base de shadcn/ui
├── config/            # Configuración de la aplicación
├── constants/         # Constantes y configuraciones estáticas
├── contexts/          # React Contexts (legacy, migrando a stores)
├── hooks/             # Hooks personalizados
├── lib/               # Librerías y utilidades externas
├── pages/             # Páginas principales
├── providers/         # Proveedores de contexto y configuración
├── services/          # Servicios API y lógica de negocio
│   └── http/         # Cliente HTTP escalable
├── store/             # Estado global con Zustand
├── types/             # Definiciones de tipos TypeScript
└── utils/             # Utilidades y helpers
```

### 🗃️ Gestión de Estado

La aplicación utiliza **Zustand** para un manejo de estado escalable:

- `useAuthStore`: Autenticación y usuario
- `useCandidatesStore`: Gestión de candidatos
- `useVotingStore`: Proceso de votación
- `useElectionStore`: Configuración electoral
- `useAppStore`: Estado global de la aplicación

### 🌐 Servicios API

Sistema de servicios escalable con:

- **HttpClient**: Cliente HTTP con retry automático y interceptores
- **BaseApiService**: Clase base para todos los servicios
- **ApiServiceFactory**: Factory pattern para instancias de servicios
- **Error Handling**: Manejo centralizado de errores

### 🎯 Hooks Personalizados

- `useAuth()`: Autenticación completa
- `useCandidates()`: Gestión de candidatos con filtros
- `useElectionResults()`: Resultados en tiempo real
- Custom hooks para funcionalidades específicas

### ⚙️ Configuración por Entorno

Sistema de configuración basado en variables de entorno:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000

# App Configuration  
VITE_APP_NAME=Sistema Electoral Digital
VITE_ORG_NAME=ONPE

# Feature Flags
VITE_ENABLE_MOCK_DATA=true
VITE_ENABLE_DEV_TOOLS=true
```

## 🚀 Características Escalables

### 1. **Componentes Mejorados**
- Props tipadas con TypeScript
- Memoización con React.memo
- Variantes configurables
- Estados de carga y error

### 2. **Utilidades Avanzadas**
- `CandidateColorUtil`: Gestión de colores
- `FormatUtil`: Formateo de datos
- `ValidationUtil`: Validaciones centralizadas
- `ErrorUtil`: Manejo de errores
- `StorageUtil`: LocalStorage tipado

### 3. **Patrón Factory**
- `ApiServiceFactory`: Creación de servicios
- Configuración centralizada
- Interceptores globales

### 4. **Tipos Robustos**
```typescript
interface Candidate {
  id: number;
  name: string;
  party: string;
  color: CandidateColor;
  proposals: string[];
  experience: string;
  image?: string;
  votes?: number;
  percentage?: number;
}
```

## 🛠️ Instalación y Desarrollo

```bash
# Clonar repositorio
git clone [repository-url]
cd electoral-choice-online

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build
```

## 📦 Tecnologías

- **React 18** con TypeScript
- **Zustand** para estado global
- **React Query** para cache y sincronización
- **Shadcn/UI** para componentes
- **Tailwind CSS** para estilos
- **Zod** para validación de esquemas
- **React Router** para navegación

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run build:dev    # Build desarrollo
npm run lint         # Linter
npm run preview      # Preview build
```

## 🧪 Testing y Calidad

- ESLint configurado
- TypeScript strict mode
- Validación de tipos en runtime
- Error boundaries
- Manejo de estados de carga

## 📊 Características del Sistema

### ✅ **Funcionalidades Principales**

- **Autenticación segura** con roles
- **Gestión de candidatos** completa
- **Proceso de votación** seguro
- **Resultados en tiempo real**
- **Panel de administración**
- **Filtros avanzados**
- **Responsive design**

### 🔒 **Seguridad**

- Validación en frontend y backend
- Tokens JWT
- Roles y permisos
- Sanitización de datos
- Rate limiting preparado

### 📱 **UX/UI**

- Diseño moderno y accesible
- Animaciones suaves
- Estados de carga intuitivos
- Notificaciones toast
- Modo claro/oscuro preparado

## 🚀 Escalabilidad

### **Preparado para Crecer**

1. **Microservicios**: Servicios API modulares
2. **Lazy Loading**: Carga de componentes bajo demanda
3. **Code Splitting**: División automática del código
4. **Caching**: Estrategias de cache avanzadas
5. **Monitoreo**: Logs y analytics preparados

### **Extensibilidad**

- Nuevos tipos de elecciones
- Múltiples idiomas
- Temas personalizables
- Plugins y extensiones
- APIs para integraciones

## 📄 Licencia

Este proyecto está desarrollado para la ONPE (Oficina Nacional de Procesos Electorales del Perú).

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

---

**Desarrollado con ❤️ para la democracia digital del Perú**
