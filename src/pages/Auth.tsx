import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Extract username from email
  const extractNameFromEmail = (email: string): string => {
    // Get the part before @ symbol
    const emailPart = email.split("@")[0];
    // Replace dots and underscores with spaces, then capitalize each word
    return emailPart
      .replace(/[._-]/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);

      // Extract name from email
      const extractedName = extractNameFromEmail(loginData.email);

      // Store user data in context
      setUser({
        name: extractedName,
        email: loginData.email,
        usn: "RV2208A12", // This can be fetched from backend later
        course: "B.Tech",
        branch: "Computer Science & Engineering",
        semester: 4,
        section: "A",
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${extractedName}`
      });

      toast({
        title: "Login Successful",
        description: `Welcome back, ${extractedName}!`,
      });

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "faculty") {
        navigate("/faculty/dashboard");
      } else {
        navigate("/student/home");
      }
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);

      // Store user data in context (use the provided name or extract from email)
      const userName = signupData.name || extractNameFromEmail(signupData.email);

      setUser({
        name: userName,
        email: signupData.email,
        usn: "RV2208A12", // This can be fetched from backend later
        course: "B.Tech",
        branch: "Computer Science & Engineering",
        semester: 4,
        section: "A",
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
      });

      toast({
        title: "Account Created",
        description: `Welcome, ${userName}!`,
      });

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "faculty") {
        navigate("/faculty/dashboard");
      } else {
        navigate("/student/home");
      }
    }, 1000);
  };

  const getRoleTitle = () => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Card className="px-8 py-4 border-2 border-primary/20 bg-card">
            <h1 className="text-2xl font-bold text-foreground">DeepTech Campus</h1>
          </Card>
        </div>

        {/* Auth Card */}
        <Card className="p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              {getRoleTitle()} Portal
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email / Phone Number</Label>
                  <Input
                    id="login-email"
                    type="text"
                    placeholder="Enter your email or phone"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => {
                      toast({
                        title: "Reset Password",
                        description: "Password reset link sent to your email",
                      });
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to role selection
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
