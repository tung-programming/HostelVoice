'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, FileText, CheckCircle2, XCircle, AlertCircle, ArrowLeft, Users, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

// Dummy data - caretaker's own leave requests
const dummyMyLeaves = [
  {
    id: '1',
    leaveType: 'Casual',
    startDate: new Date('2026-02-10'),
    endDate: new Date('2026-02-12'),
    numberOfDays: 3,
    reason: 'Personal family function - daughter\'s engagement ceremony',
    documentUrl: null,
    replacementSuggestion: 'Sharma - Block B',
    status: 'Pending',
    submittedAt: new Date('2026-01-29T10:30:00')
  },
  {
    id: '2',
    leaveType: 'Sick',
    startDate: new Date('2026-01-25'),
    endDate: new Date('2026-01-27'),
    numberOfDays: 3,
    reason: 'Severe fever and need rest as per doctor\'s advice',
    documentUrl: 'medical-certificate.pdf',
    replacementSuggestion: 'Patel - Block C',
    status: 'Approved',
    submittedAt: new Date('2026-01-24T09:15:00'),
    reviewedAt: new Date('2026-01-24T15:30:00'),
    reviewedBy: 'Admin Verma',
    assignedReplacement: 'Patel - Block C'
  },
  {
    id: '3',
    leaveType: 'Casual',
    startDate: new Date('2026-01-15'),
    endDate: new Date('2026-01-17'),
    numberOfDays: 3,
    reason: 'Attending training workshop in nearby city',
    documentUrl: null,
    replacementSuggestion: 'No Suggestion',
    status: 'Rejected',
    submittedAt: new Date('2026-01-13T16:20:00'),
    reviewedAt: new Date('2026-01-14T10:00:00'),
    reviewedBy: 'Admin Verma',
    rejectionReason: 'Insufficient staff available during requested dates. Please choose alternative dates.'
  },
  {
    id: '4',
    leaveType: 'Emergency',
    startDate: new Date('2026-01-05'),
    endDate: new Date('2026-01-07'),
    numberOfDays: 3,
    reason: 'Father hospitalized - need to be with family',
    documentUrl: 'hospital-admission.pdf',
    replacementSuggestion: 'Sharma - Block B',
    status: 'Approved',
    submittedAt: new Date('2026-01-04T20:45:00'),
    reviewedAt: new Date('2026-01-04T21:00:00'),
    reviewedBy: 'Admin Verma',
    assignedReplacement: 'Sharma - Block B'
  }
];

