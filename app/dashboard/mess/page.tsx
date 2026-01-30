"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Star, 
  Download, 
  CalendarDays, 
  MessageSquare,
  Upload,
  Coffee,
  Soup,
  Cookie,
  UtensilsCrossed
} from "lucide-react";
import { toast } from "sonner";

// Dummy data for weekly menu
const weeklyMenu = {
  monday: {
    breakfast: ["Idli", "Sambar", "Chutney", "Tea/Coffee"],
    lunch: ["Rice", "Dal", "Vegetable Curry", "Roti", "Curd"],
    snacks: ["Samosa", "Tea"],
    dinner: ["Chapati", "Paneer Curry", "Dal", "Rice"]
  },
  tuesday: {
    breakfast: ["Poha", "Jalebi", "Tea/Coffee"],
    lunch: ["Rice", "Rajma", "Mix Veg", "Roti", "Salad"],
    snacks: ["Bread Pakora", "Tea"],
    dinner: ["Rice", "Dal Makhani", "Roti", "Vegetable"]
  },
  wednesday: {
    breakfast: ["Upma", "Banana", "Tea/Coffee"],
    lunch: ["Rice", "Chole", "Bhindi", "Roti", "Curd"],
    snacks: ["Vada Pav", "Tea"],
    dinner: ["Pulao", "Raita", "Dal", "Papad"]
  },
  thursday: {
    breakfast: ["Paratha", "Pickle", "Curd", "Tea/Coffee"],
    lunch: ["Rice", "Kadhi", "Aloo Gobi", "Roti", "Salad"],
    snacks: ["Biscuits", "Tea"],
    dinner: ["Rice", "Dal Tadka", "Mix Veg", "Roti"]
  },
  friday: {
    breakfast: ["Dosa", "Sambar", "Chutney", "Tea/Coffee"],
    lunch: ["Rice", "Paneer Curry", "Dal", "Roti", "Curd"],
    snacks: ["Bhajia", "Tea"],
    dinner: ["Fried Rice", "Manchurian", "Soup"]
  },
  saturday: {
    breakfast: ["Aloo Paratha", "Curd", "Pickle", "Tea/Coffee"],
    lunch: ["Rice", "Rajma", "Cabbage", "Roti", "Salad"],
    snacks: ["Pakora", "Tea"],
    dinner: ["Chapati", "Dal", "Paneer", "Rice"]
  },
  sunday: {
    breakfast: ["Chole Bhature", "Pickle", "Tea/Coffee"],
    lunch: ["Special Rice", "Chicken Curry (Non-Veg)", "Dal", "Roti", "Dessert"],
    snacks: ["Cake", "Tea"],
    dinner: ["Rice", "Mixed Dal", "Veg Curry", "Roti"]
  }
};

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function MessPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("menu");
  
  // Feedback state
  const [overallRating, setOverallRating] = useState(0);
  const [tasteRating, setTasteRating] = useState(0);
  const [quantityRating, setQuantityRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [comments, setComments] = useState("");
  const [studentName, setStudentName] = useState("");

  const getDayName = (date: Date) => {
    return daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1];
  };

  const selectedDayMenu = selectedDate ? weeklyMenu[getDayName(selectedDate) as keyof typeof weeklyMenu] : null;

  const handleDownloadPDF = () => {
    toast.success("Downloading menu PDF...");
  };

  const renderStarRating = (rating: number, setRating: (value: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 sm:h-6 sm:w-6 cursor-pointer transition-colors ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    );
  };

  const handleSubmitFeedback = () => {
    if (!studentName || overallRating === 0) {
      toast.error("Please provide your name and overall rating");
      return;
    }

    toast.success("Feedback submitted successfully!");
    
    // Reset form
    setOverallRating(0);
    setTasteRating(0);
    setQuantityRating(0);
    setQualityRating(0);
    setCleanlinessRating(0);
    setComments("");
    setStudentName("");
  };

  const getMealIcon = (meal: string) => {
    switch (meal) {
      case "breakfast": return <Coffee className="h-4 h-4 sm:h-5 sm:w-5" />;
      case "lunch": return <UtensilsCrossed className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "snacks": return <Cookie className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "dinner": return <Soup className="h-4 w-4 sm:h-5 sm:w-5" />;
      default: return null;
    }
  };

  const getMealTime = (meal: string) => {
    switch (meal) {
      case "breakfast": return "7-9 AM";
      case "lunch": return "12-2 PM";
      case "snacks": return "4-5 PM";
      case "dinner": return "7-9 PM";
      default: return "";
    }
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
            Mess
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">View menu and submit feedback</p>
        </div>

        {/* Tabs - Mobile Optimized */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-11 sm:h-12 bg-gray-100">
            <TabsTrigger 
              value="menu" 
              className="text-xs sm:text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              <CalendarDays className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              View Menu
            </TabsTrigger>
            <TabsTrigger 
              value="feedback"
              className="text-xs sm:text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Give Feedback
            </TabsTrigger>
          </TabsList>

          {/* View Menu Tab - Mobile Optimized */}
          <TabsContent value="menu" className="space-y-4 sm:space-y-6 mt-0">
            <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                      Weekly Mess Menu
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      Click on any day to view detailed meal schedule
                    </p>
                  </div>
                  <Button 
                    onClick={handleDownloadPDF} 
                    variant="outline" 
                    size="sm"
                    className="border-2 font-semibold h-9 sm:h-10 px-3 sm:px-4 rounded-xl text-xs sm:text-sm flex-shrink-0"
                    style={{ borderColor: '#014b89', color: '#014b89' }}
                  >
                    <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Download PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Calendar - Mobile Optimized */}
                  <div className="flex justify-center">
                    <div className="w-full max-w-md">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-xl border-2 border-gray-200 p-3"
                      />
                    </div>
                  </div>

                  {/* Selected Day Menu - Mobile Optimized */}
                  {selectedDate && selectedDayMenu && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: '#014b89' }}>
                          {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h3>
                        <Badge 
                          className="text-xs sm:text-sm font-bold px-3 py-1 rounded-lg border-2"
                          style={{ 
                            background: 'rgba(242, 105, 24, 0.1)', 
                            color: '#f26918',
                            borderColor: 'rgba(242, 105, 24, 0.3)'
                          }}
                        >
                          Today's Menu
                        </Badge>
                      </div>

                      {/* Meals - Mobile Optimized */}
                      {Object.entries(selectedDayMenu).map(([meal, items]) => (
                        <div 
                          key={meal}
                          className="bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                        >
                          <div className="p-4 sm:p-5 border-b-2 border-gray-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(1, 75, 137, 0.1)' }}>
                                  {getMealIcon(meal)}
                                </div>
                                <span className="text-base sm:text-lg font-bold capitalize" style={{ color: '#014b89' }}>
                                  {meal}
                                </span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 border-2"
                                style={{ borderColor: '#e5e7eb', color: '#6b7280' }}
                              >
                                {getMealTime(meal)}
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4 sm:p-5">
                            <ul className="space-y-2">
                              {items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm sm:text-base">
                                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#f26918' }} />
                                  <span className="text-gray-700 font-medium">
                                    {item}
                                    {item.includes("Non-Veg") && (
                                      <Badge 
                                        className="ml-2 text-[10px] sm:text-xs font-bold px-2 py-0.5 border-2"
                                        style={{ 
                                          background: 'rgba(239, 68, 68, 0.1)', 
                                          color: '#ef4444',
                                          borderColor: 'rgba(239, 68, 68, 0.3)'
                                        }}
                                      >
                                        Non-Veg
                                      </Badge>
                                    )}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!selectedDate && (
                    <div className="flex items-center justify-center text-gray-500 text-sm sm:text-base">
                      Select a date to view menu
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Give Feedback Tab - Mobile Optimized */}
          <TabsContent value="feedback" className="space-y-4 sm:space-y-6 mt-0">
            <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                    Submit Mess Feedback
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    Help us improve by sharing your experience
                  </p>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  {/* Student Name */}
                  <div className="space-y-2">
                    <Label htmlFor="studentName" className="text-sm font-bold text-gray-900">
                      Your Name *
                    </Label>
                    <Input
                      id="studentName"
                      placeholder="Enter your name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#014b89] focus:ring-[#014b89] rounded-xl h-11 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  {/* Overall Rating */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-900">Overall Rating *</Label>
                    {renderStarRating(overallRating, setOverallRating)}
                  </div>

                  {/* Individual Ratings */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-900">Taste</Label>
                      {renderStarRating(tasteRating, setTasteRating)}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-900">Quantity</Label>
                      {renderStarRating(quantityRating, setQuantityRating)}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-900">Quality</Label>
                      {renderStarRating(qualityRating, setQualityRating)}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-900">Cleanliness</Label>
                      {renderStarRating(cleanlinessRating, setCleanlinessRating)}
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="space-y-2">
                    <Label htmlFor="comments" className="text-sm font-bold text-gray-900">
                      Comments (Optional)
                    </Label>
                    <Textarea
                      id="comments"
                      placeholder="Share your detailed feedback..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={4}
                      className="border-2 border-gray-200 focus:border-[#014b89] focus:ring-[#014b89] rounded-xl text-sm sm:text-base resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    onClick={handleSubmitFeedback} 
                    className="w-full text-white font-bold h-11 sm:h-12 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    style={{ background: '#014b89' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#012d52')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#014b89')}
                  >
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
