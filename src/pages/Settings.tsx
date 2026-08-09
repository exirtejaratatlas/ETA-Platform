import { Settings as SettingsIcon, Globe, Bell, Shield, Database } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader, CardBody, CardTitle, CardDescription } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export default function Settings() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Configure your platform preferences"
        icon={<SettingsIcon size={20} />}
      />

      <div className="space-y-4 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-surface-400" />
              <CardTitle>Organization</CardTitle>
            </div>
            <CardDescription>Your organization profile and branding</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-4">
              <img src="/Logo.svg" alt="Exir Tejarat Atlas" className="h-14 w-auto" />
              <div>
                <p className="text-sm font-semibold text-surface-900">Exir Tejarat Atlas</p>
                <p className="text-xs text-surface-500">اکسیر تجارت اطلس</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database size={18} className="text-surface-400" />
              <CardTitle>Database</CardTitle>
            </div>
            <CardDescription>Supabase connection status</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm text-surface-700">Connected to Supabase</span>
              </div>
              <Badge tone="success">Active</Badge>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-surface-400" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-surface-900">Email notifications</p>
                  <p className="text-xs text-surface-500">Receive updates about deals and orders</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                <div>
                  <p className="text-sm font-medium text-surface-900">AI task alerts</p>
                  <p className="text-xs text-surface-500">Get notified when AI tasks complete</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-surface-400" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Security and access settings</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-900">Row Level Security</p>
                <p className="text-xs text-surface-500">All tables have RLS enabled</p>
              </div>
              <Badge tone="success" dot>Enabled</Badge>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
