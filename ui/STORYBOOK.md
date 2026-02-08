# Storybook Usage Guide

Storybook is configured for component documentation and isolated development.

## Running Storybook

```bash
npm run storybook
```

This will start Storybook on http://localhost:6006

## Building Storybook

```bash
npm run build-storybook
```

## Creating Stories

### Basic Story Example

Create a file next to your component: `Button.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'outlined',
    color: 'secondary',
    children: 'Secondary Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
```

### Complex Component with Actions

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    onSubmit: action('form-submitted'),
    onForgotPassword: action('forgot-password-clicked'),
  },
};

export const WithError: Story = {
  args: {
    error: 'Invalid credentials',
    onSubmit: action('form-submitted'),
  },
};
```

## Organization

Stories are organized by the FSD architecture:

- `shared/ui/**/*.stories.tsx` - Basic UI components
- `entities/**/*.stories.tsx` - Business entities
- `features/**/*.stories.tsx` - Feature components
- `widgets/**/*.stories.tsx` - Complex widgets
- `pages/**/*.stories.tsx` - Full page compositions

## Best Practices

1. **Tag with `autodocs`**: Automatically generate documentation
2. **Use Controls**: Make components interactive in Storybook
3. **Show States**: Create stories for loading, error, empty states
4. **Add Actions**: Use `action()` for event handlers
5. **Document Props**: Add JSDoc comments to component props
6. **Test Interactions**: Use `@storybook/addon-interactions` for user flow testing

## Features Configured

- ✅ Material-UI theme support
- ✅ React Query provider
- ✅ Dark/Light mode toggle
- ✅ TypeScript path aliases
- ✅ Global styles (Tailwind CSS)
- ✅ Automatic documentation generation
- ✅ Controls for interactive props
- ✅ Actions for event tracking
