export interface IRefreshToken {
  id: string;
  token: string;
  valid: boolean;
  user_id: string;
  expires: Date;
  created_at: Date;
  updated_at: Date;
}
