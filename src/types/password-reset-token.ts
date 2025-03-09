export type TPasswordResetToken = {
  email: string;
  token: string;
  expiresAt: Date;
};

export type TPasswordResetData = {
  email: string;
  newPassword: string;
  token: string;
};
