export interface UserUpdate {
  userName: string;
  email: string;
  currentPassword: string;
  newPassword?: string; // Optional property
}
