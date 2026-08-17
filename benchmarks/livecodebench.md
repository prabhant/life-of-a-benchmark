---
title: LiveCodeBench
description: Benchmark record for time-segmented competitive programming evaluation
---

Slug: livecodebench
Measurement Status: Qualified
Taxonomy: Code generation
Task Format: Competitive programming problems
Languages: Python
Scoring Rule: pass@1
Saturation Risk: Medium
Contamination Risk: Medium
Reproducibility: Medium
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2403.07974
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
LiveCodeBench collects time-stamped LeetCode, AtCoder, and Codeforces problems so that evaluation can be restricted to windows after a model's training cutoff. Its release-tagged datasets grew from 400 problems in v1 to 1,055 in v6, and the widely used lite variant prunes and subsamples the tests. Its strongest contribution is contamination diagnosis: the authors documented month-by-month score cliffs coinciding with model cutoff dates.

## Supported Uses
- Diagnosing contamination by comparing performance before and after a stated model cutoff
- Comparing models on a declared release window with the start date and version pinned
- Tracking algorithmic coding progress when difficulty splits are reported separately

## Unsupported Inferences
- Reading a single overall pass@1 as general programming ability, which the authors explicitly disclaim
- Comparing scores across release tags or between the full and lite datasets
- Treating grading as sound on problems that accept multiple valid outputs or require interaction

## Measurement Targets
- Algorithmic problem solving on competition problems
- Contamination sensitivity across release windows
- Difficulty separation across easy, medium, and hard splits
- Self-repair, code execution, and test-output prediction as auxiliary scenarios

## Evidence History
- 2024: LiveCodeBench was released with 511 problems and a contamination-window methodology.
- 2024: The authors documented that one 33B model fell from about 60 pass@1 in May problems to about 0 in September LeetCode problems.
- 2025: CodeElo criticized the lack of private tests, special judges, and matched execution environments.
- 2025: LiveCodeBench Pro reported 53% pass@1 on medium and 0% on hard problems for the best tool-free frontier model.
- 2025: The maintainers published an errata file listing multiple-output, interactive, and erroneous-test problems.

## Validity Threats
- [The maintainers' errata records problems that accept multiple valid outputs while the harness grades for one specific output, two interactive problems that cannot be solved at all under the harness, and problems with erroneous or constraint-violating test cases; the stated counts in the errata headers disagree with the enumerated lists beneath them.](https://github.com/LiveCodeBench/LiveCodeBench/blob/main/ERRATA.md)
- [Hidden tests are unavailable for the LeetCode subset, so the authors generate inputs with GPT-4-Turbo-built random and adversarial generators, threshold the collected inputs to 100 per problem by random selection, and prune them further in the lite dataset that downstream leaderboards consume.](https://arxiv.org/abs/2403.07974)
- [The authors report roughly 1% to 1.5% performance variation from bootstrapping problem sets after restricting to a post-cutoff window that leaves 349 problems, note that time limits add further variation, and recommend caution when comparing models with small performance differences.](https://arxiv.org/abs/2403.07974)
- [A competition-grade alternative states that LiveCodeBench falls short because of unavailable private test cases, lack of support for special judges, and misaligned execution environments, and reports that most evaluated models place in the lowest 25 percent of human participants when submitted to the real platform.](https://arxiv.org/abs/2501.01257)
- [Olympiad medalists annotating failed submissions found that without external tools the best model reaches only 53% pass@1 on medium-difficulty problems and 0% on hard problems, and that high scores are driven by implementation precision and tool augmentation rather than superior reasoning.](https://arxiv.org/abs/2506.11928)
- [A study of verification for code generation reports that LiveCodeBench comprises a limited number of homogeneous test cases that let subtle faults go undetected, artificially inflating measured performance, and measures its own synthesized suite as 10.78% more accurate as a verifier than LiveCodeBench v6.](https://arxiv.org/abs/2507.06920)
- [A leakage audit across 83 software-engineering benchmarks identifies the use of coding platforms such as LeetCode for benchmark construction as a key cause of high leakage, with Python benchmarks averaging 4.8% leakage and outliers reaching 100%.](https://arxiv.org/abs/2502.06215)

## Evidence Register
- [Original LiveCodeBench paper | original | 2024 | benchmark definition, contamination findings, and limitations](https://arxiv.org/abs/2403.07974)
- [LiveCodeBench errata | implementation | 2025 | multiple-output, interactive, and erroneous-test problems](https://github.com/LiveCodeBench/LiveCodeBench/blob/main/ERRATA.md)
- [CodeElo | critique | 2025 | private tests, special judges, and execution environment](https://arxiv.org/abs/2501.01257)
- [LiveCodeBench Pro | critique | 2025 | medium and hard difficulty ceilings under expert annotation](https://arxiv.org/abs/2506.11928)
- [Rethinking Verification for LLM Code Generation | critique | 2025 | test homogeneity and verifier accuracy](https://arxiv.org/abs/2507.06920)
- [LessLeak-Bench | critique | 2025 | leakage across software-engineering benchmarks](https://arxiv.org/abs/2502.06215)
- [Code Benchmarks Should Prioritize Rigor, Reliability, and Reproducibility | critique | 2025 | benchmark construction practice](https://arxiv.org/abs/2501.10711)

## Alternative Instruments
- LiveCodeBench Pro
- MBPP+ (EvalPlus)
