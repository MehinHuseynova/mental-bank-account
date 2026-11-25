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
import { ReminderPagePlaceholder } from '@/features/onboarding/components/reminder-page-placeholder';
import { WelcomePage } from '@/features/onboarding/components/welcome-page';
import { onboardingCopy as copy } from '@/features/onboarding/copy';
import { useOnboarding } from '@/features/onboarding/onboarding-provider';
import { colors, layout, sizes, spacing } from '@/theme';

const PAGES = [WelcomePage, EspPage, EveryDayPage, ReminderPagePlaceholder];
const LAST_PAGE = PAGES.length - 1;
/** "Skip" on pages 1–3 jumps here (the reminder page), not into the app. */
const REMINDER_PAGE = LAST_PAGE;

/**
 * The onboarding flow: a fixed header (back / Skip), the pages in a horizontal
 * paged ScrollView (swipe or buttons), and a fixed footer (dots + main button).
 */
export function OnboardingPager() {
  const { complete } = useOnboarding();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const [index, setIndex] = useState(0);

  const goTo = (page: number) => {
    scrollRef.current?.scrollTo({ x: page * width, animated: true });
  };

  // Derive the current page from the scroll position, so swiping and the buttons
  // stay in sync. React skips the re-render when the index hasn't changed.
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(Math.min(Math.max(page, 0), LAST_PAGE));
  };

  const isReminderPage = index === REMINDER_PAGE;

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
          <TextButton label={copy.skip} color="textMuted" onPress={() => goTo(REMINDER_PAGE)} />
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
        {PAGES.map((Page, i) => (
          <View key={i} style={{ width }}>
            <Page />
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        {isReminderPage ? (
          <PrimaryButton label={copy.reminderPlaceholder.finish} onPress={complete} />
        ) : (
          <>
            <PagerDots
              count={PAGES.length}
              index={index}
              accessibilityLabel={copy.pageOf(index + 1, PAGES.length)}
            />
            <PrimaryButton label={copy.next} onPress={() => goTo(index + 1)} />
          </>
        )}
      </View>
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
});