export default function CaretakerLeaveStatusPage() {
  const router = useRouter();
  const [leaves, setLeaves] = useState(dummyMyLeaves);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleViewDetails = (leave: any) => {
    setSelectedLeave(leave);
    setIsDetailDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Pending: { bg: 'rgba(234, 179, 8, 0.1)', color: '#eab308', border: 'rgba(234, 179, 8, 0.3)' },
      Approved: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: 'rgba(16, 185, 129, 0.3)' },
      'Conditionally Approved': { bg: 'rgba(242, 105, 24, 0.1)', color: '#f26918', border: 'rgba(242, 105, 24, 0.3)' },
      Rejected: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' }
    };
    const style = styles[status as keyof typeof styles] || { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' };

    return (
      <Badge 
        className="gap-1 text-xs font-bold px-2 sm:px-3 py-1 border-2"
        style={{ background: style.bg, color: style.color, borderColor: style.border }}
      >
        {status === 'Pending' && <AlertCircle className="h-3 w-3" />}
        {status === 'Approved' && <CheckCircle2 className="h-3 w-3" />}
        {status === 'Conditionally Approved' && <AlertCircle className="h-3 w-3" />}
        {status === 'Rejected' && <XCircle className="h-3 w-3" />}
        {status}
      </Badge>
    );
  };

  const LeaveCard = ({ leave }: { leave: any }) => {
    // Get solid color for status badge
    const getStatusSolidColor = (status: string) => {
      switch (status) {
        case 'Approved': return '#10b981'
        case 'Rejected': return '#ef4444'
        case 'Conditionally Approved': return '#f26918'
        default: return '#eab308' // Pending
      }
    }
    
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden mb-4 hover:shadow-lg transition-all relative">
        {/* Status Badge - Top Right Corner */}
        <span 
          className="absolute -top-3 -right-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-extrabold uppercase tracking-wider z-10 transform rotate-3"
          style={{ 
            background: getStatusSolidColor(leave.status),
            color: 'white',
            borderColor: 'white',
            borderWidth: '3px',
            borderStyle: 'solid',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)'
          }}
        >
          {leave.status}
        </span>

        <div className="p-4 sm:p-5 md:p-6 border-b-2 border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 pr-20">
              <h3 className="text-base sm:text-lg md:text-xl font-bold" style={{ color: '#014b89' }}>
                {leave.leaveType} Leave
              </h3>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 md:p-6 space-y-4">
          {/* Dates */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(242, 105, 24, 0.1)' }}>
              <Calendar className="h-4 w-4" style={{ color: '#f26918' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">Leave Period</p>
              <p className="text-xs sm:text-sm text-gray-600">
                {format(leave.startDate, 'PPP')} - {format(leave.endDate, 'PPP')}
              </p>
              <p className="text-xs font-bold mt-1" style={{ color: '#014b89' }}>
                Duration: {leave.numberOfDays} {leave.numberOfDays === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>

          {/* Reason */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(1, 75, 137, 0.1)' }}>
              <FileText className="h-4 w-4" style={{ color: '#014b89' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 mb-1">Reason</p>
              <p className="text-xs sm:text-sm text-gray-600 break-words">{leave.reason}</p>
            </div>
          </div>

          {/* Replacement */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <Users className="h-4 w-4" style={{ color: '#10b981' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 mb-1">Replacement Suggestion</p>
              <p className="text-xs sm:text-sm text-gray-600">{leave.replacementSuggestion}</p>
            </div>
          </div>

          {/* Submitted Date */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(107, 114, 128, 0.1)' }}>
              <Clock className="h-4 w-4" style={{ color: '#6b7280' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">Submitted On</p>
              <p className="text-xs sm:text-sm text-gray-600">
                {format(leave.submittedAt, 'PPP p')}
              </p>
            </div>
          </div>

          {/* Review Info */}
          {leave.reviewedAt && (
            <div className="border-t-2 border-gray-100 pt-4">
              <div className="p-3 sm:p-4 rounded-xl" style={{ background: 'rgba(1, 75, 137, 0.05)' }}>
                <p className="text-sm font-bold mb-2" style={{ color: '#014b89' }}>Review Details</p>
                <p className="text-xs sm:text-sm text-gray-700 mb-1">
                  Reviewed by <strong>{leave.reviewedBy}</strong>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  on {format(leave.reviewedAt, 'PPP p')}
                </p>
                
                {leave.assignedReplacement && (
                  <div className="mt-2 p-3 rounded-lg border-2" style={{ background: 'rgba(1, 75, 137, 0.05)', borderColor: 'rgba(1, 75, 137, 0.3)' }}>
                    <p className="text-xs sm:text-sm font-medium" style={{ color: '#014b89' }}>
                      <strong>Assigned Replacement:</strong> {leave.assignedReplacement}
                    </p>
                  </div>
                )}
                
                {leave.rejectionReason && (
                  <div className="mt-2 p-3 rounded-lg border-2" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                    <p className="text-xs sm:text-sm font-medium" style={{ color: '#ef4444' }}>
                      <strong>Rejection Reason:</strong> {leave.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t-2 border-gray-100">
            <Button 
              variant="outline" 
              onClick={() => handleViewDetails(leave)}
              className="w-full border-2 font-semibold h-10 sm:h-11 text-xs sm:text-sm rounded-xl"
              style={{ borderColor: '#014b89', color: '#014b89' }}
            >
              View Full Details
            </Button>
          </div>
        </div>
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
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4 sm:mb-6 hover:bg-gray-100 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2" style={{ color: '#014b89' }}>
                My Leave Requests
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                View and manage your leave applications
              </p>
            </div>
            <Button 
              onClick={() => router.push('/dashboard/caretaker-leave-apply')}
              className="text-white font-bold h-10 sm:h-11 px-4 sm:px-6 rounded-xl text-sm sm:text-base w-full sm:w-auto"
              style={{ background: '#014b89' }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Apply for New Leave</span>
              <span className="sm:hidden">Apply Leave</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Total Requests', value: leaves.length, color: '#014b89' },
            { label: 'Pending', value: leaves.filter(l => l.status === 'Pending').length, color: '#eab308' },
            { label: 'Approved', value: leaves.filter(l => l.status === 'Approved').length, color: '#10b981' },
            { label: 'Rejected', value: leaves.filter(l => l.status === 'Rejected').length, color: '#ef4444' }
          ].map((stat, i) => (
            <div 
              key={stat.label}
              className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 mb-2 uppercase truncate">{stat.label}</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Leave Requests List */}
        <div>
          {leaves.length === 0 ? (
            <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
              <div className="p-8 sm:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center" style={{ background: 'rgba(1, 75, 137, 0.1)' }}>
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#014b89' }} />
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">You haven't applied for any leave yet</p>
                <Button 
                  onClick={() => router.push('/dashboard/caretaker-leave-apply')}
                  className="text-white font-bold h-10 sm:h-11 px-6 rounded-xl text-sm sm:text-base"
                  style={{ background: '#014b89' }}
                >
                  Apply for Leave
                </Button>
              </div>
            </div>
          ) : (
            leaves.map(leave => <LeaveCard key={leave.id} leave={leave} />)
          )}
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Leave Request Details</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">Complete information about your leave request</DialogDescription>
          </DialogHeader>
          
          {selectedLeave && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Leave Type</p>
                  <p className="text-sm text-gray-600">{selectedLeave.leaveType}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Status</p>
                  {getStatusBadge(selectedLeave.status)}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Leave Period</p>
                <p className="text-sm text-gray-600">
                  {format(selectedLeave.startDate, 'PPP')} to {format(selectedLeave.endDate, 'PPP')}
                </p>
                <p className="text-sm text-gray-600">
                  ({selectedLeave.numberOfDays} {selectedLeave.numberOfDays === 1 ? 'day' : 'days'})
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Reason</p>
                <p className="text-sm text-gray-600">{selectedLeave.reason}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Replacement Suggestion</p>
                <p className="text-sm text-gray-600">{selectedLeave.replacementSuggestion}</p>
              </div>

              {selectedLeave.documentUrl && (
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">Supporting Document</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-2 h-9 text-xs"
                    style={{ borderColor: '#014b89', color: '#014b89' }}
                  >
                    <FileText className="h-3 w-3 mr-2" />
                    {selectedLeave.documentUrl}
                  </Button>
                </div>
              )}

              {selectedLeave.reviewedBy && (
                <div className="border-t-2 border-gray-100 pt-4">
                  <p className="text-sm font-bold text-gray-900 mb-2">Review Information</p>
                  <p className="text-sm text-gray-600 mb-1">
                    Reviewed by {selectedLeave.reviewedBy}
                  </p>
                  <p className="text-sm text-gray-600">
                    on {format(selectedLeave.reviewedAt, 'PPP p')}
                  </p>
                  
                  {selectedLeave.assignedReplacement && (
                    <div className="mt-2 p-3 rounded-lg border-2" style={{ background: 'rgba(1, 75, 137, 0.05)', borderColor: 'rgba(1, 75, 137, 0.3)' }}>
                      <p className="text-sm font-medium" style={{ color: '#014b89' }}>
                        <strong>Assigned Replacement:</strong> {selectedLeave.assignedReplacement}
                      </p>
                    </div>
                  )}
                  
                  {selectedLeave.rejectionReason && (
                    <div className="mt-2 p-3 rounded-lg border-2" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                      <p className="text-sm font-medium" style={{ color: '#ef4444' }}>
                        <strong>Rejection Reason:</strong> {selectedLeave.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
