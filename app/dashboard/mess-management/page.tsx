"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Edit,
  Save,
  Upload,
  Download,
  Copy,
  FileText,
  MessageSquare,
  Star,
  Image as ImageIcon,
  Filter,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Calendar,
  BarChart3,
  CheckCircle2,
  Reply,
} from "lucide-react";
import { toast } from "sonner";

// Dummy data for feedbacks
const dummyFeedbacks = [
  {
    id: 1,
    date: "2026-01-28",
    meal: "Lunch",
    studentName: "Rahul Kumar",
    rating: 4,
    tasteRating: 4,
    quantityRating: 4,
    qualityRating: 4,
    cleanlinessRating: 5,
    comments: "Food was good, could use more variety",
    hasPhotos: false,
    reviewed: false,
  },
  {
    id: 2,
    date: "2026-01-28",
    meal: "Breakfast",
    studentName: "Priya Sharma",
    rating: 2,
    tasteRating: 2,
    quantityRating: 3,
    qualityRating: 2,
    cleanlinessRating: 3,
    comments: "Idli was cold and sambhar was too watery",
    hasPhotos: true,
    reviewed: false,
  },
  {
    id: 3,
    date: "2026-01-27",
    meal: "Dinner",
    studentName: "Amit Patel",
    rating: 5,
    tasteRating: 5,
    quantityRating: 5,
    qualityRating: 5,
    cleanlinessRating: 5,
    comments: "Excellent food quality, really enjoyed it!",
    hasPhotos: false,
    reviewed: true,
  },
  {
    id: 4,
    date: "2026-01-27",
    meal: "Snacks",
    studentName: "Sneha Singh",
    rating: 3,
    tasteRating: 3,
    quantityRating: 2,
    qualityRating: 3,
    cleanlinessRating: 4,
    comments: "Quantity was less, taste was okay",
    hasPhotos: false,
    reviewed: false,
  },
  {
    id: 5,
    date: "2026-01-26",
    meal: "Lunch",
    studentName: "Vikram Reddy",
    rating: 1,
    tasteRating: 1,
    quantityRating: 2,
    qualityRating: 1,
    cleanlinessRating: 2,
    comments: "Food quality was very poor, found hair in the curry",
    hasPhotos: true,
    reviewed: false,
  },
];

// Dummy menu data
const currentWeekMenu = {
  monday: {
    breakfast: ["Idli", "Sambar", "Chutney"],
    lunch: ["Rice", "Dal", "Vegetable Curry", "Roti"],
    snacks: ["Samosa", "Tea"],
    dinner: ["Chapati", "Paneer Curry", "Dal"],
  },
  tuesday: {
    breakfast: ["Poha", "Jalebi"],
    lunch: ["Rice", "Rajma", "Mix Veg", "Roti"],
    snacks: ["Bread Pakora", "Tea"],
    dinner: ["Rice", "Dal Makhani", "Roti"],
  },
};

