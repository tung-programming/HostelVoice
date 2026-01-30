# Auth Reload Fix - Production Documentation

## Problem

On page reload with an active session, the app entered an infinite loading state. The bug was a **Heisenbug**: opening DevTools "fixed" it because it changed JavaScript execution timing.

**Symptoms:**

- DevTools closed → infinite loading on reload
- DevTools open → works correctly
- No errors in console, just missing "Auth initialization complete" log

**Impact:** Users could not return to the app after closing/reopening the browser.

---

## Root Cause

The infinite loading was caused by a **timing-dependent race condition** between two async paths.

### Why It Happened

When a user reloaded the page with an active Supabase session:

1. **Flow 1: initAuth()**
   - `useEffect` called `initAuth()` which called `getSession()`
   - Session found → called `loadUserProfile()`

2. **Flow 2: onAuthStateChange('SIGNED_IN')**
   - Supabase fires this event on reload (echoing restored session)
   - Also called `loadUserProfile()`

3. **The Race**
   - Both paths called `loadUserProfile()` simultaneously
   - A module-level `isLoadingProfile` flag caused one path to skip loading entirely
   - Depending on which path won, `isLoading` might never resolve

4. **Why DevTools "Fixed" It**
   - DevTools slows JavaScript execution
   - This changed promise scheduling order
   - `initAuth()` would "win" the race and complete normally
   - Without DevTools, `onAuthStateChange` often fired first, causing the deadlock

### Why Previous Attempts Failed

Guards were added using refs to prevent duplicate loading:

```typescript
if (isLoadingProfile) return; // ← One path skips entirely
```

This made the problem worse. If `onAuthStateChange` set the flag first, `initAuth()` would skip the profile load but still reach its `finally` block - setting `isLoading = false` before the profile was loaded.

---

## Solution

### Architecture

The fix ensures **deterministic single-path initialization**:

1. `initAuth()` handles ALL reload logic inline (no external functions)
2. `onAuthStateChange` is **completely ignored** during initialization
3. A ref tracks when init is complete, then allows event listener to work

```typescript
const initCompleteRef = useRef(false);

useEffect(() => {
  const initAuth = async () => {
    try {
      const session = await getSession();
      if (session) {
        // Load profile INLINE - no external function
        const profile = await loadFromDB(session.user.id);
        if (profile) setUser(profile);
      }
    } finally {
      // GUARANTEED to run
      initCompleteRef.current = true;
      setIsLoading(false);
    }
  };

  initAuth();

  // Event listener ignores events until init is complete
  onAuthStateChange((event, session) => {
    if (!initCompleteRef.current) return; // Ignore during init

    if (event === "SIGNED_IN") {
      /* handle new login */
    }
    if (event === "SIGNED_OUT") {
      setUser(null);
    }
  });
}, []);
```

### Key Changes

**File: `lib/auth-context.tsx`**

1. **Removed module-level flags**
   - Deleted `let isLoadingProfile = false`
   - No shared state between init and event listener

2. **Added init-complete ref**
   - `initCompleteRef` tracks when initialization is done
   - `onAuthStateChange` ignores ALL events until `initCompleteRef.current === true`
   - This prevents the race entirely

3. **Inline profile loading**
   - Profile loading happens directly inside `initAuth()`
   - No external `loadUserProfile()` function that could be called from multiple places
   - Single code path, single completion point

4. **Guaranteed `finally` execution**
   - No early returns before `finally`
   - `setIsLoading(false)` runs regardless of outcome
   - Duration: typically <2 seconds after reload

**File: `app/dashboard/layout.tsx`**

- 10-second safety timeout (redirects to login if auth doesn't complete)
- Only needed as a failsafe, not for normal operation

**File: `app/login/page.tsx`**

- Always shows login form
- No auto-redirect based on session alone
- Role selection is mandatory for every login

---

## Invariant

**Auth must always resolve to one of two states:**

1. **Success:** `isLoading = false` AND `user` is set
   - Session restored, profile loaded, user can access dashboard

2. **Failure:** `isLoading = false` AND `user = null`
   - Session cleared or profile failed to load, user redirected to login

The app NEVER remains in `isLoading = true`. This guarantee is enforced by the `finally` block in `initAuth()`.

---

## Verification

### Test: Page Reload (CRITICAL)

1. Login successfully
2. **Close DevTools completely**
3. Hard reload (Ctrl+Shift+R)
4. **Expected:** Dashboard loads within 1-2 seconds
5. **Console should show:** `[AuthProvider] Auth initialization complete`
6. **NOT allowed:** Infinite spinner, timeout redirect

### Test: DevTools Open vs Closed

- Behavior must be **identical** with DevTools open or closed
- If it only works with DevTools open, the race condition is still present

### Test: All Three Roles

- Reload works identically for Student, Caretaker, and Admin roles

---

## For Future Maintainers

1. **Never let `onAuthStateChange` compete with initialization**
   - Use a ref to gate the event listener until init is complete
   - Supabase fires `SIGNED_IN` on reload - this is not a new login

2. **Never use shared flags between async paths**
   - Module-level `isLoadingProfile` caused the original race
   - Each path must be self-contained

3. **Always guarantee state resolution**
   - Every async flow must have a `finally` block
   - `isLoading` must become `false` no matter what

4. **Test without DevTools**
   - Heisenbugs hide when you observe them
   - Always verify behavior with DevTools fully closed

---

_Last Updated: January 30, 2026_  
_Status: Production Ready_
