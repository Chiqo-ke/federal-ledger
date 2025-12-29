import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from '@/services/api';
import { Skeleton } from "@/components/ui/skeleton";

interface ActivityPanelProps {
  transactions?: Transaction[];
  isLoading?: boolean;
}

const ActivityPanel = ({ transactions, isLoading }: ActivityPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            {transactions?.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Transaction {tx.id}</p>
                  <p className="text-sm text-muted-foreground">
                    From: {tx.sender.substring(0, 10)}... To: {tx.recipient.substring(0, 10)}...
                  </p>
                </div>
                <p className="font-medium">${tx.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { ActivityPanel };
