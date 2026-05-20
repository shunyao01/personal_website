---
title: Real-time Recommendation Engine
date: 2026-03
category: ml-engineering
featured: true
teaser: Low-latency retrieval and ranking under production load.
tags: [PyTorch, FAISS, Feast, Redis, Triton]
metrics:
  - value: "3.2M"
    label: predictions/day
  - value: "18ms"
    label: p99 latency
  - value: "+14%"
    label: CTR lift
---

Two-tower retrieval model serving 3.2M daily predictions with incremental FAISS indexing and feature retrieval via Redis + Feast.

The hard part was not training—it was keeping point-in-time features correct under partial index updates while holding p99 latency. Shadow traffic and replay tests caught regressions before they hit ranking quality.
