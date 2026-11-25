import { useState } from 'react';

import { DEFAULT_REMINDER_TIME } from '@/features/reminder/default-reminder-time';
import { parseTimeKey, toTimeKey, type TimeOfDay } from '@/lib/dates';
import { getReminder, setReminder } from '@/lib/storage/settings';

export type ReminderSettings = { enabled: boolean; time: TimeOfDay };

/** Before the user has chosen: no reminder, default time 21:30. */
function readReminderSettings(): ReminderSettings {
  const stored = getReminder();
  if (!stored) {
    return { enabled: false, time: DEFAULT_REMINDER_TIME };
  }
  // A broken stored time falls back to the default instead of crashing.
  return { enabled: stored.enabled, time: parseTimeKey(stored.time) ?? DEFAULT_REMINDER_TIME };
}

/**
 * The saved reminder choice (on/off + time). Converts between the storage format
 * (`"21:30"`) and the `TimeOfDay` the UI works with.
 * Scheduling the notification itself comes in the notification ticket.
 */
export function useReminderSettings() {
  const [settings, setSettings] = useState(readReminderSettings);

  const save = (next: ReminderSettings) => {
    setReminder({ enabled: next.enabled, time: toTimeKey(next.time) });
    setSettings(next);
  };

  return { ...settings, save };
}
