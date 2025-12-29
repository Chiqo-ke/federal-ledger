import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign } from 'lucide-react';
import { allocateBudget } from '@/services/api';
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await allocateBudget(ministryId, {
        amount: parseFloat(formData.amount),
        purpose: formData.purpose,
      });
      
      toast({
        title: 'Budget Allocated',
        description: `KES ${parseFloat(formData.amount).toLocaleString()} allocated to ${ministryName}`,
      });
      
      setFormData({ amount: '', purpose: '' });
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to allocate budget',
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
