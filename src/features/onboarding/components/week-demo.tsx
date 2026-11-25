import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Card } from '@/components/ui/card';
import { onboardingCopy } from '@/features/onboarding/copy';
import { colors, fonts, radii, sizes, spacing } from '@/theme';

type DayState = 'done' | 'missed' | 'today' | 'future';

/** A fixed example week, Monday first. Not real data, so no date logic. */
const DEMO_WEEK: readonly DayState[] = [
  'done',
  'done',
  'missed',
  'done',
  'today',
  'future',
  'future',
];

const copy = onboardingCopy.everyDay;

/**
 * The example week on onboarding page 3. Purely decorative (the text below explains
 * the rule), so it is hidden from VoiceOver.
 */
export function WeekDemo() {
  return (
    <Card accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={styles.week}>
        {DEMO_WEEK.map((state, i) => (
          <View key={copy.weekdays[i]} style={styles.day}>
            <AppText variant="label" color={state === 'today' ? 'primary' : 'textSecondary'}>
              {copy.weekdays[i]}
            </AppText>
            <DayCircle state={state} />
          </View>
        ))}
      </View>

      <View style={styles.note}>
        <View style={styles.noteIcon} />
        <AppText variant="cardText" color="textSecondary" style={styles.noteText}>
          <AppText variant="cardText" color="textPrimary" style={styles.bold}>
            {copy.missedDay}
          </AppText>{' '}
          {copy.missedNote}
        </AppText>
      </View>
    </Card>
  );
}

function DayCircle({ state }: { state: DayState }) {
  return (
    <View style={[styles.circle, circleStyles[state]]}>
      {state === 'done' && (
        <SymbolView
          name="checkmark"
          size={sizes.icon.small}
          weight="bold"
          tintColor={colors.onPrimary}
        />
      )}
      {state === 'today' && (
        <AppText variant="caption" numberOfLines={1} adjustsFontSizeToFit>
          {copy.today}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  week: {
    flexDirection: 'row',
    gap: spacing[1],
  },
  day: {
    flex: 1,
    alignItems: 'center',
    gap: spacing[2],
  },
  circle: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    marginTop: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: radii.inner,
    backgroundColor: colors.background,
  },
  noteIcon: {
    width: sizes.icon.regular,
    height: sizes.icon.regular,
    borderRadius: radii.pill,
    borderWidth: sizes.dashedBorderWidth,
    borderStyle: 'dashed',
    borderColor: colors.dayMissed,
  },
  noteText: {
    flex: 1,
  },
  bold: {
    fontFamily: fonts.bold,
  },
});

const circleStyles = StyleSheet.create({
  done: {
    backgroundColor: colors.primary,
  },
  missed: {
    borderWidth: sizes.dashedBorderWidth,
    borderStyle: 'dashed',
    borderColor: colors.dayMissed,
  },
  today: {
    backgroundColor: colors.surface,
    borderWidth: sizes.ringWidth,
    borderColor: colors.primary,
  },
  future: {
    backgroundColor: colors.dayEmpty,
  },
});
