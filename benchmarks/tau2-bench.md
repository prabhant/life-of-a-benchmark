---
title: tau2-bench (telecom)
description: Benchmark record for dual-control conversational agent evaluation in the telecom domain
---

Slug: tau2-bench
Measurement Status: Qualified
Taxonomy: Tool use and agents
Task Format: Simulated multi-turn tool-use dialogue
Languages: English
Scoring Rule: pass^k over environment assertions
Saturation Risk: Medium
Contamination Risk: Unknown
Reproducibility: Low
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2506.07982
License Status: MIT for the harness; verify domain data terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
The telecom domain of tau2-bench contains 114 tasks sampled from 2,285 programmatically generated ones, in which an agent and a simulated user each hold tools and must coordinate to resolve service, mobile data, and MMS issues. Unlike the retail and airline domains it grades entirely with programmatic environment assertions rather than substring matching. Its headline metric, pass^k, is the probability that all k independent trials of a task succeed, so it measures reliability rather than best-of-k discovery.

## Supported Uses
- Measuring run-to-run reliability of a tool-using agent, which pass^k is specifically designed for
- Comparing agents under a pinned harness version, model, and reasoning-effort setting
- Diagnosing where collaborative dual-control tasks break down as action counts grow

## Unsupported Inferences
- Comparing results produced before and after harness version 1.0.1, which the maintainers state are not comparable
- Reading a telecom pass^k as a general agentic capability score for production workloads
- Treating differences smaller than the user-simulator error rate as capability differences

## Measurement Targets
- Tool selection and sequencing under a written domain policy
- Coordination with a simulated user that holds its own tools
- Reliability across repeated independent trials
- Robustness to task length as the number of required actions grows

## Evidence History
- 2024: The predecessor tau-bench introduced pass^k and reported pass^8 below 25% in retail for the best agent.
- 2025: tau2-bench added the dual-control telecom domain with assertion-based grading.
- 2025: An agentic-benchmark best-practice study documented trivial-agent exploits in the predecessor's airline and retail domains.
- 2025: tau-Bench Verified reported that annotation errors and underspecified tasks artificially capped model performance.
- 2026: The maintainers audited and fixed more than fifty tasks and stated that older results are not comparable to newer ones.

## Validity Threats
- [The maintainers' own audit fixed more than fifty tasks across the airline and retail domains, raised airline pass^1 by 14.0 to 20.0 points for frontier models, moved one model's airline pass^4 from 50.0% to 72.0%, and attributed the change to removing evaluation noise that turned correct completions into false negatives.](https://taubench.com/blog/tau3-task-fixes.html)
- [The maintainers state that results produced with harness versions below 1.0.1 are not comparable with 1.0.1 and later, so published scores spanning the audit are not a common scale.](https://github.com/sierra-research/tau2-bench)
- [A best-practice study of agentic benchmarks found that the predecessor tau-bench overestimates performance by 38% through trivial states or substrings used as ground truth and by 40% through allowing agents to list every possible answer, that a do-nothing agent outperformed a GPT-4o agent on the airline split, and that the benchmark reported no statistical significance, no non-AI baseline, and no trivial-agent baseline.](https://arxiv.org/abs/2507.02825)
- [The tau2-bench authors manually annotated conversations and report a 16% total user-simulator error rate with 6% task-critical errors in the telecom domain, and the table caption claiming no critical errors contradicts the table body and the surrounding text.](https://arxiv.org/abs/2506.07982)
- [The same paper reports that agent performance drops to close to zero for tasks requiring more than seven actions and that moving from a no-user to a collaborative setup costs 18 to 25 points of pass^1, so the score is dominated by task length and interaction mode.](https://arxiv.org/abs/2506.07982)
- [tau-Bench Verified reports that each additional deviation in a mutating action reduces the odds of success by up to 92% on airline and 96% on retail, and identifies ceiling effects in the original benchmark caused by annotation errors and underspecified tasks.](https://arxiv.org/abs/2512.07850)
- [Numerical nondeterminism in inference means that changing batch size, GPU count, or GPU version can produce up to 9% variation in accuracy under greedy decoding, so temperature zero does not make an agentic run reproducible.](https://arxiv.org/abs/2506.09501)

## Evidence Register
- [tau2-bench paper | original | 2025 | dual-control design, telecom statistics, and simulator error rates](https://arxiv.org/abs/2506.07982)
- [tau-bench paper | original | 2024 | pass^k definition and reliability collapse](https://arxiv.org/abs/2406.12045)
- [tau2-bench repository | implementation | 2026 | version comparability and domain data](https://github.com/sierra-research/tau2-bench)
- [Sierra task-fix audit | implementation | 2026 | measured score impact of correcting task defects](https://taubench.com/blog/tau3-task-fixes.html)
- [Establishing Best Practices for Building Rigorous Agentic Benchmarks | critique | 2025 | task and outcome validity failures in the predecessor](https://arxiv.org/abs/2507.02825)
- [SABER and tau-Bench Verified | critique | 2025 | mutating-action sensitivity and annotation-induced ceilings](https://arxiv.org/abs/2512.07850)
- [Numerical Sources of Nondeterminism in LLM Inference | critique | 2025 | run-to-run variance under greedy decoding](https://arxiv.org/abs/2506.09501)

## Alternative Instruments
- IFEval
