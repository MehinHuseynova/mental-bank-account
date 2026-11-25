import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { IconTile } from '@/components/ui/icon-tile';
import { onboardingCopy } from '@/features/onboarding/copy';
import { TimePicker } from '@/features/reminder/components/time-picker';
import { useUses24HourClock } from '@/features/reminder/hooks/use-uses-24-hour-clock';
import { formatTime, type TimeOfDay } from '@/lib/dates';
import { colors, fonts, sizes, spacing } from '@/theme';

import { OnboardingPage } from '@/features/onboarding/components/onboarding-page';

const copy = onboardingCopy.reminder;

type ReminderPageProps = {
  time: TimeOfDay;
  onChangeTime: (time: TimeOfDay) => void;
};

/** Page 4: pick the evening reminder time. The buttons live in the pager's footer. */
export function ReminderPage({ time, onChangeTime }: ReminderPageProps) {
  const uses24hourClock = useUses24HourClock();

  return (
    <OnboardingPage>
      <IconTile backgroundColor={colors.progress.background}>
        <SymbolView
          name="moon"
          size={sizes.icon.large}
          weight="semibold"
          tintColor={colors.progress.foreground}
        />
      </IconTile>
      <AppText variant="title" style={styles.title}>
        {copy.title}
      </AppText>
      <AppText style={styles.body}>{copy.body}</AppText>

      <View style={styles.picker}>
        <TimePicker value={time} onChange={onChangeTime} uses24hourClock={uses24hourClock} />
      </View>

      <View style={styles.summary}>
        <SymbolView name="bell" size={sizes.icon.large} tintColor={colors.primary} />
        <AppText variant="cardText" color="textSecondary" style={styles.summaryText}>
          {copy.summaryStart}
          <AppText variant="cardText" color="textPrimary" style={styles.summaryTime}>
            {formatTime(time, uses24hourClock)}
          </AppText>
          {copy.summaryEnd}
        </AppText>
      </View>
    </OnboardingPage>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing[3],
  },
  body: {
    marginTop: spacing[3],
  },
  picker: {
    marginTop: spacing[7],
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
    marginTop: spacing[6],
  },
  summaryText: {
    flex: 1,
  },
  // Nunito ships each weight as its own font, so bold means switching the family.
  summaryTime: {
    fontFamily: fonts.bold,
  },
});
