# Zod Validation Guide

This project uses Zod for runtime type-safe validation of data.

## Basic Usage

### Defining a Schema

```typescript
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.string().email(),
});

type User = z.infer<typeof userSchema>;
```

### Validating Data

```typescript
// Safe parse (doesn't throw)
const result = userSchema.safeParse(data);

if (result.success) {
  // result.data is typed as User
  console.log(result.data);
} else {
  // result.error contains validation errors
  console.error(result.error.errors);
}

// Unsafe parse (throws on error)
try {
  const user = userSchema.parse(data);
} catch (error) {
  // Handle validation error
}
```

## Using with React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { userSchema } from '@shared/lib/validations';
import { api } from '@shared/api/http';

function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`);
      // Validate the response
      return userSchema.parse(response.data);
    },
  });
}
```

## Form Validation

### With React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@shared/lib/validations';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    // data is type-safe and validated
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

## Examples in This Project

See `src/shared/lib/validations/schemas.ts` for example schemas:

- **User Schema**: Basic user data validation
- **Login/Registration**: Form validation with custom error messages
- **API Responses**: Validating backend responses
- **Paginated Data**: Generic pagination schema
- **Environment Variables**: Runtime env validation

## Advanced Patterns

### Optional Fields with Defaults

```typescript
const schema = z.object({
  name: z.string(),
  role: z.enum(['user', 'admin']).default('user'),
  notifications: z.boolean().default(true),
});
```

### Transformations

```typescript
const schema = z.object({
  price: z.string().transform(val => parseFloat(val)),
  createdAt: z.string().transform(val => new Date(val)),
});
```

### Conditional Validation

```typescript
const schema = z
  .object({
    type: z.enum(['email', 'sms']),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  })
  .refine(
    data => {
      if (data.type === 'email') return !!data.email;
      if (data.type === 'sms') return !!data.phone;
      return true;
    },
    {
      message: 'Email is required when type is email',
      path: ['email'],
    }
  );
```

## Benefits

1. **Runtime Safety**: Catch data issues at runtime, not just compile time
2. **Type Inference**: Automatically infer TypeScript types from schemas
3. **Error Messages**: User-friendly validation error messages
4. **API Validation**: Validate data from external APIs
5. **Form Validation**: Seamless integration with form libraries
