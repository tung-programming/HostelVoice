'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DiagnosticsPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
    console.log(message)
  }

  const testConnection = async () => {
    setLogs([])
    setIsLoading(true)
    
    try {
      addLog('Starting diagnostics...')
      
      // Check environment variables
      addLog(`Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
      addLog(`Has Anon Key: ${!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)
      
      // Test 1: Check auth session
      addLog('Test 1: Checking auth session...')
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        addLog(`❌ Session error: ${sessionError.message}`)
      } else if (session) {
        addLog(`✅ Session found for user: ${session.user.id}`)
        addLog(`   Email: ${session.user.email}`)
      } else {
        addLog('⚠️ No active session found')
      }
      
      // Test 2: Try to query users table
      if (session) {
        addLog('Test 2: Querying users table...')
        const startTime = Date.now()
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        const duration = Date.now() - startTime
        addLog(`Query completed in ${duration}ms`)
        
        if (error) {
          addLog(`❌ Query error:`)
          addLog(`   Code: ${error.code}`)
          addLog(`   Message: ${error.message}`)
          addLog(`   Details: ${error.details}`)
          addLog(`   Hint: ${error.hint}`)
        } else if (data) {
          addLog(`✅ User profile loaded:`)
          addLog(`   ID: ${data.id}`)
          addLog(`   Email: ${data.email}`)
          addLog(`   Role: ${data.role}`)
          addLog(`   Name: ${data.full_name}`)
          addLog(`   Approval Status: ${data.approval_status}`)
        } else {
          addLog('⚠️ No data returned')
        }
      }
      
      // Test 3: Check RLS policies
      addLog('Test 3: Testing RLS policies...')
      const { data: allUsers, error: rlsError } = await supabase
        .from('users')
        .select('count')
      
      if (rlsError) {
        addLog(`❌ RLS test error: ${rlsError.message}`)
      } else {
        addLog(`✅ RLS policies working (visible users count query succeeded)`)
      }
      
      // Test 4: Simple health check
      addLog('Test 4: Database health check...')
      const { data: health, error: healthError } = await supabase
        .from('users')
        .select('id')
        .limit(1)
      
      if (healthError) {
        addLog(`❌ Health check failed: ${healthError.message}`)
      } else {
        addLog(`✅ Database is accessible`)
      }
      
      addLog('Diagnostics complete!')
      
    } catch (error) {
      addLog(`❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      addLog(`   Type: ${error instanceof Error ? error.name : typeof error}`)
      if (error instanceof Error && error.stack) {
        addLog(`   Stack: ${error.stack.substring(0, 200)}...`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Diagnostics</CardTitle>
          <CardDescription>
            Testing database connection and configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={testConnection} 
              disabled={isLoading}
              className="mb-4"
            >
              {isLoading ? 'Running Tests...' : 'Run Tests Again'}
            </Button>
            
            <div className="bg-slate-950 text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">Click "Run Tests" to start diagnostics...</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
