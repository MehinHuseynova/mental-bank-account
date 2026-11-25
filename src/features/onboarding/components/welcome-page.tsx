import { StyleSheet, View } from 'react-native';

import { BrainLights } from '@/assets/illustrations/brain-lights';
import { AppText } from '@/components/ui/app-text';
import { onboardingCopy } from '@/features/onboarding/copy';
import { colors, radii, sizes, spacing } from '@/theme';

import { OnboardingPage } from '@/features/onboarding/components/onboarding-page';

/** In the design the brain is about 78% as wide as the circle behind it. */
const BRAIN_WIDTH = sizes.illustration * 0.78;

const copy = onboardingCopy.welcome;

/** Page 1: the balance idea. */
export function WelcomePage() {
  return (
    <OnboardingPage>
      <View style={styles.illustration}>
        <BrainLights width={BRAIN_WIDTH} />
      </View>
      <AppText variant="title" style={styles.title}>
        {copy.title}
      </AppText>
      <AppText style={styles.body}>{copy.body}</AppText>
      <AppText variant="cardText" style={styles.credit}>
        {copy.credit}
      </AppText>
    </OnboardingPage>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: sizes.illustration,
    height: sizes.illustration,
    borderRadius: radii.pill,
    backgroundColor: colors.illustrationBg,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: spacing[8],
  },
  body: {
    marginTop: spacing[3],
  },
  credit: {
    marginTop: spacing[4],
  },
});
