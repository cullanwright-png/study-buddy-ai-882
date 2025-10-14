import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ColorTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
    accentLight: string;
    success: string;
    successLight: string;
    warning: string;
  };
}

export interface LayoutOption {
  id: string;
  name: string;
  description: string;
}

interface ThemeContextType {
  colorTheme: ColorTheme;
  layout: LayoutOption;
  setColorTheme: (theme: ColorTheme) => void;
  setLayout: (layout: LayoutOption) => void;
  resetToDefaults: () => void;
}

export const colorThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'StudyBuddy Blue',
    colors: {
      primary: '250 84% 54%',
      primaryLight: '252 100% 67%',
      primaryDark: '248 53% 47%',
      accent: '25 95% 53%',
      accentLight: '31 100% 71%',
      success: '142 76% 36%',
      successLight: '142 69% 58%',
      warning: '45 93% 47%',
    }
  },
  {
    id: 'purple-passion',
    name: 'Purple Passion',
    colors: {
      primary: '280 100% 70%',
      primaryLight: '285 100% 80%',
      primaryDark: '275 80% 60%',
      accent: '320 100% 65%',
      accentLight: '325 100% 75%',
      success: '145 80% 42%',
      successLight: '145 75% 60%',
      warning: '35 100% 55%',
    }
  },
  {
    id: 'forest-focus',
    name: 'Forest Focus',
    colors: {
      primary: '140 70% 45%',
      primaryLight: '145 75% 60%',
      primaryDark: '135 65% 35%',
      accent: '80 90% 50%',
      accentLight: '85 95% 65%',
      success: '120 80% 40%',
      successLight: '125 85% 55%',
      warning: '40 95% 50%',
    }
  },
  {
    id: 'sunset-energy',
    name: 'Sunset Energy',
    colors: {
      primary: '15 100% 60%',
      primaryLight: '20 100% 70%',
      primaryDark: '10 90% 50%',
      accent: '340 90% 65%',
      accentLight: '345 95% 75%',
      success: '150 70% 45%',
      successLight: '155 75% 60%',
      warning: '50 100% 55%',
    }
  },
  {
    id: 'ocean-calm',
    name: 'Ocean Calm',
    colors: {
      primary: '200 100% 50%',
      primaryLight: '205 100% 65%',
      primaryDark: '195 85% 40%',
      accent: '180 80% 55%',
      accentLight: '185 90% 70%',
      success: '160 75% 45%',
      successLight: '165 80% 60%',
      warning: '45 95% 50%',
    }
  },
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    colors: {
      primary: '260 60% 45%',
      primaryLight: '265 70% 60%',
      primaryDark: '255 55% 35%',
      accent: '45 100% 50%',
      accentLight: '50 100% 65%',
      success: '130 70% 40%',
      successLight: '135 75% 55%',
      warning: '35 100% 50%',
    }
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    colors: {
      primary: '330 80% 65%',
      primaryLight: '335 90% 75%',
      primaryDark: '325 70% 55%',
      accent: '350 85% 60%',
      accentLight: '355 90% 70%',
      success: '155 70% 45%',
      successLight: '160 75% 60%',
      warning: '40 95% 50%',
    }
  },
  {
    id: 'midnight-purple',
    name: 'Midnight Purple',
    colors: {
      primary: '270 90% 60%',
      primaryLight: '275 95% 70%',
      primaryDark: '265 85% 50%',
      accent: '290 85% 65%',
      accentLight: '295 90% 75%',
      success: '140 75% 45%',
      successLight: '145 80% 60%',
      warning: '45 95% 50%',
    }
  },
  {
    id: 'citrus-burst',
    name: 'Citrus Burst',
    colors: {
      primary: '55 100% 55%',
      primaryLight: '60 100% 65%',
      primaryDark: '50 90% 45%',
      accent: '35 100% 60%',
      accentLight: '40 100% 70%',
      success: '140 75% 45%',
      successLight: '145 80% 60%',
      warning: '25 100% 50%',
    }
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    colors: {
      primary: '10 85% 60%',
      primaryLight: '15 90% 70%',
      primaryDark: '5 80% 50%',
      accent: '180 75% 55%',
      accentLight: '185 80% 65%',
      success: '160 70% 45%',
      successLight: '165 75% 60%',
      warning: '45 95% 50%',
    }
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    colors: {
      primary: '255 85% 70%',
      primaryLight: '260 90% 80%',
      primaryDark: '250 80% 60%',
      accent: '275 80% 65%',
      accentLight: '280 85% 75%',
      success: '150 70% 45%',
      successLight: '155 75% 60%',
      warning: '45 95% 50%',
    }
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest',
    colors: {
      primary: '160 85% 40%',
      primaryLight: '165 90% 55%',
      primaryDark: '155 80% 30%',
      accent: '120 80% 50%',
      accentLight: '125 85% 65%',
      success: '140 75% 45%',
      successLight: '145 80% 60%',
      warning: '45 95% 50%',
    }
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    colors: {
      primary: '315 85% 55%',
      primaryLight: '320 90% 65%',
      primaryDark: '310 80% 45%',
      accent: '340 85% 60%',
      accentLight: '345 90% 70%',
      success: '150 70% 45%',
      successLight: '155 75% 60%',
      warning: '45 95% 50%',
    }
  }
];

