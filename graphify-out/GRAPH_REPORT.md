# Graph Report - D:\SSCA  (2026-06-04)

## Corpus Check
- 70 files · ~83,988 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 195 nodes · 179 edges · 63 communities detected
- Extraction: 77% EXTRACTED · 23% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.57)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_CognitiveOrchestrator group|CognitiveOrchestrator group]]
- [[_COMMUNITY_AuthResponse group|AuthResponse group]]
- [[_COMMUNITY_memory.py group|memory.py group]]
- [[_COMMUNITY_MemoryVault.tsx group|MemoryVault.tsx group]]
- [[_COMMUNITY_test_chat_empty_query() group|test_chat_empty_query() group]]
- [[_COMMUNITY_chat() group|chat() group]]
- [[_COMMUNITY_get_current_user() group|get_current_user() group]]
- [[_COMMUNITY_handleKeyDown() group|handleKeyDown() group]]
- [[_COMMUNITY_ApiError group|ApiError group]]
- [[_COMMUNITY_checkpoint_latest group|checkpoint_latest group]]
- [[_COMMUNITY_Firebase group|Firebase group]]
- [[_COMMUNITY_BaseSettings group|BaseSettings group]]
- [[_COMMUNITY_auth_headers() group|auth_headers() group]]
- [[_COMMUNITY_Northern group|Northern group]]
- [[_COMMUNITY_layout.tsx group|layout.tsx group]]
- [[_COMMUNITY_main.py group|main.py group]]
- [[_COMMUNITY_security.py group|security.py group]]
- [[_COMMUNITY_AuthProvider() group|AuthProvider() group]]
- [[_COMMUNITY_RouteTransitionProvider.tsx group|RouteTransitionProvider.tsx group]]
- [[_COMMUNITY_test_verify_invalid_firebase_token() group|test_verify_invalid_firebase_token() group]]
- [[_COMMUNITY_test_list_memories_enforces_user_id() group|test_list_memories_enforces_user_id() group]]
- [[_COMMUNITY_Dark group|Dark group]]
- [[_COMMUNITY_check_dim() group|check_dim() group]]
- [[_COMMUNITY_list_models() group|list_models() group]]
- [[_COMMUNITY_test_embed.py group|test_embed.py group]]
- [[_COMMUNITY_test_embed_all.py group|test_embed_all.py group]]
- [[_COMMUNITY_layout.tsx group|layout.tsx group]]
- [[_COMMUNITY_page.tsx group|page.tsx group]]
- [[_COMMUNITY_page.tsx group|page.tsx group]]
- [[_COMMUNITY_LoginForm.tsx group|LoginForm.tsx group]]
- [[_COMMUNITY_SignupForm.tsx group|SignupForm.tsx group]]
- [[_COMMUNITY_GlassPanel.tsx group|GlassPanel.tsx group]]
- [[_COMMUNITY_GlassSkeleton.tsx group|GlassSkeleton.tsx group]]
- [[_COMMUNITY_AnimatedBackground() group|AnimatedBackground() group]]
- [[_COMMUNITY_BackgroundGradient() group|BackgroundGradient() group]]
- [[_COMMUNITY_CollageGrid() group|CollageGrid() group]]
- [[_COMMUNITY_Navbar.tsx group|Navbar.tsx group]]
- [[_COMMUNITY_SpringDrag.tsx group|SpringDrag.tsx group]]
- [[_COMMUNITY_PageTransition.tsx group|PageTransition.tsx group]]
- [[_COMMUNITY_useAuth.ts group|useAuth.ts group]]
- [[_COMMUNITY_useChat.ts group|useChat.ts group]]
- [[_COMMUNITY_useMemories.ts group|useMemories.ts group]]
- [[_COMMUNITY_useMousePosition.ts group|useMousePosition.ts group]]
- [[_COMMUNITY_test_dist.py group|test_dist.py group]]
- [[_COMMUNITY_next-env.d.ts group|next-env.d.ts group]]
- [[_COMMUNITY_next.config.ts group|next.config.ts group]]
- [[_COMMUNITY_tailwind.config.ts group|tailwind.config.ts group]]
- [[_COMMUNITY_index.py group|index.py group]]
- [[_COMMUNITY_page.tsx group|page.tsx group]]
- [[_COMMUNITY___init__.py group|__init__.py group]]
- [[_COMMUNITY___init__.py group|__init__.py group]]
- [[_COMMUNITY___init__.py group|__init__.py group]]
- [[_COMMUNITY_LiquidDistortion.tsx group|LiquidDistortion.tsx group]]
- [[_COMMUNITY_ToastProvider.tsx group|ToastProvider.tsx group]]
- [[_COMMUNITY_MarkdownRenderer.tsx group|MarkdownRenderer.tsx group]]
- [[_COMMUNITY_constants.ts group|constants.ts group]]
- [[_COMMUNITY_types.ts group|types.ts group]]
- [[_COMMUNITY_Red group|Red group]]
- [[_COMMUNITY_Document group|Document group]]
- [[_COMMUNITY_Globe group|Globe group]]
- [[_COMMUNITY_Next.js group|Next.js group]]
- [[_COMMUNITY_Vercel group|Vercel group]]
- [[_COMMUNITY_Window group|Window group]]

