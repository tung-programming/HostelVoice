'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, UserCheck, Shield, Sparkles, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.5s ease-out forwards; }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(1, 75, 137, 0.15);
        }
      `}</style>

      {/* Blue Gradient Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(1, 75, 137, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(1, 75, 137, 0.08) 1px, transparent 1px),
            radial-gradient(circle 800px at 50% 0%, rgba(1, 75, 137, 0.05), transparent)
          `,
          backgroundSize: "80px 80px, 80px 80px, 100% 100%",
        }}
      />

      {/* Animated Floating Orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl animate-float" style={{ background: '#014b89', animationDelay: '0s' }}></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float" style={{ background: '#f26918', animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-8 blur-3xl animate-float" style={{ background: '#014b89', animationDelay: '4s' }}></div>

      {/* Navigation - Mobile Optimized */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/logo/logo.png" 
              alt="HostelVoice Logo" 
              width={2000} 
              height={70} 
              className="h-12 sm:h-14 w-auto"
              priority
            />
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-2 hover:text-white font-semibold transition-all text-sm sm:text-base px-3 sm:px-4" style={{ borderColor: '#014b89', color: '#014b89' }} onMouseEnter={(e) => e.currentTarget.style.background = '#014b89'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content - Mobile Optimized */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-6xl">
          {/* Header - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4" style={{ color: '#014b89' }}>
              Choose Your <span style={{ color: '#f26918' }}>Role</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Select the role that best describes you to get started with HostelVoice
            </p>
          </div>

          {/* Role Cards - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {/* Student Card */}
            <Link href="/register/student" className="group">
              <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 hover-lift h-full flex flex-col animate-slide-up" style={{ animationDelay: '0.1s', borderColor: 'rgba(1, 75, 137, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#014b89'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(1, 75, 137, 0.2)'}>
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg transition-transform group-hover:scale-110" style={{ background: '#014b89' }}>
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Student</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">Report issues, view announcements, and manage your hostel experience seamlessly</p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>Report & track issues</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>Community chat access</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>View announcements</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>& many more</span>
                    </li>
                  </ul>
                </div>
                
                {/* Button */}
                <div className="flex items-center gap-2 text-sm sm:text-base font-semibold group-hover:gap-3 transition-all" style={{ color: '#014b89' }}>
                  Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </Link>

            {/* Caretaker Card */}
            <Link href="/register/caretaker" className="group">
              <div className="bg-white border-2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 hover-lift h-full flex flex-col animate-slide-up relative overflow-hidden" style={{ animationDelay: '0.2s', borderColor: 'rgba(1, 75, 137, 0.3)', background: 'linear-gradient(135deg, rgba(242, 105, 24, 0.02), white)' }}>
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg transition-transform group-hover:scale-110" style={{ background: '#014b89' }}>
                  <UserCheck className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Caretaker</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">Manage resident issues, track operations, and ensure smooth hostel maintenance</p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>Issue management</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>Send notifications</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>Resident directory</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>& many more</span>
                    </li>
                  </ul>
                </div>
                
                {/* Button */}
                <div className="flex items-center gap-2 text-sm sm:text-base font-semibold group-hover:gap-3 transition-all" style={{ color: '#014b89' }}>
                  Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </Link>

            {/* Admin Card */}
            <Link href="/register/admin" className="group sm:col-span-2 md:col-span-1">
              <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 hover-lift h-full flex flex-col animate-slide-up" style={{ animationDelay: '0.3s', borderColor: 'rgba(1, 75, 137, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#014b89'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(1, 75, 137, 0.2)'}>
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg transition-transform group-hover:scale-110" style={{ background: '#014b89' }}>
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Administrator</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">Full analytics, user management, and complete hostel system control</p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>System analytics</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>User management</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>Full system control</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f26918' }} />
                      <span>& many more</span>
                    </li>
                  </ul>
                </div>
                
                {/* Button */}
                <div className="flex items-center gap-2 text-sm sm:text-base font-semibold group-hover:gap-3 transition-all" style={{ color: '#014b89' }}>
                  Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </Link>
          </div>

          {/* Trust Indicators - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#f26918' }} />
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#f26918' }} />
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">Setup in 2 minutes</span>
            </div>
          </div>

          {/* Footer - Mobile Optimized */}
          <div className="text-center animate-slide-up px-4" style={{ animationDelay: '0.5s' }}>
            <p className="text-sm sm:text-base text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold hover:underline transition-colors" style={{ color: '#014b89' }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-2 z-0" style={{ background: 'linear-gradient(to right, #014b89, #f26918)' }}></div>
    </div>
  )
}
