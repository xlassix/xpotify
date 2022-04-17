import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  data: { email: string; password: string }
) => {
  console.log("auth", `/${mode}`, data);
  return fetcher(`/${mode}`, data);
};
