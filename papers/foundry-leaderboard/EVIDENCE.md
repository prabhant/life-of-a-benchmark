---
title: Microsoft Foundry Leaderboard Evidence Index
description: Source verification notes for the fourteen benchmark records added from the Microsoft Foundry model leaderboards
---

## Scope

This index covers the fourteen instruments added to the register from the
Microsoft Foundry model leaderboards documentation on 2026-08-17. It records how
each benchmark's counter-evidence was located, what was directly verified, and
which claims could not be substantiated and were therefore excluded.

Three leaderboard datasets already had records and were not duplicated: BBH,
MATH, and TruthfulQA. HumanEval is referenced by the Foundry accuracy-metric
definition and also already had a record.

Leaderboard source: [Model benchmarks and leaderboards in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/concepts/model-benchmarks).

## Extraction Method

Unlike the per-paper folders in this directory, this cohort was verified by
fetching each source URL and reading the abstract, full text, repository file,
model card, dataset card, changelog, or errata that states the claim. No PDFs
were downloaded and no page-delimited text was extracted, so the records carry
no PDF page locators. Every quoted figure below was read from the source named
beside it.

Claims that could only be traced to aggregator or search-engine summary pages
were discarded rather than recorded. Single-author unrefereed preprints were
excluded from the validity-threat sections even where they were located.

## Quality Index Instruments

### GPQA

Decisive threats: human re-annotation retained 126 of 198 Diamond items as
answerable without the option list, with free-form scoring costing over 20
points; an Epoch AI audit extrapolated roughly 15 of 198 items as invalid; the
observed frontier score of 95% exceeds the 69.7% recruited-expert baseline.

Assessment: the 198-item subset cannot support the point-level model rankings
built on it. Scope caveat: the Epoch audit is an informal newsletter analysis of
six deep-dived items, not a peer-reviewed re-annotation, and the invalid rate is
an extrapolation.

Excluded: no measured GPQA contamination study exists. Gating and canary strings
are prevention artifacts, not measurements, so contamination risk is Unknown.

### MMLU-Pro

Decisive threats: the ten-option expansion raised choices-only shortcut accuracy
to 41% against a 10% chance baseline; 89% to 98% of its signature chain-of-thought
gain is attributable to arithmetic items; the official harness assigns a random
option when regular-expression extraction fails, and extraction failures reach
14.1%.

Assessment: the option expansion that motivated the benchmark made the shortcut
problem worse relative to chance, and the reasoning claim does not survive
decomposition.

Scope caveat: the arithmetic decomposition was measured on 2024-era models. The
MMLU-CF comparison is circumstantial evidence about MMLU-style content, not a
direct MMLU-Pro contamination measurement.

### MuSR

Documented threats: the leaderboard maintainers state that few models beat random
performance; the corpus is 756 rows with 250 per split; chain-of-thought benefit
clears Bonferroni-corrected significance on only 6 of 14 models.

Assessment: Qualified rather than Not Fit. The evidence establishes weak
discrimination and high variance, not a defeated inference. No choices-only
shortcut probe has been published for MuSR, and no maintained frontier record
exists since Open LLM Leaderboard v2 was archived.

Excluded: the widely repeated human-accuracy figure for MuSR could not be
verified from any primary source and is not recorded.

### ChemBench

Documented threats: the maintainers' evaluation card states that contamination is
untested, that elimination shortcuts are not accounted for, and that performance
variation is not measured; the project reports sub-25% NMR accuracy against 71%
on exam-style questions and no correlation between molecular complexity and
accuracy; the issue tracker records seven closed wrong-answer defects.

Assessment: Qualified. The self-reported limitations are unusually candid and the
numeric-answer scoring is a genuine improvement over pure multiple choice.

Name collision warning: a different benchmark from the ChemLLM paper is also
called ChemBench. The record covers the Jablonka lab instrument that the Foundry
leaderboard links.

### FrontierScience

Decisive threat: the publisher states that task creation selected against its own
internal models and that the evaluation is therefore expected to be somewhat
biased against them relative to others. That disclosure defeats cross-vendor
comparison, which is the leaderboard's primary inference.

Supporting: a GPT-5 model grader with no published human-agreement rate; three
unresolved data defects on a 160-item public set; and a community harness with no
paper, no releases, and no license file.

Correction recorded during research: the GitHub repository cited by the
leaderboard is a single-contributor third-party reimplementation, not the
canonical source. The canonical source is the OpenAI publication and its
Apache-2.0 public dataset.

Excluded: the OpenAI paper PDF could not be read, so no in-paper claim beyond the
announcement page is recorded.

### MBPP+ (EvalPlus)

Documented threats: the suite shipped with broken tasks until v0.2.0 cut it from
399 to 378 with an expected four-point pass@1 shift; seven of the ten most
suspect items were confirmed genuinely wrong by an independent noise analysis;
that analysis puts the minimum detectable difference for a benchmark of this size
at 6.7 points; transformation work reported a 39.4% average performance drop and
drastic ranking changes.

Assessment: Qualified. EvalPlus exists because thin oracles overstate
correctness, and it measurably repaired that. Its residual defects, statistical
power, and contamination exposure constrain interpretation rather than defeat it.

Note on figures: the well-known 19.3% to 28.9% reduction is relative, not
percentage points. The record states it as relative.

### tau2-bench (telecom)

Documented threats: the maintainers' own audit fixed more than fifty tasks and
raised airline pass^1 by 14 to 20 points, attributing the change to removing
evaluation noise; results before and after harness version 1.0.1 are stated to be
not comparable; the telecom user simulator has a 16% total and 6% task-critical
error rate; performance falls to near zero beyond seven required actions.

