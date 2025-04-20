// components/dashboard/AdminPanelButtonWrapper.tsx
import { getUserPermissions } from '@/lib/permissions/getUserPermissions';
import AdminPanelButton from './AdminPanelButton';

export default async function AdminPanelButtonWrapper() {
  const permissions = await getUserPermissions();
  
  return <AdminPanelButton permissions={permissions} />;
}