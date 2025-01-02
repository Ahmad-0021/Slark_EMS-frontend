export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  console.log(token);
  return !!token; // Return true if token exists, false otherwise
};
