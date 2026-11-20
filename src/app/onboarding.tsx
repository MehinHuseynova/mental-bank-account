import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { TextButton } from '@/components/ui/text-button';
import { onboardingCopy } from '@/features/onboarding/copy';
import { useOnboarding } from '@/features/onboarding/onboarding-provider';

/** Placeholder until the onboarding ticket builds the 4 pages. */
export default function OnboardingScreen() {
  const { complete } = useOnboarding();

  return (
    <Screen>
      <AppText variant="title">{onboardingCopy.placeholderTitle}</AppText>
      <AppText>{onboardingCopy.placeholder}</AppText>
      <TextButton label={onboardingCopy.placeholderFinish} onPress={complete} />
    </Screen>
  );
}
