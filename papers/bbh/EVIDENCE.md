---
title: BBH Paper Evidence
description: Page-located evidence extracted from four papers used in the BBH benchmark record
---

## Extraction Method

The PDFs were downloaded from arXiv on 2026-07-31. PyMuPDF block-mode
extraction produced UTF-8 text while retaining form-feed page boundaries. PDF
page locators below refer to the downloaded files. Quoted wording is unchanged
apart from joining words split by line-end hyphenation.

## BIG-Bench Hard

Sources: [PDF](./2210.09261-bbh.pdf),
[extracted text](./2210.09261-bbh.txt), and
[arXiv](https://arxiv.org/abs/2210.09261).

Locator: PDF page 1, abstract.

> "few-shot prompting without CoT ... substantially underestimates the best
> performance"

The original experiment reports that chain-of-thought prompting enabled PaLM
to exceed average human-rater performance on 10 of 23 tasks and Codex on 17 of
23 tasks.

Assessment: This directly supports prompt-policy sensitivity. The result is
specific to the tested 2022 models and manually authored chain-of-thought
exemplars.

## Multi-Prompt Evaluation

Sources: [PDF](./2401.00595-multi-prompt.pdf),
[extracted text](./2401.00595-multi-prompt.txt), and
[arXiv](https://arxiv.org/abs/2401.00595).

Locator: PDF page 5, section 4.2 and Figure 2.

> "a single instruction template leads to unreliable rankings for many of the
> tasks"

One BBH example ranks T0pp first under one valid paraphrase and ninth under
another. The study used about 175 validated paraphrases per task across 15 BBH
classification or multiple-choice tasks.

Assessment: This directly supports instruction-paraphrase sensitivity. The
study sampled 100 examples per prompt and did not reproduce the original
few-shot chain-of-thought protocol or all 23 BBH tasks.

## BIG-Bench Extra Hard

Sources: [PDF](./2502.19187-bbeh.pdf),
[extracted text](./2502.19187-bbeh.txt), and
[arXiv](https://arxiv.org/abs/2502.19187).

Locator: PDF page 1, introduction; PDF page 3, section 3.

> "This performance ceiling renders BBH less effective in discriminating"

The paper reports frontier BBH accuracy above 90%. Its design audit also notes
limited answer spaces, task shortcuts, a macro-average input length of about
700 characters, and tasks that often require only a few reasoning hops.

Assessment: This directly supports high saturation risk and limited frontier
separability. BBEH was calibrated partly against two Gemini reference models,
so its replacement difficulty is not model-neutral.

## DyePack

Sources: [PDF](./2505.23001-dyepack.pdf),
[extracted text](./2505.23001-dyepack.txt), and
[arXiv](https://arxiv.org/abs/2505.23001).

Locator: PDF page 5, section 4.1; PDF page 1, abstract.

> "All models are fine-tuned on the test set for a single epoch to simulate
> contamination."

Using eight planted backdoors on BBH, DyePack detected every controlled
contaminated model with a guaranteed false-positive rate as low as 0.000017%.

Assessment: This demonstrates prospective detection under controlled BBH
test-set exposure. It does not show that any previously published BBH result is
contaminated, and planted backdoors cannot retrospectively test unmodified
historical data.