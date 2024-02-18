export interface UserDto {
  pseudo: string;
  email: string;
  password: string;
  verificationCode?: string | null;
}
