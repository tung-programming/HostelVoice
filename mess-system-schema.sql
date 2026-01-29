-- ============================================
-- MESS MANAGEMENT SYSTEM - DATABASE SCHEMA
-- ============================================
-- Run this in Supabase SQL Editor
-- Prerequisites: users table must exist with id, role, hostel_name
-- ============================================

-- ============================================
-- 1. WEEKLY MENUS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS mess_weekly_menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hostel_name TEXT NOT NULL,
    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,
    menu_image_url TEXT,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure only one menu per hostel per week
    CONSTRAINT unique_hostel_week UNIQUE (hostel_name, week_start_date),
    -- Ensure week_end_date is 6 days after week_start_date
    CONSTRAINT valid_week_range CHECK (week_end_date = week_start_date + INTERVAL '6 days')
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_mess_weekly_menus_hostel ON mess_weekly_menus(hostel_name);
CREATE INDEX IF NOT EXISTS idx_mess_weekly_menus_week ON mess_weekly_menus(week_start_date);
CREATE INDEX IF NOT EXISTS idx_mess_weekly_menus_hostel_week ON mess_weekly_menus(hostel_name, week_start_date DESC);

-- ============================================
-- 2. DAILY MEALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS mess_daily_meals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    weekly_menu_id UUID NOT NULL REFERENCES mess_weekly_menus(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')),
    items TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Each day can only have one entry per meal type
    CONSTRAINT unique_day_meal UNIQUE (weekly_menu_id, date, meal_type)
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_mess_daily_meals_menu ON mess_daily_meals(weekly_menu_id);
CREATE INDEX IF NOT EXISTS idx_mess_daily_meals_date ON mess_daily_meals(date);
CREATE INDEX IF NOT EXISTS idx_mess_daily_meals_date_meal ON mess_daily_meals(date, meal_type);

-- ============================================
-- 3. FEEDBACK TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS mess_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hostel_name TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')),
    overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    taste_rating INTEGER CHECK (taste_rating BETWEEN 1 AND 5),
    quantity_rating INTEGER CHECK (quantity_rating BETWEEN 1 AND 5),
    quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
    cleanliness_rating INTEGER CHECK (cleanliness_rating BETWEEN 1 AND 5),
    comments TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed')),
    caretaker_reply TEXT,
    replied_by UUID REFERENCES users(id),
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_mess_feedback_hostel ON mess_feedback(hostel_name);
CREATE INDEX IF NOT EXISTS idx_mess_feedback_student ON mess_feedback(student_id);
CREATE INDEX IF NOT EXISTS idx_mess_feedback_date ON mess_feedback(date DESC);
CREATE INDEX IF NOT EXISTS idx_mess_feedback_status ON mess_feedback(status);
CREATE INDEX IF NOT EXISTS idx_mess_feedback_rating ON mess_feedback(overall_rating);
CREATE INDEX IF NOT EXISTS idx_mess_feedback_hostel_date ON mess_feedback(hostel_name, date DESC);

-- ============================================
-- 4. FEEDBACK PHOTOS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS mess_feedback_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feedback_id UUID NOT NULL REFERENCES mess_feedback(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient querying
CREATE INDEX IF NOT EXISTS idx_mess_feedback_photos_feedback ON mess_feedback_photos(feedback_id);

-- ============================================
-- 5. UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
DROP TRIGGER IF EXISTS update_mess_weekly_menus_updated_at ON mess_weekly_menus;
CREATE TRIGGER update_mess_weekly_menus_updated_at
    BEFORE UPDATE ON mess_weekly_menus
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_mess_daily_meals_updated_at ON mess_daily_meals;
CREATE TRIGGER update_mess_daily_meals_updated_at
    BEFORE UPDATE ON mess_daily_meals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE mess_weekly_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE mess_daily_meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE mess_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE mess_feedback_photos ENABLE ROW LEVEL SECURITY;

-- ============================================
-- WEEKLY MENUS POLICIES
-- ============================================

-- Students: Can view menus from their hostel
DROP POLICY IF EXISTS "Students can view their hostel menus" ON mess_weekly_menus;
CREATE POLICY "Students can view their hostel menus" ON mess_weekly_menus
    FOR SELECT
    TO authenticated
    USING (
        hostel_name = (SELECT hostel_name FROM users WHERE id = auth.uid())
    );

-- Caretakers: Can manage menus for their hostel
DROP POLICY IF EXISTS "Caretakers can manage their hostel menus" ON mess_weekly_menus;
CREATE POLICY "Caretakers can manage their hostel menus" ON mess_weekly_menus
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'caretaker' 
            AND hostel_name = mess_weekly_menus.hostel_name
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'caretaker' 
            AND hostel_name = mess_weekly_menus.hostel_name
        )
    );

