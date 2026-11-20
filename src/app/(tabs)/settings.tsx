import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { settingsCopy } from '@/features/settings/copy';

/** Settings. Placeholder until the Settings ticket. */
export default function SettingsScreen() {
  return (
    <Screen>
      <AppText variant="title">{settingsCopy.title}</AppText>
      <AppText>Placeholder: built in a later ticket.</AppText>
    </Screen>
  );
}
