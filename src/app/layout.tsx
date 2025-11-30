import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'arabic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'نظام المحاسبة - شركة الاستيراد',
  description: 'نظام محاسبي متكامل لشركات الاستيراد والتوزيع',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} font-sans bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