## God Nodes (most connected - your core abstractions)
1. `VectorStoreService` - 16 edges
2. `CognitiveOrchestrator` - 8 edges
3. `Register a new user via Firebase Admin.` - 5 edges
4. `Authenticate via Firebase REST API (Identity Toolkit) to get an ID token.` - 5 edges
5. `Return current authenticated user info.` - 5 edges
6. `RAG-powered chat endpoint. Retrieves user memories, generates response.` - 5 edges
7. `Store a new memory with vector embedding.` - 5 edges
8. `List all memories for the authenticated user.` - 5 edges
9. `Delete a specific memory.` - 5 edges
10. `SignUpRequest` - 5 edges

## Surprising Connections (you probably didn't know these)
- `RAG-powered chat endpoint. Retrieves user memories, generates response.` --uses--> `VectorStoreService`  [INFERRED]
  frontend\backend\app\api\routes\chat.py → frontend\backend\app\services\vector_store.py
- `RAG-powered chat endpoint. Retrieves user memories, generates response.` --uses--> `CognitiveOrchestrator`  [INFERRED]
  frontend\backend\app\api\routes\chat.py → frontend\backend\app\services\ai_orchestrator.py
- `Store a new memory with vector embedding.` --uses--> `VectorStoreService`  [INFERRED]
  frontend\backend\app\api\routes\memory.py → frontend\backend\app\services\vector_store.py
- `List all memories for the authenticated user.` --uses--> `VectorStoreService`  [INFERRED]
  frontend\backend\app\api\routes\memory.py → frontend\backend\app\services\vector_store.py
- `Delete a specific memory.` --uses--> `VectorStoreService`  [INFERRED]
  frontend\backend\app\api\routes\memory.py → frontend\backend\app\services\vector_store.py

## Hyperedges (group relationships)
- **Sync between Checkpoint and Task** — agents_checkpoint_protocol, agents_checkpoint_latest, agents_task_md [EXTRACTED 1.00]

## Communities

### Community 0 - "CognitiveOrchestrator group"
Cohesion: 0.11
Nodes (11): CognitiveOrchestrator, Full RAG pipeline (SSE stream): yields chunks as they are generated., Retrieve relevant memories and format as context block., Store the conversation turn as a new memory., Full RAG pipeline (single response): embed query → retrieve memories → generate, List all memories for the current user., Delete a specific memory. Enforces isolation by verifying ownership., Generate embedding vector for a text string. Runs in a threadpool to avoid block (+3 more)

### Community 1 - "AuthResponse group"
Cohesion: 0.31
Nodes (11): AuthResponse, get_me(), login(), LoginRequest, Register a new user via Firebase Admin., Authenticate via Firebase REST API (Identity Toolkit) to get an ID token., Return current authenticated user info., signup() (+3 more)

### Community 2 - "memory.py group"
Cohesion: 0.33
Nodes (9): create_memory(), delete_memory(), list_memories(), MemoryCreateRequest, MemoryListResponse, MemoryResponse, Store a new memory with vector embedding., List all memories for the authenticated user. (+1 more)

### Community 3 - "MemoryVault.tsx group"
Cohesion: 0.22
Nodes (0): 

### Community 4 - "test_chat_empty_query() group"
Cohesion: 0.25
Nodes (0): 

