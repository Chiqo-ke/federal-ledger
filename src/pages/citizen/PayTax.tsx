import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Shield, CheckCircle2 } from "lucide-react";
import { CitizenLayout } from "@/components/layout/CitizenLayout";

const PayTax = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    taxpayerName: "",
    idNumber: "",
    taxType: "",
    amount: "",
    phoneNumber: "",
    email: "",
  });

  const taxTypes = [
    { value: "income", label: "Income Tax (PAYE)" },
    { value: "vat", label: "Value Added Tax (VAT)" },
    { value: "corporate", label: "Corporate Tax" },
    { value: "property", label: "Property Tax" },
    { value: "excise", label: "Excise Duty" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      toast({
        title: "Payment Successful!",
        description: `Your tax payment of KES ${parseFloat(formData.amount).toLocaleString()} has been processed.`,
      });
    }, 2000);
  };

  if (step === 3) {
    return (
      <CitizenLayout>
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-700">Payment Successful!</CardTitle>
              <CardDescription className="text-green-600">
                Your tax payment has been processed successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receipt Number:</span>
                  <span className="font-semibold">TX-2024-{Math.floor(Math.random() * 100000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxpayer Name:</span>
                  <span className="font-semibold">{formData.taxpayerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax Type:</span>
                  <span className="font-semibold">
                    {taxTypes.find((t) => t.value === formData.taxType)?.label}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Amount Paid:</span>
                  <span className="font-bold text-green-600">
                    KES {parseFloat(formData.amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => window.print()}>
                  Download Receipt
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      taxpayerName: "",
                      idNumber: "",
                      taxType: "",
                      amount: "",
                      phoneNumber: "",
                      email: "",
                    });
                  }}
                >
                  Make Another Payment
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
            <CreditCard className="h-8 w-8" />
            Pay Your Taxes
          </h1>
          <p className="text-muted-foreground mt-2">
            Secure online tax payment system powered by blockchain technology
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-primary text-white" : "bg-gray-200"
              }`}>
                1
              </div>
              <span className={step >= 1 ? "font-semibold" : "text-muted-foreground"}>
                Details
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-primary text-white" : "bg-gray-200"
              }`}>
                2
              </div>
              <span className={step >= 2 ? "font-semibold" : "text-muted-foreground"}>
                Payment
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-primary text-white" : "bg-gray-200"
              }`}>
                3
              </div>
              <span className={step >= 3 ? "font-semibold" : "text-muted-foreground"}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        {step === 1 && (
          <form onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}>
            <Card>
              <CardHeader>
                <CardTitle>Taxpayer Information</CardTitle>
                <CardDescription>Enter your details to proceed with payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="taxpayerName">Full Name *</Label>
                    <Input
                      id="taxpayerName"
                      placeholder="John Doe"
                      value={formData.taxpayerName}
                      onChange={(e) => handleInputChange("taxpayerName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number / KRA PIN *</Label>
                    <Input
                      id="idNumber"
                      placeholder="A000000000A"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange("idNumber", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxType">Tax Type *</Label>
                  <Select
                    value={formData.taxType}
                    onValueChange={(value) => handleInputChange("taxType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax type" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (KES) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900">Secure Payment</p>
                    <p className="text-blue-700">
                      All payments are encrypted and recorded on the blockchain for transparency and
                      security.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="submit">Continue to Payment</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border-2 border-primary rounded-lg p-4 cursor-pointer hover:bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold text-lg">M</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">M-Pesa</p>
                        <p className="text-sm text-muted-foreground">Pay via M-Pesa mobile money</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Pay with Visa or Mastercard</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold">Payment Summary</h3>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax Type:</span>
                    <span className="font-medium">
                      {taxTypes.find((t) => t.value === formData.taxType)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">
                      KES {parseFloat(formData.amount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Fee:</span>
                    <span className="font-medium">KES 0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-primary">
                      KES {parseFloat(formData.amount).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      "Confirm Payment"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        )}
      </div>
    </CitizenLayout>
  );
};

export default PayTax;
