# CodeLab Engineering Agent Instructions

These instructions apply to all AI coding agents working within this repository.

---
## Repository Synchronization Policy

Before beginning any review, implementation, or analysis that depends on repository files:

1. Verify the current repository status:

```bash
git branch --show-current
git status -sb
git remote -v
```

2. If `origin` is not configured, configure it:

```bash
git remote add origin https://github.com/tabs912/CodeLab.git
```

If `origin` already exists, update it if necessary:

```bash
git remote set-url origin https://github.com/tabs912/CodeLab.git
```

3. Refresh repository references:

```bash
git fetch origin --prune
```

4. Run the repository synchronization tool:

```bash
./Framework/tools/sync_workspace.sh
```

or

```bash
./tools/sync_workspace.sh
```

depending on the repository layout.

5. If the user requests review of newly uploaded scripts, reports, or other repository artifacts:

- Confirm the files are present after synchronization.
- If the files are still not present, report exactly which paths were searched.
- Do not assume files are missing until synchronization has been attempted.

### Branch Awareness

Many CodeLab reviews occur on project or Codex branches (for example `work`, `general`, `codex_Master_List`, or `codex_AideCP_Shade_&_Sync`).

When reviewing repository artifacts uploaded to `main`:

- Fetch `origin/main`.
- Compare the active branch against `origin/main`.
- Confirm that requested files are visible before beginning analysis.

### Safety

Repository synchronization must never:

- run `git reset --hard`
- run `git clean`
- overwrite local work
- switch branches without user approval
- force-push changes

If synchronization cannot complete safely, stop and report the reason.
# Startup

Before beginning work:

1. Read README.md.
2. Determine the active project.
3. Determine the requested review level.
4. Review applicable repository standards from the root spec folder.
5. Review project documentation if it exists.
6. Begin analysis.

Do not require project-specific documentation when none exists.
### Newly Uploaded Repository Files

If the user states that new files, reports, scripts, or documents were uploaded to the repository after the current workspace was created:

Assume the workspace may be stale.

Before reporting that files cannot be found:

1. Verify the Git remote.
2. Fetch the latest repository state.
3. Synchronize the workspace.
4. Search again.
5. Only then report missing files.
---

# Project Discovery

Determine whether the request is for:

- Production Project
- General Script
- Experimental Project

Adjust the review depth accordingly.

---

# Review Levels

## Quick Review

Use for:

- Standalone scripts
- General code reviews
- Error checks
- Cleanup recommendations
- Performance suggestions

Review only the supplied code.

Apply repository engineering standards.

Do not perform a complete project audit unless requested.

---

## Standard Review

Use for:

- Production script reviews
- Project reviews
- Release readiness reviews

Review available materials such as:

- Current_Production
- Reports
- Documentation
- Repository standards

Provide prioritized recommendations.

---

## Exhaustive Review

Use only when explicitly requested.

Follow the repository protocol located in:

spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md

---

# Development Rules

Always:

- Preserve approved business logic.
- Follow repository engineering standards.
- Remove obsolete code when safe.
- Remove duplicate code when safe.
- Consider dependencies before making recommendations.
- Preserve backward compatibility unless instructed otherwise.
- Recommend improvements before major rewrites.

Never:

- Rewrite a working project from scratch.
- Leave placeholder code.
- Leave TODOs in production code.
- Rename public interfaces without approval.
- Remove code without considering dependencies.

---

# Google Apps Script Standards

Prefer:

- Batch reads
- Batch writes
- Cached references
- Cached headers
- Array processing
- One-pass processing

Avoid:

- getValue() inside loops
- setValue() inside loops
- getRange() inside loops
- Cell-by-cell updates
- Row-by-row deletion
- Repeated SpreadsheetApp.flush()
- Unnecessary Spreadsheet service calls

---

# Production Code Generation

When generating production code:

- Preserve approved business logic.
- Replace complete affected functions whenever practical.
- Update dependent helpers when required.
- Remove obsolete implementations.
- Update version numbers.
- Include release notes.
- Include testing recommendations.

---

# Deliverables

When appropriate, provide:

- Executive Summary
- Functional Summary
- Architecture Review
- Dependency Review
- Performance Review
- Risk Assessment
- Recommended Improvements
- Version Recommendation
- Release Notes
- Testing Recommendations

The depth of the deliverables should match the scope of the request.

---

# Excluded Areas

Unless explicitly requested, ignore:

Archive_To_Move/

Do not use these files for:

- Code Review
- Architecture Decisions
- Production Comparisons
- Release Preparation

---

# Repository Tools

The repository includes optional maintenance utilities located in:

tools/

These tools may be used when requested but should not be executed automatically.

---

# Completion Checklist

Before completing work verify:

✓ Repository standards applied

✓ Business logic preserved

✓ Dependencies considered

✓ Recommendations prioritized

✓ Version updated (if code was generated)

✓ Release notes included (if applicable)

✓ Testing recommendations provided (if applicable)