### Community 5 - "chat() group"
Cohesion: 0.4
Nodes (4): chat(), ChatRequest, ChatResponse, RAG-powered chat endpoint. Retrieves user memories, generates response.

### Community 6 - "get_current_user() group"
Cohesion: 0.4
Nodes (4): get_current_user(), get_firestore_client(), Extract and verify the Firebase JWT. Returns the decoded payload., Get the Firestore client for the request.     Tenant isolation is enforced in th

### Community 7 - "handleKeyDown() group"
Cohesion: 0.5
Nodes (2): handleKeyDown(), handleSubmit()

### Community 8 - "ApiError group"
Cohesion: 0.5
Nodes (3): ApiError, apiFetch(), getApiUrl()

### Community 9 - "checkpoint_latest group"
Cohesion: 0.5
Nodes (5): checkpoint_latest, Checkpoint Protocol, graphify_ssca, Token Saving, .agent_plans/task.md

### Community 10 - "Firebase group"
Cohesion: 0.4
Nodes (5): Firebase Service Account JSON, Next.js Frontend, Python Requirements, Self-Sovereign Cognitive API, Firestore Vector Index

### Community 11 - "BaseSettings group"
Cohesion: 0.67
Nodes (3): BaseSettings, get_settings(), Settings

### Community 12 - "auth_headers() group"
Cohesion: 0.5
Nodes (0): 

### Community 13 - "Northern group"
Cohesion: 0.5
Nodes (4): Northern Lights Background Image, Aurora Borealis, Starry Night Sky, Winter Landscape

### Community 14 - "layout.tsx group"
Cohesion: 0.67
Nodes (0): 

### Community 15 - "main.py group"
Cohesion: 1.0
Nodes (2): create_app(), initialize_firebase()

### Community 16 - "security.py group"
Cohesion: 0.67
Nodes (2): Verify a Firebase ID Token using the Admin SDK.     Returns the decoded token pa, verify_firebase_id_token()

### Community 17 - "AuthProvider() group"
Cohesion: 0.67
Nodes (0): 

### Community 18 - "RouteTransitionProvider.tsx group"
Cohesion: 0.67
Nodes (0): 

### Community 19 - "test_verify_invalid_firebase_token() group"
Cohesion: 0.67
Nodes (0): 

### Community 20 - "test_list_memories_enforces_user_id() group"
Cohesion: 0.67
Nodes (0): 

### Community 21 - "Dark group"
Cohesion: 0.67
Nodes (3): Dark Theme Background, Neon Rings, Background Dashboard Image

### Community 22 - "check_dim() group"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "list_models() group"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "test_embed.py group"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "test_embed_all.py group"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "layout.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "page.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "page.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "LoginForm.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "SignupForm.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "GlassPanel.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "GlassSkeleton.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "AnimatedBackground() group"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "BackgroundGradient() group"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "CollageGrid() group"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Navbar.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "SpringDrag.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "PageTransition.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "useAuth.ts group"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "useChat.ts group"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "useMemories.ts group"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "useMousePosition.ts group"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "test_dist.py group"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "next-env.d.ts group"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "next.config.ts group"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "tailwind.config.ts group"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "index.py group"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "page.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "__init__.py group"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "__init__.py group"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "__init__.py group"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "LiquidDistortion.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "ToastProvider.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "MarkdownRenderer.tsx group"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "constants.ts group"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "types.ts group"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Red group"
Cohesion: 1.0
Nodes (1): Red Abstract Fur Background Image

### Community 58 - "Document group"
Cohesion: 1.0
Nodes (1): Document Icon (file.svg)

### Community 59 - "Globe group"
Cohesion: 1.0
Nodes (1): Globe SVG Asset

### Community 60 - "Next.js group"
Cohesion: 1.0
Nodes (1): Next.js Logo

### Community 61 - "Vercel group"
Cohesion: 1.0
Nodes (1): Vercel Logo

### Community 62 - "Window group"
Cohesion: 1.0
Nodes (1): Window Icon

