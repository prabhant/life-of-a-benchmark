---
title: GSM8K
description: Benchmark record for grade-school mathematical reasoning
---

# GSM8K
Slug: gsm8k
Health: Yellow

## Description
GSM8K is a dataset of 8,500 grade-school mathematics word problems designed to evaluate multi-step mathematical reasoning in natural language. It is a useful baseline, although it is now a weak discriminator among frontier models.

## Capabilities
- Multi-step arithmetic reasoning
- Natural-language mathematics problem solving
- Chain-of-thought evaluation
- Grade-school word-problem accuracy

## Timeline
- 2021: GSM8K was introduced.
- 2023: GPT-4 reported GSM8K results.
- 2024: GSM-Symbolic tested whether high scores reflect robust reasoning.

## Known Issues
- [Performance drops when names and values are changed through symbolic perturbations.](https://arxiv.org/abs/2410.05229)
- [Models can fail when irrelevant but plausible information is added to problems.](https://arxiv.org/abs/2410.05229)
- [Public benchmark exposure creates a risk of data contamination.](https://arxiv.org/abs/2311.09783)

## Evidence
- [Original GSM8K paper](https://arxiv.org/abs/2110.14168)
- [GPT-4 technical report](https://arxiv.org/abs/2303.08774)
- [GSM-Symbolic](https://arxiv.org/abs/2410.05229)

## Successors
- MATH
