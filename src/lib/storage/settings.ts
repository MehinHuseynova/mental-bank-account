import Storage from 'expo-sqlite/kv-store';

/**
 * App settings, kept on the device in expo-sqlite's key-value store (ARCHITECTURE §5).
 * The only file that touches the store for settings; features use hooks built on these.
 *
 * The store holds strings only, so booleans are saved as "true" / "false".
 * Synchronous on purpose: the values are tiny, and reading them on the first render
 * means the app opens on the right screen without waiting for a promise.
 */

const KEYS = {
  onboardingCompleted: 'onboardingCompleted',
  reminderEnabled: 'reminderEnabled',
  reminderTime: 'reminderTime',
} as const;

function readBoolean(key: string): boolean | null {
  const value = Storage.getItemSync(key);
  return value === null ? null : value === 'true';
}

function writeBoolean(key: string, value: boolean): void {
  Storage.setItemSync(key, String(value));
}

export function getOnboardingCompleted(): boolean {
  return readBoolean(KEYS.onboardingCompleted) ?? false;
}

export function setOnboardingCompleted(completed: boolean): void {
  writeBoolean(KEYS.onboardingCompleted, completed);
}

/** `time` is a 24h `HH:mm` key (see `toTimeKey` in lib/dates). */
export type StoredReminder = { enabled: boolean; time: string };

/** Null until the user has made a reminder choice (end of onboarding). */
export function getReminder(): StoredReminder | null {
  const enabled = readBoolean(KEYS.reminderEnabled);
  const time = Storage.getItemSync(KEYS.reminderTime);
  if (enabled === null || time === null) {
    return null;
  }
  return { enabled, time };
}

export function setReminder(reminder: StoredReminder): void {
  writeBoolean(KEYS.reminderEnabled, reminder.enabled);
  Storage.setItemSync(KEYS.reminderTime, reminder.time);
}
