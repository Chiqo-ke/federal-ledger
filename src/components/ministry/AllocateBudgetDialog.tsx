import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign } from 'lucide-react';
import { allocateBudget, getErrorMessage } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface AllocateBudgetDialogProps {
  ministryId: number;
  ministryName: string;
  onSuccess?: () => void;
}

export default function AllocateBudgetDialog({ ministryId, ministryName, onSuccess }: AllocateBudgetDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    fiscal_year: new Date().getFullYear().toString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const approvedBy = localStorage.getItem('office_name') || 'FinanceOffice';
      const response = await allocateBudget(ministryId, {
        amount: parseFloat(formData.amount),
        purpose: formData.purpose,
        fiscal_year: parseInt(formData.fiscal_year),
        approved_by: approvedBy,
      });
      
      toast({
        title: 'Budget Allocated',
        description: `KES ${parseFloat(formData.amount).toLocaleString()} allocated to ${ministryName}`,
      });
      
      setFormData({ amount: '', purpose: '', fiscal_year: new Date().getFullYear().toString() });
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      console.error('Budget allocation error:', errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <DollarSign className="mr-2 h-4 w-4" />
          Allocate Budget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Allocate Budget to {ministryName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fiscal_year">Fiscal Year</Label>
            <Input
              id="fiscal_year"
              type="number"
              min="2000"
              max="2100"
              placeholder="2025"
              value={formData.fiscal_year}
              onChange={(e) => setFormData({ ...formData, fiscal_year: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KES)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              placeholder="Describe the budget allocation purpose..."
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              required
              disabled={loading}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Allocating...' : 'Allocate Budget'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
