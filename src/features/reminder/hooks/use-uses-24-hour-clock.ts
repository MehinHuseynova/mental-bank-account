import { useCalendars } from 'expo-localization';

/**
 * True when the phone is set to 24-hour time. Re-renders if the user changes the setting.
 * `uses24hourClock` is only null on some web browsers; fall back to 12h there.
 */
export function useUses24HourClock(): boolean {
  const [calendar] = useCalendars();
  return calendar.uses24hourClock ?? false;
}
