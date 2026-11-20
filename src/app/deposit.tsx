import { router } from 'expo-router';

import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { TextButton } from '@/components/ui/text-button';
import { entriesCopy } from '@/features/entries/copy';

/** Today's deposit form, shown as a full-screen modal. Placeholder until the deposit ticket. */
export default function DepositScreen() {
  return (
    <Screen>
      <AppText variant="title">{entriesCopy.depositTitle}</AppText>
      <AppText>{entriesCopy.placeholder}</AppText>
      <TextButton label={entriesCopy.close} onPress={() => router.back()} />
    </Screen>
  );
}
