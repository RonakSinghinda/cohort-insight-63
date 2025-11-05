import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, Shield } from "lucide-react";

const roles = [
  {
    id: "student",
    title: "Student",
    icon: GraduationCap,
    description: "Access your courses, grades, and placement opportunities",
  },
  {
    id: "faculty",
    title: "Faculty",
    icon: Users,
    description: "Manage students, track performance, and mentor effectively",
  },
  {
    id: "admin",
    title: "Admin",
    icon: Shield,
    description: "Complete system access and administrative controls",
  },
];

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string) => {
    navigate(`/auth?role=${roleId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <Card className="relative px-12 py-8 border-2 border-primary/20 bg-card">
              <h1 className="text-3xl font-bold text-foreground">DeepTech Campus</h1>
            </Card>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Login As</h2>
          <p className="text-muted-foreground">Select your role to continue</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 group"
              onClick={() => handleRoleSelect(role.id)}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-accent group-hover:bg-primary/10 transition-colors">
                    <role.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
