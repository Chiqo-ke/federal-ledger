import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMinistries } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Wallet, TrendingUp } from 'lucide-react';
import AddMinistryDialog from '@/components/ministry/AddMinistryDialog';
import AllocateBudgetDialog from '@/components/ministry/AllocateBudgetDialog';

interface Ministry {
  id: number;
  name: string;
  code: string;
  wallet_address: string;
  allocated_budget: number;
  used_funds: number;
  remaining_balance: number;
  created_at: string;
}

export default function MinistriesGrid() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSuperAdmin } = useAuth();

  const loadMinistries = async () => {
    try {
      setLoading(true);
      const data = await getMinistries();
      setMinistries(data);
    } catch (error) {
      console.error('Failed to load ministries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMinistries();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading ministries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Ministries</h2>
          <p className="text-muted-foreground">Manage government ministries and budgets</p>
        </div>
        {isSuperAdmin && <AddMinistryDialog onSuccess={loadMinistries} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministries.map((ministry) => (
          <Card key={ministry.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{ministry.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">{ministry.code}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Wallet className="h-4 w-4 mr-1" />
                    Total Budget
                  </span>
                  <span className="font-semibold">
                    KES {ministry.allocated_budget.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Used Funds
                  </span>
                  <span className="font-semibold text-orange-600">
                    KES {ministry.used_funds.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-semibold text-green-600">
                    KES {ministry.remaining_balance.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Budget Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Budget Utilization</span>
                  <span>{ministry.allocated_budget > 0 ? Math.round((ministry.used_funds / ministry.allocated_budget) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${ministry.allocated_budget > 0 ? Math.min((ministry.used_funds / ministry.allocated_budget) * 100, 100) : 0}%`
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 text-xs text-muted-foreground">
                <p className="font-mono truncate" title={ministry.wallet_address}>
                  {ministry.wallet_address}
                </p>
              </div>

              {isSuperAdmin && (
                <AllocateBudgetDialog
                  ministryId={ministry.id}
                  ministryName={ministry.name}
                  onSuccess={loadMinistries}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {ministries.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Ministries Yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first ministry
            </p>
            {isSuperAdmin && <AddMinistryDialog onSuccess={loadMinistries} />}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
