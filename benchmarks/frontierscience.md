---
title: FrontierScience
description: Benchmark record for expert-written olympiad and research science tasks
---

Slug: frontierscience
Measurement Status: Not Fit
Taxonomy: Scientific reasoning
Task Format: Short answer and rubric-graded open response
Languages: English
Scoring Rule: Exact and fuzzy match plus model-graded rubric
Saturation Risk: Low
Contamination Risk: Unknown
Reproducibility: Low
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://openai.com/index/frontierscience/
License Status: Apache-2.0 for the public dataset; the community harness ships no license
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
FrontierScience is an OpenAI benchmark of more than 700 expert-written physics, chemistry, and biology tasks, of which 160 are public: a 100-question olympiad gold set graded by number, expression, or fuzzy string match, and a 60-question research gold set graded against a ten-point rubric with a seven-point pass threshold. The public grader is GPT-5. The GitHub repository referenced by the Microsoft Foundry leaderboard is a single-contributor third-party reimplementation with no paper, no releases, and no license file.

## Supported Uses
- Tracking a single vendor's own model progress on expert-written science tasks over time
- Illustrating that short-answer and rubric formats leave headroom where multiple-choice science benchmarks do not
- Sourcing expert-written science items for qualitative failure analysis

## Unsupported Inferences
- Comparing models from different vendors, which the publisher states is biased by its task-selection process
- Reading a research-track score as a measure of scientific research ability
- Treating a run of the third-party harness as equivalent to the publisher's protocol

## Measurement Targets
- Olympiad-level physics, chemistry, and biology problem solving
- Open-ended research-task reasoning against expert rubrics
- Performance headroom beyond saturated multiple-choice science benchmarks
- Resistance to contamination via a held-out private split

## Evidence History
- 2025: OpenAI published FrontierScience with a 160-item public gold set and a held-out remainder.
- 2025: The publisher disclosed that task creation selected against its own internal models.
- 2026: Community discussions on the public dataset reported duplicate items and misordered fields, all still open.
- 2026: A single-contributor community harness became the de facto public implementation without a license or releases.

## Validity Threats
- [The publisher states that the task creation process for both sets included some selection against OpenAI internal models, discarding tasks those models answered correctly, and that the evaluation is therefore expected to be somewhat biased against those models relative to others.](https://openai.com/index/frontierscience/)
- [The publisher's own limitations note that rubrics with multiple components on longer tasks are less objective than checking a final answer, that a human grader is not scalable so a model grader is used, and that the benchmark does not assess how models generate novel hypotheses; no grader-to-human agreement rate is reported.](https://openai.com/index/frontierscience/)
- [The public dataset's discussion board carries three unresolved defect reports, including a duplicate task group, a possible duplicate in the research subset, and a wrong ordering of problem statement and instructions; a single duplicate is about 1.7% of the 60-item research split.](https://huggingface.co/datasets/openai/frontierscience/discussions)
- [The community implementation referenced by downstream leaderboards is a three-star repository from a single contributor with no releases, no paper, and no LICENSE file, which under default copyright means all rights reserved and no verified fidelity to the publisher's harness.](https://github.com/medicalsphere/FrontierScience)
- [A review of 445 benchmarks found that only 16.0% reported any statistical test or uncertainty estimate and that 53.4% presented any evidence for construct validity, the reporting baseline against which a 160-item two-track benchmark should be read.](https://arxiv.org/abs/2511.04703)

## Evidence Register
- [OpenAI FrontierScience announcement | original | 2025 | benchmark definition, grading, and selection disclosure](https://openai.com/index/frontierscience/)
- [FrontierScience public dataset | implementation | 2025 | public split size, license, and canary string](https://huggingface.co/datasets/openai/frontierscience)
- [FrontierScience dataset discussions | implementation | 2026 | unresolved duplicate and field-ordering defects](https://huggingface.co/datasets/openai/frontierscience/discussions)
- [Community FrontierScience harness | implementation | 2026 | third-party reimplementation without license or releases](https://github.com/medicalsphere/FrontierScience)
- [Measuring what Matters: Construct Validity in LLM Benchmarks | critique | 2025 | reporting and construct-validity baselines](https://arxiv.org/abs/2511.04703)
- [Original GPQA paper | original | 2023 | predecessor science benchmark and expert baselines](https://arxiv.org/abs/2311.12022)

## Alternative Instruments
- GPQA (Diamond)
- ChemBench
