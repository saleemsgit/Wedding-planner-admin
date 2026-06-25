"use client";

import { usePathname } from "next/navigation";
import AdminNavigation from "./AdminNavigation";

export default function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showAdminNavigation =
    !pathname.startsWith("/vendor") && pathname !== "/admin/login" && pathname !== "/login";

  return (
    <>
      {showAdminNavigation ? <AdminNavigation /> : null}
      {children}
    </>
  );
}