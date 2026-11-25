import {
  formatTime,
  getTimeParts,
  parseTimeKey,
  stepHour,
  stepMinute,
  toggleMeridiem,
  toTimeKey,
  type TimeOfDay,
} from '@/lib/dates';

const t = (hour: number, minute = 0): TimeOfDay => ({ hour, minute });

describe('stepHour', () => {
  describe('24h clock', () => {
    test.each([
      [t(21), 1, t(22)],
      [t(23), 1, t(0)],
      [t(0), -1, t(23)],
    ])('%o + %i → %o', (time, delta, expected) => {
      expect(stepHour(time, delta, true)).toEqual(expected);
    });
  });

  describe('12h clock: cycles 1–12 and keeps AM/PM', () => {
    test.each([
      ['9 PM + 1 → 10 PM', t(21), 1, t(22)],
      ['11 PM + 1 → 12 PM (noon)', t(23), 1, t(12)],
      ['12 PM + 1 → 1 PM', t(12), 1, t(13)],
      ['1 PM − 1 → 12 PM', t(13), -1, t(12)],
      ['11 AM + 1 → 12 AM (midnight)', t(11), 1, t(0)],
      ['12 AM − 1 → 11 AM', t(0), -1, t(11)],
    ])('%s', (_, time, delta, expected) => {
      expect(stepHour(time, delta, false)).toEqual(expected);
    });
  });

  test('keeps the minute', () => {
    expect(stepHour(t(21, 35), 1, true)).toEqual(t(22, 35));
  });
});

describe('stepMinute', () => {
  test.each([
    ['moves in 5-minute steps', t(21, 30), 1, t(21, 35)],
    ['moves down', t(21, 30), -1, t(21, 25)],
    ['wraps 55 → 00 without changing the hour', t(21, 55), 1, t(21, 0)],
    ['wraps 00 → 55 without changing the hour', t(21, 0), -1, t(21, 55)],
    ['snaps an off-step value up', t(21, 32), 1, t(21, 35)],
    ['snaps an off-step value down', t(21, 32), -1, t(21, 30)],
    ['snaps 58 up and wraps', t(21, 58), 1, t(21, 0)],
  ])('%s', (_, time, delta, expected) => {
    expect(stepMinute(time, delta)).toEqual(expected);
  });
});

describe('toggleMeridiem', () => {
  test.each([
    [t(21, 30), t(9, 30)],
    [t(9, 30), t(21, 30)],
    [t(0), t(12)],
    [t(12), t(0)],
  ])('%o ↔ %o', (time, expected) => {
    expect(toggleMeridiem(time)).toEqual(expected);
  });
});

describe('getTimeParts', () => {
  test('12h', () => {
    expect(getTimeParts(t(21, 30), false)).toEqual({ hour: '9', minute: '30', meridiem: 'PM' });
  });

  test('24h pads the hour and has no meridiem', () => {
    expect(getTimeParts(t(7, 5), true)).toEqual({ hour: '07', minute: '05', meridiem: null });
  });
});

describe('formatTime', () => {
  test.each([
    [t(21, 30), '9:30 PM', '21:30'],
    [t(0, 0), '12:00 AM', '00:00'],
    [t(12, 0), '12:00 PM', '12:00'],
    [t(9, 5), '9:05 AM', '09:05'],
  ])('%o → "%s" / "%s"', (time, twelveHour, twentyFourHour) => {
    expect(formatTime(time, false)).toBe(twelveHour);
    expect(formatTime(time, true)).toBe(twentyFourHour);
  });
});

describe('toTimeKey', () => {
  test.each([
    [t(21, 30), '21:30'],
    [t(0, 0), '00:00'],
    [t(9, 5), '09:05'],
  ])('%o → "%s"', (time, key) => {
    expect(toTimeKey(time)).toBe(key);
  });
});

describe('parseTimeKey', () => {
  test.each([
    ['21:30', t(21, 30)],
    ['00:00', t(0, 0)],
    ['09:05', t(9, 5)],
  ])('"%s" → %o', (key, time) => {
    expect(parseTimeKey(key)).toEqual(time);
  });

  test.each(['', '9:30', '24:00', '12:60', '21:30:00', 'abc'])('"%s" → null', (key) => {
    expect(parseTimeKey(key)).toBeNull();
  });

  test('round-trips with toTimeKey', () => {
    expect(parseTimeKey(toTimeKey(t(23, 55)))).toEqual(t(23, 55));
  });
});
