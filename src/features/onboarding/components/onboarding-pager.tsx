import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewInstance,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PagerDots } from '@/components/ui/pager-dots';
import { PrimaryButton } from '@/components/ui/primary-button';
import { TextButton } from '@/components/ui/text-button';
import { EspPage } from '@/features/onboarding/components/esp-page';
import { EveryDayPage } from '@/features/onboarding/components/every-day-page';
import { ReminderPage } from '@/features/onboarding/components/reminder-page';
import { WelcomePage } from '@/features/onboarding/components/welcome-page';
import { onboardingCopy as copy } from '@/features/onboarding/copy';
import { useOnboarding } from '@/features/onboarding/onboarding-provider';
import { useReminderSettings } from '@/features/reminder/hooks/use-reminder-settings';
import { colors, layout, sizes, spacing } from '@/theme';

/**
 * The onboarding flow: a fixed header (back / Skip), the pages in a horizontal
 * paged ScrollView (swipe or buttons), and a fixed footer (dots + Next, or the
 * reminder buttons on the last page).
 */
export function OnboardingPager() {
  const { complete } = useOnboarding();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const [index, setIndex] = useState(0);
  const reminder = useReminderSettings();
  // Lives here (not in the page) because the footer buttons save it.
  const [reminderTime, setReminderTime] = useState(reminder.time);

  // Both buttons save the choice, then finish onboarding. "Not now" keeps the time
  // too, so Settings can show it later. Scheduling comes in the notification ticket.
  const finish = (reminderEnabled: boolean) => {
    reminder.save({ enabled: reminderEnabled, time: reminderTime });
    complete();
  };

  const pages = [
    <WelcomePage key="welcome" />,
    <EspPage key="esp" />,
    <EveryDayPage key="every-day" />,
    <ReminderPage key="reminder" time={reminderTime} onChangeTime={setReminderTime} />,
  ];
  const pageCount = pages.length;
  const lastPage = pageCount - 1;
  /** "Skip" on pages 1–3 jumps here (the reminder page), not into the app. */
  const reminderPage = lastPage;

  const goTo = (page: number) => {
    scrollRef.current?.scrollTo({ x: page * width, animated: true });
  };

  // Derive the current page from the scroll position, so swiping and the buttons
  // stay in sync. React skips the re-render when the index hasn't changed.
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(Math.min(Math.max(page, 0), lastPage));
  };

  const isReminderPage = index === reminderPage;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        {index > 0 ? (
          <Pressable
            onPress={() => goTo(index - 1)}
            accessibilityRole="button"
            accessibilityLabel={copy.back}
            style={styles.back}
          >
            <SymbolView
              name="chevron.left"
              size={sizes.icon.large}
              weight="semibold"
              tintColor={colors.textPrimary}
            />
          </Pressable>
        ) : (
          <View style={styles.back} />
        )}
        {!isReminderPage && (
          <TextButton label={copy.skip} color="textMuted" onPress={() => goTo(reminderPage)} />
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {pages.map((page) => (
          <View key={page.key} style={{ width }}>
            {page}
          </View>
        ))}
      </ScrollView>

      {isReminderPage ? (
        <View style={[styles.footer, styles.reminderFooter]}>
          <PrimaryButton label={copy.reminder.turnOn} onPress={() => finish(true)} />
          <TextButton
            label={copy.reminder.notNow}
            color="textMuted"
            onPress={() => finish(false)}
            style={styles.notNow}
          />
        </View>
      ) : (
        <View style={styles.footer}>
          <PagerDots
            count={pageCount}
            index={index}
            accessibilityLabel={copy.pageOf(index + 1, pageCount)}
          />
          <PrimaryButton label={copy.next} onPress={() => goTo(index + 1)} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.screenPaddingHorizontal,
  },
  back: {
    width: sizes.touchTarget,
    height: sizes.touchTarget,
    justifyContent: 'center',
  },
  footer: {
    gap: spacing[7],
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing[4],
    paddingBottom: spacing[2],
  },
  reminderFooter: {
    gap: spacing[3],
  },
  notNow: {
    alignSelf: 'center',
  },
});
