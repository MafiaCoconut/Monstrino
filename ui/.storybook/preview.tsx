import type { Preview } from '@storybook/react';
import { AppThemeProvider } from '../src/app/providers/ThemeProvider';
import { QueryProvider } from '../src/app/providers/QueryProvider';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <QueryProvider>
        <AppThemeProvider>
          <Story />
        </AppThemeProvider>
      </QueryProvider>
    ),
  ],
};

export default preview;
