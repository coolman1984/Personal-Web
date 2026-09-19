# Skill Observation Log

Observations captured during task-oriented work.

**Status key:** OPEN = not yet actioned | ACTIONED (YYYY-MM-DD) = skill updated/created | DECLINED (YYYY-MM-DD) = user decided not to pursue

---

## 2026-09-19

### Observation 1: Verify dependency completeness before app debugging

**Status:** OPEN
**Date:** 2026-09-19
**Session context:** Starting a Next.js app whose dependency directory existed but was incomplete.
**Skill:** debugging-and-error-recovery
**Type:** open-source
**Phase/Area:** Phase 1: Root Cause Investigation

**Issue:** A present `node_modules` directory initially suggested dependencies were installed, but the actual Next.js and TypeScript executables were missing. After reinstalling, the platform-specific compiler binding was invalid and the default Turbopack build could not run.

**Suggested improvement:** Add an early dependency completeness check and test the framework's reported platform fallback before changing application code.

**Principle:** Check executable availability and framework/toolchain compatibility separately; a partially present dependency directory can hide the real startup failure.

<!-- Task observer checkpoint: no additional observations at the third TodoWrite completion. -->
