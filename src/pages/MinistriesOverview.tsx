import { AdminLayout } from "@/components/layout/AdminLayout";
import MinistriesGrid from "@/components/ministry/MinistriesGrid";

export default function MinistriesOverview() {
  return (
    <AdminLayout>
      <MinistriesGrid />
    </AdminLayout>
  );
}
