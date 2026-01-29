# Connection Timeout Troubleshooting Guide

## Issue
Users experiencing "Query timeout" errors when trying to load user profiles from Supabase.

## Recent Changes (January 29, 2026)

### 1. Removed Artificial Timeouts
- Removed the 5-second and 15-second timeout constraints
- Let Supabase SDK handle its own connection timeouts naturally
- This prevents premature query cancellation

### 2. Improved Error Handling
- Added comprehensive error logging with all error details
- Added automatic retry logic (3 attempts) for network/connection errors
- Better error categorization (network vs database vs RLS errors)

### 3. Added Diagnostics
- Created `/diagnostics` page to test Supabase connection
- Logs environment variables, session status, query performance, and RLS policies
- Visit `http://localhost:3000/diagnostics` to run tests

## How to Debug

### Step 1: Access the Diagnostics Page
1. Navigate to `http://localhost:3000/diagnostics` in your browser
2. Review the test results in the console-style output
3. Look for specific error codes and messages

### Step 2: Check Common Issues

#### Issue A: Missing Environment Variables
**Symptoms:** "Missing Supabase environment variables" in logs

**Solution:**
- Verify `.env.local` file exists in project root
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart Next.js dev server after changing env variables

#### Issue B: Network/Connection Errors
**Symptoms:** 
- "Failed to fetch" errors
- "AbortError" in logs
- Very long query times (>10 seconds)

**Solutions:**
1. Check your internet connection
2. Verify Supabase project is active at https://supabase.com/dashboard
3. Check if your IP is blocked or if there are network firewall rules
4. Try accessing Supabase URL directly in browser: `https://your-project.supabase.co`

#### Issue C: RLS Policy Errors
**Symptoms:**
- Error code: `PGRST116` (not found)
- Error code: `42501` (insufficient privileges)
- Query succeeds but returns no data

**Solutions:**
1. Check RLS policies in Supabase Dashboard → Database → Policies
2. Verify `users` table has policy: "Users can view own profile"
3. Policy should use: `auth.uid() = id`
4. Temporarily disable RLS to test (NOT for production):
   ```sql
   ALTER TABLE users DISABLE ROW LEVEL SECURITY;
   ```

#### Issue D: Missing Users Table Data
**Symptoms:** User authenticated but profile not found

**Solutions:**
1. Check if user exists in `users` table in Supabase Dashboard
2. Verify the trigger to auto-create user profiles is working:
   ```sql
   CREATE OR REPLACE FUNCTION public.handle_new_user()
   RETURNS trigger AS $$
   BEGIN
     INSERT INTO public.users (id, email)
     VALUES (new.id, new.email);
     RETURN new;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;
   ```

### Step 3: Manual Database Check

Run this in Supabase SQL Editor:
```sql
-- Check if users table exists
SELECT * FROM information_schema.tables WHERE table_name = 'users';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'users';

-- Check your user data (replace with your user ID)
SELECT * FROM users WHERE id = 'your-user-id-here';
```

## Testing the Fix

1. Clear browser cache and local storage
2. Sign out and sign back in
3. Check browser console for detailed logs
4. Visit `/diagnostics` page to verify connection

## Monitoring

The improved error handling now logs:
- Query duration in milliseconds
- All error details (code, message, hint, details)
- Retry attempts
- Connection validation results

Check browser console for these logs when debugging.

## Still Having Issues?

If problems persist:
1. Export all console logs from the diagnostics page
2. Check Supabase Dashboard → Logs → API Logs for server-side errors
3. Verify Supabase project status and quota limits
4. Check Network tab in browser DevTools for failed requests
5. Try creating a new Supabase client or project to isolate the issue
