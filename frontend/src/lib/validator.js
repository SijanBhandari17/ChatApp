import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, 'Your password must be at least 8 characters (as required during registration)')
    .regex(
      /[A-Z]/,
      'Your password must include at least one uppercase letter (per registration rules)',
    )
    .regex(/[0-9]/, 'Your password must include at least one number (per registration rules)')
    .regex(
      /[^a-zA-Z0-9]/,
      'Your password must include at least one symbol (per registration rules)',
    ),
});

const signupFormSchema = z
  .object({
    email: z.string().trim().normalize().email({ message: 'Invalid email address' }),
    userName: z.string().trim().min(5, 'Username must be atleast 5 characters long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const emailCheckSchema = z.object({
  email: z.string().email({ message: 'Invalid email message' }),
});

export { loginSchema, signupFormSchema, emailCheckSchema };
