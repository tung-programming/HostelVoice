'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/lib/auth-context'
import { announcementsApi, Announcement, ApiError } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Megaphone, X, Plus, Pin, Loader2, RefreshCw, Trash2, Edit2 } from 'lucide-react'
import { toast } from 'sonner'

export default function AnnouncementsPage() {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'normal'
  })

  // Fetch announcements
  const fetchAnnouncements = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await announcementsApi.getTargeted(1, 50)
      if (response.data) {
        setAnnouncements(response.data)
      }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to load announcements'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchAnnouncements()
  }, [fetchAnnouncements])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)

    try {
      if (editingId) {
        // Update existing
        const response = await announcementsApi.update(editingId, {
          title: formData.title,
          content: formData.content,
          category: formData.category,
          priority: formData.priority,
        })
        if (response.data) {
          setAnnouncements(prev => prev.map(a => a.id === editingId ? response.data! : a))
          toast.success('Announcement updated!')
        }
      } else {
        // Create new
        const response = await announcementsApi.create({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          priority: formData.priority,
          target_role: 'all',
        })
        if (response.data) {
          setAnnouncements(prev => [response.data!, ...prev])
          toast.success('Announcement posted!')
        }
      }
      setFormData({ title: '', content: '', category: 'general', priority: 'normal' })
      setShowForm(false)
      setEditingId(null)
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to save announcement'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return

    try {
      await announcementsApi.delete(id)
      setAnnouncements(prev => prev.filter(a => a.id !== id))
      toast.success('Announcement deleted!')
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to delete'
      toast.error(message)
    }
  }

  const handleEdit = (announcement: Announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category || 'general',
      priority: announcement.priority || 'normal',
    })
    setEditingId(announcement.id)
    setShowForm(true)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string, text: string, border: string }> = {
      maintenance: { bg: 'rgba(242, 105, 24, 0.1)', text: '#f26918', border: 'rgba(242, 105, 24, 0.3)' },
      policy: { bg: 'rgba(1, 75, 137, 0.1)', text: '#014b89', border: 'rgba(1, 75, 137, 0.3)' },
      services: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' },
      events: { bg: 'rgba(6, 182, 212, 0.1)', text: '#06b6d4', border: 'rgba(6, 182, 212, 0.3)' },
      general: { bg: 'rgba(107, 114, 128, 0.1)', text: '#6b7280', border: 'rgba(107, 114, 128, 0.3)' }
    }
    return colors[category?.toLowerCase()] || colors.general
  }

  if (!user) return null

  // Split into priority-based groups (high priority = "pinned" equivalent)
  const pinnedAnnouncements = announcements.filter((a) => a.priority === 'high' || a.is_pinned)
  const regularAnnouncements = announcements.filter((a) => a.priority !== 'high' && !a.is_pinned)

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
          <div className="flex gap-3">
            <Button
              onClick={fetchAnnouncements}
              variant="outline"
              className="gap-2 h-12 rounded-xl font-semibold border-2"
              style={{ borderColor: '#014b89', color: '#014b89' }}
              disabled={isLoading}
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            {(user.role === 'caretaker' || user.role === 'admin') && (
              <Button
                onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', content: '', category: 'general', priority: 'normal' }); }}
                className="text-white font-bold gap-2 w-full md:w-auto h-12 md:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
                style={{ background: '#f26918' }}
              >
                <Plus className="w-5 h-5" />
                Post Announcement
              </Button>
            )}
          </div>
        </div>

        {/* Post Form */}
        {showForm && (user.role === 'caretaker' || user.role === 'admin') && (
          <div className="bg-white border-2 rounded-3xl p-6 md:p-8 mb-8 shadow-xl animate-fade-in" style={{ borderColor: 'rgba(242, 105, 24, 0.2)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#014b89' }}>
                {editingId ? 'Edit Announcement' : 'Create New Announcement'}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
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

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-gray-900 mb-2 block">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f26918] focus:ring-[#f26918] bg-white text-gray-900 font-medium transition-all"
                  >
                    <option value="general">General</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="policy">Policy</option>
                    <option value="services">Services</option>
                    <option value="events">Events</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-900 mb-2 block">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f26918] focus:ring-[#f26918] bg-white text-gray-900 font-medium transition-all"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High (Pinned)</option>
                  </select>
                </div>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingId ? 'Update Announcement' : 'Post Announcement')}
                </Button>
                <Button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); }}
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin mb-4" style={{ color: '#014b89' }} />
            <p className="text-gray-600 font-medium">Loading announcements...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center mb-8">
            <Megaphone className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-700 mb-2">Failed to Load Announcements</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchAnnouncements} className="bg-red-600 hover:bg-red-700 text-white">
              Try Again
            </Button>
          </div>
        )}

        {/* Pinned Announcements */}
        {!isLoading && !error && pinnedAnnouncements.length > 0 && (
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
                        className="px-4 py-2 rounded-xl text-sm font-bold border-2 capitalize"
                        style={{ 
                          background: categoryColor.bg, 
                          color: categoryColor.text,
                          borderColor: categoryColor.border
                        }}
                      >
                        {announcement.category}
                      </span>
                      {announcement.creator && (
                        <span className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-700 font-semibold border-2 border-gray-200">
                          👤 {announcement.creator.full_name || 'Staff'}
                        </span>
                      )}
                      <span className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-700 font-semibold border-2 border-gray-200">
                        📅 {new Date(announcement.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      {(user.role === 'caretaker' || user.role === 'admin') && (
                        <div className="flex gap-2 ml-auto">
                          <button
                            onClick={() => handleEdit(announcement)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(announcement.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Regular Announcements */}
        {!isLoading && !error && (
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
                        className="px-4 py-2 rounded-xl text-sm font-bold border-2 capitalize"
                        style={{ 
                          background: categoryColor.bg, 
                          color: categoryColor.text,
                          borderColor: categoryColor.border
                        }}
                      >
                        {announcement.category}
                      </span>
                      {announcement.creator && (
                        <span className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-700 font-semibold border-2 border-gray-200">
                          👤 {announcement.creator.full_name || 'Staff'}
                        </span>
                      )}
                      <span className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-700 font-semibold border-2 border-gray-200">
                        📅 {new Date(announcement.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      {(user.role === 'caretaker' || user.role === 'admin') && (
                        <div className="flex gap-2 ml-auto">
                          <button
                            onClick={() => handleEdit(announcement)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(announcement.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
