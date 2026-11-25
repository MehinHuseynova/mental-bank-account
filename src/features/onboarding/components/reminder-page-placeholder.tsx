import { StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { onboardingCopy } from '@/features/onboarding/copy';
import { spacing } from '@/theme';

import { OnboardingPage } from '@/features/onboarding/components/onboarding-page';

const copy = onboardingCopy.reminderPlaceholder;

/** Page 4 stand-in. The reminder ticket replaces it with the time picker. */
export function ReminderPagePlaceholder() {
  return (
    <OnboardingPage>
      <AppText variant="title">{copy.title}</AppText>
      <AppText style={styles.body}>{copy.body}</AppText>
    </OnboardingPage>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: spacing[3],
  },
});
