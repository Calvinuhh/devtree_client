export interface User {
  _id: string;
  handle: string;
  name: string;
  email: string;
  description: string;
  image?: string;
  links?: string;
}

export interface RegisterForm extends Pick<User, "name" | "email" | "handle"> {
  password: string;
  password_confirmation: string;
}

export interface LoginForm extends Pick<User, "email"> {
  password: string;
}

export type ProfileForm = Pick<User, "handle" | "description">;

export type UserHandle = Pick<
  User,
  "handle" | "description" | "image" | "links" | "name"
>;
