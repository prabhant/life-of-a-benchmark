---
title: Benchmark Critique Source Verification
description: Evidence for a minimal open-access corpus that defines, audits, extends, or replaces LongBench
ms.date: 2026-07-30
ms.topic: reference
---

## Research Scope

Find the smallest defensible set of four to six open-access full papers that
directly define, audit, critique, reproduce, extend, or replace LongBench. For
each retained paper, verify the bibliography, open full-text URL, direct
relationship to LongBench, exact claims, verbatim evidence, PDF locators, role,
and caveats. Exclude papers that only cite LongBench or report a LongBench score.

Research questions:

* Which paper defines the original benchmark and its intended scope?
* Which papers directly reuse, modify, reproduce, audit, or supersede LongBench?
* Which candidates contribute distinct evidence about length, task design,
	prompts, metrics, contamination, answerability, or baseline-ability
	confounding?
* Which four or five papers form the smallest complementary download set?

## Evidence Ledger

### LongBench

* Status: Retain as the defining paper
* Citation: Yushi Bai, Xin Lv, Jiajie Zhang, Hongchang Lyu, Jiankai Tang,
	Zhidian Huang, Zhengxiao Du, Xiao Liu, Aohan Zeng, Lei Hou, Yuxiao Dong, Jie
	Tang, and Juanzi Li. 2024. *LongBench: A Bilingual, Multitask Benchmark for
	Long Context Understanding*. ACL 2024, pages 3119-3137.
* Canonical record: <https://aclanthology.org/2024.acl-long.172/>
* Open PDF: <https://aclanthology.org/2024.acl-long.172.pdf>
* Verified role: Defines 21 datasets across six English and Chinese task
	categories, with automatic evaluation in a standardized format
* Publication and access: Peer-reviewed ACL long paper, CC BY 4.0
* Locator status: Section and PDF-page verification remains pending

### LongBench v2

* Status: Strong candidate as the official successor
* Citation metadata verified from arXiv: Yushi Bai, Shangqing Tu, Jiajie Zhang,
	Hao Peng, Xiaozhi Wang, Xin Lv, Shulin Cao, Jiazheng Xu, Lei Hou, Yuxiao Dong,
	Jie Tang, and Juanzi Li. *LongBench v2: Towards Deeper Understanding and
	Reasoning on Realistic Long-context Multitasks*. arXiv:2412.15204v2, 2025
* Abstract: <https://arxiv.org/abs/2412.15204>
* Open PDF: <https://arxiv.org/pdf/2412.15204>
* Verified role: Replaces the original benchmark's mostly automatic,
	dataset-assembled evaluation with 503 human-collected multiple-choice
	questions spanning 8K to 2M words and emphasizing deep understanding and
	reasoning
* Publication and access caveat: arXiv preprint; arXiv nonexclusive
	distribution license
* Locator status: Full-paper evidence and printed PDF pages remain pending

### HELMET

* Status: Retain as a broad methodological critique and replacement framework
* Citation: Howard Yen, Tianyu Gao, Minmin Hou, Ke Ding, Daniel Fleischer, Pei
	Izsak, Moshe Wasserblat, and Danqi Chen. 2025. *HELMET: How to Evaluate
	Long-Context Language Models Effectively and Thoroughly*. ICLR 2025
* Abstract and HTML: <https://arxiv.org/abs/2410.02694> and
	<https://arxiv.org/html/2410.02694>
* Open PDF: <https://arxiv.org/pdf/2410.02694>
* Verified role: Compares LongBench's coverage against a controlled suite with
	retrieval, retrieval-augmented generation, many-shot learning,
	summarization, and generation; argues that prompts and metrics materially
	affect rankings
* Direct reproduction evidence: Reproduces InfiniteBench rather than
	LongBench, removes answer leakage from prompts, and replaces brittle exact
	matching with model-based evaluation
* Caveat: Its direct experimental repair targets InfiniteBench. Its LongBench
	relationship is comparative and taxonomic, not a LongBench reproduction
* Locator status: Sections 3-4 and the InfiniteBench reproduction passages are
	verified in HTML; printed PDF pages remain pending

### LV-Eval

* Status: Retain as the strongest direct LongBench dataset audit among the
	established candidates
* Citation: Tao Yuan, Xuefei Ning, Dong Zhou, Zhijie Yang, Shiyao Li, Minghui
	Zhuang, Zheyue Tan, Zhuyu Yao, Dahua Lin, Boxun Li, Guohao Dai, Shengen Yan,
	and Yu Wang. 2024. *LV-Eval: A Balanced Long-Context Benchmark with 5 Length
	Levels Up to 256K*. arXiv:2402.05136
