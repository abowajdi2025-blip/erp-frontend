'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from '@/types'
import { cn } from '@/lib/utils'

interface QuickNavProps {
  items?: NavItem[]
  className?: string
}

export default function QuickNav({ 
  items = [], 
  className = "" 
}: QuickNavProps) {
  const pathname = usePathname()

  return (
    <div className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="overflow-x-auto scrollbar-thin pb-4">
          <div className="flex gap-4 py-4 min-w-max">
            {items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link 
                  key={item.id} 
                  href={item.href} 
                  className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl transition-transform hover:scale-105"
                >
                  <div
                    className={cn(
                      "flex items-center gap-4 rtl:flex-row-reverse border-2 rounded-xl px-5 py-4 min-w-[220px] transition-all duration-300 group",
                      "bg-white hover:shadow-lg hover:border-blue-300 cursor-pointer",
                      isActive 
                        ? "border-blue-500 shadow-md ring-2 ring-blue-500 ring-opacity-20" 
                        : "border-gray-200 hover:border-blue-300"
                    )}
                  >
                    <div className="relative">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300",
                        "group-hover:scale-110",
                        isActive 
                          ? "bg-blue-50 text-blue-600 shadow-inner" 
                          : "bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                      )}>
                        {item.icon || '📁'}
                      </div>
                      {item.badge !== undefined && (
                        <div className="absolute -top-2 -right-2">
                          <span className={cn(
                            "text-xs font-bold px-2 py-1 rounded-full shadow-sm transition-colors",
                            isActive 
                              ? "bg-blue-100 text-blue-700 border border-blue-200" 
                              : "bg-red-100 text-red-700 border border-red-200 group-hover:bg-blue-100 group-hover:text-blue-700"
                          )}>
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-right flex-1 min-w-0">
                      <div className={cn(
                        "font-semibold text-sm transition-colors",
                        isActive 
                          ? "text-blue-700" 
                          : "text-gray-900 group-hover:text-blue-600"
                      )}>
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className={cn(
                          "text-xs transition-colors mt-1 truncate",
                          isActive 
                            ? "text-blue-600" 
                            : "text-gray-500 group-hover:text-blue-500"
                        )}>
                          {item.subtitle}
                        </div>
                      )}
                    </div>

                    {/* مؤشر النشاط */}
                    {isActive && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 rtl:mr-2 animate-pulse" />
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
