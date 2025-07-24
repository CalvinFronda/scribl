// Simulated user (replace with actual auth logic)
let currentUser = { email: "user@example.com" }; // null if not logged in

export function useAuth() {
  return currentUser;
}

// Loader to protect routes
export async function requireAuth() {
  if (!currentUser) {
    throw new Response("Unauthorized", {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }
  return null;
}
