---
title: LongBench Paper Evidence
description: Page-located evidence extracted from four papers used in the LongBench benchmark record
---

## Extraction Method

The PDFs were downloaded from arXiv on 2026-07-31. PyMuPDF block-mode
extraction produced UTF-8 text while retaining form-feed page boundaries. PDF
page locators below refer to the downloaded files. Quoted wording is unchanged
apart from joining words split by line-end hyphenation.

## LongBench

Sources: [PDF](./2308.14508-longbench.pdf),
[extracted text](./2308.14508-longbench.txt), and
[arXiv](https://arxiv.org/abs/2308.14508).

Locator: PDF page 1, abstract.

> "LongBench comprises 21 datasets across 6 task categories"

The same passage reports average lengths of 6,711 English words and 13,386
Chinese characters.

Assessment: This directly supports the instrument's original coverage and
scale. The paper's eight-model baseline is evidence history, not a validity
critique.

## LongBench v2

Sources: [PDF](./2412.15204-longbench-v2.pdf),
[extracted text](./2412.15204-longbench-v2.txt), and
[arXiv](https://arxiv.org/abs/2412.15204).

Locator: PDF page 2, introduction.

> "many of these samples can be solved through shallow understanding such as
> retrieval"

The authors also identify unreliable ROUGE and F1 metrics as a broader issue
in existing long-context evaluation. LongBench v2 responds with 503 manually
reviewed multiple-choice questions over contexts from 8,000 to 2 million words.

Assessment: This motivates deeper-reasoning companion evaluation. The critique
is stated about existing long-context benchmarks as a class, so it does not
establish that every original LongBench task is shallow. LongBench v2 also
changes the data, format, and scale, so its scores are not a longitudinal
continuation of LongBench scores.

## LV-Eval

Sources: [PDF](./2402.05136-lv-eval.pdf),
[extracted text](./2402.05136-lv-eval.txt), and
[arXiv](https://arxiv.org/abs/2402.05136).

Locator: PDF page 16, appendix A, "Single-hop QA."

> "We manually remove questions that can be answered using common-sense
> knowledge without referring to the context"

LV-Eval applies this filtering while rebuilding the English and Chinese
MultiFieldQA components from LongBench, retaining 101 and 133 unique question
pairs respectively.

Assessment: This directly supports a context-dependency threat for two
LongBench components. It does not estimate the prevalence of such questions
across the other 19 datasets.

## HELMET

Sources: [PDF](./2410.02694-helmet.pdf),
[extracted text](./2410.02694-helmet.txt), and
[arXiv](https://arxiv.org/abs/2410.02694).

Locator: PDF page 3, Table 2.

Table 2 marks LongBench as lacking robust evaluation, 128K coverage for all but
one dataset, and controllable context lengths. The paper describes insufficient
length and unreliable metrics as sources of noisy long-context measurements.

Assessment: This is a direct design audit of LongBench and supports reporting
length coverage and metric choice alongside scores. HELMET does not rerun the
complete LongBench suite head to head, and its model-based metrics introduce
judge dependence of their own.