-- Admins: Can view all menus
DROP POLICY IF EXISTS "Admins can view all menus" ON mess_weekly_menus;
CREATE POLICY "Admins can view all menus" ON mess_weekly_menus
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- DAILY MEALS POLICIES
-- ============================================

-- Students: Can view meals from their hostel's menus
DROP POLICY IF EXISTS "Students can view their hostel meals" ON mess_daily_meals;
CREATE POLICY "Students can view their hostel meals" ON mess_daily_meals
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM mess_weekly_menus m
            JOIN users u ON u.hostel_name = m.hostel_name
            WHERE m.id = mess_daily_meals.weekly_menu_id
            AND u.id = auth.uid()
        )
    );

-- Caretakers: Can manage meals for their hostel's menus
DROP POLICY IF EXISTS "Caretakers can manage their hostel meals" ON mess_daily_meals;
CREATE POLICY "Caretakers can manage their hostel meals" ON mess_daily_meals
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM mess_weekly_menus m
            JOIN users u ON u.hostel_name = m.hostel_name
            WHERE m.id = mess_daily_meals.weekly_menu_id
            AND u.id = auth.uid()
            AND u.role = 'caretaker'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM mess_weekly_menus m
            JOIN users u ON u.hostel_name = m.hostel_name
            WHERE m.id = mess_daily_meals.weekly_menu_id
            AND u.id = auth.uid()
            AND u.role = 'caretaker'
        )
    );

-- Admins: Can view all meals
DROP POLICY IF EXISTS "Admins can view all meals" ON mess_daily_meals;
CREATE POLICY "Admins can view all meals" ON mess_daily_meals
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- FEEDBACK POLICIES
-- ============================================

-- Students: Can insert their own feedback
DROP POLICY IF EXISTS "Students can submit feedback" ON mess_feedback;
CREATE POLICY "Students can submit feedback" ON mess_feedback
    FOR INSERT
    TO authenticated
    WITH CHECK (
        student_id = auth.uid()
        AND EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'student'
            AND hostel_name = mess_feedback.hostel_name
        )
    );

-- Students: Can view their own feedback
DROP POLICY IF EXISTS "Students can view their own feedback" ON mess_feedback;
CREATE POLICY "Students can view their own feedback" ON mess_feedback
    FOR SELECT
    TO authenticated
    USING (
        student_id = auth.uid()
    );

-- Caretakers: Can view all feedback from their hostel
DROP POLICY IF EXISTS "Caretakers can view hostel feedback" ON mess_feedback;
CREATE POLICY "Caretakers can view hostel feedback" ON mess_feedback
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'caretaker' 
            AND hostel_name = mess_feedback.hostel_name
        )
    );

-- Caretakers: Can update feedback status and reply
DROP POLICY IF EXISTS "Caretakers can update feedback" ON mess_feedback;
CREATE POLICY "Caretakers can update feedback" ON mess_feedback
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'caretaker' 
            AND hostel_name = mess_feedback.hostel_name
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'caretaker' 
            AND hostel_name = mess_feedback.hostel_name
        )
    );

-- Admins: Can view all feedback
DROP POLICY IF EXISTS "Admins can view all feedback" ON mess_feedback;
CREATE POLICY "Admins can view all feedback" ON mess_feedback
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- FEEDBACK PHOTOS POLICIES
-- ============================================

-- Students: Can insert photos for their own feedback
DROP POLICY IF EXISTS "Students can upload feedback photos" ON mess_feedback_photos;
CREATE POLICY "Students can upload feedback photos" ON mess_feedback_photos
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM mess_feedback f
            WHERE f.id = mess_feedback_photos.feedback_id
            AND f.student_id = auth.uid()
        )
    );

-- Students: Can view photos from their own feedback
DROP POLICY IF EXISTS "Students can view their feedback photos" ON mess_feedback_photos;
CREATE POLICY "Students can view their feedback photos" ON mess_feedback_photos
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM mess_feedback f
            WHERE f.id = mess_feedback_photos.feedback_id
            AND f.student_id = auth.uid()
        )
    );

