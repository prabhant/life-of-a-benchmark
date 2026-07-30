---
title: MT-Bench / Chatbot Arena
description: Benchmark record for conversational assistant quality
---

# MT-Bench / Chatbot Arena
Slug: mt-bench
Health: Yellow

## Description
MT-Bench evaluates multi-turn chat assistants with an LLM judge, while Chatbot Arena gathers pairwise human preferences. Together they provide a widely used complement to static benchmarks for conversational quality.

## Capabilities
- Multi-turn conversational quality
- Pairwise assistant comparison
- LLM-as-judge evaluation
- Human preference evaluation

## Timeline
- 2023: MT-Bench and Chatbot Arena were introduced.
- 2023: FastChat and LMSYS popularized public conversational evaluation.
- 2024: Arena-style preference evaluation became common in industry model releases.

## Known Issues
- [LLM judges exhibit position, verbosity, and self-enhancement biases.](https://arxiv.org/abs/2306.05685)
- [The fixed MT-Bench set is small and sensitive to prompts, creating reproducibility concerns.](https://openreview.net/forum?id=uccHPGDlao)
- [Human preference does not necessarily measure factual correctness.](https://arxiv.org/abs/2306.05685)

## Evidence
- [MT-Bench and Chatbot Arena paper](https://arxiv.org/abs/2306.05685)
- [LMSYS Chatbot Arena](https://chat.lmsys.org)
- [OpenReview discussion](https://openreview.net/forum?id=uccHPGDlao)

## Successors
- Chatbot Arena