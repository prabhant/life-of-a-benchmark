---
title: MMMU Paper Evidence
description: Page-located evidence extracted from five papers used in the MMMU benchmark record
---

## Extraction Method

The PDFs were downloaded from arXiv on 2026-07-31. PyMuPDF block-mode
extraction produced UTF-8 text while retaining form-feed page boundaries. PDF
page locators below refer to the downloaded file. Quoted wording is unchanged
apart from joining words split by line-end hyphenation.

## MMMU

Sources: [PDF](./2311.16502-mmmu.pdf), [extracted text](./2311.16502-mmmu.txt),
and [arXiv](https://arxiv.org/abs/2311.16502).

Locator: PDF page 1, abstract and introduction.

> "Even the advanced GPT-4V and Gemini Ultra only achieve accuracies of 56% and
> 59% respectively, indicating significant room for improvement."

> "MMMU includes 11.5K meticulously collected multimodal questions from college
> exams, quizzes, and textbooks, covering six core disciplines."

Assessment: This is direct original evidence for the instrument's scale, domain
coverage, and reported baseline difficulty. It is not a validity critique.

## MMStar

Sources: [PDF](./2403.20330-mmstar.pdf), [extracted text](./2403.20330-mmstar.txt),
and [arXiv](https://arxiv.org/abs/2403.20330).

Locator: PDF page 2, introduction.

> "For example, more than 50% questions of ScienceQA and 20% questions of MMMU
> can be solved by most LLMs directly."

> "For the powerful close source LLM GeminiPro, it achieves 42.9% on the MMMU
> benchmark without any visual input."

Assessment: This directly supports a visual-dependency threat for a subset of
MMMU items. The paper also reports possible training leakage, but text-only
performance alone does not establish that every successful answer was memorized.

## MM-UPD Bench

Sources: [PDF](./2403.20331-mm-upd.pdf), [extracted text](./2403.20331-mm-upd.txt),
and [arXiv](https://arxiv.org/abs/2403.20331).

Locator: PDF page 18, appendix B.7, "Validity of UPD Benchmark on More Complex
Datasets."

> "As preprocessing, we first removed about 24.2% of image-agnostic questions
> from the MMMU's validation set (900 questions) using GPT-4-based CircularEval."

> "MMMU-AAD consists of 459 questions."

Assessment: This directly supports an image-agnostic-item concern and documents
a derived absent-answer evaluation. Its finding about prompting approaches is
specific to unsolvable-problem detection and should not be generalized to all
uses of MMMU.

## MMMU-Pro

Sources: [PDF](./2409.02813-mmmu-pro.pdf), [extracted text](./2409.02813-mmmu-pro.txt),
and [arXiv](https://arxiv.org/abs/2409.02813).

Locator: PDF page 2, section 2.1, "Revisiting the MMMU Benchmark."

> "We observe significant performance drops across all tested models when
> compared to the original MMMU benchmark, with decreases ranging from 16.8% to
> 26.9%."

> "However, we find that text-only LLMs can accurately answer some questions
> without requiring any visual input."

Assessment: This directly supports the claim that filtering text-only-solvable
items and expanding answer options materially changes measured performance.

## PARROT-360V

Sources: [PDF](./2411.15201-parrot-360v.pdf), [extracted text](./2411.15201-parrot-360v.txt),
and [arXiv](https://arxiv.org/abs/2411.15201).

Locator: PDF page 5, section 5.1, "Visual Perception Failures."

> "On benchmarks such as MMMU and MathVista, GPT-4o and Claude-3.5-Sonnet
> achieved high scores of 0.69 and 0.72, respectively (Table 2), mainly because
> these tasks focus on simple image-text alignment or basic reasoning."

Assessment: This is a direct comparative critique from the PARROT-360V authors.
It motivates complementary complex visual-puzzle evaluation, but the paper's
three-model comparison does not establish that every MMMU item is simple.
