# GSM8K
Slug: gsm8k
Health: Green

## Description
GSM8K is a grade-school math word-problem benchmark designed to evaluate multi-step mathematical reasoning in natural language. It is widely used for measuring chain-of-thought performance and verification quality across language models.

## Capabilities
- Multi-step arithmetic reasoning
- Natural-language math problem solving
- Chain-of-thought sensitivity evaluation
- Accuracy comparison across prompting strategies

## Timeline
- 2021: Benchmark released with 8.5K high-quality word problems.
- 2022: Became a standard eval in LLM benchmarking suites.
- 2023: Broad adoption in instruction-tuned and reasoning model reports.
- 2024: Included in many public leaderboard and model card evaluations.

## Known Issues
- Susceptible to answer contamination from publicly available training corpora.
- Accuracy can vary significantly with prompting format and sampling settings.
- Limited to grade-school arithmetic; does not cover advanced mathematics.

## Evidence
- [Original paper (Cobbe et al.)](https://arxiv.org/abs/2110.14168)
- [Papers With Code leaderboard](https://paperswithcode.com/dataset/gsm8k)
- [Hugging Face dataset card](https://huggingface.co/datasets/openai/gsm8k)

## Successors
- MATH
- GPQA
