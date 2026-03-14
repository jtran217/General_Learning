# AI Engineering Roadmap

Target: December 2026 graduation. Goal is backend fundamentals + production AI systems.

---

## Phase 1: Backend Foundations (2-3 months)

*Interview staples and prerequisites for everything in Phase 2.*

### HTTP & APIs
- Build a raw HTTP client (no library)
- Build a REST API from scratch — request lifecycle, middleware, error handling
- Implement streaming (chunked transfer, SSE) — critical for LLMs later

### Databases
- SQL internals: indexing, query plans, transactions, ACID
- Build a simple connection pool
- Intro to NoSQL: when and why (document, key-value)

### Caching
- Redis fundamentals: data structures, TTL, eviction policies
- Implement cache-aside and write-through patterns
- Cache invalidation strategies

### Concurrency
- Async/await and event loops
- Race conditions, locks, queues
- Why it matters: LLM calls are I/O-bound and slow

---

## Phase 2: Core AI Engineering (3-4 months)

*Build everything from scratch — no LangChain, no magic frameworks.*

### LLM API Fundamentals
- Call the API directly (Anthropic or OpenAI SDK)
- Streaming responses end-to-end
- Structured outputs / JSON mode
- Token counting, cost estimation, rate limit handling

### Embeddings & Vector Search
- What embeddings are and how to generate them
- Build a naive vector search (cosine similarity) by hand
- Use a real vector DB (Postgres + pgvector is a good start)

### RAG from Scratch
- Document ingestion pipeline: chunking strategies, overlap, metadata
- Retrieval: dense search, then hybrid (dense + keyword)
- Generation: prompt construction, context window management
- Measure retrieval quality — this is where most systems fail silently

### Agents
- Tool use: give an LLM functions and handle the loop yourself
- Build a simple agent that can use 2-3 tools (search, calculator, DB lookup)
- Understand where agents break down (loops, hallucinated tool calls)

---

## Phase 3: Production Concerns (2 months)

*What separates a demo from a real system.*

### Evals
- Why vibe-checking doesn't scale
- Build a simple eval harness: test cases, scoring, regression detection
- LLM-as-judge pattern

### Observability
- Trace an LLM request end-to-end: latency breakdown, token usage, retrieval quality
- Logging structured data you can actually query later

### Reliability
- Retry logic, fallbacks, timeouts on LLM calls
- Prompt injection basics and mitigations
- Graceful degradation when the model fails

---

## Capstone

Build one end-to-end project that exercises the full stack:
**ingestion → storage → retrieval → generation → evals → observability**

Ideas:
- Codebase Q&A tool (index a repo, answer questions about it)
- Personal notes search engine with semantic retrieval
- Research assistant that retrieves and synthesizes web content

---

## Notes
- Language: Python — path of least resistance for AI engineering (ecosystem, hiring)
- Each phase maps to a topic directory in this repo following the standard structure
