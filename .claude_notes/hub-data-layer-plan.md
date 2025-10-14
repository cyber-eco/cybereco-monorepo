# Plan de Desarrollo: Hub como Capa de Datos Unificada

## 📋 Resumen Ejecutivo

El Hub de CyberEco está diseñado para servir como la capa de datos centralizada y unificada para todo el ecosistema de aplicaciones. Actualmente cuenta con autenticación centralizada funcional, servicios de datos compartidos básicos y APIs operativas. Este documento detalla el plan para expandir y optimizar esta infraestructura.

## 🎯 Objetivos del Proyecto

### Objetivos Principales
1. **Capa de Datos Unificada**: Consolidar todos los datos compartidos en una única fuente de verdad
2. **APIs Eficientes**: Proveer APIs REST y GraphQL optimizadas para consultas complejas
3. **Sincronización en Tiempo Real**: Implementar sincronización robusta entre aplicaciones
4. **Sistema de Caché Inteligente**: Reducir latencia y carga en la base de datos
5. **Preparación Multi-App**: Infraestructura lista para Somos, Demos y Plantopia

### Métricas de Éxito
- Latencia API < 100ms (p95)
- Cache hit rate > 80%
- Sincronización < 500ms
- Soportar 10,000 usuarios concurrentes
- 99.9% uptime

## 🏗️ Arquitectura Actual vs Objetivo

### Estado Actual
```
Hub (Puerto 40000)
├── Autenticación centralizada (Firebase Auth)
├── SSO funcional entre apps
├── sharedDataService básico
├── APIs REST para auth y datos
├── Dashboard con integración JustSplit
└── Sistema de permisos básico
```

### Arquitectura Objetivo
```
Hub - Capa de Datos Unificada
├── Core Services
│   ├── dataLayerService (orquestador principal)
│   ├── cacheService (multi-nivel: memoria/Redis/CDN)
│   ├── syncService (WebSockets + Firebase Realtime)
│   ├── queryService (optimización de consultas)
│   └── webhookService (integraciones externas)
├── APIs
│   ├── REST v2 (versionada, documentada)
│   ├── GraphQL (consultas complejas)
│   └── WebSocket (tiempo real)
├── Data Models
│   ├── Shared (usuarios, grupos, transacciones)
│   ├── App-Specific (referencias cruzadas)
│   └── Metadata (permisos, auditoría)
└── Integrations
    ├── JustSplit (gastos compartidos)
    ├── Somos (datos familiares)
    ├── Demos (gobernanza)
    └── Plantopia (jardinería)
```

## 📂 Estructura de Implementación

### 1. Servicios Core (`apps/hub/src/services/`)

#### dataLayerService.ts
```typescript
/**
 * Servicio orquestador principal de la capa de datos
 * Coordina cache, permisos y sincronización
 */
export class DataLayerService {
  constructor(
    private cache: CacheService,
    private sync: SyncService,
    private permissions: PermissionService
  ) {}

  async getData<T>(params: DataQuery): Promise<T> {
    // 1. Check permissions
    // 2. Try cache
    // 3. Fetch from DB
    // 4. Update cache
    // 5. Return data
  }

  async setData<T>(params: DataMutation): Promise<T> {
    // 1. Validate permissions
    // 2. Validate data
    // 3. Write to DB
    // 4. Invalidate cache
    // 5. Broadcast changes
    // 6. Return result
  }
}
```

#### cacheService.ts
```typescript
/**
 * Sistema de caché multi-nivel con invalidación inteligente
 */
export class CacheService {
  private memoryCache: LRUCache;
  private redisClient?: RedisClient;
  
  private ttlConfig = {
    user: 300,        // 5 min
    group: 600,       // 10 min  
    transaction: 60,  // 1 min
    activity: 30      // 30 sec
  };

  async get<T>(key: string): Promise<T | null> {
    // L1: Memory cache
    // L2: Redis (if available)
    // L3: Database
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    // Write to all cache levels
  }

  async invalidate(pattern: string): Promise<void> {
    // Invalidate by pattern across all levels
  }
}
```

