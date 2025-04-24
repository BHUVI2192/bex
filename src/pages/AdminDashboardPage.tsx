
import React from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Package, LogOut } from "lucide-react";

const AdminDashboardPage = () => {
  const { isAuthenticated, adminEmail, logout } = useAdminAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">{adminEmail}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="hover:border-esports-blue/60 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-esports-blue" />
              Manage News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Add, edit or delete news articles for the website.</p>
            <div className="flex gap-3">
              <Link to="/admin/news">
                <Button className="bg-esports-blue hover:bg-esports-blue/90">
                  Manage News
                </Button>
              </Link>
              <Link to="/admin/news/add">
                <Button variant="outline">
                  Add News Article
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-esports-blue/60 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-esports-blue" /> 
              Manage Accessories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Add, edit or delete gaming accessories for the website.</p>
            <div className="flex gap-3">
              <Link to="/admin/accessories">
                <Button className="bg-esports-blue hover:bg-esports-blue/90">
                  Manage Accessories
                </Button>
              </Link>
              <Link to="/admin/accessories/add">
                <Button variant="outline">
                  Add Accessory
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
