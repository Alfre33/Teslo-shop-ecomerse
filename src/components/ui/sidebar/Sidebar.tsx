import { SidebarItems } from "./SidebarItems";

export const Sidebar = ({
  isAdmin,
  isAuthenticated,
}: {
  isAdmin: boolean;
  isAuthenticated: boolean;
}) => {
  return <SidebarItems isAdmin={isAdmin} isAuthenticated={isAuthenticated} />;
};
