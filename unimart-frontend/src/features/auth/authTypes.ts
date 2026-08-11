export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  campusLocation: string;
  avatar: string;
  verifiedStudent: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
