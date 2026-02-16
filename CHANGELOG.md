# Changelog

## 2026-02-15

### Changed
- Refreshed npm dependencies to the latest stable releases allowed by current semver ranges via `npm update` and `npm install`.
- Updated `package-lock.json` to capture resolved package version updates (including Vite moving to `7.3.1` in the lockfile).

### Verified
- Ran `npm outdated` and confirmed no direct dependencies in `package.json` are behind their latest published stable versions for the current ranges.
- Ran `npm run build` successfully (`tsc -p electron` and `vite build` both passed).

### Notes
- npm reported some deprecation warnings from transitive dependencies, but no vulnerabilities were found (`npm audit` summary during install: 0 vulnerabilities).

## 2026-02-15 (latest-major refresh)

### Changed
- Upgraded direct dev dependencies in `package.json` to the newest stable versions (including major bumps) using `npm-check-updates`.
- Updated `package-lock.json` after reinstall to reflect the new direct and transitive dependency graph.
- Version bumps applied:
  - `@types/node`: `^24.3.0` -> `^25.2.3`
  - `concurrently`: `^9.2.0` -> `^9.2.1`
  - `electron`: `^37.3.1` -> `^40.4.1`
  - `electron-builder`: `^26.0.12` -> `^26.7.0`
  - `typescript`: `^5.9.2` -> `^5.9.3`
  - `vite`: `^7.1.3` -> `^7.3.1`
  - `wait-on`: `^8.0.4` -> `^9.0.4`

### Verified
- Ran `npm install` successfully after manifest upgrades.
- Ran `npm run build` successfully (`tsc -p electron` and `vite build` both passed).

## 2026-02-15 (bun migration)

### Changed
- Switched project scripts to Bun-first execution in `package.json` (`bun run ...` instead of `npm run ...`).
- Added `packageManager` metadata (`bun@1.3.6`) to make the intended package manager explicit.
- Generated and committed `bun.lock` for deterministic Bun installs.
- Updated `README.md` commands and dependency installation examples to Bun equivalents.
- Removed `package-lock.json` so the repository tracks a single package manager lockfile.

### Verified
- Ran `bun install` successfully (lockfile migration completed by Bun).
- Ran `bun run build` successfully (`tsc -p electron` and `vite build` both passed).
