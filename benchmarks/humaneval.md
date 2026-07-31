---
title: HumanEval
description: Benchmark record for functional Python code generation
---

Slug: humaneval
Measurement Status: Not Fit
Taxonomy: Code generation
Task Format: Single-turn Python function synthesis from docstrings
Languages: English prompts and Python output
Scoring Rule: pass@k functional correctness
Saturation Risk: High
Contamination Risk: Unknown
Reproducibility: High
Last Reviewed: 2026-07-30
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2107.03374
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview

HumanEval evaluates code-generation models by asking them to complete Python
functions from docstrings and then executing hidden unit tests. The original
benchmark contains 164 handwritten programming problems and reports functional
correctness using pass@k.

## Supported Uses

- Measuring Python function-synthesis performance with execution-based scoring
- Pairing with repository-level software-engineering evaluations

## Unsupported Inferences

- Treating a small unit-test suite as proof of production correctness or security
- Comparing systems without matching sampling budgets and pass@k settings

## Measurement Targets

- Python code generation
- Docstring-to-function synthesis
- Execution-based functional correctness
- Sampling-based code selection

## Evidence History

- 2021: HumanEval was released with the Codex evaluation study.
- 2023: EvalPlus introduced HumanEval+ with augmented tests.
- 2025: HumanEvalComm evaluated clarification behavior on modified requirements.
- 2025: mHumanEval extended HumanEval-style prompts to more than 200 natural languages.
- 2025: HumanEvalNext applied benchmark-quality refinements.

## Validity Threats

- [EvalPlus expanded HumanEval test cases by 80x and, across 26 models, found previously undetected wrong code that reduced pass@k by up to 19.3-28.9%.](https://arxiv.org/abs/2305.01210)
- [HumanEvalComm modified HumanEval requirements to include inconsistency, ambiguity, or incompleteness; more than 60% of tested Code LLM responses generated code instead of asking questions, while most models' Pass@1 dropped by about 35-52%.](https://dl.acm.org/doi/10.1145/3715109)
- [mHumanEval identifies standard HumanEval-style evaluation as primarily English-to-Python with limited test cases and extends the prompts to more than 200 natural languages, including expert human translations for 15 languages.](https://arxiv.org/abs/2410.15037)
- [A 2025 review created HumanEvalNext with corrected errors, improved language conversion, higher test coverage, and greater difficulty; across 10 code models, average pass@1 fell 31.22% on HumanEvalPlus and 19.94% on HumanEvalNext.](https://arxiv.org/abs/2503.05860)

## Evidence Register

- [Evaluating Large Language Models Trained on Code | original | 2021 | HumanEval design and pass@k evaluation](https://arxiv.org/abs/2107.03374)
- [EvalPlus | critique | 2023 | test-suite adequacy and score changes](https://arxiv.org/abs/2305.01210)
- [HumanEvalComm | critique | 2025 | requirement ambiguity and clarification behavior](https://dl.acm.org/doi/10.1145/3715109)
- [mHumanEval | critique | 2025 | multilingual prompt coverage](https://arxiv.org/abs/2410.15037)
- [Benchmarking AI Models in Software Engineering | critique | 2025 | HumanEvalPlus and HumanEvalNext score changes](https://arxiv.org/abs/2503.05860)

## Alternative Instruments

- HumanEval+
- HumanEvalComm
- mHumanEval
- HumanEvalNext