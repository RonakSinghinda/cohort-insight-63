import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";

const Placement = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Placement</h1>
        <Card className="p-6">
          <p className="text-muted-foreground">Placement workspace coming soon...</p>
        </Card>
      </main>
    </div>
  );
};

export default Placement;
