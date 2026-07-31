---
title: MATH Paper Evidence
description: Page-located evidence extracted from five papers used in the MATH benchmark record
---

## Extraction Method

The PDFs were downloaded from arXiv on 2026-07-31. PyMuPDF block-mode
extraction produced UTF-8 text while retaining form-feed page boundaries. PDF
page locators below refer to the downloaded files. Quoted wording is unchanged
apart from joining words split by line-end hyphenation.

## MATH

Sources: [PDF](./2103.03874-math.pdf),
[extracted text](./2103.03874-math.txt), and
[arXiv](https://arxiv.org/abs/2103.03874).

Locator: PDF page 4, section 3.1, "The MATH Dataset."

> "The Mathematics Aptitude Test of Heuristics dataset, abbreviated MATH, has
> 12,500 problems (7,500 training and 5,000 test)."

Locator: PDF page 5, "Automatically Assessing Generated Answers."

> "We can consequently evaluate a model's output by parsing what is inside the
> \boxed{} command and comparing that with the ground truth answer."

Assessment: This directly supports the instrument's scale and original scoring
procedure. The paper also documents normalization rules for equivalent answer
formats.

## Functional MATH

Sources: [PDF](./2402.19450-functional-math.pdf),
[extracted text](./2402.19450-functional-math.txt), and
[arXiv](https://arxiv.org/abs/2402.19450).

Locator: PDF page 7, section 5.1, "Functionalizing MATH to MATH()."

> "We have functionalized 41.2% (2060/5000) of the MATH benchmark."

Locator: PDF page 9, section 5.2, "Reasoning gap for major models."

> "The models have a reasoning gap varying between 58.35% and 80.31%."

Assessment: This supports a robustness threat for static MATH items. The subset
was selected around problems solved by the evaluated models, and the evaluation
used pass-at-one without prompting optimization. The authors state that more
sophisticated prompting may reduce the precise gap.

## xFinder

Sources: [PDF](./2405.11874-xfinder.pdf),
[extracted text](./2405.11874-xfinder.txt), and
[arXiv](https://arxiv.org/abs/2405.11874).

Locator: PDF page 2, "Key Answer Extraction and Matching."

> "The response's non-standard format impedes correct extraction using RegEx,
> resulting in false judgments."

Locator: PDF page 29, appendix D.3.3, Table 42.

Table 42 reports different MATH accuracies for identical model responses under
five extraction methods. ChatGLM3-6B ranges from 4.56% to 23.02%, while
Qwen1.5-14B-Chat ranges from 4.26% to 36.71%.

Assessment: This directly supports answer-extractor sensitivity in reported MATH
accuracy. MATH-derived examples were included in xFinder fine-tuning, so the
study is evidence about evaluator behavior, not an independent capability score.

## MATH-Perturb

Sources: [PDF](./2502.06453-math-perturb.pdf),
[extracted text](./2502.06453-math-perturb.txt), and
[arXiv](https://arxiv.org/abs/2502.06453).

Locator: PDF page 2, contributions and dataset overview.

> "We benchmark the math reasoning abilities of 18 LLMs (Section 3.1), and show
> that all the models, including o1-mini and gemini-2.0-flash-thinking, suffer
> significant performance drops (10%-25%) on MATH-P-Hard."

The paper constructs MATH-P-Simple and MATH-P-Hard from 279 level-5 MATH
problems. Of these, 164 originate from the training split and 115 from the test
split.

Assessment: This supports a hard-perturbation robustness threat and motivates a
companion instrument. The result covers a small, expert-curated hardest-level
subset, not the full MATH distribution.

## Controlled Test-Set Contamination

Sources: [PDF](./2601.04301-test-contamination.pdf),
[extracted text](./2601.04301-test-contamination.txt), and
[arXiv](https://arxiv.org/abs/2601.04301).

Locator: PDF page 4, section 3, finding 2 and Table 1.

> "In both conditions, performance regresses to match the uncontaminated model
> across all model sizes and contamination levels in both conditions (Tab. 1)."

The study obtains this result after rephrasing MATH test problems or changing
their numerical values and answers. It interprets the contamination gains as
verbatim memorization rather than generalized mathematical reasoning.

Locator: PDF page 31, appendix C, "Math Verify Scoring Bug."

> "Any research reporting MATH benchmark scores using Math Verify from affected
> versions may have systematically underestimated model performance."

The affected LM Evaluation Harness versions precede v0.4.8. The study reports
that the benchmark's gold reference solutions received only about 70% before the
fix.

Assessment: This directly demonstrates that controlled test-set replication can
inflate MATH performance and that evaluation implementation can alter scores.
The contamination experiments use dense Qwen-3-style models up to 344 million
parameters, so their thresholds should not be extrapolated to frontier models.
