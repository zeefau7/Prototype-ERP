"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Calculator, Warehouse, MapPin, RotateCcw, TrendingDown, QrCode, DollarSign, Users, ShoppingCart, UserCheck, Factory, ShoppingBag, BarChart3, Home, ChevronDown, Menu, X, FileText, Target, Shield, Activity, Building2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Finance",
    icon: DollarSign,
    items: [
      { title: "General Ledger", href: "/finance/general-ledger", icon: Calculator },
      { title: "Accounts Receivable", href: "/finance/accounts-receivable", icon: TrendingDown },
      { title: "Accounts Payable", href: "/finance/accounts-payable", icon: ShoppingBag },
      { title: "Asset Management", href: "/finance/asset-management", icon: Package },
      { title: "Budgeting", href: "/finance/budgeting", icon: BarChart3 },
      { title: "Bank Reconciliation", href: "/finance/bank-reconciliation", icon: Calculator },
    ],
  },
  {
    title: "Human Resources",
    icon: Users,
    items: [
      { title: "Employees", href: "/hr/employees", icon: Users },
      { title: "Payroll", href: "/hr/payroll", icon: DollarSign },
      { title: "Attendance", href: "/hr/attendance", icon: UserCheck },
      { title: "Recruitment", href: "/hr/recruitment", icon: Users },
      { title: "Training", href: "/hr/training", icon: Users },
      { title: "Performance", href: "/hr/performance", icon: BarChart3 },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    items: [
      { title: "Stock Management", href: "/inventory/stock", icon: Package },
      { title: "Warehouse", href: "/inventory/warehouse", icon: Warehouse },
      { title: "Supply Chain", href: "/inventory/supply-chain", icon: TrendingDown },
      { title: "Locations", href: "/inventory/locations", icon: MapPin },
      { title: "Cycle Counts", href: "/inventory/cycle-counts", icon: Calculator },
      { title: "Tracking", href: "/inventory/tracking", icon: RotateCcw },
      { title: "Barcode Scanning", href: "/inventory/scanning", icon: QrCode },
    ],
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    items: [
      { title: "Orders", href: "/sales/orders", icon: ShoppingCart },
      { title: "Quotations", href: "/sales/quotations", icon: FileText },
    ],
  },
  {
    title: "CRM",
    icon: UserCheck,
    items: [
      { title: "Leads", href: "/crm/leads", icon: UserCheck },
      { title: "Contacts", href: "/crm/contacts", icon: Users },
      { title: "Opportunities", href: "/crm/opportunities", icon: Target },
    ],
  },
  {
    title: "Production",
    icon: Factory,
    items: [
      { title: "MRP", href: "/production/mrp", icon: Factory },
      { title: "Scheduling", href: "/production/scheduling", icon: Calculator },
      { title: "Quality Control", href: "/production/quality-control", icon: Shield },
    ],
  },
  {
    title: "Purchasing",
    icon: ShoppingBag,
    items: [
      { title: "Orders", href: "/purchasing/orders", icon: ShoppingBag },
      { title: "Vendors", href: "/purchasing/vendors", icon: Users },
      { title: "RFQ Management", href: "/purchasing/rfq", icon: FileText },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    items: [
      { title: "Dashboard", href: "/analytics/dashboard", icon: BarChart3 },
      { title: "Builder", href: "/analytics/builder", icon: BarChart3 },
      { title: "Real-time", href: "/analytics/real-time", icon: Activity },
    ],
  },
]

interface SidebarContentProps {
  onItemClick?: () => void
}

function SidebarContent({ onItemClick }: SidebarContentProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span className="text-lg">ERP System</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
          {navigationItems.map((item, index) => {
            if (item.items) {
              return (
                <Collapsible key={index} className="grid gap-1">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{item.title}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-6 grid gap-1">
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        onClick={onItemClick}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                          pathname === subItem.href && "bg-muted text-primary"
                        )}
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{subItem.title}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Link
                key={index}
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 w-72">
          <SidebarContent onItemClick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block w-64 lg:w-72">
        <SidebarContent />
      </div>
    </>
  )
}

export default Sidebar
