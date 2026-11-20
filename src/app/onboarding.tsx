import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { TextButton } from '@/components/ui/text-button';
import { useOnboarding } from '@/features/onboarding/onboarding-provider';

/**
 * Placeholder until the onboarding ticket builds the 4 pages. Text stays inline
 * because this whole screen gets replaced.
 */
export default function OnboardingScreen() {
  const { complete } = useOnboarding();

  return (
    <Screen>
      <AppText variant="title">Onboarding</AppText>
      <AppText>Placeholder: the 4 onboarding pages come in a later ticket.</AppText>
      <TextButton label="Finish" onPress={complete} />
    </Screen>
  );
}