#### syncService.ts
```typescript
/**
 * Servicio de sincronización en tiempo real
 * Maneja WebSockets y Firebase Realtime Database
 */
export class SyncService {
  private io: Server;
  private subscriptions: Map<string, Subscription>;

  async broadcast(event: SyncEvent): Promise<void> {
    // Broadcast to WebSocket clients
    // Update Firebase Realtime DB
    // Trigger webhooks
  }

  subscribe(channel: string, callback: (data: any) => void): Unsubscribe {
    // Subscribe to real-time updates
  }

  async handleConflict(conflicts: DataConflict[]): Promise<Resolution> {
    // Resolve concurrent edit conflicts
  }
}
```

### 2. APIs (`apps/hub/src/app/api/`)

#### REST API v2
```typescript
// apps/hub/src/app/api/v2/data/route.ts
export async function GET(request: Request) {
  // Handles:
  // - /api/v2/data/users/:id
  // - /api/v2/data/groups/:id
  // - /api/v2/data/transactions
  // With query params for filtering, pagination, includes
}

export async function POST(request: Request) {
  // Create or update data with validation
}

export async function DELETE(request: Request) {
  // Soft delete with audit trail
}
```

#### GraphQL API
```graphql
# apps/hub/src/app/api/graphql/schema.graphql
type Query {
  # User queries
  user(id: ID!): User
  users(filter: UserFilter, pagination: Pagination): UserConnection
  
  # Financial queries
  userFinancialSummary(
    userId: ID!
    period: DateRange!
    groupBy: GroupByOption
  ): FinancialSummary
  
  # Cross-app queries
  userActivities(
    userId: ID!
    apps: [AppID!]
    limit: Int = 20
  ): [Activity!]
  
  # Group queries
  group(id: ID!): Group
  userGroups(userId: ID!): [Group!]
}

type Mutation {
  # User mutations
  updateUserProfile(id: ID!, input: UserProfileInput!): User
  
  # Transaction mutations
  createTransaction(input: TransactionInput!): Transaction
  
  # Sync mutations
  syncAppData(userId: ID!, appId: AppID!): SyncResult
  
  # Permission mutations
  grantPermission(input: PermissionInput!): Permission
}

type Subscription {
  # Real-time updates
  userDataChanges(userId: ID!): DataChangeEvent
  groupActivities(groupId: ID!): ActivityEvent
  notificationReceived(userId: ID!): Notification
}
```

### 3. Modelos de Datos Extendidos

#### Datos Compartidos (Hub)
```typescript
// Perfil de usuario extendido
interface SharedUserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  
  // Preferencias globales
  preferences: {
    language: 'en' | 'es';
    currency: string;
    timezone: string;
    theme: 'light' | 'dark' | 'auto';
    notifications: NotificationPreferences;
  };
  
  // Referencias a apps
  appData: {
    [appId: string]: {
      profileId: string;
      lastAccessed: Date;
      settings: Record<string, any>;
    };
  };
  
  // Datos personales opcionales
  personalInfo?: {
    dateOfBirth?: string;
    phoneNumber?: string;
    address?: Address;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
}

// Transacción financiera unificada
interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  type: 'income' | 'expense' | 'transfer' | 'settlement';
  category?: string;
  date: Date;
  
  // App que originó la transacción
  appId: string;
  appSpecificId?: string;
  
  // Datos adicionales
  description?: string;
  attachments?: string[];
  tags?: string[];
  
  // Para transacciones grupales
  groupId?: string;
  participants?: string[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// Grupo compartido entre apps
interface SharedGroup {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  
  // Miembros con roles
  members: {
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
  }[];
  
  // Contextos por aplicación
  appContexts: {
    [appId: string]: {
      groupId: string;     // ID en la app específica
      features: string[];  // Features habilitadas
      settings: Record<string, any>;
    };
  };
  
  // Configuración del grupo
  settings: {
    privacy: 'public' | 'private';
    joinApproval: boolean;
    allowInvites: boolean;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
}
```

