'use client'

import React from "react"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X, Plus, CheckCircle, Clock, MapPin } from 'lucide-react'

interface LostFoundItem {
  id: string
  title: string
  description: string
  category: string
  type: 'lost' | 'found'
  status: 'open' | 'claimed'
  postedBy: string
  createdAt: string
  location?: string
}

export default function LostFoundPage() {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [items, setItems] = useState<LostFoundItem[]>([
    {
      id: '1',
      title: 'Black Leather Wallet',
      description: 'Black leather wallet with ID cards inside. Contains important documents.',
      category: 'Wallet',
      type: 'lost',
      status: 'open',
      postedBy: 'Arjun Singh',
      createdAt: '2026-01-24',
      location: 'Room A-203'
    },
    {
      id: '2',
      title: 'Apple AirPods Pro',
      description: 'Found near the common area. Black color with charging case.',
      category: 'Electronics',
      type: 'found',
      status: 'open',
      postedBy: 'Staff',
      createdAt: '2026-01-23',
      location: 'Common Hall'
    },
    {
      id: '3',
      title: 'Blue Backpack',
      description: 'Blue backpack with college logo. Left near the entrance.',
      category: 'Bags',
      type: 'found',
      status: 'claimed',
      postedBy: 'Staff',
      createdAt: '2026-01-22',
      location: 'Main Entrance'
    },
    {
      id: '4',
      title: 'House Keys',
      description: 'Set of 3 house keys lost somewhere in the hostel premises.',
      category: 'Keys',
      type: 'lost',
      status: 'open',
      postedBy: 'John Doe',
      createdAt: '2026-01-21',
      location: 'Hostel premises'
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    type: 'lost' as 'lost' | 'found',
    location: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem: LostFoundItem = {
      id: String(items.length + 1),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      type: formData.type,
      status: 'open',
      postedBy: user?.name || 'Anonymous',
      createdAt: new Date().toISOString().split('T')[0],
      location: formData.location
    }
    setItems([newItem, ...items])
    setFormData({ title: '', description: '', category: 'Other', type: 'lost', location: '' })
    setShowForm(false)
  }

  const filteredItems = items.filter((item) => {
    const matchesType = filter === 'all' || item.type === filter
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Wallet: '👛',
      Electronics: '📱',
      Bags: '🎒',
      Keys: '🔑',
      Documents: '📄',
      Clothing: '👕',
      Other: '📦'
    }
    return icons[category] || '📦'
  }

  const getTypeColor = (type: 'lost' | 'found') => {
    return type === 'lost' 
      ? { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' }
      : { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' }
  }

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

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-24 md:px-8 md:pt-12 md:pb-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2" style={{ color: '#014b89' }}>
              Lost & Found
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Help community members find their lost items or claim found items
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="text-white font-bold gap-2 w-full md:w-auto h-12 md:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
            style={{ background: '#014b89' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#012d52'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#014b89'}
          >
            <Plus className="w-5 h-5" />
            Report Item
          </Button>
        </div>

        {/* Report Form */}
        {showForm && (
          <div className="bg-white border-2 rounded-3xl p-6 md:p-8 mb-8 shadow-xl animate-fade-in" style={{ borderColor: 'rgba(1, 75, 137, 0.2)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#014b89' }}>Report a Lost or Found Item</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-3 block">Item Type *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'lost' })}
                    className="py-4 px-4 rounded-xl text-sm font-bold transition-all border-2"
                    style={{
                      background: formData.type === 'lost' ? 'rgba(239, 68, 68, 0.1)' : '#f9fafb',
                      color: formData.type === 'lost' ? '#ef4444' : '#6b7280',
                      borderColor: formData.type === 'lost' ? 'rgba(239, 68, 68, 0.3)' : '#e5e7eb'
                    }}
                  >
                    ❌ Lost Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'found' })}
                    className="py-4 px-4 rounded-xl text-sm font-bold transition-all border-2"
                    style={{
                      background: formData.type === 'found' ? 'rgba(16, 185, 129, 0.1)' : '#f9fafb',
                      color: formData.type === 'found' ? '#10b981' : '#6b7280',
                      borderColor: formData.type === 'found' ? 'rgba(16, 185, 129, 0.3)' : '#e5e7eb'
                    }}
                  >
                    ✅ Found Item
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Item Title *</label>
                <Input
                  type="text"
                  placeholder="e.g., Black Leather Wallet"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-2 border-gray-200 focus:border-[#014b89] focus:ring-[#014b89] rounded-xl h-12"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#014b89] focus:ring-[#014b89] bg-white text-gray-900 font-medium transition-all"
                >
                  <option>Wallet</option>
                  <option>Electronics</option>
                  <option>Bags</option>
                  <option>Keys</option>
                  <option>Documents</option>
                  <option>Clothing</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Location</label>
                <Input
                  type="text"
                  placeholder="Where was it lost/found?"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="border-2 border-gray-200 focus:border-[#014b89] focus:ring-[#014b89] rounded-xl h-12"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Description *</label>
                <textarea
                  placeholder="Describe the item in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#014b89] focus:ring-[#014b89] resize-none font-medium"
                  rows={4}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  type="submit" 
                  className="text-white font-bold w-full sm:flex-1 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ background: '#014b89' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#012d52'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#014b89'}
                >
                  Report Item
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

        {/* Search and Filter */}
        <div className="space-y-4 mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 border-2 border-gray-200 focus:border-[#014b89] focus:ring-[#014b89] rounded-xl h-12"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 flex-wrap">
            {(['all', 'lost', 'found'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className="px-6 py-3 rounded-xl text-sm font-bold transition-all border-2"
                style={{
                  background: filter === type ? '#014b89' : '#f9fafb',
                  color: filter === type ? 'white' : '#6b7280',
                  borderColor: filter === type ? '#014b89' : '#e5e7eb'
                }}
              >
                {type === 'all' ? 'All Items' : type === 'lost' ? '❌ Lost' : '✅ Found'}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full bg-white border-2 border-gray-200 rounded-3xl p-12 md:p-16 text-center shadow-lg">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: 'rgba(1, 75, 137, 0.1)' }}
              >
                <Search className="w-10 h-10" style={{ color: '#014b89' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No items found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                No items match your search criteria. Try adjusting your filters or report a new item.
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="text-white font-bold gap-2 h-12 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                style={{ background: '#014b89' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#012d52'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#014b89'}
              >
                <Plus className="w-5 h-5" />
                Report an Item
              </Button>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const typeColor = getTypeColor(item.type)
              return (
                <div
                  key={item.id}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{getCategoryIcon(item.category)}</span>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span 
                      className="px-4 py-2 rounded-xl text-sm font-bold border-2"
                      style={{ 
                        background: typeColor.bg, 
                        color: typeColor.text,
                        borderColor: typeColor.border
                      }}
                    >
                      {item.type === 'lost' ? '❌ Lost' : '✅ Found'}
                    </span>
                    <span className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-700 font-semibold border-2 border-gray-200">
                      {item.category}
                    </span>
                  </div>

                  {/* Location and Date */}
                  <div className="text-sm text-gray-600 border-t-2 border-gray-100 pt-4 pb-4 space-y-2">
                    {item.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: '#f26918' }} />
                        <span className="font-medium">{item.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mb-4">
                    {item.status === 'claimed' ? (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                        <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
                        <span className="text-sm font-bold" style={{ color: '#10b981' }}>Claimed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2" style={{ background: 'rgba(242, 105, 24, 0.1)', borderColor: 'rgba(242, 105, 24, 0.3)' }}>
                        <span className="text-sm font-bold" style={{ color: '#f26918' }}>Available</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    disabled={item.status === 'claimed'}
                    className="w-full text-white font-bold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                    style={{ background: item.status === 'claimed' ? '#9ca3af' : '#014b89' }}
                    onMouseEnter={(e) => item.status !== 'claimed' && (e.currentTarget.style.background = '#012d52')}
                    onMouseLeave={(e) => item.status !== 'claimed' && (e.currentTarget.style.background = '#014b89')}
                  >
                    {item.type === 'lost' ? 'I Found It' : 'This Is Mine'}
                  </Button>

                  {/* Posted By */}
                  <div className="text-xs text-gray-500 text-center font-medium">
                    Posted by: <span className="font-bold text-gray-700">{item.postedBy}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
