import Cookies from "js-cookie";

const decodeToken = (token: string) => {
  try {
    const [email, timestamp] = atob(token).split("-");
    return { email, timestamp: parseInt(timestamp) };
  } catch (e) {
    return null;
  }
};

const isTokenValid = (token: string) => {
  const decoded = decodeToken(token);
  
  if (!decoded) return false;

  const tokenAge = Date.now() - decoded.timestamp;
  const maxAge = 24 * 60 * 60 * 1000; // Token is valid for 1 day

  return tokenAge < maxAge;
};

export const validateAuth = () => {
  const token = Cookies.get("token");
  return token && isTokenValid(token);
};
