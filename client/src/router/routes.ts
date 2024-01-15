export const PUBLIC_ROUTES = {
  LOGIN: "/connection",
  HOME: "/",
} as const;

export const PROTECTED_ROUTES = {
  HISTORY: "/tableaudebord/historique",
  DELIVERY: "/tableaudebord/livraison",
  USER: "/tableaudebord/utilisateur",
  LOGOUT: "/deconnexion",
} as const;

type PublicRouteKeys = keyof typeof PUBLIC_ROUTES;
type PublicRoutes = (typeof PUBLIC_ROUTES)[PublicRouteKeys];

type ProtectedRouteKeys = keyof typeof PROTECTED_ROUTES;
export type ProtectedRoutes = (typeof PROTECTED_ROUTES)[ProtectedRouteKeys];