#### Integración con Apps
```typescript
// Ejemplo: JustSplit
interface JustSplitIntegration {
  // Expense extiende Transaction
  expense: {
    transactionId: string;  // Link a Transaction en Hub
    splitMethod: 'equal' | 'percentage' | 'amount' | 'custom';
    splits: ExpenseSplit[];
    paidBy: string;
    settlementStatus: 'pending' | 'partial' | 'settled';
  };
  
  // Event con actividades
  event: {
    activityId: string;     // Link a Activity en Hub
    expenses: string[];     // IDs de expenses
    participants: string[]; // User IDs del Hub
  };
}

// Ejemplo: Somos
interface SomosIntegration {
  // Familia como grupo especial
  family: {
    groupId: string;        // Link a SharedGroup en Hub
    familyTree: {
      rootMember: string;
      relationships: FamilyRelationship[];
    };
  };
  
  // Memorias como actividades
  memory: {
    activityId: string;     // Link a Activity en Hub
    familyId: string;
    mediaUrls: string[];
    location?: GeoLocation;
    peopleTagged: string[]; // User IDs del Hub
  };
}
```

## 🚀 Fases de Implementación

### Fase 1: Fundación (Semana 1-2)
- [x] Crear documentación en `.claude_notes/`
- [ ] Refactorizar `sharedDataService.ts` en módulos
- [ ] Implementar `cacheService.ts` básico
- [ ] Añadir tests unitarios (>80% coverage)
- [ ] Documentar patrones y convenciones

### Fase 2: APIs Mejoradas (Semana 3-5)
- [ ] Diseñar API REST v2 con OpenAPI
- [ ] Implementar GraphQL endpoint
- [ ] Añadir rate limiting y API keys
- [ ] Crear SDK TypeScript para clientes
- [ ] Documentación interactiva (Swagger/GraphQL Playground)

### Fase 3: Sincronización Real-time (Semana 6-7)
- [ ] Implementar WebSocket server
- [ ] Integrar con Firebase Realtime DB
- [ ] Sistema de resolución de conflictos
- [ ] Dashboard de monitoreo en tiempo real
- [ ] Tests de carga y concurrencia

### Fase 4: Optimización (Semana 8-9)
- [ ] Implementar Redis para caché L2
- [ ] Query optimization con índices
- [ ] Data prefetching inteligente
- [ ] Compresión y paginación
- [ ] Métricas de performance (Prometheus/Grafana)

### Fase 5: Nuevas Apps (Semana 10-12)
- [ ] Modelos de datos para Somos
- [ ] Modelos de datos para Demos
- [ ] Modelos de datos para Plantopia
- [ ] Adaptadores específicos por app
- [ ] Guías de integración

## 🔧 Detalles Técnicos de Implementación

### Sistema de Permisos Granular
```typescript
interface Permission {
  userId: string;
  resource: {
    type: 'user' | 'group' | 'transaction' | 'activity';
    id: string;
    app?: string;
  };
  actions: ('read' | 'write' | 'delete' | 'share')[];
  conditions?: {
    timeRange?: DateRange;
    ipWhitelist?: string[];
    requireMFA?: boolean;
  };
  grantedBy: string;
  grantedAt: Date;
  expiresAt?: Date;
}
```

### Estrategia de Caché
```typescript
class CacheStrategy {
  // Caché L1: In-memory (más rápido, limitado)
  private memoryCache = new LRUCache<string, any>({
    max: 1000,
    ttl: 1000 * 60 * 5, // 5 min default
  });
  
  // Caché L2: Redis (distribuido, persistente)
  private redisCache = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    keyPrefix: 'hub:cache:',
  });
  
  // Estrategias por tipo de dato
  private strategies = {
    user: {
      ttl: 300,
      invalidateOn: ['profile_update', 'permission_change'],
      prefetch: ['groups', 'recent_transactions'],
    },
    group: {
      ttl: 600,
      invalidateOn: ['member_change', 'settings_update'],
      prefetch: ['members', 'recent_activities'],
    },
    transaction: {
      ttl: 60,
      invalidateOn: ['update', 'delete'],
      prefetch: [],
    },
  };
}
```

