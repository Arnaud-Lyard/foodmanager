import { object, string, TypeOf, z } from 'zod';

enum RoleEnumType {
  ADMIN = 'admin',
  USER = 'user',
}

export const registerUserSchema = object({
  body: object({
    pseudo: string({
      required_error: 'Pseudo requis',
    }),
    email: string({
      required_error: 'Adresse email requise',
    }).email('Adresse email invalide'),
    password: string({
      required_error: 'Mot de passe requis',
    })
      .min(8, 'Le mot de passe doit compter au moins 8 caractères')
      .max(32, 'Le mot de passe ne doit pas excéder 32 caractères'),
    passwordConfirm: string({
      required_error: 'Confirmation de mot de passe requise',
    }),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Les mots de passes ne sont pas identiques',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Adresse email requise',
    }).email('Adresse email invalide'),
    password: string({
      required_error: 'Mot de passe requis',
    }).min(8, 'Adresse email ou mot de passe invalide'),
  }),
});

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Adresse email requise',
    }).email('Adresse email invalide'),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    resetToken: string(),
  }),
  body: object({
    password: string({
      required_error: 'Mot de passe requis',
    }).min(8, 'Le mot de passe doit compter au moins 8 caractères'),
    passwordConfirm: string({
      required_error: 'Confirmation de mot de passe requise',
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passes ne sont pas identiques',
    path: ['passwordConfirm'],
  }),
});

export type RegisterUserInput = Omit<
  TypeOf<typeof registerUserSchema>['body'],
  'passwordConfirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
