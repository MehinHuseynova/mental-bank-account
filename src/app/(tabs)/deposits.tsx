import { Link } from 'expo-router';

import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { TextButton } from '@/components/ui/text-button';
import { entriesCopy } from '@/features/entries/copy';

/** All past deposits. Placeholder until the Deposits ticket. */
export default function DepositsScreen() {
  return (
    <Screen>
      <AppText variant="title">{entriesCopy.depositsTitle}</AppText>
      <AppText>Placeholder: built in a later ticket.</AppText>
      <Link href="/boost" asChild>
        <TextButton label={entriesCopy.boostButton} />
      </Link>
    </Screen>
  );
}
