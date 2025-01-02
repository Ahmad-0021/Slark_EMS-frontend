export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true; // Token doesn't exist
  const payload = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
  const expiration = payload.exp * 1000; // Convert expiration time to milliseconds
  return Date.now() >= expiration; // Check if the current time is past the expiration time
};
