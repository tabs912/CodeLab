# Performance Standard

Review:

- Service calls in loops
- Repeated reads and writes
- Repeated formatting
- Repeated parsing
- O(n²) behavior
- Row-by-row deletion
- Unnecessary sorting
- Excessive logging
- Quota and timeout risks

Prefer one read, in-memory processing, and one write whenever practical.