export default function MessManagementPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [filterMeal, setFilterMeal] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [hasExistingMenu, setHasExistingMenu] = useState(true); // Set to false if no menu exists
  
  // Weekly menu upload state
  const [weeklyMenuData, setWeeklyMenuData] = useState({
    monday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
    tuesday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
    wednesday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
    thursday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
    friday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
    saturday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
    sunday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
  });
  const [menuPhoto, setMenuPhoto] = useState<File | null>(null);
  const [selectedWeekDate, setSelectedWeekDate] = useState(new Date());

  // Get user role from auth context
  const userRole = user?.role as "admin" | "caretaker" | undefined;

  const filteredFeedbacks = dummyFeedbacks.filter((feedback) => {
    if (filterMeal !== "all" && feedback.meal.toLowerCase() !== filterMeal) return false;
    if (filterRating !== "all" && feedback.rating !== parseInt(filterRating)) return false;
    return true;
  });

  const averageRating = (
    filteredFeedbacks.reduce((sum, f) => sum + f.rating, 0) / filteredFeedbacks.length
  ).toFixed(1);

  const handleUploadWeeklyMenu = () => {
    // Validate that all fields are filled
    const allDaysFilled = Object.values(weeklyMenuData).every((day) =>
      Object.values(day).every((meal) => meal.trim() !== "")
    );

    if (!allDaysFilled) {
      toast.error("Please fill in all meals for all days");
      return;
    }

    if (!menuPhoto) {
      toast.error("Please upload a menu card image");
      return;
    }

    // In real implementation, this would upload to backend
    toast.success("Weekly menu uploaded successfully!");
    setShowUploadForm(false);
    setHasExistingMenu(true);
  };

  const handleUpdateMenu = (day: string, mealType: string, value: string) => {
    setWeeklyMenuData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [mealType]: value,
      },
    }));
  };

  const handleCreateNewMenu = () => {
    setShowUploadForm(true);
    setWeeklyMenuData({
      monday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
      tuesday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
      wednesday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
      thursday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
      friday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
      saturday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
      sunday: { breakfast: "", lunch: "", snacks: "", dinner: "" },
    });
    setMenuPhoto(null);
  };

  const handleExportFeedback = () => {
    toast.success("Exporting feedback as Excel...");
  };

  const handleMarkReviewed = (id: number) => {
    toast.success("Feedback marked as reviewed");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 sm:gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 sm:h-4 sm:w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
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
        <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
            Mess Management
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            {userRole === "admin" ? "Admin Dashboard" : "Manage menu and view feedback"}
          </p>
        </div>

        {/* Tabs - Mobile Optimized */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className={`grid w-full ${userRole === "admin" ? "grid-cols-3" : "grid-cols-2"} h-11 sm:h-12 bg-gray-100`}>
            {userRole === "admin" && (
              <TabsTrigger 
                value="overview"
                className="text-xs sm:text-sm font-semibold data-[state=active]:bg-white"
              >
                <Activity className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="menu"
              className="text-xs sm:text-sm font-semibold data-[state=active]:bg-white"
            >
              <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{userRole === "admin" ? "View Menu" : "Update Menu"}</span>
              <span className="sm:hidden">Menu</span>
            </TabsTrigger>
            <TabsTrigger 
              value="feedback"
              className="text-xs sm:text-sm font-semibold data-[state=active]:bg-white"
            >
              <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Feedbacks</span>
              <span className="sm:hidden">Feedback</span>
            </TabsTrigger>
          </TabsList>

          {/* Admin Overview Tab - Mobile Optimized */}
          {userRole === "admin" && (
            <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-0">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 uppercase">Avg Rating</p>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(234, 179, 8, 0.1)' }}>
                      <Star className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: '#eab308' }} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#014b89' }}>{averageRating}/5</div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">This month</p>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 uppercase">Feedbacks</p>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(1, 75, 137, 0.1)' }}>
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: '#014b89' }} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#014b89' }}>{dummyFeedbacks.length}</div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">This week</p>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 uppercase">Satisfaction</p>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: '#10b981' }} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#10b981' }}>78%</div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">+12% from last</p>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 uppercase">Pending</p>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(242, 105, 24, 0.1)' }}>
                      <Activity className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: '#f26918' }} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#f26918' }}>
                    {dummyFeedbacks.filter((f) => !f.reviewed).length}
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Needs attention</p>
                </div>
              </div>

              {/* Rating Trend Graph */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6 md:p-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                    Rating Trends (Last 30 Days)
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Daily average ratings over time</p>
                  <div className="h-40 sm:h-48 md:h-56 flex items-center justify-center text-gray-400">
                    <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 opacity-20" />
                    <span className="ml-3 sm:ml-4 text-xs sm:text-sm">Graph visualization would go here</span>
                  </div>
                </div>
              </div>

              {/* Common Complaints & Low-Rated Meals */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                  <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                      Most Common Complaints
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Based on feedback comments</p>
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        { label: "Cold food", count: 15 },
                        { label: "Less quantity", count: 12 },
                        { label: "Poor quality", count: 8 },
                        { label: "Limited variety", count: 5 },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-gray-50">
                          <span className="text-sm sm:text-base font-medium text-gray-900">{item.label}</span>
                          <Badge 
                            className="text-xs font-bold px-2 sm:px-3 py-1 border-2"
                            style={{ 
                              background: item.count > 10 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                              color: item.count > 10 ? '#ef4444' : '#6b7280',
                              borderColor: item.count > 10 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(107, 114, 128, 0.3)'
                            }}
                          >
                            {item.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                  <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                      Low-Rated Meals
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Meals that need improvement</p>
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        { label: "Breakfast - Idli", rating: 2.1, color: '#ef4444' },
                        { label: "Lunch - Curry", rating: 2.5, color: '#ef4444' },
                        { label: "Snacks - Samosa", rating: 3.2, color: '#f26918' },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-gray-50">
                          <span className="text-sm sm:text-base font-medium text-gray-900">{item.label}</span>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-base sm:text-lg font-bold" style={{ color: item.color }}>{item.rating}</span>
                            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: item.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reports */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6 md:p-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                    Reports
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Download comprehensive mess reports</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Button 
                      variant="outline"
                      className="border-2 font-semibold h-10 sm:h-11 text-xs sm:text-sm"
                      style={{ borderColor: '#014b89', color: '#014b89' }}
                    >
                      <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Download Monthly Report (PDF)</span>
                      <span className="sm:hidden">Monthly Report</span>
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-2 font-semibold h-10 sm:h-11 text-xs sm:text-sm"
                      style={{ borderColor: '#014b89', color: '#014b89' }}
                    >
                      <BarChart3 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Compare Month-by-Month</span>
                      <span className="sm:hidden">Compare</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}

          {/* Menu Tab - Mobile Optimized */}
          <TabsContent value="menu" className="space-y-4 sm:space-y-6 mt-0">
            {userRole === "caretaker" ? (
              /* Caretaker View */
              <div className="space-y-4 sm:space-y-6">
                {!hasExistingMenu || showUploadForm ? (
                  /* Upload New Menu Form */
                  <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <div>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                            Create Weekly Menu
                          </h2>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            Upload complete week's menu with all meals
                          </p>
                        </div>
                        {showUploadForm && hasExistingMenu && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowUploadForm(false)}
                            className="border-2 font-semibold h-9 sm:h-10 text-xs sm:text-sm"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>

                      {/* Upload Menu Image First */}
                      <div className="mb-8 p-6 border-2 border-dashed rounded-2xl" style={{ borderColor: '#014b89' }}>
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 mb-4" style={{ color: '#014b89' }} />
                          <Label className="text-base font-bold mb-2 block" style={{ color: '#014b89' }}>
                            Upload Weekly Menu Card Image *
                          </Label>
                          <p className="text-xs sm:text-sm text-gray-600 mb-4">
                            This image will be shown to students for download
                          </p>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setMenuPhoto(e.target.files?.[0] || null)}
                            className="border-2 border-gray-200 rounded-xl h-11 text-sm max-w-md mx-auto"
                          />
                          {menuPhoto && (
                            <p className="text-sm text-green-600 mt-3 font-semibold">
                              ✓ {menuPhoto.name} selected
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Days Grid */}
                      <div className="space-y-6">
                        {Object.keys(weeklyMenuData).map((day) => (
                          <div
                            key={day}
                            className="border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden"
                          >
                            <div className="p-4 sm:p-5 border-b-2 border-gray-100" style={{ background: 'rgba(1, 75, 137, 0.05)' }}>
                              <h3 className="text-base sm:text-lg font-bold capitalize" style={{ color: '#014b89' }}>
                                {day}
                              </h3>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                              <div className="grid sm:grid-cols-2 gap-4">
                                {["breakfast", "lunch", "snacks", "dinner"].map((mealType) => (
                                  <div key={mealType} className="space-y-2">
                                    <Label className="capitalize text-sm font-bold flex items-center gap-2">
                                      <span style={{ color: '#f26918' }}>{mealType}</span>
                                      <span className="text-[10px] text-gray-500">(comma separated)</span>
                                    </Label>
                                    <Textarea
                                      placeholder="e.g., Idli, Sambar, Chutney, Tea"
                                      value={weeklyMenuData[day as keyof typeof weeklyMenuData][mealType as keyof (typeof weeklyMenuData)["monday"]]}
                                      onChange={(e) => handleUpdateMenu(day, mealType, e.target.value)}
                                      rows={2}
                                      className="border-2 border-gray-200 rounded-xl text-sm sm:text-base"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Submit Button */}
                      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          onClick={handleUploadWeeklyMenu}
                          className="text-white font-bold h-12 rounded-xl text-base px-8"
                          style={{ background: '#014b89' }}
                        >
                          <Upload className="mr-2 h-5 w-5" />
                          Upload Weekly Menu
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Display Existing Menu in Calendar View */
                  <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <div className="flex-1">
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                            Current Week's Menu
                          </h2>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            View and manage the weekly menu
                          </p>
                        </div>
                        <Button
                          onClick={handleCreateNewMenu}
                          className="text-white font-bold h-10 sm:h-11 rounded-xl text-sm"
                          style={{ background: '#f26918' }}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Create New Week Menu
                        </Button>
                      </div>

                      {/* Current Menu Image */}
                      <div className="mb-6 p-4 sm:p-6 rounded-xl border-2" style={{ background: 'rgba(242, 105, 24, 0.05)', borderColor: 'rgba(242, 105, 24, 0.2)' }}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base sm:text-lg font-bold" style={{ color: '#f26918' }}>
                            Menu Card Image
                          </h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-2 font-semibold h-8 sm:h-9 text-xs sm:text-sm"
                            style={{ borderColor: '#10b981', color: '#10b981' }}
                          >
                            <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Download
                          </Button>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Students can download this menu card from their dashboard
                        </p>
                      </div>

                      {/* Calendar View of Menu */}
                      <div className="space-y-4">
                        {Object.entries(currentWeekMenu).map(([day, meals]) => (
                          <div
                            key={day}
                            className="bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="p-4 sm:p-5 border-b-2 border-gray-100 flex items-center justify-between">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold capitalize" style={{ color: '#014b89' }}>
                                {day}
                              </h3>
                              <Badge className="text-xs font-bold px-3 py-1" style={{ background: 'rgba(1, 75, 137, 0.1)', color: '#014b89' }}>
                                {day === new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() ? "Today" : "Scheduled"}
                              </Badge>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                              <div className="grid sm:grid-cols-2 gap-4">
                                {Object.entries(meals).map(([mealType, items]) => (
                                  <div key={mealType} className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-bold capitalize mb-3 text-sm sm:text-base" style={{ color: '#f26918' }}>
                                      {mealType}
                                    </h4>
                                    <ul className="space-y-1.5">
                                      {items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#014b89' }} />
                                          <span className="text-gray-700 font-medium">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Menu Info Footer */}
                      <div className="mt-6 p-4 sm:p-5 rounded-xl border-2 border-gray-200" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              <strong>Last Updated:</strong> January 28, 2026 at 10:30 AM
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-gray-700">
                              <strong>Week Period:</strong> Jan 27 - Feb 2, 2026
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-2 font-semibold h-9 text-xs sm:text-sm"
                            style={{ borderColor: '#014b89', color: '#014b89' }}
                          >
                            <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Quick Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Admin View */
              <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                        Weekly Menu
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        View current week's menu and caretaker updates
                      </p>
                    </div>
                  </div>

                  {/* Menu Cards */}
                  <div className="space-y-4">
                    {Object.entries(currentWeekMenu).map(([day, meals]) => (
                      <div
                        key={day}
                        className="bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 md:p-6 border-b-2 border-gray-100">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold capitalize" style={{ color: '#014b89' }}>
                              {day}
                            </h3>
                          </div>
                        </div>
                        <div className="p-4 sm:p-5 md:p-6">
                          <div className="grid sm:grid-cols-2 gap-4">
                            {Object.entries(meals).map(([mealType, items]) => (
                              <div key={mealType}>
                                <h4 className="font-bold capitalize mb-2 text-sm sm:text-base" style={{ color: '#f26918' }}>
                                  {mealType}
                                </h4>
                                <ul className="space-y-1">
                                  {items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#014b89' }} />
                                      <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Admin Info */}
                  <div className="mt-6 p-4 sm:p-5 rounded-xl border-2 border-gray-200" style={{ background: 'rgba(1, 75, 137, 0.05)' }}>
                    <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      <strong>Last Updated:</strong> January 28, 2026 at 10:30 AM
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">
                      <strong>Updated By:</strong> Caretaker - Rajesh Kumar
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Feedback Tab - Mobile Optimized */}
          <TabsContent value="feedback" className="space-y-4 sm:space-y-6 mt-0">
            <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                      Student Feedbacks
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      View and manage all student feedback submissions
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleExportFeedback}
                    className="border-2 font-semibold h-9 sm:h-10 text-xs sm:text-sm"
                    style={{ borderColor: '#10b981', color: '#10b981' }}
                  >
                    <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Export to Excel</span>
                    <span className="sm:hidden">Export</span>
                  </Button>
                </div>

                {/* Filters - Mobile Optimized */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" style={{ color: '#014b89' }} />
                    <Label className="text-sm font-bold">Filters:</Label>
                  </div>
                  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 sm:gap-3">
                    <Select value={filterMeal} onValueChange={setFilterMeal}>
                      <SelectTrigger className="h-9 sm:h-10 border-2 border-gray-200 rounded-xl text-xs sm:text-sm">
                        <SelectValue placeholder="Meal Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Meals</SelectItem>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="snacks">Snacks</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className="h-9 sm:h-10 border-2 border-gray-200 rounded-xl text-xs sm:text-sm">
                        <SelectValue placeholder="Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Average Rating Display */}
                <div className="mb-6 p-4 sm:p-5 rounded-xl border-2 border-gray-200" style={{ background: 'rgba(242, 105, 24, 0.05)' }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-2">Average Rating</p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-3xl sm:text-4xl font-bold" style={{ color: '#014b89' }}>{averageRating}</span>
                        {renderStars(Math.round(parseFloat(averageRating)))}
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-2">Total Feedbacks</p>
                      <span className="text-3xl sm:text-4xl font-bold" style={{ color: '#f26918' }}>{filteredFeedbacks.length}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="block lg:hidden space-y-3">
                  {filteredFeedbacks.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="border-2 rounded-xl p-4"
                      style={{ 
                        borderColor: feedback.rating <= 2 ? 'rgba(239, 68, 68, 0.3)' : '#e5e7eb',
                        background: feedback.rating <= 2 ? 'rgba(239, 68, 68, 0.05)' : 'white'
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm mb-1">{feedback.studentName}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge 
                              className="text-[10px] font-bold px-2 py-0.5 border-2"
                              style={{ 
                                background: 'rgba(1, 75, 137, 0.1)',
                                color: '#014b89',
                                borderColor: 'rgba(1, 75, 137, 0.3)'
                              }}
                            >
                              {feedback.meal}
                            </Badge>
                            <span className="text-xs text-gray-600">{feedback.date}</span>
                          </div>
                        </div>
                        <Badge
                          className="text-[10px] font-bold px-2 py-1 border-2 shrink-0"
                          style={
                            feedback.reviewed
                              ? { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }
                              : { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }
                          }
                        >
                          {feedback.reviewed ? "Done" : "Pending"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold" style={{ color: '#014b89' }}>{feedback.rating}</span>
                        {renderStars(feedback.rating)}
                      </div>

                      <p className="text-xs text-gray-700 mb-3 line-clamp-2">{feedback.comments}</p>

                      <div className="flex items-center gap-2">
                        {!feedback.reviewed && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkReviewed(feedback.id)}
                            className="flex-1 border-2 font-semibold h-8 text-xs"
                            style={{ borderColor: '#10b981', color: '#10b981' }}
                          >
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Mark Reviewed
                          </Button>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-2 h-8 px-3"
                              style={{ borderColor: '#f26918', color: '#f26918' }}
                            >
                              <Reply className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[calc(100%-2rem)] max-w-lg mx-auto">
                            <DialogHeader>
                              <DialogTitle className="text-base">Reply to Feedback</DialogTitle>
                              <DialogDescription className="text-xs">
                                Send a response to {feedback.studentName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-bold">Your Reply</Label>
                                <Textarea
                                  placeholder="Type your response..."
                                  rows={4}
                                  className="border-2 border-gray-200 rounded-xl text-sm mt-2"
                                />
                              </div>
                              <Button 
                                className="w-full text-white font-bold h-10 rounded-xl text-sm"
                                style={{ background: '#014b89' }}
                              >
                                Send Reply
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block border-2 border-gray-200 rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-gray-200">
                        <TableHead className="font-bold text-gray-600 text-xs uppercase">Date</TableHead>
                        <TableHead className="font-bold text-gray-600 text-xs uppercase">Meal</TableHead>
                        <TableHead className="font-bold text-gray-600 text-xs uppercase">Student</TableHead>
                        <TableHead className="font-bold text-gray-600 text-xs uppercase">Rating</TableHead>
                        <TableHead className="font-bold text-gray-600 text-xs uppercase">Comments</TableHead>
                        <TableHead className="font-bold text-gray-600 text-xs uppercase">Status</TableHead>
                        <TableHead className="font-bold text-gray-600 text-xs uppercase">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFeedbacks.map((feedback) => (
                        <TableRow
                          key={feedback.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                          style={{ background: feedback.rating <= 2 ? 'rgba(239, 68, 68, 0.05)' : 'white' }}
                        >
                          <TableCell className="text-sm">{feedback.date}</TableCell>
                          <TableCell>
                            <Badge 
                              className="text-xs font-bold px-2 py-1 border-2"
                              style={{ 
                                background: 'rgba(1, 75, 137, 0.1)',
                                color: '#014b89',
                                borderColor: 'rgba(1, 75, 137, 0.3)'
                              }}
                            >
                              {feedback.meal}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm font-semibold">{feedback.studentName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-bold" style={{ color: '#014b89' }}>{feedback.rating}</span>
                              {renderStars(feedback.rating)}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate text-sm">{feedback.comments}</TableCell>
                          <TableCell>
                            <Badge
                              className="text-xs font-bold px-2 py-1 border-2"
                              style={
                                feedback.reviewed
                                  ? { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }
                                  : { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }
                              }
                            >
                              {feedback.reviewed ? (
                                <>
                                  <CheckCircle2 className="mr-1 h-3 w-3 inline" />
                                  Reviewed
                                </>
                              ) : (
                                "Pending"
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {!feedback.reviewed && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMarkReviewed(feedback.id)}
                                  className="border-2 h-8 px-3"
                                  style={{ borderColor: '#10b981', color: '#10b981' }}
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              )}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="border-2 h-8 px-3"
                                    style={{ borderColor: '#f26918', color: '#f26918' }}
                                  >
                                    <Reply className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Reply to Feedback</DialogTitle>
                                    <DialogDescription>
                                      Send a response to {feedback.studentName}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Your Reply</Label>
                                      <Textarea
                                        placeholder="Type your response..."
                                        rows={4}
                                        className="border-2 border-gray-200 rounded-xl mt-2"
                                      />
                                    </div>
                                    <Button 
                                      className="w-full text-white font-bold h-11 rounded-xl"
                                      style={{ background: '#014b89' }}
                                    >
                                      Send Reply
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* Trend Graph */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                  Rating Trends Over Time
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Track how ratings change over the past month</p>
                <div className="h-40 sm:h-48 md:h-56 flex items-center justify-center text-gray-400">
                  <TrendingUp className="h-12 w-12 sm:h-16 sm:w-16 opacity-20" />
                  <span className="ml-3 sm:ml-4 text-xs sm:text-sm">Trend graph visualization would go here</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
