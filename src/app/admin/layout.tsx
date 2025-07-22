import withAdminAuth from "@/hooks/with-admin-auth";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default withAdminAuth(AdminLayout);
