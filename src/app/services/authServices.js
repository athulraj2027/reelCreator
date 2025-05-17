export default function AuthServices() {
  function hasToken() {
    if (typeof window === "undefined") return false;

    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));
    return !!tokenCookie;
  }

  return { hasToken };
}
