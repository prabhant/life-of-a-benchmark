# MMLU
Slug: mmlu
Health: Yellow

## Description
MMLU (Massive Multitask Language Understanding) evaluates broad academic and professional knowledge across dozens of subjects. It remains a core benchmark for cross-domain capability checks, especially for zero-shot and few-shot performance.

## Capabilities
- Broad multi-domain knowledge assessment
- Zero-shot and few-shot evaluation
- Subject-level performance breakdowns
- Generalization checks beyond narrow task formats

## Timeline
- 2020: Initial benchmark introduced with 57 subjects.
- 2021: Adopted as a standard report metric for foundation models.
- 2023: Saturation concerns increased as top models neared ceiling scores.
- 2025: Often paired with harder follow-up benchmarks for discrimination.

## Known Issues
- Potential benchmark saturation and reduced discriminative power at SOTA.
- Multiple-choice format can overstate practical reasoning ability.
- Score variance can depend on answer-option ordering and prompt templating.

## Evidence
- [Original paper (Hendrycks et al.)](https://arxiv.org/abs/2009.03300)
- [Papers With Code benchmark page](https://paperswithcode.com/dataset/mmlu)
- [Hugging Face MMLU resources](https://huggingface.co/datasets/cais/mmlu)

## Successors
- MMLU-Pro
- GPQA