Assessment: Qualified. The pass^k metric is a genuine reliability instrument and
telecom's assertion-based grading structurally avoids the substring exploits
found elsewhere.

Scope caveat recorded in the register: the agentic best-practices study assessed
tau-bench, not tau2-bench, and not the telecom domain. Its 38% and 40%
overestimation figures apply to the airline and retail splits. The record states
this scope explicitly.

## Scenario Leaderboard Instruments

### BigCodeBench

Decisive threats: the repository was archived read-only in July 2026 and the
leaderboard's newest entries are from April 2025, so models released afterwards
cannot be ranked on it; the benchmark averages 5.6 tests per task, fewer than the
roughly 9.6 that EvalPlus condemned as insufficient on HumanEval.

Assessment: an unmaintained instrument with a thinner oracle than the one its own
field already rejected cannot support current model selection.

Scope caveat: high branch coverage on a reference solution does not establish
that semantically wrong implementations are detected. The 60% ceiling against 97%
human performance is the paper's own figure for the full set.

### LiveCodeBench

Documented threats: the maintainers' errata lists problems accepting multiple
valid outputs that the harness grades against one, interactive problems that
cannot be solved at all, and erroneous test cases, with header counts that
disagree with the enumerated lists; LeetCode tests are model-generated,
thresholded to 100 inputs, and pruned further in the lite dataset that
downstream leaderboards consume.

Assessment: Qualified. Its time-segmented design is the strongest published
contamination diagnostic among code benchmarks, and its own limitations section
reports bootstrap variation and recommends caution on small differences.

### LiveBench

Documented threats: the authors retitled the paper from contamination-free to
contamination-limited between versions; the maintainers stated the coding
questions were likely heavily contaminated and replaced them; an agentic scaffold
change from a 50-step to a 250-step budget triggered a rerun that overwrote the
published historical leaderboard; the coding category is 128 rows.

Assessment: Qualified. The benchmark actively repairs itself and avoids LLM
judging, but scores are not comparable across releases or harness revisions.

### Arena-Hard-Auto

Decisive threats: a null model returning a constant, instruction-irrelevant
string scores 83.0; the authors' own ablation shows judge choice moves Spearman
correlation with the reference ranking from 96.5% to 70.5%; their style-control
ablation shows an unmodified verbosity gain from 44.5 to 53.5 reversing under
style control.

Assessment: a benchmark that a constant string can score 83.0 on cannot support
primary model-quality inference.

Balance recorded: the same source that supplies the judge-swing figures is the
original paper, which also reports high agreement with the reference leaderboard
under its preferred configuration.

## Safety Leaderboard Instruments

### HarmBench

Decisive threat: the Foundry configuration uses direct prompts with no attack
strategies while describing the resulting scores as robustness against attacks.
Published evidence puts the same model at 1% under direct requests and 88% under
twenty past-tense reformulations.

Supporting: the benchmark's own classifier card reports 93.19% average agreement
with human judgments, so the grader that defines success disagrees on roughly one
item in fifteen.

Counter-counter-evidence recorded honestly: StrongREJECT rates the HarmBench
classifier as near-unbiased relative to other attack-success proxies, and
Safetywashing concludes that jailbreak-robustness benchmarks are not prone to
safetywashing. The adverse finding is about the no-attack configuration and the
missing over-refusal pairing, not about the classifier.

Excluded: the exact behavior count could not be confirmed from the CSV files and
is therefore not stated in the record.

### WMDP

Decisive threats: five-shot prompting or simple rephrasing produced an over
tenfold accuracy increase on the same items; finetuning on ten unrelated examples
recovers most hazardous capability from models edited with the paper's own
unlearning method; sandbagging research shows models can be induced to
underperform, generalizing to WMDP.

Supporting: the maintainers removed biosecurity items for insufficient dual-use
potential and cybersecurity items for choice-randomization defects after release.

Counter-counter-evidence recorded honestly: Safetywashing frames the capability
anticorrelation as a virtue that makes the benchmark resistant to safetywashing.
The record cites that source with its actual conclusion attached.

### ToxiGen

Decisive threats: the harness task is defined as classifying text as hateful or
not, so the score measures detection rather than propensity to produce; a 2.1
million parameter detector reaches 90.97% accuracy, so the metric does not
discriminate among large models; toxicity classifiers over-flag
African-American English by up to a factor of two.

Assessment: valid as a hate-speech classification diagnostic, not as a
model-safety score on a selection leaderboard.

Naming caveat recorded: the same name covers two different measurements. Only
the generation-scored variant concerns a model's propensity to produce toxic
text, and it inherits every classifier bias in the register.

Excluded: no inter-annotator agreement statistic for ToxiGen could be verified,
so none is stated.

## Gaps Not Filled

The following were searched for and not found. They are recorded here so that the
absence is visible rather than papered over.

* Measured contamination studies for GPQA, MMLU-Pro, MuSR, ChemBench,
  FrontierScience, Arena-Hard, ToxiGen, HarmBench, WMDP, and tau2-bench. Only
  prevention artifacts such as gating, canary strings, and held-out splits exist.
* A published choices-only shortcut probe for MuSR.
* Per-dataset false-positive rates for African-American English in the 2019
  hate-speech bias literature; direction was verified, magnitudes were not.
* Current frontier leaderboard figures for MMLU-Pro, MuSR, LiveBench coding, and
  LiveCodeBench, whose leaderboards render client-side.
* Confirmation of which harness version, judge, prompt policy, and trial count
  the Microsoft Foundry leaderboard uses for each dataset. Every cross-leaderboard
  comparison depends on this and it is not published per dataset.
