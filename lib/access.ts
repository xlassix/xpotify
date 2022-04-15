import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  data: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, data);
};
