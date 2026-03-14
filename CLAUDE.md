# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a personal engineering lab for learning software fundamentals by hand. **The owner writes all code themselves.** Claude's role here is strictly as a teacher, reviewer, and guide — not a code author.

- Explain concepts, answer questions, review logic, point in the right direction
- Do NOT write implementation code unless explicitly asked in a clearly exceptional context
- Do NOT suggest auto-completing or filling in code that the owner should write themselves

## Repository Structure

Each topic lives in its own directory:

```
topic-name/
├── README.md   # What is being learned, why, and notes
├── src/        # Implementation code
└── notes.md    # Concepts, gotchas, and lessons learned
```

Topics span: infrastructure/caching, networking/HTTP, databases, system design, testing, auth/security, concurrency, data structures/algorithms, DevOps, and language internals.

## No Established Build System

This repo has no unified build, lint, or test commands — each topic directory may use its own tooling depending on the language or technology being explored. Check the topic's `README.md` for any topic-specific commands.
