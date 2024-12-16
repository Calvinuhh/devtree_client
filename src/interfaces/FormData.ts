export interface User {
  handle: string;
  name: string;
  email: string;
}

export interface RegisterForm extends Pick<User, "name" | "email" | "handle"> {
  password: string;
  password_confirmation: string;
}
