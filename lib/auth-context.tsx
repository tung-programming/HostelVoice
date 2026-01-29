'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export type UserRole = 'student' | 'caretaker' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  hostelName: string
  roomNumber?: string
  studentId?: string
  caretakerId?: string
  adminId?: string
  phoneNumber?: string
  department?: string
  approvalStatus?: 'pending' | 'approved' | 'rejected'
  rejectionReason?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

export interface RegisterData {
  email: string
  password: string
  fullName: string
  role: UserRole
  phoneNumber: string
  hostel?: string
  roomNumber?: string
  studentId?: string
  caretakerId?: string
  adminId?: string
  department?: string
  university?: string
  position?: string
  experience?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  // Initialize auth from Supabase
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          await loadUserProfile(session.user)
        }
      } catch (error) {
        console.error('Error loading session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadUserProfile = async (authUser: SupabaseUser, retryCount = 0) => {
    try {
      console.log('loadUserProfile called for:', authUser.id, 'retry:', retryCount)
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Has Anon Key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      
      // Validate Supabase connection
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error('Missing Supabase environment variables')
        return
      }
      
      // Query without artificial timeout - let Supabase handle its own timeouts
      const startTime = Date.now()
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()
      
      const queryDuration = Date.now() - startTime
      console.log(`Profile query completed in ${queryDuration}ms:`, { profile, error })

      if (error) {
        // Log all error details for debugging
        console.error('Error loading user profile:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          statusCode: error.statusCode,
          fullError: JSON.stringify(error)
        })
        
        // Check if it's a network/connection error and retry
        const isNetworkError = !error.code || error.message?.includes('fetch') || error.message?.includes('network')
        if (isNetworkError && retryCount < 2) {
          console.log(`Network error detected, retrying (attempt ${retryCount + 2}/3)...`)
          await new Promise(resolve => setTimeout(resolve, 2000))
          return loadUserProfile(authUser, retryCount + 1)
        }
        
        // If error is PGRST116 (not found) or after retries, continue without user
        return
      }

      if (profile) {
        const userData = {
          id: profile.id,
          email: profile.email,
          name: profile.full_name,
          role: profile.role,
          hostelName: profile.hostel_name || 'N/A',
          roomNumber: profile.room_number,
          studentId: profile.student_id,
          caretakerId: profile.caretaker_id,
          adminId: profile.admin_id,
          phoneNumber: profile.phone_number,
          department: profile.department,
          approvalStatus: profile.approval_status,
          rejectionReason: profile.rejection_reason,
        }
        console.log('Setting user state:', userData)
        setUser(userData)
      }
    } catch (error) {
      console.error('Unexpected error in loadUserProfile:', error)
      
      // Check if it's a fetch/network error and retry
      const isAbortError = error instanceof Error && (error.name === 'AbortError' || error.message.includes('aborted'))
      const isFetchError = error instanceof Error && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))
      
      if ((isAbortError || isFetchError) && retryCount < 2) {
        console.log(`Connection error detected (${error instanceof Error ? error.message : 'unknown'}), retrying (attempt ${retryCount + 2}/3)...`)
        await new Promise(resolve => setTimeout(resolve, 2000))
        return loadUserProfile(authUser, retryCount + 1)
      }
      
      // Log final failure with helpful message
      console.error('Failed to load user profile:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : typeof error,
        retries: retryCount,
        suggestion: 'Check Supabase connection, RLS policies, and network connectivity'
      })
    }
  }

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      console.log('Login attempt:', { email, role })
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      console.log('Auth successful, user ID:', data.user.id)

      // Verify role and approval status
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('role, approval_status, rejection_reason')
        .eq('id', data.user.id)
        .single()

      console.log('Profile query result:', { profile, profileError })

      if (profileError) {
        console.error('Profile error details:', {
          error: profileError,
          message: profileError.message,
          code: profileError.code,
          details: profileError.details,
          hint: profileError.hint,
          stringified: JSON.stringify(profileError)
        })
        await supabase.auth.signOut()
        throw new Error('Unable to load user profile. Please ensure the database tables are set up correctly.')
      }

      if (!profile) {
        await supabase.auth.signOut()
        throw new Error('User profile not found. Please contact support.')
      }

      console.log('Profile loaded successfully:', profile)

      if (profile.role !== role) {
        await supabase.auth.signOut()
        throw new Error(`This account is not registered as a ${role}. Please select the correct role.`)
      }

      // Check approval status (admins are auto-approved)
      if (profile.role !== 'admin' && profile.approval_status === 'pending') {
        await supabase.auth.signOut()
        throw new Error('Your account is pending admin approval. Please wait for approval before logging in.')
      }

      if (profile.approval_status === 'rejected') {
        await supabase.auth.signOut()
        const reason = profile.rejection_reason ? `\n\nReason: ${profile.rejection_reason}` : ''
        throw new Error(`Your account registration was declined.${reason}\n\nPlease contact administration for more details.`)
      }

      // Fetch full profile with name
      const { data: fullProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()

      // Set user from full profile
      setUser({
        id: data.user.id,
        email: fullProfile?.email || data.user.email || '',
        name: fullProfile?.full_name || 'User',
        role: profile.role,
        hostelName: fullProfile?.hostel_name || 'N/A',
        roomNumber: fullProfile?.room_number,
        studentId: fullProfile?.student_id,
        phoneNumber: fullProfile?.phone_number,
        department: fullProfile?.department,
        approvalStatus: profile.approval_status,
      })

      console.log('User state set, login complete')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Registration failed')

      // Create user profile with approval status
      // Admins are auto-approved, students and caretakers need approval
      const approvalStatus = userData.role === 'admin' ? 'approved' : 'pending'
      
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: userData.email,
          full_name: userData.fullName,
          role: userData.role,
          phone_number: userData.phoneNumber,
          hostel_name: userData.hostel,
          room_number: userData.roomNumber,
          student_id: userData.studentId,
          caretaker_id: userData.caretakerId,
          admin_id: userData.adminId,
          department: userData.department,
          university: userData.university,
          position: userData.position,
          experience: userData.experience,
          approval_status: approvalStatus,
        })

      if (profileError) {
        console.error('Profile insert error details:', {
          error: profileError,
          message: profileError.message,
          code: profileError.code,
          details: profileError.details,
          hint: profileError.hint
        })
        // Clean up auth user if profile creation fails
        await supabase.auth.signOut()
        throw new Error(`Failed to create user profile: ${profileError.message || 'Unknown error'}`)
      }

      // Only load profile for admins (auto-approved)
      // Students and caretakers will be in pending state
      if (userData.role === 'admin') {
        // Small delay to ensure trigger has executed
        await new Promise(resolve => setTimeout(resolve, 500))
        await loadUserProfile(authData.user)
      } else {
        // Log out the user since they need approval
        await supabase.auth.signOut()
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
