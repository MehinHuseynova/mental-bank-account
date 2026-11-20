import { createContext, use, useState, type ReactNode } from 'react';

type OnboardingState = {
  completed: boolean;
  complete: () => void;
};

const OnboardingContext = createContext<OnboardingState | null>(null);

/**
 * Holds the "onboarding completed" flag. The root layout reads it to decide which
 * screens exist; the onboarding screen calls `complete()` at the end.
 *
 * In memory for now, so every app reload starts at onboarding again.
 * The storage ticket replaces the useState with the persisted `onboardingCompleted` setting.
 */
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState(false);

  return (
    <OnboardingContext value={{ completed, complete: () => setCompleted(true) }}>
      {children}
    </OnboardingContext>
  );
}

export function useOnboarding(): OnboardingState {
  const state = use(OnboardingContext);
  if (!state) {
    throw new Error('useOnboarding must be used inside <OnboardingProvider>.');
  }
  return state;
}
