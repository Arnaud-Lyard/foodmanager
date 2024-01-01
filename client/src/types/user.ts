export type User = {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      photo?: string;
      role: Role;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type Role = "user" | "admin";