* Abstract and HTML: <https://arxiv.org/abs/2402.05136> and
	<https://arxiv.org/html/2402.05136>
* Open PDF: <https://arxiv.org/pdf/2402.05136>
* Verified role: Reuses LongBench's MultiFieldQA-en and MultiFieldQA-zh, adds
	confusing facts, controls context length at 16K-256K, and replaces keyword
	matching with a fact-recall metric
* Direct audit evidence: Reports keyword leakage in LongBench-style QA and
	demonstrates that confusing facts plus stricter scoring reduce inflated
	performance
* Publication caveat: arXiv preprint unless a peer-reviewed venue is verified
* Locator status: Sections 3.1, 3.3, and 4.3 plus relevant tables are verified
	in HTML; printed PDF pages remain pending

### 100-LongBench

* Status: Retain conditionally as the most direct audit and replacement
* Citation: Wang Yang, Hongye Jin, Shaochen Zhong, Song Jiang, Qifan Wang, Vipin
	Chaudhary, and Xiaotian Han. *100-LongBench: Are de facto Long-Context
	Benchmarks Literally Evaluating Long-Context Ability?*
	arXiv:2505.19293
* Abstract and HTML: <https://arxiv.org/abs/2505.19293> and
	<https://arxiv.org/html/2505.19293v2>
* Open PDFs: <https://arxiv.org/pdf/2505.19293v1> and
	<https://arxiv.org/pdf/2505.19293v2>
* Verified role: Directly analyzes LongBench score variation by sample length,
	rebuilds tasks into controllable lengths, filters QA answerable from prior
	knowledge, and proposes LongScore to normalize long-context performance by
	short-context baseline ability
* Direct evidence: Section 2 evaluates five context-extension methods on three
	LongBench tasks; Sections 3.1-3.3 describe the replacement benchmark and
	metric; Appendix A.1 contains the LongBench breakdowns
* Version caveat: v1 was submitted 25 May 2025. The current v2 is dated 2 June
	2026. It remains an arXiv preprint under the nonexclusive distribution
	license. Use v1 for a strict 2025 evidence cutoff
* Method caveat: LongScore can fluctuate when base task ability is weak, as the
	paper acknowledges in its Limitations section
* Locator status: Section, table, figure, and appendix locators are verified in
	HTML; printed PDF pages remain pending

### InfiniteBench

* Status: Optional sixth paper or substitute when extreme-length coverage is
	more important than direct LongBench auditing
* Citation: Xinrong Zhang et al. 2024. *∞Bench: Extending Long Context
	Evaluation Beyond 100K Tokens*. ACL 2024
* Abstract and HTML: <https://arxiv.org/abs/2402.13718> and
	<https://arxiv.org/html/2402.13718>
* Open PDF: <https://arxiv.org/pdf/2402.13718>
* Verified role: Explicitly contrasts its greater-than-100K average length and
	new tasks with LongBench's roughly 10K scale
* Caveat: Extends the evaluation regime but does not directly audit or
	reproduce LongBench

### Excluded or Context-Only Candidates

* L-Eval predates LongBench and therefore cannot audit or critique it
* RULER criticizes simple needle-in-a-haystack evaluation and supplies
	controlled synthetic tasks, but the currently verified evidence does not
	establish a direct methodological intervention on LongBench
* Score-only method papers are excluded even when they evaluate on LongBench

## Provisional Minimal Corpus

The current five-paper set is LongBench, LongBench v2, HELMET, LV-Eval, and
100-LongBench. These cover definition, official successor, broad evaluation
design, direct dataset and metric audit, and direct length and baseline-ability
audit. InfiniteBench is the best sixth paper, or a substitute for HELMET when
extreme-length benchmark evolution is the priority.

## Remaining Verification

* Extract printed PDF pages for every quotation retained in the final answer
* Verify LongBench v2's complete author list from its source or PDF
* Verify HELMET's ICLR 2025 publication record through a stable source
* Determine whether LV-Eval has a peer-reviewed publication record
* Compare 100-LongBench v1 and v2 so post-cutoff evidence is not attributed to
	the 2025 version
* Finalize exact short quotations and concise claim-to-evidence mappings

## Questions Requiring Input

* Does the evidence cutoff permit 100-LongBench v2 from 2 June 2026, or must the
	final corpus and quotations use its 25 May 2025 v1?
