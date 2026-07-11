# CodeLab Repository Tools

The `tools/` folder contains optional shell scripts for checking and maintaining the CodeLab repository.

## Scripts

- `startup_check.sh` — startup readiness check
- `repo_status.sh` — compact repository status
- `maintenance_check.sh` — integrity, remote, artifact, binary, conflict, and branch checks
- `update_remote.sh` — safely changes the `origin` URL and verifies access

## Install

Copy this folder into the root of the CodeLab repository, then run:

```bash
chmod +x tools/*.sh
```

## Use

```bash
./tools/startup_check.sh
./tools/repo_status.sh
./tools/maintenance_check.sh
./tools/update_remote.sh https://github.com/tabs912/CodeLab.git
```

## Safety

These tools do not commit, push, reset, clean, delete files, or delete local branches.

`maintenance_check.sh` does run:

```bash
git fetch --all --prune
```

This prunes stale remote-tracking references but does not remove local branches or files.
