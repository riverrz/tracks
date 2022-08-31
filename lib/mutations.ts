import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: Record<string, string>
) => {
  return fetcher(`/${mode}`, body);
};