## Knowledge Gaps
- **25 isolated node(s):** `Extract and verify the Firebase JWT. Returns the decoded payload.`, `Get the Firestore client for the request.     Tenant isolation is enforced in th`, `Verify a Firebase ID Token using the Admin SDK.     Returns the decoded token pa`, `Generate embedding vector for a text string. Runs in a threadpool to avoid block`, `Embed and store a memory.          In Firestore, we explicitly set the user_id t` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `check_dim() group`** (2 nodes): `check_dim()`, `check_dim.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `list_models() group`** (2 nodes): `list_models()`, `list_models.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `test_embed.py group`** (2 nodes): `test_embed.py`, `test_embed()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `test_embed_all.py group`** (2 nodes): `test_embed_all.py`, `test_embed()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `layout.tsx group`** (2 nodes): `layout.tsx`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `page.tsx group`** (2 nodes): `page.tsx`, `Home()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `page.tsx group`** (2 nodes): `page.tsx`, `LoginPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `LoginForm.tsx group`** (2 nodes): `LoginForm.tsx`, `LoginForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `SignupForm.tsx group`** (2 nodes): `SignupForm.tsx`, `SignupForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `GlassPanel.tsx group`** (2 nodes): `GlassPanel.tsx`, `GlassPanel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `GlassSkeleton.tsx group`** (2 nodes): `GlassSkeleton.tsx`, `GlassSkeleton()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AnimatedBackground() group`** (2 nodes): `AnimatedBackground()`, `AnimatedBackground.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `BackgroundGradient() group`** (2 nodes): `BackgroundGradient()`, `BackgroundGradient.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CollageGrid() group`** (2 nodes): `CollageGrid()`, `CollageGrid.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navbar.tsx group`** (2 nodes): `Navbar.tsx`, `getInitials()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `SpringDrag.tsx group`** (2 nodes): `SpringDrag.tsx`, `SpringDrag()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PageTransition.tsx group`** (2 nodes): `PageTransition.tsx`, `PageTransition()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `useAuth.ts group`** (2 nodes): `useAuth.ts`, `useAuth()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `useChat.ts group`** (2 nodes): `useChat.ts`, `useChat()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `useMemories.ts group`** (2 nodes): `useMemories.ts`, `useMemories()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `useMousePosition.ts group`** (2 nodes): `useMousePosition.ts`, `useMousePosition()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `test_dist.py group`** (1 nodes): `test_dist.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `next-env.d.ts group`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `next.config.ts group`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `tailwind.config.ts group`** (1 nodes): `tailwind.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `index.py group`** (1 nodes): `index.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `page.tsx group`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `__init__.py group`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `__init__.py group`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `__init__.py group`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `LiquidDistortion.tsx group`** (1 nodes): `LiquidDistortion.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ToastProvider.tsx group`** (1 nodes): `ToastProvider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `MarkdownRenderer.tsx group`** (1 nodes): `MarkdownRenderer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `constants.ts group`** (1 nodes): `constants.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `types.ts group`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Red group`** (1 nodes): `Red Abstract Fur Background Image`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Document group`** (1 nodes): `Document Icon (file.svg)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Globe group`** (1 nodes): `Globe SVG Asset`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js group`** (1 nodes): `Next.js Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vercel group`** (1 nodes): `Vercel Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Window group`** (1 nodes): `Window Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `VectorStoreService` connect `CognitiveOrchestrator group` to `memory.py group`, `chat() group`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `RAG-powered chat endpoint. Retrieves user memories, generates response.` connect `chat() group` to `CognitiveOrchestrator group`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `CognitiveOrchestrator` connect `CognitiveOrchestrator group` to `chat() group`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `VectorStoreService` (e.g. with `RAG-powered chat endpoint. Retrieves user memories, generates response.` and `Store a new memory with vector embedding.`) actually correct?**
  _`VectorStoreService` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `CognitiveOrchestrator` (e.g. with `RAG-powered chat endpoint. Retrieves user memories, generates response.` and `VectorStoreService`) actually correct?**
  _`CognitiveOrchestrator` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Register a new user via Firebase Admin.` (e.g. with `SignUpRequest` and `LoginRequest`) actually correct?**
  _`Register a new user via Firebase Admin.` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Authenticate via Firebase REST API (Identity Toolkit) to get an ID token.` (e.g. with `SignUpRequest` and `LoginRequest`) actually correct?**
  _`Authenticate via Firebase REST API (Identity Toolkit) to get an ID token.` has 4 INFERRED edges - model-reasoned connections that need verification._