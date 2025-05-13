import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UsersRound,
  DollarSign,
  Settings,
  GraduationCap,
  Wrench
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Students', href: '/dashboard/students', icon: Users },
  { name: 'Relatives', href: '/dashboard/relatives', icon: UsersRound },
  { name: 'Teachers', href: '/dashboard/teachers', icon: GraduationCap },
  { name: 'Finance', href: '/dashboard/finance', icon: DollarSign },
  { name: 'Services', href: '/dashboard/services', icon: Wrench },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface NavigationProps {
  isCollapsed: boolean;
}

export const Navigation = ({ isCollapsed }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav className="space-y-2 px-3">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "group flex items-center rounded-xl transition-all duration-300",
              "relative overflow-hidden backdrop-blur-sm",
              isCollapsed ? "justify-center p-3" : "px-4 py-3",
              isActive
                ? "bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white shadow-lg shadow-blue-500/30"
                : "text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/20 hover:text-white"
            )}
          >
            {/* Glowing effect on hover */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              "bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]"
            )} />

            {/* Icon with pulse effect on active */}
            <div className="relative">
              <item.icon className={cn(
                "transition-all duration-300",
                isCollapsed ? "h-6 w-6" : "h-5 w-5",
                isActive && "animate-[pulse_2s_infinite]"
              )} />

              {/* Glow behind icon */}
              {isActive && (
                <div className="absolute inset-0 blur-sm bg-blue-400/50 rounded-full" />
              )}
            </div>

            {/* Text with slide animation */}
            <span className={cn(
              "ml-3 transition-all duration-300 font-medium",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
              {item.name}
            </span>

            {/* Active indicator */}
            {isActive && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5">
                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                <div className="relative rounded-full bg-white w-1.5 h-1.5" />
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
};