-- Caretakers: Can view photos from their hostel's feedback
DROP POLICY IF EXISTS "Caretakers can view hostel feedback photos" ON mess_feedback_photos;
CREATE POLICY "Caretakers can view hostel feedback photos" ON mess_feedback_photos
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM mess_feedback f
            JOIN users u ON u.hostel_name = f.hostel_name
            WHERE f.id = mess_feedback_photos.feedback_id
            AND u.id = auth.uid()
            AND u.role = 'caretaker'
        )
    );

-- Admins: Can view all photos
DROP POLICY IF EXISTS "Admins can view all feedback photos" ON mess_feedback_photos;
CREATE POLICY "Admins can view all feedback photos" ON mess_feedback_photos
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- 7. STORAGE BUCKETS (Run in Supabase Dashboard)
-- ============================================
-- Note: Storage bucket creation requires Supabase Dashboard or API
-- Run these commands in Supabase SQL Editor after creating buckets manually

-- Create buckets via Supabase Dashboard:
-- 1. mess-menus (public read, authenticated upload for caretakers)
-- 2. mess-feedback (private, authenticated upload for students)

-- Storage policies (add via Dashboard > Storage > Policies):

/*
BUCKET: mess-menus

Policy 1: "Public read access"
- Allowed operation: SELECT
- Target roles: public
- Policy: true

Policy 2: "Caretakers can upload menu images"
- Allowed operation: INSERT
- Target roles: authenticated
- Policy:
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'caretaker'
  )

Policy 3: "Caretakers can update their uploads"
- Allowed operation: UPDATE
- Target roles: authenticated
- Policy:
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'caretaker'
  )

Policy 4: "Caretakers can delete their uploads"
- Allowed operation: DELETE
- Target roles: authenticated
- Policy:
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'caretaker'
  )

---

BUCKET: mess-feedback

Policy 1: "Students can upload feedback photos"
- Allowed operation: INSERT
- Target roles: authenticated
- Policy:
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'student'
  )

Policy 2: "Students can view their own photos"
- Allowed operation: SELECT
- Target roles: authenticated
- Policy:
  (storage.foldername(name))[1] = auth.uid()::text

Policy 3: "Caretakers and admins can view all photos"
- Allowed operation: SELECT
- Target roles: authenticated
- Policy:
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('caretaker', 'admin')
  )
*/

-- ============================================
-- 8. HELPER FUNCTIONS
-- ============================================

-- Get the Monday of the current week
CREATE OR REPLACE FUNCTION get_week_start(input_date DATE DEFAULT CURRENT_DATE)
RETURNS DATE AS $$
BEGIN
    -- ISO week starts on Monday
    RETURN input_date - EXTRACT(ISODOW FROM input_date)::INTEGER + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Get the Sunday of the current week
CREATE OR REPLACE FUNCTION get_week_end(input_date DATE DEFAULT CURRENT_DATE)
RETURNS DATE AS $$
BEGIN
    RETURN get_week_start(input_date) + INTERVAL '6 days';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- 9. ANALYTICS VIEWS (Optional but recommended)
-- ============================================

-- View for feedback analytics
CREATE OR REPLACE VIEW mess_feedback_analytics AS
SELECT 
    hostel_name,
    date,
    meal_type,
    COUNT(*) as feedback_count,
    ROUND(AVG(overall_rating)::numeric, 2) as avg_overall,
    ROUND(AVG(taste_rating)::numeric, 2) as avg_taste,
    ROUND(AVG(quantity_rating)::numeric, 2) as avg_quantity,
    ROUND(AVG(quality_rating)::numeric, 2) as avg_quality,
    ROUND(AVG(cleanliness_rating)::numeric, 2) as avg_cleanliness,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
    COUNT(*) FILTER (WHERE status = 'reviewed') as reviewed_count,
    COUNT(*) FILTER (WHERE overall_rating <= 2) as low_rating_count
FROM mess_feedback
GROUP BY hostel_name, date, meal_type;

-- Grant access to the view
GRANT SELECT ON mess_feedback_analytics TO authenticated;

-- ============================================
-- DONE! Tables, policies, and functions created.
-- ============================================
