import { NativeTabs } from 'expo-router/native-tabs';

import { entriesCopy } from '@/features/entries/copy';
import { settingsCopy } from '@/features/settings/copy';
import { colors, fonts } from '@/theme';

/**
 * The native iOS tab bar (Liquid Glass on iOS 26). The system draws the bar's
 * background; we only set the selected color and the label font.
 */
export default function TabsLayout() {
  return (
    <NativeTabs tintColor={colors.primary} labelStyle={{ fontFamily: fonts.bold }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{entriesCopy.todayTab}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="sun.max" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="deposits">
        <NativeTabs.Trigger.Label>{entriesCopy.depositsTab}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>{settingsCopy.tab}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="slider.horizontal.3" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
