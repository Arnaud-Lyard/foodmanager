export interface User {
  id: string;
  pseudo: string;
  email: string;
  grade: Grade;
  avatar: string;
  esl: string;
  twitter: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

type Grade = "player" | "manager";

type Role = "user" | "admin";
