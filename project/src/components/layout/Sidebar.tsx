
import { Home, Users, FileText, History, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { name: 'Members', icon: Users, href: '/members' },
  { name: 'Proposals', icon: FileText, href: '/proposals' },
  { name: 'Transactions', icon: History, href: '/transactions' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar-background border-r border-sidebar-border min-h-screen">
      <div className="px-6 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-2 py-2 text-sm font-medium text-sidebar-foreground rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}