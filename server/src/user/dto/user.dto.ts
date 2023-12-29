export interface UserDto {
  name: string;
  email: string;
  password: string;
  verificationCode?: string | null;
}
