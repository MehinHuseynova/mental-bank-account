/**
 * All date and time logic lives here (ARCHITECTURE §7). Framework-free, so it can be unit-tested.
 */

/** A time of day, always 24h internally: hour 0–23, minute 0–59. */
export type TimeOfDay = { hour: number; minute: number };

export type Meridiem = 'AM' | 'PM';

/** The time picker moves minutes in 5-minute steps. */
export const MINUTE_STEP = 5;

/** Modulo that stays positive for negative numbers (-1 mod 24 = 23, not -1). */
function wrap(value: number, size: number): number {
  return ((value % size) + size) % size;
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * Moves the hour by `delta` and wraps around.
 * 24h: cycles 0–23. 12h: cycles 1–12 and never changes AM/PM, because AM/PM is its
 * own column (11 PM + 1 → 12 PM, 12 PM + 1 → 1 PM).
 */
export function stepHour(time: TimeOfDay, delta: number, uses24hourClock: boolean): TimeOfDay {
  if (uses24hourClock) {
    return { ...time, hour: wrap(time.hour + delta, 24) };
  }
  const pmOffset = time.hour >= 12 ? 12 : 0;
  return { ...time, hour: wrap(time.hour - pmOffset + delta, 12) + pmOffset };
}

/**
 * Moves the minute to the next (delta > 0) or previous (delta < 0) multiple of
 * MINUTE_STEP and wraps around (55 → 00). The hour does not change: each column is independent.
 * An off-step value (e.g. :32) snaps to :35 going up and :30 going down.
 */
export function stepMinute(time: TimeOfDay, delta: number): TimeOfDay {
  const steps = time.minute / MINUTE_STEP;
  const target = delta > 0 ? Math.floor(steps) + delta : Math.ceil(steps) + delta;
  return { ...time, minute: wrap(target * MINUTE_STEP, 60) };
}

/** Switches between AM and PM, keeping the same clock time (9:30 PM ↔ 9:30 AM). */
export function toggleMeridiem(time: TimeOfDay): TimeOfDay {
  return { ...time, hour: wrap(time.hour + 12, 24) };
}

/** The pieces a time display needs. `meridiem` is null on a 24h clock. */
export type TimeParts = { hour: string; minute: string; meridiem: Meridiem | null };

/** Splits a time for display: 21:30 → "9" "30" "PM" (12h) or "21" "30" (24h). */
export function getTimeParts(time: TimeOfDay, uses24hourClock: boolean): TimeParts {
  const minute = pad2(time.minute);
  if (uses24hourClock) {
    return { hour: pad2(time.hour), minute, meridiem: null };
  }
  return {
    hour: String(time.hour % 12 || 12),
    minute,
    meridiem: time.hour >= 12 ? 'PM' : 'AM',
  };
}

/** "9:30 PM" on a 12h clock, "21:30" on a 24h clock. */
export function formatTime(time: TimeOfDay, uses24hourClock: boolean): string {
  const { hour, minute, meridiem } = getTimeParts(time, uses24hourClock);
  return meridiem ? `${hour}:${minute} ${meridiem}` : `${hour}:${minute}`;
}

/** 21:30 → "21:30". The storage format for a time of day: always 24h `HH:mm`. */
export function toTimeKey(time: TimeOfDay): string {
  return `${pad2(time.hour)}:${pad2(time.minute)}`;
}

/** "21:30" → 21:30. Returns null for anything that isn't a valid 24h `HH:mm` time. */
export function parseTimeKey(key: string): TimeOfDay | null {
  const match = /^(\d{2}):(\d{2})$/.exec(key);
  if (!match) {
    return null;
  }
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) {
    return null;
  }
  return { hour, minute };
}
