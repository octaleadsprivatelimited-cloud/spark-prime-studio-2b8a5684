export const colors = {
  brandRed: 'oklch(0.52 0.22 25)',
  brandDark: 'oklch(0.18 0.04 255)',
  accent: 'oklch(0.30 0.08 255)',
  surfaceElevated: 'oklch(0.98 0.003 260)',
  highlight: 'oklch(0.55 0.20 255)',
};

export const radius = {
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  '2xl': 'calc(var(--radius) + 8px)',
  '3xl': 'calc(var(--radius) + 12px)',
  '4xl': 'calc(var(--radius) + 16px)',
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};

export const fonts = {
  heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
  body: ['Inter', 'system-ui', 'sans-serif'],
};

export const designTokens = {
  colors,
  radius,
  spacing,
  fonts,
};
