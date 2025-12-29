import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { CitizenLayout } from "@/components/layout/CitizenLayout";

const SubmitReport = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    reportType: "",
    title: "",
    description: "",
    location: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const reportTypes = [
    { value: "corruption", label: "Corruption or Fraud" },
    { value: "service", label: "Poor Service Delivery" },
    { value: "infrastructure", label: "Infrastructure Issue" },
    { value: "waste", label: "Wasteful Spending" },
    { value: "transparency", label: "Lack of Transparency" },
    { value: "other", label: "Other Issue" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate report submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Report Submitted Successfully",
        description: "Thank you for helping improve our services. We'll review your report shortly.",
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <CitizenLayout>
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-700">Report Submitted!</CardTitle>
              <CardDescription className="text-green-600">
                Your report has been successfully submitted and assigned a tracking number
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tracking Number:</span>
                  <span className="font-semibold">RPT-2024-{Math.floor(Math.random() * 100000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Report Type:</span>
                  <span className="font-semibold">
                    {reportTypes.find((t) => t.value === formData.reportType)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-yellow-600">Under Review</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span className="font-semibold">{new Date().toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>What happens next?</strong>
                  <br />
                  Your report will be reviewed by our team within 5-7 business days. You'll receive
                  updates via email at {formData.contactEmail}.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      reportType: "",
                      title: "",
                      description: "",
                      location: "",
                      contactName: "",
                      contactEmail: "",
                      contactPhone: "",
                    });
                  }}
                >
                  Submit Another Report
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => window.location.href = "/citizen"}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CitizenLayout>
    );
  }

  return (
    <CitizenLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Submit a Report
          </h1>
          <p className="text-muted-foreground mt-2">
            Help us improve government services by reporting issues or concerns
          </p>
        </div>

        {/* Alert */}
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-amber-900">Confidentiality Notice</p>
            <p className="text-amber-700">
              Your identity will be kept confidential. All reports are reviewed by authorized personnel
              only. For urgent matters, please call our hotline: 0800-123-456
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>
                Provide as much detail as possible to help us investigate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type *</Label>
                <Select
                  value={formData.reportType}
                  onValueChange={(value) => handleInputChange("reportType", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Report Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief summary of the issue"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail. Include dates, names (if applicable), and any relevant information..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location / Department</Label>
                <Input
                  id="location"
                  placeholder="e.g., Ministry of Health, Nairobi Office"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Attachment (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Contact Information (Optional)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Providing contact information helps us follow up, but it's not required.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Your Name</Label>
                    <Input
                      id="contactName"
                      placeholder="Full name"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email Address</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="+254 700 000 000"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </CitizenLayout>
  );
};

export default SubmitReport;
