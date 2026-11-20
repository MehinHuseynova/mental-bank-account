import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { entriesCopy } from '@/features/entries/copy';

/** "I need a boost": random past deposits. Pushed screen with a back button. Placeholder. */
export default function BoostScreen() {
  return (
    // The native header already covers the top safe area.
    <Screen edges={['left', 'right']}>
      <AppText variant="title">{entriesCopy.boostButton}</AppText>
      <AppText>{entriesCopy.placeholder}</AppText>
    </Screen>
  );
}