### Sincronización Cross-App
```typescript
class CrossAppSync {
  async syncUserData(userId: string, sourceApp: string, targetApp: string) {
    // 1. Verificar permisos de sincronización
    const hasPermission = await this.checkSyncPermission(userId, sourceApp, targetApp);
    
    // 2. Obtener datos del source app
    const sourceData = await this.getAppData(userId, sourceApp);
    
    // 3. Transformar datos según mapeo
    const transformedData = await this.transformData(sourceData, sourceApp, targetApp);
    
    // 4. Validar datos para target app
    const validatedData = await this.validateForApp(transformedData, targetApp);
    
    // 5. Escribir en target app
    await this.writeAppData(userId, targetApp, validatedData);
    
    // 6. Notificar cambios
    await this.notifySync(userId, { sourceApp, targetApp, itemsSynced: validatedData.length });
  }
}
```

## 🔒 Seguridad y Privacidad

### Niveles de Seguridad
1. **Autenticación**: Firebase Auth con MFA opcional
2. **Autorización**: Sistema de permisos granular por recurso
3. **Encriptación**: TLS en tránsito, encriptación en reposo para datos sensibles
4. **Auditoría**: Log completo de accesos y modificaciones
5. **Privacidad**: GDPR compliant, derecho al olvido, exportación de datos

### API Security
```typescript
// Middleware de seguridad
export async function apiSecurityMiddleware(req: Request) {
  // 1. Verificar API key
  const apiKey = req.headers['x-api-key'];
  const app = await validateApiKey(apiKey);
  
  // 2. Rate limiting
  const rateLimitOk = await checkRateLimit(app.id, req.ip);
  
  // 3. Validar permisos
  const hasPermission = await checkApiPermission(app, req.method, req.url);
  
  // 4. Log de acceso
  await logApiAccess(app, req);
  
  return { app, allowed: rateLimitOk && hasPermission };
}
```

## 📊 Monitoreo y Métricas

### KPIs a Monitorear
1. **Performance**
   - API response time (p50, p95, p99)
   - Cache hit/miss ratio
   - Query execution time
   - WebSocket latency

2. **Uso**
   - Requests per second por endpoint
   - Usuarios activos concurrentes
   - Data bandwidth por app
   - Storage utilization

3. **Errores**
   - Error rate por endpoint
   - Tipos de errores más comunes
   - Tiempo de recuperación
   - Failed sync attempts

### Dashboard de Monitoreo
```typescript
// Integración con Prometheus
export const metrics = {
  apiRequestDuration: new Histogram({
    name: 'hub_api_request_duration_seconds',
    help: 'API request duration in seconds',
    labelNames: ['method', 'endpoint', 'status'],
  }),
  
  cacheHits: new Counter({
    name: 'hub_cache_hits_total',
    help: 'Total number of cache hits',
    labelNames: ['cache_level', 'data_type'],
  }),
  
  activeWebsockets: new Gauge({
    name: 'hub_websocket_connections',
    help: 'Number of active WebSocket connections',
    labelNames: ['app'],
  }),
};
```

## 🔄 Plan de Migración

### Para JustSplit (App Existente)
1. **Análisis**: Mapear datos actuales a modelos del Hub
2. **Preparación**: Crear adaptadores de migración
3. **Migración**: Transferir datos en batches
4. **Validación**: Verificar integridad
5. **Cutover**: Cambiar a usar Hub APIs

### Para Nuevas Apps (Somos, Demos, Plantopia)
1. **Diseño**: Definir modelos específicos de la app
2. **Integración**: Usar Hub SDK desde el inicio
3. **Desarrollo**: Construir sobre la capa de datos
4. **Testing**: Validar sincronización
5. **Deploy**: Lanzar con Hub integrado

## 🎯 Próximos Pasos Inmediatos

1. **Revisar y validar** este plan con el equipo
2. **Crear tareas en Jira/GitHub** para cada fase
3. **Configurar ambiente de desarrollo** con Redis
4. **Comenzar con refactoring** de sharedDataService
5. **Diseñar esquema GraphQL** inicial

## 📚 Referencias y Recursos

- [Documentación de Arquitectura](../docs/architecture/data-layer-architecture.md)
- [Guía de Apps Ligeras](../docs/architecture/lightweight-apps-architecture.md)
- [Estrategia Modular](../docs/architecture/modular-application-strategy.md)
- [Firebase Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- [GraphQL Design Patterns](https://www.apollographql.com/docs/apollo-server/schema/schema/)
- [Redis Caching Strategies](https://redis.io/docs/manual/patterns/)