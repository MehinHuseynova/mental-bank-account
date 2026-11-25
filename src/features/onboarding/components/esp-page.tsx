import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Card } from '@/components/ui/card';
import { IconTile } from '@/components/ui/icon-tile';
import { onboardingCopy } from '@/features/onboarding/copy';
import { colors, spacing } from '@/theme';

import { OnboardingPage } from '@/features/onboarding/components/onboarding-page';

const copy = onboardingCopy.esp;
const ESP_KEYS = ['effort', 'success', 'progress'] as const;

/** Page 2: what Effort, Success and Progress mean. */
export function EspPage() {
  return (
    <OnboardingPage>
      <AppText variant="eyebrow">{copy.eyebrow}</AppText>
      <AppText variant="title" style={styles.title}>
        {copy.title}
      </AppText>
      <AppText style={styles.body}>{copy.body}</AppText>

      <View style={styles.cards}>
        {ESP_KEYS.map((key) => {
          const item = copy.items[key];
          return (
            <Card key={key} style={styles.card}>
              <IconTile backgroundColor={colors[key].background}>
                <AppText variant="tileLetter" style={{ color: colors[key].foreground }}>
                  {item.letter}
                </AppText>
              </IconTile>
              <View style={styles.cardText}>
                <AppText variant="cardTitle">{item.title}</AppText>
                <AppText variant="cardText">{item.text}</AppText>
              </View>
            </Card>
          );
        })}
      </View>
    </OnboardingPage>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing[2],
  },
  body: {
    marginTop: spacing[3],
  },
  cards: {
    marginTop: spacing[6],
    gap: spacing[3],
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[4],
  },
  cardText: {
    flex: 1,
    gap: spacing[1],
  },
});
