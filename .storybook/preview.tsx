import type { Preview } from '@storybook/nextjs-vite';

import { ThemeProvider } from '../components/theme-provider';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap');
          :root {
            --font-geist: 'Geist', sans-serif;
            --font-geist-mono: 'Geist Mono', monospace;
          }
          body {
            font-family: var(--font-geist);
          }
        `}</style>
        <div className="min-h-screen bg-background antialiased">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
