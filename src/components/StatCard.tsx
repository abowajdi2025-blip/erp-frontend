import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: number
  color: "blue" | "red" | "green" | "yellow" | "purple" | "indigo"
  subtitle?: string
  icon?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export default function StatCard({ 
  title, 
  value, 
  color, 
  subtitle, 
  icon, 
  trend,
  className 
}: StatCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    red: "from-red-500 to-red-600", 
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-500 to-yellow-600",
    purple: "from-purple-500 to-purple-600",
    indigo: "from-indigo-500 to-indigo-600"
  }

  const iconColors = {
    blue: "text-blue-600",
    red: "text-red-600",
    green: "text-green-600", 
    yellow: "text-yellow-600",
    purple: "text-purple-600",
    indigo: "text-indigo-600"
  }

  const formatValue = (val: number) => {
    if (title.includes("إيرادات") || title.includes("مبيعات") || title.includes("ربح") || title.includes("مصاريف")) {
      return val.toLocaleString('ar-SA') + ' ر.س'
    }
    return val.toLocaleString('ar-SA')
  }

  return (
    <div className={cn(
      "group relative bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300 overflow-hidden",
      className
    )}>
      {/* شريط اللون العلوي */}
      <div className={cn(
        "absolute top-0 right-0 left-0 h-1 bg-gradient-to-r",
        colorClasses[color]
      )} />
      
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <div className="flex items-baseline space-x-2 space-x-reverse">
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(value)}
            </p>
            {trend && (
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>
        
        {icon && (
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-xl transition-colors group-hover:bg-opacity-80",
            iconColors[color]
          )}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
