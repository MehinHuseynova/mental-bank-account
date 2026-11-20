import { Link } from 'expo-router';

import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { TextButton } from '@/components/ui/text-button';
import { entriesCopy } from '@/features/entries/copy';

/** Today. Placeholder until the Today ticket (placeholder text stays inline). */
export default function TodayScreen() {
  return (
    <Screen>
      <AppText variant="title">{entriesCopy.todayTab}</AppText>
      <AppText>Placeholder: built in a later ticket.</AppText>
      <Link href="/deposit" asChild>
        <TextButton label={entriesCopy.makeDeposit} />
      </Link>
      <Link href="/boost" asChild>
        <TextButton label={entriesCopy.boostButton} />
      </Link>
    </Screen>
  );
}
