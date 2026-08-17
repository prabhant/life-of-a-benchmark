---
title: HarmBench
description: Benchmark record for automated red teaming and refusal robustness
---

Slug: harmbench
Measurement Status: Not Fit
Taxonomy: Safety and harmful behavior
Task Format: Harmful behavior prompts with classifier scoring
Languages: English
Scoring Rule: Attack success rate
Saturation Risk: High
Contamination Risk: Unknown
Reproducibility: Medium
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2402.04249
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
HarmBench is a standardized framework for automated red teaming that pairs a fixed set of harmful behaviors with red-teaming methods and scores completions using a fine-tuned classifier, reporting attack success rate. Its original study compared 18 red-teaming methods against 33 target models and defenses. The Microsoft Foundry safety leaderboards use direct prompts with no attack strategies while describing the resulting scores as robustness against attacks, and run with guardrails disabled.

## Supported Uses
- Comparing red-teaming methods against a fixed target set under a declared attack configuration
- Screening whether a model complies with unmodified direct harmful requests
- Providing a standardized classifier so that attack success rates are computed consistently within one study

## Unsupported Inferences
- Reading a no-attack direct-request score as robustness against adversarial attacks
- Treating a low attack success rate as evidence of safety without a paired over-refusal measurement
- Comparing attack success rates across papers that use different graders or attack budgets

## Measurement Targets
- Compliance with harmful behavior requests
- Comparative effectiveness of automated red-teaming methods
- Robustness of defenses and adversarially trained models
- Classifier-scored harmfulness of model completions

## Evidence History
- 2024: HarmBench was released with a standardized evaluation and a fine-tuned harmfulness classifier.
- 2024: StrongREJECT measured grader bias across the attack-success-rate metric family against 1,361 human-labeled pairs.
- 2024: JailbreakBench documented that jailbreak success rates are computed in incomparable ways across papers.
- 2024: Past-tense reformulation research reported a 1% to 88% swing on the same model between direct and reformulated requests.
- 2024: Safetywashing found jailbreak-robustness scores are largely uncorrelated with general capability.

## Validity Threats
- [On the same model, direct harmful requests succeeded at 1% while twenty past-tense reformulation attempts succeeded at 88%, so a configuration that issues only direct prompts cannot support a claim about robustness against attacks.](https://arxiv.org/abs/2407.11969)
- [The benchmark's own classifier card reports average agreement with human judgments of 93.19%, meaning the grader that defines attack success disagrees with human labelers on roughly one item in fifteen, and it requires generations to be in English or easily identifiable by English speakers.](https://huggingface.co/cais/HarmBench-Llama-2-13b-cls)
- [A study with 1,361 human-labeled prompt-response pairs across 17 jailbreaks and 4 victim models found that widely used attack-success proxies are strongly biased upward and that two of them produce jailbreak rankings that anticorrelate with human rankings, and showed that jailbreaks which bypass safety tuning also reduce model capability, so binary attack success credits responses where the model is willing but incapable.](https://arxiv.org/abs/2402.10260)
- [A dedicated over-refusal suite of 250 safe prompts and 200 unsafe contrast prompts documents systematic exaggerated safety behavior, establishing that a low harm score is uninterpretable without a paired over-refusal measurement.](https://arxiv.org/abs/2308.01263)
- [An audit of 21 open-weight models concludes that refusal rates are a poor proxy for safety because a model may over-refuse benign prompts while still complying with harmful ones, and that models over-protect prominent racial and religious groups while providing weaker protection against disability-targeted attacks.](https://arxiv.org/abs/2605.05427)
- [A survey of jailbreaking evaluation found no clear standard of practice, that existing works compute costs and success rates in incomparable ways, and that numerous works are not reproducible, and it selected its own judge using a 300-example human-preference dataset.](https://arxiv.org/abs/2404.01318)

## Evidence Register
- [Original HarmBench paper | original | 2024 | framework definition and method comparison](https://arxiv.org/abs/2402.04249)
- [HarmBench classifier model card | implementation | 2024 | grader agreement rates and scoring rules](https://huggingface.co/cais/HarmBench-Llama-2-13b-cls)
- [A StrongREJECT for Empty Jailbreaks | critique | 2024 | grader bias and capability degradation under jailbreaks](https://arxiv.org/abs/2402.10260)
- [Does Refusal Training Generalize to the Past Tense | critique | 2024 | direct-request versus reformulated-request gap](https://arxiv.org/abs/2407.11969)
- [XSTest | critique | 2023 | exaggerated safety and over-refusal](https://arxiv.org/abs/2308.01263)
- [The Refusal-Compliance Tradeoff | critique | 2026 | refusal rate as a safety proxy across 21 models](https://arxiv.org/abs/2605.05427)
- [JailbreakBench | critique | 2024 | comparability and reproducibility of jailbreak evaluation](https://arxiv.org/abs/2404.01318)
- [Safetywashing | critique | 2024 | capability correlation of jailbreak robustness scores](https://arxiv.org/abs/2407.21792)

## Alternative Instruments
- WMDP
- ToxiGen
