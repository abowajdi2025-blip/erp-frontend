'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // تحقق بسيط من البيانات
    if (!email || !password) {
      setError('يرجى ملء جميع الحقول');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      setLoading(false);
      return;
    }

    try {
      // إرسال بيانات الدخول إلى الـ Backend
      const response = await fetch('http://localhost:3001/auth/login', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // حفظ token في localStorage إذا كان موجود
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user_data', JSON.stringify(data.user));
        }

        // توجيه المستخدم إلى لوحة التحكم
        router.push('/dashboard');
        
        // إظهار رسالة نجاح
        alert('تم تسجيل الدخول بنجاح!');
      } else {
        setError(data.message || 'حدث خطأ أثناء تسجيل الدخول');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    // تسجيل دخول تجريبي للاختبار
    setEmail('demo@accounting.com');
    setPassword('demo123');
    setLoading(true);
    
    // محاكاة تسجيل الدخول الناجح
    setTimeout(() => {
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('user_data', JSON.stringify({
        name: 'حساب تجريبي',
        email: 'demo@accounting.com',
        role: 'admin'
      }));
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* الشريط العلوي */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 px-6 absolute top-0 left-0 right-0">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <span className="text-xl font-bold text-gray-800">المحاسب</span>
            </div>
            
            <a 
              href="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              العودة للرئيسية
            </a>
          </div>
        </nav>

        {/* نموذج تسجيل الدخول */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mt-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">تسجيل الدخول</h1>
            <p className="text-gray-600">أدخل بياناتك للوصول إلى حسابك</p>
          </div>

          {/* رسالة الخطأ */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-right">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* حقل الإيميل */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-right"
                placeholder="example@email.com"
                dir="rtl"
                disabled={loading}
              />
            </div>

            {/* حقل كلمة المرور */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-right">
                  كلمة المرور
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  نسيت كلمة المرور؟
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-right"
                placeholder="أدخل كلمة المرور"
                dir="rtl"
                disabled={loading}
              />
            </div>

            {/* تذكرني */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled={loading}
                />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  تذكرني
                </label>
              </div>
            </div>

            {/* زر تسجيل الدخول */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>

            {/* رابط إنشاء حساب */}
            <div className="text-center">
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <a href="/register" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                  إنشاء حساب جديد
                </a>
              </p>
            </div>
          </form>

          {/* separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">أو</span>
            </div>
          </div>

          {/* خيارات تسجيل الدخول البديلة */}
          <div className="space-y-3">
            <button 
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>تسجيل دخول تجريبي</span>
            </button>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            بحاجة إلى مساعدة؟{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors">
              اتصل بالدعم الفني
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}