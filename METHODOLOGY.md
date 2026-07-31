---
title: Measurement Status Methodology
description: Evidence and decision rules for benchmark fitness classifications
---

## Purpose

Measurement status describes whether a benchmark can support its intended
inference. It does not grade the benchmark's historical importance or claim that
an instrument has no remaining diagnostic value. Red is the visual encoding for
Not Fit for primary inference.

## Unit of assessment

The unit of assessment is a benchmark paired with an intended inference. A
benchmark may remain useful for regression testing, historical comparison, or
targeted diagnostics while being unfit as a standalone model-selection score.
Supported uses and unsupported inferences preserve that distinction.

## Evidence gate

* Every reported validity threat must link directly to supporting evidence
* Every threat source must also appear in the benchmark's evidence register
* Source scope and caveats limit how far an observation may be generalized
* Missing evidence produces an Unknown risk, not an adverse finding
* Status decisions use documented threats rather than benchmark age or reputation

## Decision procedure

1. Define the primary inference from the measurement targets and common reported use.
2. Review direct evidence for construct coverage, score validity, contamination, saturation, and reproducibility.
3. Determine whether the normal reporting protocol contains an effective mitigation.
4. Separate narrow supported uses from inferences defeated by the documented threats.
5. Assign the least restrictive status consistent with the evidence.

## Status criteria

### Fit for stated use

Use Fit when registered evidence supports the stated inference and no documented
threat defeats it under the stated protocol. Fit does not imply universal validity.

### Qualified use

Use Qualified when the inference remains defensible only with explicit controls,
companion evaluations, restricted scope, or interpretive constraints.

### Not fit for primary inference

Use Not Fit when direct registered evidence shows that the benchmark's commonly
reported score cannot independently support its primary inference. A narrow or
historical use may remain supported.

## Red decision rule

A red decision requires at least one source-backed threat that defeats the primary
inference and lacks an effective mitigation in the benchmark as normally reported.
One decisive threat can be sufficient; several high risk labels do not
automatically produce a red decision.

Relevant failure modes include saturation that prevents meaningful discrimination,
contamination that compromises interpretation, material score dependence on valid
prompt or scoring choices, judge behavior that does not measure the claimed
construct, and inadequate items or tests that admit incorrect solutions.

## Governance and review

Benchmark records are the source of truth for current status. Each record names
its reviewer and review date. Status changes require corresponding source-linked
validity threats and should be reviewed again when a benchmark revision, stronger
evaluation protocol, or contrary study changes the evidence base.