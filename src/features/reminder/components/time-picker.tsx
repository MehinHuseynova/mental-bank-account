import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Card } from '@/components/ui/card';
import { reminderCopy } from '@/features/reminder/copy';
import { getTimeParts, stepHour, stepMinute, toggleMeridiem, type TimeOfDay } from '@/lib/dates';
import { colors, sizes, spacing, type TextVariant } from '@/theme';

const copy = reminderCopy.timePicker;

type TimePickerProps = {
  value: TimeOfDay;
  onChange: (time: TimeOfDay) => void;
  /** 24h: hour + minute columns. 12h: an extra AM/PM column. */
  uses24hourClock: boolean;
};

/** Time picker from the design: one column per part, each with an up and a down chevron. */
export function TimePicker({ value, onChange, uses24hourClock }: TimePickerProps) {
  const parts = getTimeParts(value, uses24hourClock);

  return (
    <Card style={styles.card}>
      <Column
        label={parts.hour}
        upLabel={copy.hourUp}
        downLabel={copy.hourDown}
        onUp={() => onChange(stepHour(value, 1, uses24hourClock))}
        onDown={() => onChange(stepHour(value, -1, uses24hourClock))}
      />
      <Column
        label={parts.minute}
        upLabel={copy.minuteUp}
        downLabel={copy.minuteDown}
        onUp={() => onChange(stepMinute(value, 1))}
        onDown={() => onChange(stepMinute(value, -1))}
      />
      {parts.meridiem && (
        // AM/PM has only two values, so up and down both switch it.
        <Column
          label={parts.meridiem}
          variant="timeMeridiem"
          upLabel={copy.meridiemToggle}
          downLabel={copy.meridiemToggle}
          onUp={() => onChange(toggleMeridiem(value))}
          onDown={() => onChange(toggleMeridiem(value))}
        />
      )}
    </Card>
  );
}

type ColumnProps = {
  label: string;
  variant?: Extract<TextVariant, 'timeDigits' | 'timeMeridiem'>;
  upLabel: string;
  downLabel: string;
  onUp: () => void;
  onDown: () => void;
};

function Column({ label, variant = 'timeDigits', upLabel, downLabel, onUp, onDown }: ColumnProps) {
  return (
    <View style={styles.column}>
      <ChevronButton direction="up" accessibilityLabel={upLabel} onPress={onUp} />
      <AppText variant={variant}>{label}</AppText>
      <ChevronButton direction="down" accessibilityLabel={downLabel} onPress={onDown} />
    </View>
  );
}

type ChevronButtonProps = {
  direction: 'up' | 'down';
  accessibilityLabel: string;
  onPress: () => void;
};

function ChevronButton({ direction, accessibilityLabel, onPress }: ChevronButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.chevron, pressed && styles.pressed]}
    >
      <SymbolView
        name={direction === 'up' ? 'chevron.up' : 'chevron.down'}
        size={sizes.icon.regular}
        weight="semibold"
        tintColor={colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  column: {
    flex: 1,
    alignItems: 'center',
    gap: spacing[1],
  },
  chevron: {
    width: sizes.touchTarget,
    height: sizes.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
});
