export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* الشريط العلوي */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <span className="text-xl font-bold text-gray-800">المحاسب</span>
          </div>
          
          <div className="flex items-center space-x-6 space-x-reverse">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">الرئيسية</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">الميزات</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">الأسعار</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">اتصل بنا</a>
            
            {/* مجموعة أزرار الحساب - استخدام <a> بدل <button> */}
            <div className="flex items-center space-x-3 space-x-reverse">
              {/* زر إنشاء حساب */}
              <a 
                href="/register"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                إنشاء حساب
              </a>
              
              {/* زر تسجيل الدخول */}
              <a 
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                تسجيل الدخول
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* قسم الهيرو */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            نظام محاسبي
            <span className="text-blue-600 block">متكامل وذكي</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mt-6">
            حلول محاسبية متكاملة لشركات الاستيراد والتوزيع. إدارة العملاء، الموردين، الفواتير، والتقارير المالية في مكان واحد.
          </p>
          
          <div className="flex justify-center gap-4 mt-10 flex-wrap">
            <a 
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              ابدأ مجاناً
            </a>
            <a 
              href="#features"
              className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 py-4 px-8 rounded-xl transition-all duration-300 font-medium"
            >
              شاهد العرض
            </a>
          </div>
        </div>
      </section>

      {/* الميزات */}
      <section id="features" className="container mx-auto px-6 py-16 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">الميزات الرئيسية</h2>
          <p className="text-gray-600 text-lg">كل ما تحتاجه لإدارة محاسبية ناجحة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ميزة 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 cursor-pointer">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">التقارير المالية</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              تقارير متقدمة لقائمة الدخل، الميزانية العمومية، والتقارير التحليلية
            </p>
          </div>

          {/* ميزة 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 cursor-pointer">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">إدارة العملاء</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              إدارة شاملة لعملاء الجملة والمستشفيات مع سجل معاملات كامل
            </p>
          </div>

          {/* ميزة 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 cursor-pointer">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">الموردين</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              متابعة الموردين المحليين والدوليين مع كشوف الحسابات التفصيلية
            </p>
          </div>

          {/* ميزة 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 cursor-pointer">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300">
              <span className="text-2xl">🧾</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">الفواتير</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              إنشاء وإدارة الفواتير والإشعارات مع نظام ترقيم تلقائي
            </p>
          </div>
        </div>
      </section>

      {/* إحصائيات */}
      <section className="container mx-auto px-6 py-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl my-16 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-blue-100">شركة</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">10K+</div>
            <div className="text-blue-100">معاملة يومية</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">99.9%</div>
            <div className="text-blue-100">نسبة التوفر</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">دعم فني</div>
          </div>
        </div>
      </section>

      {/* دعوة للعمل */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            جاهز لتحويل محاسبتك للعصر الرقمي؟
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            انضم إلى آلاف الشركات التي تثق بنظامنا المحاسبي المتكامل
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="/register"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              سجل حساب مجاني
            </a>
            <a 
              href="/contact"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white py-4 px-8 rounded-xl transition-all duration-300 font-medium"
            >
              طلب عرض سعر
            </a>
          </div>
        </div>
      </section>

      {/* الفوتر */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">النظام المحاسبي</h3>
              <p className="text-gray-400 text-sm">
                حلول محاسبية متكاملة لنجاح أعمالك
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">المنتجات</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">المحاسبة</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">الفواتير</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">التقارير</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">الشركة</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">عنّا</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">الأسعار</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">وظائف</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">الدعم</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">المساعدة</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">اتصل بنا</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">الشروط</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 النظام المحاسبي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}