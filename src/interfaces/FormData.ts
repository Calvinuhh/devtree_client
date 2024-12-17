export interface User {
  _id: string;
  handle: string;
  name: string;
  email: string;
}

export interface RegisterForm extends Pick<User, "name" | "email" | "handle"> {
  password: string;
  password_confirmation: string;
}

export interface LoginForm extends Pick<User, "email"> {
  password: string;
}
