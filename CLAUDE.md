@AGENTS.md
@ARCHITECTURE.md

# Mental Bank Account

An iPhone app (Expo / React Native) that helps people build confidence by writing down their daily **ESP**.

## The idea

Based on the "mental bank account" concept from _The Confident Mind_ by Dr. Nate Zinsser: confidence grows when you regularly "deposit" positive memories. Every evening the user writes their ESP for the day:

- **E – Effort:** something you put real effort into today
- **S – Success:** something that went well today
- **P – Progress:** a step forward today, even a small one

Knowing they'll write it at night, users start noticing their ESP during the day.

Credit the book in the onboarding, but the app has its own name and branding. Do not use the book's title or cover as the app's name or brand.

## MVP scope

1. **Onboarding (4 pages):** balance concept → what E/S/P means → "every day counts once" → pick the evening reminder time. Designs in `design/Onboarding/`. Match them closely.
2. **Today:** summary of recent deposits and a button that opens **Today's deposit** (one text each for E, S, P, then save). One entry per day.
3. **Deposits:** month calendar plus past deposits, newest first, shown inline.
4. **I need a boost:** shows random past deposits, opened from Today and Deposits.
5. **Settings:** reminder time, keep-on-Lock-Screen option, about, credits.
6. **Daily reminder:** a local notification at a time the user picks.

Designs for 2–6 are in `design/Daily-use/`. **Decided against** (even though some designs show them): "+ Add another" (several items per E/S/P) and Face ID lock.

## Product rules

- **One deposit per calendar day**; a deposit = Effort + Success + Progress.
- **Past days can't be edited or filled in later.** A missed day stays empty. Only today's entry can be created or edited.
- Past deposits can always be **read**.
- Reminder default **21:30**. Time display **follows the phone's 12h/24h setting**. The reminder should stay on the Lock Screen until the day's deposit is made.
- Onboarding "Skip" (pages 1–3) jumps to the reminder page, not into the app.
- Light mode only for now (the designs are light only).

Later ideas (not MVP): streaks, export, German/English, App Store release.

## Tech decisions

- Expo SDK 58, Expo Router (routes in `src/app/`), TypeScript, React 19.3, React Native 0.88.
- **No backend, no accounts.** Entries are stored locally on the device.
- Notifications are local (scheduled on the device), with no push server.
- Testing during development happens on a real iPhone via Expo Go (`npx expo start`, scan the QR code).
- Linked to EAS project `mental-bank-account` (owner: `mehinhuseynovas-team`).
- Prefer Expo modules over third-party libraries; install with `npx expo install`.

## How to work with me (the developer)

- I'm a frontend developer using this project to practice working with AI. **Explain what you do and why**, briefly, so I learn, without lecturing.
- There is no backlog file. **We define each ticket together in the conversation** when we start it: look at the relevant design, propose a short plan, wait for my OK, then build. One ticket at a time; don't plan future features ahead unless I ask.
- Keep changes small and focused on the current ticket. No unrequested extras.
- Before saying a ticket is done: run `npx expo lint` and `npx tsc --noEmit`, and tell me what to check on my phone.
- One branch per ticket, then a pull request (see ARCHITECTURE.md §13). Commit when I agree, with a clear message. Never push without asking.
- Sometimes I'll write the code myself and ask you to review it. Then review it honestly; don't rewrite it.

## Design

- Design exports live in `design/` (e.g. `design/Onboarding/*.png`, exported at 2x for a 390 × 844 pt screen, so divide pixels by 2). Read them before building UI.
- Measured colors, the Nunito type scale, and spacing are listed in `design/README.md`.
- Put colors, fonts, and spacing in `src/theme/`; don't hardcode them in components.
- If a color or font is unclear from an image, ask instead of guessing.
