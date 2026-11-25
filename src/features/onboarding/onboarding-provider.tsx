import { createContext, use, useState, type ReactNode } from 'react';

import { getOnboardingCompleted, setOnboardingCompleted } from '@/lib/storage/settings';

type OnboardingState = {
  completed: boolean;
  complete: () => void;
};

const OnboardingContext = createContext<OnboardingState | null>(null);

/**
 * Holds the "onboarding completed" flag. The root layout reads it to decide which
 * screens exist; the onboarding screen calls `complete()` at the end.
 *
 * Persisted as the `onboardingCompleted` setting, so it only shows once. Read
 * synchronously on the first render, so the app opens on the right screen.
 */
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState(getOnboardingCompleted);

  const complete = () => {
    setOnboardingCompleted(true);
    setCompleted(true);
  };

  return <OnboardingContext value={{ completed, complete }}>{children}</OnboardingContext>;
}

export function useOnboarding(): OnboardingState {
  const state = use(OnboardingContext);
  if (!state) {
    throw new Error('useOnboarding must be used inside <OnboardingProvider>.');
  }
  return state;
}
