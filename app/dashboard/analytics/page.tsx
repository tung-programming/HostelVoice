'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/lib/auth-context'
import { analyticsApi, ApiError, DashboardStats } from '@/lib/api'
import { TrendingUp, TrendingDown, Users, AlertCircle, CheckCircle, Clock, Loader2, RefreshCw, Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart
} from 'recharts'

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await analyticsApi.getDashboard()
      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to load analytics'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  // Extract values from backend response structure
  const totalIssues = dashboardData?.issues?.total || 0
  const pendingIssues = dashboardData?.issues?.pending || 0
  const resolvedIssues = totalIssues - pendingIssues
  const issuesTrend = dashboardData?.issues?.trend || 0
  const totalUsers = dashboardData?.users?.total || 0
  const pendingApprovals = dashboardData?.users?.pending_approvals || 0
  const activeAnnouncements = dashboardData?.announcements?.active || 0
  const openLostFound = dashboardData?.lost_found?.open || 0
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0

  const metrics = [
    {
      label: 'Total Issues',
      value: totalIssues,
      change: issuesTrend,
      trend: issuesTrend >= 0 ? 'up' as const : 'down' as const,
      icon: AlertCircle
    },
    {
      label: 'Resolved Issues',
      value: resolvedIssues,
      change: resolutionRate,
      trend: 'up' as const,
      icon: CheckCircle
    },
    {
      label: 'Active Users',
      value: totalUsers,
      change: 0,
      trend: 'up' as const,
      icon: Users
    },
    {
      label: 'Announcements',
      value: activeAnnouncements,
      change: 0,
      trend: 'up' as const,
      icon: Bell
    }
  ]

  const summaryStats = [
    { label: 'Pending Issues', value: pendingIssues, color: '#f26918' },
    { label: 'Pending Approvals', value: pendingApprovals, color: '#a855f7' },
    { label: 'Open Lost & Found', value: openLostFound, color: '#06b6d4' },
    { label: 'Resolution Rate', value: `${resolutionRate}%`, color: '#10b981' }
  ]

  if (!user) return null

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
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-12 pb-12 sm:pb-16 md:pb-24 relative z-10">
        {/* Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
              Analytics & Reports
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">System-wide analytics and performance metrics</p>
          </div>
          <Button
            onClick={fetchAnalytics}
            variant="outline"
            className="gap-2 h-11 sm:h-12 rounded-xl font-semibold border-2 text-sm sm:text-base w-full sm:w-auto"
            style={{ borderColor: '#014b89', color: '#014b89' }}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mb-4" style={{ color: '#014b89' }} />
            <p className="text-sm sm:text-base text-gray-600 font-medium">Loading analytics...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center mb-6 sm:mb-8">
            <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-2">Failed to Load Analytics</h3>
            <p className="text-sm sm:text-base text-red-600 mb-4">{error}</p>
            <Button onClick={fetchAnalytics} className="bg-red-600 hover:bg-red-700 text-white h-11 sm:h-12 text-sm sm:text-base">
              Try Again
            </Button>
          </div>
        )}

        {/* Analytics Content */}
        {!isLoading && !error && dashboardData && (
        <>
        {/* Key Metrics - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
          {metrics.map((metric, i) => {
            const Icon = metric.icon
            const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown
            const isPositive = (metric.trend === 'up' && metric.change > 0) || (metric.trend === 'down' && metric.change < 0)

            return (
              <div 
                key={metric.label} 
                className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center" style={{ background: 'rgba(1, 75, 137, 0.1)' }}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#014b89' }} />
                  </div>
                  <div 
                    className="flex items-center gap-1 text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl"
                    style={{ 
                      background: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: isPositive ? '#10b981' : '#ef4444'
                    }}
                  >
                    <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">{metric.label}</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#014b89' }}>{metric.value}</p>
              </div>
            )
          })}
        </div>

        {/* Charts Section - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
          {/* Issues Overview - Pie Chart */}
          <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#014b89' }}>
              Issues Status Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Resolved', value: resolvedIssues, color: '#10b981' },
                    { name: 'Pending', value: pendingIssues, color: '#f26918' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'Resolved', value: resolvedIssues, color: '#10b981' },
                    { name: 'Pending', value: pendingIssues, color: '#f26918' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <p className="text-xs font-semibold text-gray-600 mb-1">Resolved</p>
                <p className="text-2xl font-bold" style={{ color: '#10b981' }}>{resolvedIssues}</p>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(242, 105, 24, 0.1)' }}>
                <p className="text-xs font-semibold text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold" style={{ color: '#f26918' }}>{pendingIssues}</p>
              </div>
            </div>
          </div>

          {/* Monthly Comparison - Bar Chart */}
          <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#014b89' }}>
              Monthly Issues Comparison
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { month: 'Last Month', issues: dashboardData.issues?.last_month || 0 },
                  { month: 'This Month', issues: dashboardData.issues?.this_month || 0 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="issues" fill="#014b89" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" style={{ color: issuesTrend >= 0 ? '#10b981' : '#ef4444' }} />
              <span className="font-bold" style={{ color: issuesTrend >= 0 ? '#10b981' : '#ef4444' }}>
                {issuesTrend >= 0 ? '+' : ''}{issuesTrend}% vs last month
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats - Area Chart & Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
          {/* Quick Stats Bar Chart */}
          <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#014b89' }}>
              System Statistics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Pending Issues', value: pendingIssues, color: '#f26918' },
                  { name: 'Pending Approvals', value: pendingApprovals, color: '#a855f7' },
                  { name: 'Lost & Found', value: openLostFound, color: '#06b6d4' },
                  { name: 'Announcements', value: activeAnnouncements, color: '#10b981' }
                ]}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="name" type="category" width={120} stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {[
                    { name: 'Pending Issues', value: pendingIssues, color: '#f26918' },
                    { name: 'Pending Approvals', value: pendingApprovals, color: '#a855f7' },
                    { name: 'Lost & Found', value: openLostFound, color: '#06b6d4' },
                    { name: 'Announcements', value: activeAnnouncements, color: '#10b981' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Resolution Rate Chart */}
          <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#014b89' }}>
              Performance Metrics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={[
                  { name: 'Total Issues', value: totalIssues },
                  { name: 'Resolved', value: resolvedIssues },
                  { name: 'Active Users', value: totalUsers },
                  { name: 'Announcements', value: activeAnnouncements }
                ]}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#014b89" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#014b89" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="#014b89" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
                <span className="font-bold text-lg" style={{ color: '#10b981' }}>
                  {resolutionRate}% Resolution Rate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">Total Users</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>{totalUsers}</p>
            <p className="text-[10px] sm:text-xs font-bold" style={{ color: '#10b981' }}>Approved</p>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">Pending Approvals</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2" style={{ color: '#f26918' }}>{pendingApprovals}</p>
            <p className="text-[10px] sm:text-xs font-bold" style={{ color: '#f26918' }}>Waiting</p>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">Active Announcements</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>{activeAnnouncements}</p>
            <p className="text-[10px] sm:text-xs font-bold" style={{ color: '#10b981' }}>Live</p>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">Lost & Found</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>{openLostFound}</p>
            <p className="text-[10px] sm:text-xs font-bold" style={{ color: '#f26918' }}>Open</p>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  )
}
