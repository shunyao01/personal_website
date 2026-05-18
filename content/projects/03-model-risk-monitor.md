---
title: Model Risk Monitor
date: 2026-01
category: infrastructure
featured: true
teaser: Drift, shadow scoring, and escalation before metrics fall.
tags: [Evidently, Prometheus, k8s]
metrics:
  - value: "98%"
    label: drift recall
  - value: "<5m"
    label: alert latency
---

Drift detection, shadow scoring, and alert escalation integrated with Prometheus and PagerDuty.

Tuning for low false positives mattered more than raw recall—on-call fatigue kills ML ops faster than a missed drift chart.