export const layoutOptions: LayoutOption[] = [
  {
    id: 'default',
    name: 'Classic Cards',
    description: 'Traditional card-based layout with clean spacing and shadows'
  },
  {
    id: 'compact',
    name: 'Compact View',
    description: 'Tighter spacing to fit more content on your screen'
  },
  {
    id: 'sidebar',
    name: 'Sidebar Layout',
    description: 'Side navigation panel for quick access to all features'
  },
  {
    id: 'minimal',
    name: 'Minimal Focus',
    description: 'Clean, distraction-free design with minimal shadows'
  },
  {
    id: 'spacious',
    name: 'Spacious View',
    description: 'Extra breathing room with larger spacing between elements'
  },
  {
    id: 'cozy',
    name: 'Cozy Mode',
    description: 'Warm, rounded design with softer colors and edges'
  }
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(colorThemes[0]);
  const [layout, setLayoutState] = useState<LayoutOption>(layoutOptions[0]);

  // Load saved preferences on mount
  useEffect(() => {
    const savedColorTheme = localStorage.getItem('studybuddy-color-theme');
    const savedLayout = localStorage.getItem('studybuddy-layout');

    if (savedColorTheme) {
      const theme = colorThemes.find(t => t.id === savedColorTheme);
      if (theme) setColorThemeState(theme);
    }

    if (savedLayout) {
      const layoutOption = layoutOptions.find(l => l.id === savedLayout);
      if (layoutOption) setLayoutState(layoutOption);
    }
  }, []);

  // Apply color theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const colors = colorTheme.colors;

    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-light', colors.primaryLight);
    root.style.setProperty('--primary-dark', colors.primaryDark);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-light', colors.accentLight);
    root.style.setProperty('--success', colors.success);
    root.style.setProperty('--success-light', colors.successLight);
    root.style.setProperty('--warning', colors.warning);

    // Update gradients
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, hsl(${colors.primary}), hsl(${colors.primaryLight}))`);
    root.style.setProperty('--gradient-accent', `linear-gradient(135deg, hsl(${colors.accent}), hsl(${colors.accentLight}))`);
    root.style.setProperty('--gradient-success', `linear-gradient(135deg, hsl(${colors.success}), hsl(${colors.successLight}))`);
    root.style.setProperty('--gradient-hero', `linear-gradient(135deg, hsl(${colors.primaryDark}), hsl(${colors.primary}), hsl(${colors.accent}))`);

    // Update shadows with new primary color
    root.style.setProperty('--shadow-soft', `0 4px 20px hsl(${colors.primary} / 0.08)`);
    root.style.setProperty('--shadow-medium', `0 8px 30px hsl(${colors.primary} / 0.12)`);
    root.style.setProperty('--shadow-strong', `0 20px 40px hsl(${colors.primary} / 0.16)`);
  }, [colorTheme]);

  // Apply layout classes to body
  useEffect(() => {
    document.body.className = document.body.className.replace(/layout-\w+/g, '');
    document.body.classList.add(`layout-${layout.id}`);
  }, [layout]);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem('studybuddy-color-theme', theme.id);
  };

  const setLayout = (layoutOption: LayoutOption) => {
    setLayoutState(layoutOption);
    localStorage.setItem('studybuddy-layout', layoutOption.id);
  };

  const resetToDefaults = () => {
    setColorTheme(colorThemes[0]);
    setLayout(layoutOptions[0]);
    localStorage.removeItem('studybuddy-color-theme');
    localStorage.removeItem('studybuddy-layout');
  };

  return (
    <ThemeContext.Provider value={{
      colorTheme,
      layout,
      setColorTheme,
      setLayout,
      resetToDefaults
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}