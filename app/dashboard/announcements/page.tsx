'use client'

import React from "react"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Megaphone, X, Plus, Pin } from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  category: string
  createdAt: string
  isPinned: boolean
}

export default function AnnouncementsPage() {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Hostel WiFi Maintenance - This Weekend',
      content: 'The WiFi network will be under maintenance on Saturday and Sunday. We apologize for any inconvenience.',
      author: 'Admin',
      category: 'Maintenance',
      createdAt: '2026-01-24',
      isPinned: true
    },
    {
      id: '2',
      title: 'Guest Policy Update',
      content: 'New guest policy has been implemented. Please review the updated rules in the hostel notice board.',
      author: 'Caretaker',
      category: 'Policy',
      createdAt: '2026-01-23',
      isPinned: true
    },
    {
      id: '3',
      title: 'Laundry Services Available',
      content: 'Complimentary laundry service is now available on Wednesdays and Sundays.',
      author: 'Admin',
      category: 'Services',
      createdAt: '2026-01-22',
      isPinned: false
    },
    {
      id: '4',
      title: 'Sports Tournament Registration',
      content: 'Annual inter-hostel sports tournament registration is now open. Teams of 6 members can participate.',
      author: 'Admin',
      category: 'Events',
      createdAt: '2026-01-21',
      isPinned: false
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAnnouncement: Announcement = {
      id: String(announcements.length + 1),
      title: formData.title,
      content: formData.content,
      author: user?.name || 'Unknown',
      category: formData.category,
      createdAt: new Date().toISOString().split('T')[0],
      isPinned: false
    }
    setAnnouncements([newAnnouncement, ...announcements])
    setFormData({ title: '', content: '', category: 'General' })
    setShowForm(false)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string, text: string, border: string }> = {
      Maintenance: { bg: 'rgba(242, 105, 24, 0.1)', text: '#f26918', border: 'rgba(242, 105, 24, 0.3)' },
      Policy: { bg: 'rgba(1, 75, 137, 0.1)', text: '#014b89', border: 'rgba(1, 75, 137, 0.3)' },
      Services: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' },
      Events: { bg: 'rgba(6, 182, 212, 0.1)', text: '#06b6d4', border: 'rgba(6, 182, 212, 0.3)' },
      General: { bg: 'rgba(107, 114, 128, 0.1)', text: '#6b7280', border: 'rgba(107, 114, 128, 0.3)' }
    }
    return colors[category] || colors.General
  }

  if (!user) return null

  const pinnedAnnouncements = announcements.filter((a) => a.isPinned)
  const regularAnnouncements = announcements.filter((a) => !a.isPinned)

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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
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

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-24 md:px-8 md:pt-12 md:pb-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2" style={{ color: '#014b89' }}>
              Announcements
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Stay updated with the latest hostel announcements and news
            </p>
          </div>
          {(user.role === 'caretaker' || user.role === 'admin') && (
            <Button
              onClick={() => setShowForm(!showForm)}
              className="text-white font-bold gap-2 w-full md:w-auto h-12 md:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
              style={{ background: '#f26918' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#d95a0f'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f26918'}
            >
              <Plus className="w-5 h-5" />
              Post Announcement
            </Button>
          )}
        </div>

        {/* Post Form */}
        {showForm && (user.role === 'caretaker' || user.role === 'admin') && (
          <div className="bg-white border-2 rounded-3xl p-6 md:p-8 mb-8 shadow-xl animate-fade-in" style={{ borderColor: 'rgba(242, 105, 24, 0.2)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#014b89' }}>Create New Announcement</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Announcement Title *</label>
                <Input
                  type="text"
                  placeholder="e.g., WiFi Maintenance Schedule"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-2 border-gray-200 focus:border-[#f26918] focus:ring-[#f26918] rounded-xl h-12"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f26918] focus:ring-[#f26918] bg-white text-gray-900 font-medium transition-all"
                >
                  <option>General</option>
                  <option>Maintenance</option>
                  <option>Policy</option>
                  <option>Services</option>
                  <option>Events</option>
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Content *</label>
                <textarea
                  placeholder="Write your announcement here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#f26918] focus:ring-[#f26918] resize-none font-medium"
                  rows={5}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  type="submit" 
                  className="text-white font-bold w-full sm:flex-1 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ background: '#f26918' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#d95a0f'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f26918'}
                >
                  Post Announcement
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="border-2 w-full sm:w-auto h-12 rounded-xl font-semibold"
                  style={{ borderColor: '#014b89', color: '#014b89' }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: '#014b89' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-pulse-slow" style={{ background: 'rgba(242, 105, 24, 0.15)' }}>
                <Pin className="w-5 h-5" style={{ color: '#f26918' }} />
              </div>
              Pinned Announcements
            </h2>
            <div className="space-y-4">
              {pinnedAnnouncements.map((announcement, index) => {
                const categoryColor = getCategoryColor(announcement.category)
                return (
                  <div
                    key={announcement.id}
                    className="bg-white border-2 rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{ 
                      borderColor: 'rgba(242, 105, 24, 0.3)',
                      background: 'linear-gradient(to right, rgba(242, 105, 24, 0.05), transparent)',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(242, 105, 24, 0.15)' }}>
                            <Megaphone className="w-5 h-5" style={{ color: '#f26918' }} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 flex-1">{announcement.title}</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-gray-100">
                      <span 
                        className="px-4 py-2 rounded-xl text-sm font-bold border-2"
                        style={{ 
                          background: categoryColor.bg, 
                          color: categoryColor.text,
                          borderColor: categoryColor.border
                        }}
                      >
                        {announcement.category}
                      </span>
                      <span className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-700 font-semibold border-2 border-gray-200">
                        👤 {announcement.author}
                      </span>
                      <span className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-700 font-semibold border-2 border-gray-200">
                        📅 {new Date(announcement.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Regular Announcements */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#014b89' }}>Recent Announcements</h2>
          <div className="space-y-4">
            {regularAnnouncements.length === 0 ? (
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-12 md:p-16 text-center shadow-lg">
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: 'rgba(1, 75, 137, 0.1)' }}
                >
                  <Megaphone className="w-10 h-10" style={{ color: '#014b89' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No announcements yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Check back later for important updates and news from the hostel management.
                </p>
              </div>
            ) : (
              regularAnnouncements.map((announcement, index) => {
                const categoryColor = getCategoryColor(announcement.category)
                return (
                  <div
                    key={announcement.id}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{announcement.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-gray-100">
                      <span 
                        className="px-4 py-2 rounded-xl text-sm font-bold border-2"
                        style={{ 
                          background: categoryColor.bg, 
                          color: categoryColor.text,
                          borderColor: categoryColor.border
                        }}
                      >
                        {announcement.category}
                      </span>
                      <span className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-700 font-semibold border-2 border-gray-200">
                        👤 {announcement.author}
                      </span>
                      <span className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-700 font-semibold border-2 border-gray-200">
                        📅 {new Date(announcement.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
