---
title: TruthfulQA
description: Benchmark record for truthfulness under common misconceptions
---

# TruthfulQA
Slug: truthfulqa
Health: Yellow

## Description
TruthfulQA measures whether a model produces truthful answers to questions that some people answer incorrectly because of misconceptions or false beliefs. It provides a valuable truthfulness signal but is not a complete factuality evaluation.

## Capabilities
- Resistance to common misconceptions
- Truthful question answering
- Imitative falsehood detection
- Multiple-choice and generative evaluation

## Timeline
- 2021: TruthfulQA was introduced.
- 2023: GPT-4 and the Open LLM Leaderboard reported TruthfulQA results.
- 2023: Contamination research identified metadata leakage risks.

## Known Issues
- [Benchmark metadata can leak information and compromise evaluation integrity.](https://arxiv.org/abs/2311.09783)
- [Measured truthfulness depends on the evaluation setup and scoring method.](https://arxiv.org/abs/2303.08774)

## Evidence
- [Original TruthfulQA paper](https://arxiv.org/abs/2109.07958)
- [GPT-4 technical report](https://arxiv.org/abs/2303.08774)
- [Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
- [Benchmark data contamination study](https://arxiv.org/abs/2311.09783)

## Successors
- None listed