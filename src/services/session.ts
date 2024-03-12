import Cookies from "js-cookie";

export const setUserCookie = (session: string) => {
  Cookies.remove("payments_userCookie");
  Cookies.set("payments_userCookie", JSON.stringify(session), {
    expires: 15,
    path: "/",
  });
};

export const getUserCookie = (): string | null => {
  const sessionCookie = Cookies.get("payments_userCookie");
  if (sessionCookie === undefined) return null;
  return JSON.parse(sessionCookie) as string;
};

export const removeUserCookie = () => {
  Cookies.remove("payments_userCookie");
};
