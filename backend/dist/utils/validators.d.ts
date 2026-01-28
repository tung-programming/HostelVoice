import { z } from 'zod';
export declare const uuidSchema: z.ZodString;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}, {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}>;
export declare const issueCategorySchema: z.ZodEnum<["maintenance", "cleanliness", "security", "food", "other"]>;
export declare const issuePrioritySchema: z.ZodEnum<["low", "medium", "high", "urgent"]>;
export declare const issueStatusSchema: z.ZodEnum<["pending", "in_progress", "resolved", "closed"]>;
export declare const createIssueSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<["maintenance", "cleanliness", "security", "food", "other"]>;
    priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high", "urgent"]>>;
    hostel_name: z.ZodOptional<z.ZodString>;
    room_number: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    description?: string;
    category?: "maintenance" | "cleanliness" | "security" | "food" | "other";
    priority?: "low" | "medium" | "high" | "urgent";
    hostel_name?: string;
    room_number?: string;
    location?: string;
    images?: string[];
}, {
    title?: string;
    description?: string;
    category?: "maintenance" | "cleanliness" | "security" | "food" | "other";
    priority?: "low" | "medium" | "high" | "urgent";
    hostel_name?: string;
    room_number?: string;
    location?: string;
    images?: string[];
}>;
export declare const updateIssueStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["pending", "in_progress", "resolved", "closed"]>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "pending" | "in_progress" | "resolved" | "closed";
    notes?: string;
}, {
    status?: "pending" | "in_progress" | "resolved" | "closed";
    notes?: string;
}>;
export declare const assignIssueSchema: z.ZodObject<{
    assigned_to: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    notes?: string;
    assigned_to?: string;
}, {
    notes?: string;
    assigned_to?: string;
}>;
export declare const mergeIssuesSchema: z.ZodObject<{
    master_issue_id: z.ZodString;
    duplicate_issue_ids: z.ZodArray<z.ZodString, "many">;
    merge_notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    master_issue_id?: string;
    duplicate_issue_ids?: string[];
    merge_notes?: string;
}, {
    master_issue_id?: string;
    duplicate_issue_ids?: string[];
    merge_notes?: string;
}>;
export declare const announcementCategorySchema: z.ZodEnum<["general", "urgent", "maintenance", "event", "policy"]>;
export declare const announcementPrioritySchema: z.ZodEnum<["normal", "high", "urgent"]>;
export declare const targetRoleSchema: z.ZodEnum<["all", "student", "caretaker", "admin"]>;
export declare const createAnnouncementSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    category: z.ZodEnum<["general", "urgent", "maintenance", "event", "policy"]>;
    priority: z.ZodDefault<z.ZodEnum<["normal", "high", "urgent"]>>;
    target_role: z.ZodDefault<z.ZodEnum<["all", "student", "caretaker", "admin"]>>;
    target_hostel: z.ZodOptional<z.ZodString>;
    expires_at: z.ZodOptional<z.ZodString>;
    attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    category?: "maintenance" | "urgent" | "general" | "event" | "policy";
    priority?: "high" | "urgent" | "normal";
    content?: string;
    target_role?: "student" | "caretaker" | "admin" | "all";
    target_hostel?: string;
    expires_at?: string;
    attachments?: string[];
}, {
    title?: string;
    category?: "maintenance" | "urgent" | "general" | "event" | "policy";
    priority?: "high" | "urgent" | "normal";
    content?: string;
    target_role?: "student" | "caretaker" | "admin" | "all";
    target_hostel?: string;
    expires_at?: string;
    attachments?: string[];
}>;
export declare const updateAnnouncementSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<["general", "urgent", "maintenance", "event", "policy"]>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<["normal", "high", "urgent"]>>>;
    target_role: z.ZodOptional<z.ZodDefault<z.ZodEnum<["all", "student", "caretaker", "admin"]>>>;
    target_hostel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    expires_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    attachments: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
} & {
    is_active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    category?: "maintenance" | "urgent" | "general" | "event" | "policy";
    priority?: "high" | "urgent" | "normal";
    content?: string;
    target_role?: "student" | "caretaker" | "admin" | "all";
    target_hostel?: string;
    expires_at?: string;
    attachments?: string[];
    is_active?: boolean;
}, {
    title?: string;
    category?: "maintenance" | "urgent" | "general" | "event" | "policy";
    priority?: "high" | "urgent" | "normal";
    content?: string;
    target_role?: "student" | "caretaker" | "admin" | "all";
    target_hostel?: string;
    expires_at?: string;
    attachments?: string[];
    is_active?: boolean;
}>;
export declare const lostFoundTypeSchema: z.ZodEnum<["lost", "found"]>;
export declare const lostFoundCategorySchema: z.ZodEnum<["electronics", "documents", "clothing", "accessories", "books", "other"]>;
export declare const lostFoundStatusSchema: z.ZodEnum<["open", "claimed", "returned", "closed"]>;
export declare const createLostFoundSchema: z.ZodObject<{
    item_name: z.ZodString;
    description: z.ZodString;
    type: z.ZodEnum<["lost", "found"]>;
    category: z.ZodEnum<["electronics", "documents", "clothing", "accessories", "books", "other"]>;
    location_found: z.ZodOptional<z.ZodString>;
    location_lost: z.ZodOptional<z.ZodString>;
    date_found: z.ZodOptional<z.ZodString>;
    date_lost: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    contact_info: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "lost" | "found";
    description?: string;
    category?: "other" | "electronics" | "documents" | "clothing" | "accessories" | "books";
    images?: string[];
    item_name?: string;
    location_found?: string;
    location_lost?: string;
    date_found?: string;
    date_lost?: string;
    contact_info?: string;
}, {
    type?: "lost" | "found";
    description?: string;
    category?: "other" | "electronics" | "documents" | "clothing" | "accessories" | "books";
    images?: string[];
    item_name?: string;
    location_found?: string;
    location_lost?: string;
    date_found?: string;
    date_lost?: string;
    contact_info?: string;
}>;
export declare const claimLostFoundSchema: z.ZodObject<{
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    notes?: string;
}, {
    notes?: string;
}>;
export declare const createResidentSchema: z.ZodObject<{
    guardian_name: z.ZodOptional<z.ZodString>;
    guardian_phone: z.ZodOptional<z.ZodString>;
    guardian_email: z.ZodOptional<z.ZodString>;
    permanent_address: z.ZodOptional<z.ZodString>;
    blood_group: z.ZodOptional<z.ZodString>;
    medical_conditions: z.ZodOptional<z.ZodString>;
    emergency_contact: z.ZodOptional<z.ZodString>;
    check_in_date: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    guardian_name?: string;
    guardian_phone?: string;
    guardian_email?: string;
    permanent_address?: string;
    blood_group?: string;
    medical_conditions?: string;
    emergency_contact?: string;
    check_in_date?: string;
}, {
    guardian_name?: string;
    guardian_phone?: string;
    guardian_email?: string;
    permanent_address?: string;
    blood_group?: string;
    medical_conditions?: string;
    emergency_contact?: string;
    check_in_date?: string;
}>;
export declare const updateResidentSchema: z.ZodObject<{
    guardian_name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    guardian_phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    guardian_email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    permanent_address: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    blood_group: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    medical_conditions: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    emergency_contact: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    check_in_date: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    check_out_date: z.ZodOptional<z.ZodString>;
    is_active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    is_active?: boolean;
    guardian_name?: string;
    guardian_phone?: string;
    guardian_email?: string;
    permanent_address?: string;
    blood_group?: string;
    medical_conditions?: string;
    emergency_contact?: string;
    check_in_date?: string;
    check_out_date?: string;
}, {
    is_active?: boolean;
    guardian_name?: string;
    guardian_phone?: string;
    guardian_email?: string;
    permanent_address?: string;
    blood_group?: string;
    medical_conditions?: string;
    emergency_contact?: string;
    check_in_date?: string;
    check_out_date?: string;
}>;
export declare const approveUserSchema: z.ZodObject<{
    user_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user_id?: string;
}, {
    user_id?: string;
}>;
export declare const rejectUserSchema: z.ZodObject<{
    user_id: z.ZodString;
    rejection_reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user_id?: string;
    rejection_reason?: string;
}, {
    user_id?: string;
    rejection_reason?: string;
}>;
export declare const signedUrlSchema: z.ZodObject<{
    bucket: z.ZodEnum<["issue-images", "lost-found-images", "announcement-attachments", "resident-documents"]>;
    filename: z.ZodString;
    contentType: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bucket?: "issue-images" | "lost-found-images" | "announcement-attachments" | "resident-documents";
    filename?: string;
    contentType?: string;
}, {
    bucket?: "issue-images" | "lost-found-images" | "announcement-attachments" | "resident-documents";
    filename?: string;
    contentType?: string;
}>;
export declare const markNotificationReadSchema: z.ZodObject<{
    notification_ids: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    notification_ids?: string[];
}, {
    notification_ids?: string[];
}>;
/**
 * Validate data against a schema
 * Returns validated data or throws an error with details
 */
export declare function validate<T>(schema: z.ZodSchema<T>, data: unknown): T;
/**
 * Safe validation that returns result object instead of throwing
 */
export declare function safeValidate<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
};
//# sourceMappingURL=validators.d.ts.map