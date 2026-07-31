---
title: MT-Bench Paper Evidence
description: Page-located evidence extracted from six papers used to assess MT-Bench and Chatbot Arena
---

## Extraction Method

The PDFs were downloaded from arXiv on 2026-07-31. PyMuPDF block-mode
extraction produced UTF-8 text while retaining form-feed page boundaries. PDF
page locators below refer to the downloaded files. Quoted wording is unchanged
apart from joining words split by line-end hyphenation.

## MT-Bench and Chatbot Arena

Sources: [PDF](./2306.05685-mt-bench.pdf),
[extracted text](./2306.05685-mt-bench.txt), and
[arXiv](https://arxiv.org/abs/2306.05685).

Locator: PDF page 3, section 2.2; PDF page 5, section 3.3; PDF page 9,
"Limitations."

The instrument contains 80 manually designed multi-turn questions, with 10 in
each of eight categories. In the original order-swap test, GPT-4 was consistent
on 65% of judgments and favored the first response on 30%.

> "This paper emphasizes helpfulness but largely neglects safety."

The authors also state that accuracy, relevance, and creativity are combined
within one helpfulness metric.

Assessment: This directly supports sampling, position-bias, and construct-scope
threats. The position test deliberately used similar answers, and the paper
reports stronger agreement in other settings.

## Chatbot Arena

Sources: [PDF](./2403.04132-chatbot-arena.pdf),
[extracted text](./2403.04132-chatbot-arena.txt), and
[arXiv](https://arxiv.org/abs/2403.04132).

Locator: PDF page 8, "Limitations."

> "This inclination may result in a biased distribution of users."

The authors expect the user base to consist primarily of LLM hobbyists and
researchers. They also caution that prompts from the online chat interface may
not reflect production or specialized-domain use.

Assessment: This directly limits the population represented by Arena
preferences. It does not negate the paper's evidence of topic diversity or
agreement with expert raters.

## Length-Controlled AlpacaEval

Sources: [PDF](./2404.04475-length-controlled-alpacaeval.pdf),
[extracted text](./2404.04475-length-controlled-alpacaeval.txt), and
[arXiv](https://arxiv.org/abs/2404.04475).

Locator: PDF page 2, introduction.

The study reports that length-controlled AlpacaEval correlates more strongly
with Chatbot Arena than either uncorrected AlpacaEval or MT-Bench and is less
sensitive to verbosity gaming.

Assessment: This supports a companion instrument for low-cost preference
evaluation. It is not a direct perturbation of MT-Bench and therefore does not
support a standalone MT-Bench critique.

## Arena-Hard-Auto

Sources: [PDF](./2406.11939-arena-hard.pdf),
[extracted text](./2406.11939-arena-hard.txt), and
[arXiv](https://arxiv.org/abs/2406.11939).

Locator: PDF page 8, section 6.2.

> "MT-bench's Spearman Correlation (89.9%) and confidence agreement (22.6%)"

The paper reports this gap against Chatbot Arena rankings and finds that its
500-prompt Arena-Hard-Auto instrument provides stronger separability and
tighter confidence intervals than MT-Bench.

Assessment: This directly supports limited ranking granularity for the tested
top-20 model set. The comparison used the authors' April 2024 leaderboard
snapshot and does not measure all model populations.

## The Comparative Trap

Sources: [PDF](./2406.12319-comparative-trap.pdf),
[extracted text](./2406.12319-comparative-trap.txt), and
[arXiv](https://arxiv.org/abs/2406.12319).

Locator: PDF page 4, section 3.3 and Figure 1.

Pairwise evaluators outperformed pointwise evaluators on normal MT-Bench
samples but underperformed them on adversarial LLMBar samples. The study
attributes the reversal to pairwise comparison amplifying superficial
preferences under adversarial conditions.

Assessment: This directly shows that performance on MT-Bench meta-evaluation
does not establish judge robustness to adversarially attractive responses. It
does not show that MT-Bench's normal samples are themselves adversarial.

## JudgeBench

Sources: [PDF](./2410.12784-judgebench.pdf),
[extracted text](./2410.12784-judgebench.txt), and
[arXiv](https://arxiv.org/abs/2410.12784).

Locator: PDF page 1, abstract; PDF page 8, section 4.2.

> "crowdsourced human preference is a poor indicator of factual and logical
> correctness"

On JudgeBench's objectively labeled response pairs, vanilla GPT-4o achieved
50% accuracy and the Arena-Hard prompt raised it to 56%.

Assessment: This supports the unsupported-inference boundary between
preference and correctness. JudgeBench is a separate, deliberately difficult
judge benchmark, so its accuracy must not be reported as an MT-Bench rerun.