# Graph Report - .  (2026-06-04)

## Corpus Check
- 59 files · ~87,207 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 198 nodes · 180 edges · 65 communities detected
- Extraction: 77% EXTRACTED · 23% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.57)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]

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

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (11): CognitiveOrchestrator, Full RAG pipeline (SSE stream): yields chunks as they are generated., Retrieve relevant memories and format as context block., Store the conversation turn as a new memory., Full RAG pipeline (single response): embed query → retrieve memories → generate, List all memories for the current user., Delete a specific memory. Enforces isolation by verifying ownership., Generate embedding vector for a text string. Runs in a threadpool to avoid block (+3 more)

### Community 1 - "Community 1"
Cohesion: 0.31
Nodes (11): AuthResponse, get_me(), login(), LoginRequest, Register a new user via Firebase Admin., Authenticate via Firebase REST API (Identity Toolkit) to get an ID token., Return current authenticated user info., signup() (+3 more)

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (9): create_memory(), delete_memory(), list_memories(), MemoryCreateRequest, MemoryListResponse, MemoryResponse, Store a new memory with vector embedding., List all memories for the authenticated user. (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.22
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 0.4
Nodes (4): chat(), ChatRequest, ChatResponse, RAG-powered chat endpoint. Retrieves user memories, generates response.

### Community 6 - "Community 6"
Cohesion: 0.4
Nodes (4): get_current_user(), get_firestore_client(), Extract and verify the Firebase JWT. Returns the decoded payload., Get the Firestore client for the request.     Tenant isolation is enforced in th

### Community 7 - "Community 7"
Cohesion: 0.5
Nodes (2): handleKeyDown(), handleSubmit()

### Community 8 - "Community 8"
Cohesion: 0.5
Nodes (3): ApiError, apiFetch(), getApiUrl()

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (5): checkpoint_latest, Checkpoint Protocol, graphify_ssca, Token Saving, .agent_plans/task.md

### Community 10 - "Community 10"
Cohesion: 0.4
Nodes (5): Firebase Service Account JSON, Next.js Frontend, Python Requirements, Self-Sovereign Cognitive API, Firestore Vector Index

### Community 11 - "Community 11"
Cohesion: 0.67
Nodes (3): BaseSettings, get_settings(), Settings

### Community 12 - "Community 12"
Cohesion: 0.5
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (4): Northern Lights Background Image, Aurora Borealis, Starry Night Sky, Winter Landscape

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (2): create_app(), initialize_firebase()

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (2): Verify a Firebase ID Token using the Admin SDK.     Returns the decoded token pa, verify_firebase_id_token()

### Community 17 - "Community 17"
Cohesion: 0.67
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 0.67
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 0.67
Nodes (3): Dark Theme Background, Neon Rings, Background Dashboard Image

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Community 52"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "Community 53"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Community 54"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Community 55"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Community 56"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Community 57"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Community 58"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Community 59"
Cohesion: 1.0
Nodes (1): Red Abstract Fur Background Image

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (1): Document Icon (file.svg)

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (1): Globe SVG Asset

### Community 62 - "Community 62"
Cohesion: 1.0
Nodes (1): Next.js Logo

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (1): Vercel Logo

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (1): Window Icon

## Knowledge Gaps
- **25 isolated node(s):** `Extract and verify the Firebase JWT. Returns the decoded payload.`, `Get the Firestore client for the request.     Tenant isolation is enforced in th`, `Verify a Firebase ID Token using the Admin SDK.     Returns the decoded token pa`, `Generate embedding vector for a text string. Runs in a threadpool to avoid block`, `Embed and store a memory.          In Firestore, we explicitly set the user_id t` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 22`** (2 nodes): `check_dim()`, `check_dim.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `list_models()`, `list_models.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `test_embed.py`, `test_embed()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `test_embed_all.py`, `test_embed()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `layout.tsx`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `page.tsx`, `Home()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `page.tsx`, `ProfilePage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `LoginForm.tsx`, `LoginForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (2 nodes): `SignupForm.tsx`, `SignupForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (2 nodes): `GlassPanel.tsx`, `GlassPanel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (2 nodes): `GlassSkeleton.tsx`, `GlassSkeleton()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (2 nodes): `AnimatedBackground()`, `AnimatedBackground.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (2 nodes): `BackgroundGradient()`, `BackgroundGradient.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (2 nodes): `CollageGrid()`, `CollageGrid.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (2 nodes): `Navbar.tsx`, `getInitials()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (2 nodes): `SpringDrag.tsx`, `SpringDrag()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (2 nodes): `PageTransition.tsx`, `PageTransition()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (2 nodes): `HorizontalLoader.tsx`, `HorizontalLoader()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (2 nodes): `useAuth.ts`, `useAuth()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (2 nodes): `useChat.ts`, `useChat()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (2 nodes): `useMemories.ts`, `useMemories()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (2 nodes): `useMousePosition.ts`, `useMousePosition()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `test_dist.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `tailwind.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `index.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `LiquidDistortion.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `ToastProvider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (1 nodes): `MarkdownRenderer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `constants.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `Red Abstract Fur Background Image`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `Document Icon (file.svg)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `Globe SVG Asset`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `Next.js Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `Vercel Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `Window Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `VectorStoreService` connect `Community 0` to `Community 2`, `Community 5`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `RAG-powered chat endpoint. Retrieves user memories, generates response.` connect `Community 5` to `Community 0`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `CognitiveOrchestrator` connect `Community 0` to `Community 5`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `VectorStoreService` (e.g. with `RAG-powered chat endpoint. Retrieves user memories, generates response.` and `Store a new memory with vector embedding.`) actually correct?**
  _`VectorStoreService` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `CognitiveOrchestrator` (e.g. with `RAG-powered chat endpoint. Retrieves user memories, generates response.` and `VectorStoreService`) actually correct?**
  _`CognitiveOrchestrator` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Register a new user via Firebase Admin.` (e.g. with `SignUpRequest` and `LoginRequest`) actually correct?**
  _`Register a new user via Firebase Admin.` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Authenticate via Firebase REST API (Identity Toolkit) to get an ID token.` (e.g. with `SignUpRequest` and `LoginRequest`) actually correct?**
  _`Authenticate via Firebase REST API (Identity Toolkit) to get an ID token.` has 4 INFERRED edges - model-reasoned connections that need verification._