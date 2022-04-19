import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }
) => {
  return fetcher(`/${mode}`, data);
};
