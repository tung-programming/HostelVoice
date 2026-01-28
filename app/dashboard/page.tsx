'use client'

import { useAuth } from '@/lib/auth-context'
import { AlertCircle, TrendingUp, Users, MessageSquare, Zap, BarChart3, ClipboardList, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { analyticsApi, issuesApi, announcementsApi, lostFoundApi, residentsApi, DashboardStats } from '@/lib/api'
import { toast } from 'sonner'

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  const getDashboardContent = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} />
      case 'caretaker':
        return <CaretakerDashboard user={user} />
      case 'admin':
        return <AdminDashboard user={user} />
      default:
        return <div>Unknown role</div>
    }
  }

  return getDashboardContent()
}

function StudentDashboard({ user }: { user: any }) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([
    { label: 'Open Issues', value: '0', icon: AlertCircle, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
    { label: 'Announcements', value: '0', icon: MessageSquare, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
    { label: 'Lost & Found', value: '0', icon: CheckCircle2, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' }
  ])

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const [issuesRes, announcementsRes, lostFoundRes] = await Promise.all([
        issuesApi.getMyIssues(1, 100),
        announcementsApi.getTargeted(1, 100),
        lostFoundApi.getOpenItems({ page: 1, limit: 100 })
      ])

      const openIssues = (issuesRes.data || []).filter(i => i.status !== 'resolved' && i.status !== 'closed').length
      const announcementCount = (announcementsRes.data || []).length
      const lostFoundCount = (lostFoundRes.data || []).length

      setStats([
        { label: 'Open Issues', value: String(openIssues), icon: AlertCircle, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
        { label: 'Announcements', value: String(announcementCount), icon: MessageSquare, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
        { label: 'Lost & Found', value: String(lostFoundCount), icon: CheckCircle2, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' }
      ])
    } catch (error) {
      console.error('Error fetching student stats:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const quickActions = [
    { title: 'Report Issue', description: 'Tell us about any problems', icon: AlertCircle, href: '/dashboard/issues', color: '#014b89' },
    { title: 'View Announcements', description: 'Check latest hostel updates', icon: MessageSquare, href: '/dashboard/announcements', color: '#014b89' },
    { title: 'Lost & Found', description: 'Browse lost items', icon: Zap, href: '/dashboard/lost-found', color: '#014b89' }
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(1, 75, 137, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(1, 75, 137, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-12 pb-12 sm:pb-16 md:pb-24 relative z-10">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
            Welcome back, {user.name}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">Room {user.roomNumber} • {user.hostelName}</p>
        </div>

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-gray-200 hover:shadow-xl transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: stat.bgColor }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">{stat.label}</p>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" style={{ color: '#014b89' }} />
                  </div>
                ) : (
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#014b89' }}>{stat.value}</p>
                )}
              </div>
            )
          })}
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8" style={{ color: '#014b89' }}>Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {quickActions.map((action, i) => {
              const Icon = action.icon
              return (
                <Link key={action.href} href={action.href}>
                  <div 
                    className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full"
                    style={{ background: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = action.color
                      e.currentTarget.style.background = `${action.color}03`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#f3f4f6'
                      e.currentTarget.style.background = 'white'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${action.color}15` }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: action.color }} />
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-900 transition-colors" style={{ color: action.color }} />
                    </div>
                    <p className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">{action.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{action.description}</p>
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

function CaretakerDashboard({ user }: { user: any }) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([
    { label: 'Active Issues', value: '0', icon: AlertCircle, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
    { label: 'Residents', value: '0', icon: Users, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
    { label: 'Resolved Today', value: '0', icon: TrendingUp, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' }
  ])

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const [issuesRes, residentsRes] = await Promise.all([
        issuesApi.getAllIssues({ limit: 500 }),
        residentsApi.getAll(1, 1000)
      ])
      
      const issues = issuesRes.data || []
      const residents = residentsRes.data || []
      
      const today = new Date().toISOString().split('T')[0]
      const activeIssues = issues.filter(i => i.status !== 'resolved' && i.status !== 'closed').length
      const resolvedToday = issues.filter(i => 
        i.status === 'resolved' && i.resolved_at?.startsWith(today)
      ).length

      setStats([
        { label: 'Active Issues', value: String(activeIssues), icon: AlertCircle, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
        { label: 'Residents', value: String(residents.length), icon: Users, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
        { label: 'Resolved Today', value: String(resolvedToday), icon: TrendingUp, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' }
      ])
    } catch (error) {
      console.error('Error fetching caretaker stats:', error)
      toast.error('Failed to load dashboard statistics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const managementLinks = [
    { title: 'Manage Issues', description: 'View and resolve issues', icon: ClipboardList, href: '/dashboard/issues/caretaker', color: '#014b89' },
    { title: 'Residents', description: 'Manage resident information', icon: Users, href: '/dashboard/residents', color: '#014b89' },
    { title: 'Announcements', description: 'Post hostel updates', icon: MessageSquare, href: '/dashboard/announcements', color: '#014b89' }
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(1, 75, 137, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(1, 75, 137, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-12 pb-12 sm:pb-16 md:pb-24 relative z-10">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
            Hostel Management
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">{user.hostelName} • Caretaker Dashboard</p>
        </div>

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-gray-200 hover:shadow-xl transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: stat.bgColor }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">{stat.label}</p>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" style={{ color: stat.color }} />
                  </div>
                ) : (
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                )}
              </div>
            )
          })}
        </div>

        {/* Management Tools - Mobile Optimized */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8" style={{ color: '#014b89' }}>Management Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {managementLinks.map((link, i) => {
              const Icon = link.icon
              return (
                <Link key={link.href} href={link.href}>
                  <div 
                    className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full"
                    style={{ background: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = link.color
                      e.currentTarget.style.background = `${link.color}03`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#f3f4f6'
                      e.currentTarget.style.background = 'white'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${link.color}15` }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: link.color }} />
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-900 transition-colors" style={{ color: link.color }} />
                    </div>
                    <p className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">{link.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{link.description}</p>
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

function AdminDashboard({ user }: { user: any }) {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const res = await analyticsApi.getDashboard()
      if (res.data) {
        setDashboardData(res.data)
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error)
      toast.error('Failed to load dashboard statistics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Calculate stats from the new backend structure
  const totalIssues = dashboardData?.issues?.total || dashboardData?.totalIssues || 0
  const totalUsers = dashboardData?.users?.total || dashboardData?.totalUsers || 0
  const pendingIssues = dashboardData?.issues?.pending || dashboardData?.pendingIssues || 0
  const resolvedIssues = totalIssues - pendingIssues
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0

  const stats = [
    { label: 'Total Issues', value: totalIssues.toLocaleString(), icon: AlertCircle, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
    { label: 'Total Users', value: totalUsers.toLocaleString(), icon: Users, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' },
    { label: 'Resolution Rate', value: `${resolutionRate}%`, icon: TrendingUp, color: '#014b89', bgColor: 'rgba(1, 75, 137, 0.1)' }
  ]

  const adminTools = [
    { title: 'Analytics', description: 'System-wide metrics', icon: BarChart3, href: '/dashboard/analytics', color: '#014b89' },
    { title: 'Management', description: 'User & system control', icon: ClipboardList, href: '/dashboard/management', color: '#014b89' },
    { title: 'Announcements', description: 'Broadcast messages', icon: MessageSquare, href: '/dashboard/announcements-manage', color: '#014b89' }
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(1, 75, 137, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(1, 75, 137, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-12 pb-12 sm:pb-16 md:pb-24 relative z-10">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
            System Administration
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">Administrator Dashboard • Full System Access</p>
        </div>

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-gray-200 hover:shadow-xl transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: stat.bgColor }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">{stat.label}</p>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" style={{ color: stat.color }} />
                  </div>
                ) : (
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                )}
              </div>
            )
          })}
        </div>

        {/* Admin Controls - Mobile Optimized */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8" style={{ color: '#014b89' }}>Admin Controls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {adminTools.map((tool, i) => {
              const Icon = tool.icon
              return (
                <Link key={tool.href} href={tool.href}>
                  <div 
                    className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full"
                    style={{ background: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = tool.color
                      e.currentTarget.style.background = `${tool.color}03`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#f3f4f6'
                      e.currentTarget.style.background = 'white'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${tool.color}15` }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: tool.color }} />
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-900 transition-colors" style={{ color: tool.color }} />
                    </div>
                    <p className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">{tool.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{tool.description}</p>
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
