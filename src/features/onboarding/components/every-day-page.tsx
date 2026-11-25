import { StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { onboardingCopy } from '@/features/onboarding/copy';
import { spacing } from '@/theme';

import { OnboardingPage } from '@/features/onboarding/components/onboarding-page';
import { WeekDemo } from '@/features/onboarding/components/week-demo';

const copy = onboardingCopy.everyDay;

/** Page 3: one deposit per day, past days are locked. */
export function EveryDayPage() {
  return (
    <OnboardingPage>
      <WeekDemo />
      <AppText variant="title" style={styles.title}>
        {copy.title}
      </AppText>
      <AppText style={styles.paragraph}>{copy.body}</AppText>
      <AppText style={styles.paragraph}>{copy.hardDay}</AppText>
    </OnboardingPage>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing[8],
  },
  paragraph: {
    marginTop: spacing[3],
  },
});
