'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, 
  Sparkles, 
  Users,  
  Shield, 
  Zap, 
  MessageSquare, 
  Bell, 
  ClipboardList, 
  UserCheck, 
  BarChart3, 
  Settings, 
  Home, 
  CheckCircle2, 
  TrendingUp,
  Clock,
  Lock,
  Calendar,
  Search,
  Star,
  GraduationCap,
  UserCog,
  FileText,
  ShoppingBag,
  CreditCard,
  School,
  ShieldCheck,
  UsersRound,
  Bed,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const featuresRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, { threshold: 0.1 })
    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(1, 75, 137, 0.5); }
          50% { box-shadow: 0 0 40px rgba(1, 75, 137, 0.8); }
        }
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
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
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes draw-circle {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        .animate-scale-pulse { animation: scale-pulse 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(1, 75, 137, 0.2);
        }
        .ecosystem-circle {
          stroke-dasharray: 2000;
          animation: draw-circle 2s ease-out forwards;
        }
      `}</style>

      {/* Blue Gradient Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(1, 75, 137, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(1, 75, 137, 0.08) 1px, transparent 1px),
            radial-gradient(circle 1000px at 0% 100px, rgba(1, 75, 137, 0.05), transparent)
          `,
          backgroundSize: "80px 80px, 80px 80px, 100% 100%",
        }}
      />

      {/* Animated Floating Orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl animate-float" style={{ background: '#014b89', animationDelay: '0s' }}></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float" style={{ background: '#f26918', animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl animate-float" style={{ background: '#014b89', animationDelay: '4s' }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <Image 
              src="/logo/logo.png" 
              alt="HostelVoice Logo" 
              width={2000} 
              height={70} 
              className="h-16 w-auto"
              priority
            />
          </div>
          <div className="flex items-center gap-6 animate-slide-in-right">
            <Link href="/login" className="text-gray-700 hover:text-[#014b89] transition-colors font-semibold text-sm">
              Sign In
            </Link>
            <Link href="/register">
              <Button className="text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 font-semibold" style={{ background: '#014b89' }}>
                Register
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Ecosystem Diagram */}
      <section className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-slide-up"
                style={{ animationDelay: '0.2s', color: '#014b89' }}
              >
                Manage Your Hostel{' '}
                <span style={{ color: '#f26918' }}>INTELLIGENTLY</span>
              </h1>

              <p 
                className="text-lg md:text-xl text-gray-600 leading-relaxed animate-slide-up"
                style={{ animationDelay: '0.3s' }}
              >
                Empower students, streamline caretaker workflows, and give admins complete control with a unified platform designed for modern hostel communities.
              </p>

              <div 
                className="flex flex-col sm:flex-row gap-4 animate-slide-up"
                style={{ animationDelay: '0.4s' }}
              >
                <Link href="/register">
                  <Button size="lg" className="text-white border-0 px-8 shadow-xl hover:shadow-2xl transition-all group text-base font-semibold" style={{ background: '#014b89' }}>
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="border-2 hover:text-white font-semibold text-base transition-all" style={{ borderColor: '#f26918', color: '#f26918' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f26918'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    Explore Features
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#f26918' }} />
                  <span className="text-sm text-gray-700 font-medium">60% Time Saved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#f26918' }} />
                  <span className="text-sm text-gray-700 font-medium">50% Faster Resolution</span>
                </div>
              </div>
            </div>

            {/* Right - Ecosystem Circular Diagram */}
            <div className="relative h-[600px] hidden lg:block">
              {/* Container to prevent overflow */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* SVG Connecting Circles */}
                <svg className="absolute w-[580px] h-[580px]" viewBox="0 0 580 580" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  {/* Outer Circle */}
                  <circle 
                    cx="290" 
                    cy="290" 
                    r="230" 
                    fill="none" 
                    stroke="rgba(1, 75, 137, 0.3)" 
                    strokeWidth="2" 
                    strokeDasharray="10,10"
                    className="ecosystem-circle"
                    style={{ animationDelay: '0.5s' }}
                  />
                  {/* Inner Circle */}
                  <circle 
                    cx="290" 
                    cy="290" 
                    r="160" 
                    fill="none" 
                    stroke="rgba(242, 105, 24, 0.3)" 
                    strokeWidth="2" 
                    strokeDasharray="5,5"
                    className="ecosystem-circle"
                    style={{ animationDelay: '0.7s' }}
                  />
                  
                  {/* Connecting Lines */}
                  <line x1="290" y1="290" x2="290" y2="60" stroke="rgba(1, 75, 137, 0.2)" strokeWidth="2" className="animate-fade-in" style={{ animationDelay: '1s' }} />
                  <line x1="290" y1="290" x2="127" y2="127" stroke="rgba(1, 75, 137, 0.2)" strokeWidth="2" className="animate-fade-in" style={{ animationDelay: '1.2s' }} />
                  <line x1="290" y1="290" x2="453" y2="127" stroke="rgba(1, 75, 137, 0.2)" strokeWidth="2" className="animate-fade-in" style={{ animationDelay: '1.4s' }} />
                  <line x1="290" y1="290" x2="520" y2="290" stroke="rgba(1, 75, 137, 0.2)" strokeWidth="2" className="animate-fade-in" style={{ animationDelay: '1.6s' }} />
                  <line x1="290" y1="290" x2="453" y2="453" stroke="rgba(1, 75, 137, 0.2)" strokeWidth="2" className="animate-fade-in" style={{ animationDelay: '1.8s' }} />
                  <line x1="290" y1="290" x2="290" y2="520" stroke="rgba(1, 75, 137, 0.2)" strokeWidth="2" className="animate-fade-in" style={{ animationDelay: '2s' }} />
                  <line x1="290" y1="290" x2="127" y2="453" stroke="rgba(1, 75, 137, 0.2)" strokeWidth="2" className="animate-fade-in" style={{ animationDelay: '2.2s' }} />
                  <line x1="290" y1="290" x2="60" y2="290" stroke="rgba(1, 75, 137, 0.2)" strokeWidth="2" className="animate-fade-in" style={{ animationDelay: '2.4s' }} />
                </svg>

                {/* Center - Student Accommodation */}
                <div className="absolute w-36 h-36 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center border-4 z-20 animate-scale-pulse" style={{ left: '38.5%', top: '38.5%', transform: 'translate(-50%, -50%)', borderColor: 'rgba(1, 75, 137, 0.2)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-2" style={{ background: '#014b89' }}>
                    <Bed className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-xs font-bold text-gray-900 text-center leading-tight px-2">Student<br/>Accommodation</p>
                </div>

                {/* Stakeholder Nodes */}
                {/* 1. Students - Top */}
                <div 
                  className="absolute w-28 h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 animate-fade-in"
                  style={{ left: '50%', top: '0', transform: 'translateX(-50%)', animationDelay: '1s', borderColor: 'rgba(242, 105, 24, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: 'rgba(242, 105, 24, 0.1)' }}>
                    <Users className="w-6 h-6" style={{ color: '#f26918' }} />
                  </div>
                  <p className="text-xs font-bold text-gray-900">Students</p>
                </div>

                {/* 2. Caretakers - Top Left */}
                <div 
                  className="absolute w-28 h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 animate-fade-in"
                  style={{ left: '5%', top: '12%', animationDelay: '1.2s', borderColor: 'rgba(1, 75, 137, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: 'rgba(1, 75, 137, 0.1)' }}>
                    <UserCheck className="w-6 h-6" style={{ color: '#014b89' }} />
                  </div>
                  <p className="text-xs font-bold text-gray-900 text-center leading-tight">Caretakers</p>
                </div>

                {/* 3. Admin - Top Right */}
                <div 
                  className="absolute w-28 h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 animate-fade-in"
                  style={{ right: '5%', top: '12%', animationDelay: '1.4s', borderColor: 'rgba(1, 75, 137, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: 'rgba(1, 75, 137, 0.1)' }}>
                    <Settings className="w-6 h-6" style={{ color: '#014b89' }} />
                  </div>
                  <p className="text-xs font-bold text-gray-900 text-center leading-tight">Admin</p>
                </div>

                {/* 4. Community - Right */}
                <div 
                  className="absolute w-28 h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 animate-fade-in"
                  style={{ right: '0', top: '50%', transform: 'translateY(-50%)', animationDelay: '1.6s', borderColor: 'rgba(242, 105, 24, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: 'rgba(242, 105, 24, 0.1)' }}>
                    <MessageSquare className="w-6 h-6" style={{ color: '#f26918' }} />
                  </div>
                  <p className="text-xs font-bold text-gray-900">Community</p>
                </div>

                {/* 5. Finance - Bottom Right */}
                <div 
                  className="absolute w-28 h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 animate-fade-in"
                  style={{ right: '5%', bottom: '12%', animationDelay: '1.8s', borderColor: 'rgba(1, 75, 137, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: 'rgba(1, 75, 137, 0.1)' }}>
                    <CreditCard className="w-6 h-6" style={{ color: '#014b89' }} />
                  </div>
                  <p className="text-xs font-bold text-gray-900">Finance</p>
                </div>

                {/* 6. Operations - Bottom Center */}
                <div 
                  className="absolute w-28 h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 animate-fade-in"
                  style={{ left: '50%', bottom: '0', transform: 'translateX(-50%)', animationDelay: '2s', borderColor: 'rgba(242, 105, 24, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: 'rgba(242, 105, 24, 0.1)' }}>
                    <BarChart3 className="w-6 h-6" style={{ color: '#f26918' }} />
                  </div>
                  <p className="text-xs font-bold text-gray-900">Operations</p>
                </div>

                {/* 7. Security - Bottom Left */}
                <div 
                  className="absolute w-28 h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 animate-fade-in"
                  style={{ left: '5%', bottom: '12%', animationDelay: '2.2s', borderColor: 'rgba(1, 75, 137, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: 'rgba(1, 75, 137, 0.1)' }}>
                    <Shield className="w-6 h-6" style={{ color: '#014b89' }} />
                  </div>
                  <p className="text-xs font-bold text-gray-900">Security</p>
                </div>

                {/* 8. Compliance - Left */}
                <div 
                  className="absolute w-28 h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 animate-fade-in"
                  style={{ left: '0', top: '50%', transform: 'translateY(-50%)', animationDelay: '2.4s', borderColor: 'rgba(242, 105, 24, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: 'rgba(242, 105, 24, 0.1)' }}>
                    <ClipboardList className="w-6 h-6" style={{ color: '#f26918' }} />
                  </div>
                  <p className="text-xs font-bold text-gray-900">Compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#014b89' }}>
              Everything You Need in{' '}
              <span style={{ color: '#f26918' }}>One Platform</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline operations, enhance communication, and deliver exceptional student experiences with our all-in-one solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: UserCheck,
                title: 'Student Onboarding',
                description: 'Automated onboarding with digital paperwork, room allocation, and seamless approvals',
                color: '#014b89',
                features: ['Digital forms', 'Auto allocation', 'Fast approvals']
              },
              {
                icon: ClipboardList,
                title: 'Maintenance Requests',
                description: 'Track, manage, and resolve issues 50% faster with automated workflows',
                color: '#f26918',
                features: ['Issue logging', 'Status tracking', '3-day resolution']
              },
              {
                icon: BarChart3,
                title: 'AI Analytics',
                description: 'Data-driven insights with AI-powered recommendations for better decisions',
                color: '#014b89',
                features: ['Real-time data', 'Smart reports', 'Trend analysis']
              },
              {
                icon: MessageSquare,
                title: 'Digital Communication',
                description: 'Instant announcements, community chat, and seamless hostel-wide updates',
                color: '#f26918',
                features: ['Announcements', 'Group chat', 'Notifications']
              },
              {
                icon: Shield,
                title: 'Security & Safety',
                description: 'Advanced security features with digital check-ins and visitor management',
                color: '#014b89',
                features: ['QR access', 'Visitor logs', 'Safety alerts']
              },
              {
                icon: Settings,
                title: 'Admin Control',
                description: 'Complete system control with user management and customizable settings',
                color: '#f26918',
                features: ['User roles', 'Permissions', 'System config']
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className={`bg-white rounded-2xl p-7 border-2 border-gray-100 hover:border-[#014b89] transition-all duration-300 hover-lift group ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                    style={{ background: feature.color }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.features.map((item, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1 rounded-full border" style={{ background: `${feature.color}10`, color: feature.color, borderColor: `${feature.color}30` }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Section */}
      <section className="py-24 px-6 relative z-10" style={{ background: 'rgba(1, 75, 137, 0.03)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#014b89' }}>
              Designed for{' '}
              <span style={{ color: '#f26918' }}>Every Role</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored experiences for students, caretakers, and administrators
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                role: 'Students',
                icon: Users,
                color: '#014b89',
                description: 'Seamless hostel experience with easy access to all services',
                features: [
                  { icon: Search, text: 'Browse announcements & updates' },
                  { icon: ClipboardList, text: 'Report & track issues' },
                  { icon: MessageSquare, text: 'Community chat & forums' },
                  { icon: Calendar, text: 'Manage leaves & attendance' }
                ]
              },
              {
                role: 'Caretakers',
                icon: UserCheck,
                color: '#014b89',
                description: 'Efficient tools to manage residents and resolve issues quickly',
                features: [
                  { icon: ClipboardList, text: 'Track & manage requests' },
                  { icon: Bell, text: 'Send instant notifications' },
                  { icon: Users, text: 'Resident directory access' },
                  { icon: BarChart3, text: 'Performance analytics' }
                ]
              },
              {
                role: 'Administrators',
                icon: Shield,
                color: '#014b89',
                description: 'Complete oversight with powerful analytics and control',
                features: [
                  { icon: BarChart3, text: 'System-wide analytics' },
                  { icon: Settings, text: 'User & role management' },
                  { icon: TrendingUp, text: 'Performance reports' },
                  { icon: Lock, text: 'Security & permissions' }
                ]
              }
            ].map((role, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:border-[#014b89] transition-all hover-lift"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6 animate-pulse-glow"
                  style={{ background: role.color }}
                >
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.role}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{role.description}</p>
                <ul className="space-y-3">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${role.color}10` }}>
                        <feature.icon className="w-4 h-4" style={{ color: role.color }} />
                      </div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#014b89' }}>
              Get Started in{' '}
              <span style={{ color: '#f26918' }}>4 Simple Steps</span>
            </h2>
            <p className="text-lg text-gray-600">From signup to full deployment in minutes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '1', icon: UserCheck, title: 'Register', desc: 'Create your account instantly', color: '#014b89' },
              { step: '2', icon: Settings, title: 'Configure', desc: 'Set up your hostel details', color: '#f26918' },
              { step: '3', icon: Users, title: 'Add Users', desc: 'Invite students & staff', color: '#014b89' },
              { step: '4', icon: Zap, title: 'Go Live', desc: 'Start managing efficiently', color: '#f26918' }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Connecting Line */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 z-0" style={{ background: 'rgba(1, 75, 137, 0.2)' }}></div>
                )}
                
                <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:border-[#014b89] transition-all hover-lift z-10">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                    style={{ background: item.color }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center" style={{ borderColor: item.color }}>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden" style={{ background: '#014b89' }}>
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, white 1px, transparent 1px),
                  linear-gradient(to bottom, white 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Transform Your Hostel Management Today
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Experience the power of automation and see why institutions across India trust HostelVoice for their hostel operations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-white hover:bg-gray-50 border-0 px-10 shadow-xl font-bold text-base" style={{ color: '#014b89' }}>
                    Get Started Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" className="border-2 text-white hover:bg-white/10 font-semibold text-base" style={{ borderColor: '#f26918', color: '#f26918', background: 'transparent' }}>
                    Schedule Demo
                    <Calendar className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span className="text-sm text-white font-medium">Setup in minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white relative pt-20 pb-8 px-6 z-10 overflow-hidden border-t border-gray-200">
        {/* Decorative Tree - Right Side */}
        <div className="absolute bottom-0 right-8 w-32 h-40 hidden lg:block z-0">
          <div className="absolute bottom-0 right-12 w-4 h-20 rounded-t-lg" style={{ background: '#8B4513' }}></div>
          <div className="absolute bottom-16 right-6 w-20 h-20 rounded-full opacity-90" style={{ background: '#4CAF50' }}></div>
          <div className="absolute bottom-20 right-10 w-12 h-12 rounded-full opacity-80" style={{ background: '#66BB6A' }}></div>
          <div className="absolute bottom-14 right-14 w-16 h-16 rounded-full opacity-85" style={{ background: '#4CAF50' }}></div>
        </div>

        {/* Decorative Tree - Far Right Side */}
        <div className="absolute bottom-0 right-48 w-48 h-64 hidden lg:block z-0">
          <div className="absolute bottom-0 right-20 w-6 h-32 rounded-t-lg" style={{ background: '#8B4513' }}></div>
          <div className="absolute bottom-24 right-8 w-32 h-32 rounded-full opacity-90" style={{ background: '#4CAF50' }}></div>
          <div className="absolute bottom-32 right-16 w-20 h-20 rounded-full opacity-80" style={{ background: '#66BB6A' }}></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-85" style={{ background: '#4CAF50' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <Image 
                  src="/logo/logo.png" 
                  alt="HostelVoice Logo" 
                  width={300} 
                  height={60} 
                  className="h-16 w-auto"
                />
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p className="font-semibold text-gray-900 mb-2">Address:</p>
                <p>R V College Of Engineering, Bengaluru</p>
                <p>M S Ramaiah, Bengaluru</p>
                <p>Karnataka, India 560073</p>
              </div>

              <Link href="/contact">
                <Button variant="outline" className="border-2 hover:text-white font-semibold transition-all" style={{ borderColor: '#014b89', color: '#014b89' }} onMouseEnter={(e) => e.currentTarget.style.background = '#014b89'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  Register Now
                </Button>
              </Link>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-base">Products</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/hostel-management" className="text-gray-600 hover:text-[#014b89] transition-colors">Hostel Management</Link></li>
                <li><Link href="/mess-management" className="text-gray-600 hover:text-[#014b89] transition-colors">Mess Management</Link></li>
                <li><Link href="/campus-management" className="text-gray-600 hover:text-[#014b89] transition-colors">Campus Management</Link></li>
                <li><Link href="/smart-ids" className="text-gray-600 hover:text-[#014b89] transition-colors">Smart IDs</Link></li>
                <li><Link href="/fee-management" className="text-gray-600 hover:text-[#014b89] transition-colors">Fee Management</Link></li>
              </ul>
            </div>

            {/* Company & Resources */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-base">Company</h4>
              <ul className="space-y-3 text-sm mb-6">
                <li><Link href="/about" className="text-gray-600 hover:text-[#014b89] transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-[#014b89] transition-colors">Contact Us</Link></li>
                <li><Link href="/news" className="text-gray-600 hover:text-[#014b89] transition-colors">News</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-[#014b89] transition-colors">Careers</Link></li>
              </ul>

              <h4 className="font-bold text-gray-900 mb-4 text-base mt-6">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/blog" className="text-gray-600 hover:text-[#014b89] transition-colors">Blog</Link></li>
                <li><Link href="/tutorials" className="text-gray-600 hover:text-[#014b89] transition-colors">Tutorials</Link></li>
                <li><Link href="/reports" className="text-gray-600 hover:text-[#014b89] transition-colors">2024 Report</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-base">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/terms" className="text-gray-600 hover:text-[#014b89] transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-[#014b89] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8">
            <div className="max-w-md mx-auto border-t border-gray-200 pt-6"></div>
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-[#014b89] transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-[#014b89] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-[#014b89] transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-[#f26918] transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="https://youtube.com" target="_blank" className="text-gray-400 hover:text-[#f26918] transition-colors">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>

              {/* Copyright */}
              <p className="text-sm text-gray-600">© 2025 HostelVoice. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
