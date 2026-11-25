/** User-facing text for onboarding. */
export const onboardingCopy = {
  next: 'Next',
  skip: 'Skip',
  back: 'Back',
  pageOf: (page: number, total: number) => `Page ${page} of ${total}`,

  welcome: {
    title: 'Your mind keeps a balance.',
    body: 'Every thought is a deposit or a withdrawal. Mental Bank Account helps you deposit the good on purpose. Each day you do, one more light turns on.',
    credit: 'Based on the "mental bank account" idea from The Confident Mind by Dr. Nate Zinsser.',
  },

  esp: {
    // Shown uppercase via the eyebrow text style.
    eyebrow: 'One deposit a day',
    title: 'Find your E · S · P',
    body: 'Each day, name three good things you did. Together they make one deposit.',
    items: {
      effort: {
        letter: 'E',
        title: 'Effort',
        text: 'Something you gave real effort to, whatever the result.',
      },
      success: {
        letter: 'S',
        title: 'Success',
        text: 'Something that went right. Small wins count too.',
      },
      progress: {
        letter: 'P',
        title: 'Progress',
        text: 'A step forward. Anything that is a little better than before.',
      },
    },
  },

  everyDay: {
    title: 'Every day counts once.',
    body: "Make your deposit before the day ends. You can't change past days or fill them in later. A missed day stays empty, so make today count.",
    hardDay: "On a hard day, open your account and read what you've already earned.",
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    today: 'Today',
    missedDay: 'Wednesday:',
    missedNote: 'nothing deposited that day.',
  },

  reminder: {
    title: 'Your evening reminder',
    body: "Pick a time just before you go to bed. We'll remind you once a night to make your deposit.",
    // The picked time (bold) goes between these two parts.
    summaryStart: 'Every night at ',
    summaryEnd: '. The reminder stays on your Lock Screen until you make your deposit.',
    turnOn: 'Turn on reminder',
    notNow: 'Not now',
  },
} as const;
