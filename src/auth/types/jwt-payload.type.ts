export type JwtPayload = {
  sub: number;
  email: string;
};

export type AuthenticatedUser = {
  role: import("../../users/user-role.enum.js").UserRole;
  id: number;
  email: string;
};