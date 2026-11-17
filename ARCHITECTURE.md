# Architecture & decisions

Decisions made before development started (Nov 2026). Follow them; if one stops making sense, propose a change and update this file, rather than quietly working around it.

## 1. Folder structure

```
src/
├── app/                  # ROUTES ONLY (Expo Router). Thin files that compose feature code.
├── components/ui/        # Generic building blocks; know nothing about ESP
│                         #   (AppText, Screen, PrimaryButton, TextButton, Card, IconTile, PagerDots)
├── features/
│   ├── onboarding/       # Onboarding pages, pager, copy
│   ├── entries/          # ESP entries: EspCard, WeekStrip, DayCircle, hooks, copy
│   └── reminder/         # TimePicker, notification scheduling, hooks, copy
├── theme/                # colors, typography, spacing, radii (single source of truth)
├── lib/                  # Framework-free helpers: dates, storage
└── assets/illustrations/ # SVG illustrations as React components
```

- Feature folders own their components, hooks, and `copy.ts`. A feature may import from `ui/`, `theme/`, `lib/`, and (sparingly) another feature's public components.
- `ui/` must never import from `features/`.

## 2. Routes

```
src/app/
├── _layout.tsx            # Root: loads fonts, keeps splash until ready, decides onboarding vs. app
├── onboarding.tsx         # 4-page onboarding pager (no header, outside tabs)
├── (tabs)/
│   ├── _layout.tsx        # Tab bar: Today, History
│   ├── index.tsx          # Today
│   └── history.tsx        # History
├── entry/[date].tsx       # Read one past day (date = YYYY-MM-DD), read-only
└── settings.tsx           # Opened from Today (not a tab): reminder time, credits
```

- Onboarding gate: root layout reads "onboarding completed" from storage; use Expo Router's recommended pattern for this (check SDK 58 docs, e.g. protected routes) instead of redirect hacks.
- Tapping the reminder notification opens Today.

## 3. Theme

- **Semantic token names** (`primary`, `surface`, `textMuted`), never visual ones (`green`, `grey`).
- Values: see `design/README.md`. Font: **Nunito** (Regular, Bold, ExtraBold).
- Spacing on a **4-pt scale** (`4, 8, 12, 16, 20, 24, 28, 32…`).
- **Light mode only** for now; structure the palette so a dark palette can be added later without renaming.
- No hex values, font names, or magic spacing numbers outside `src/theme/`.

## 4. Components

- `ui/` = presentational, typed props, no business logic, no storage access.
- Feature components (`EspCard`, `WeekStrip`, `TimePicker`) are built from `ui/` pieces.
- Touch targets at least **44 × 44 pt**. Icon-only buttons need an `accessibilityLabel`. Allow font scaling.

## 5. Storage

- **expo-sqlite**, wrapped in `src/lib/storage/`. Screens and components never call SQLite directly; they use hooks from features (`useTodayEntry`, `useReminderSettings`).
- Entries table: one row per local date (`YYYY-MM-DD`): `effort`, `success`, `progress`, `createdAt`, `updatedAt`.
- Settings (key-value): `onboardingCompleted`, `reminderEnabled`, `reminderTime` (`HH:mm`, 24h internally).
- **The "only today is editable" rule is enforced in the storage layer**, not only in the UI.

## 6. Illustrations & icons

- Illustrations: SVGs from `design/` converted to **static React components** with `react-native-svg`. No animation for now.
  - `brain-lights.svg` has a CSS glow animation (`<style>`/`@keyframes`) that React Native doesn't support. Drop it and render the halos with a fixed opacity (about 0.7, the file's reduced-motion value).
- Icons (chevron, bell, moon, checkmark): **SF Symbols via `expo-symbols`** (already installed; the app is iPhone only). Fall back to a small SVG only if a symbol doesn't match the design.

## 7. Dates & time

- All date logic lives in `src/lib/dates.ts`. Nowhere else does date math.
- Days are identified by **local date keys** `YYYY-MM-DD`. Weeks start on **Monday**.
- Format with `Intl` / `toLocaleDateString`. 12h vs 24h via `expo-localization`. No date library unless a real need appears.
- Edge cases to handle: the day changing at midnight while the app is open; timezone changes.

## 8. Text

- User-facing strings live in each feature's `copy.ts`, not inline in components. This prepares for German/English later without adding an i18n library now.

## 9. State

- React state + small custom hooks. **No Redux/Zustand/other state libraries.** Add React Context only if several distant screens need the same live data.

## 10. Code conventions

- TypeScript **strict**. No `any` without a comment explaining why.
- File names **kebab-case** (`week-strip.tsx`); components **PascalCase**; **named exports** (except route files, which Expo Router requires to default-export).
- Imports via the `@/` alias (`@/components/ui/card`).
- ESLint via `npx expo lint`; **Prettier** for formatting.
- Before a ticket is done: `npx expo lint` and `npx tsc --noEmit` pass (and tests, once they exist).

## 11. Testing

- Unit tests (`jest-expo`) for **logic**: `lib/dates`, storage rules (today editable, past locked), reminder time calculations.
- UI is verified manually on the iPhone.

## 12. Privacy

- All data stays on the device. **No analytics, tracking, or network calls** for user data.

## 13. Git workflow

- `main` is always working. **One branch per ticket**: `t1-cleanup-navigation`, `t2-theme-fonts`, …
- Small commits with clear messages. Push the branch, open a **pull request**, review the diff on GitHub, merge, delete the branch.
- Never push straight to `main`, never force-push, without the developer's explicit OK.
