import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SystemStatusProps {
  walletCount?: number;
  blockCount?: number;
  isLoading?: boolean;
}

const SystemStatus = ({ walletCount, blockCount, isLoading }: SystemStatusProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Wallets</span>
              <span>{walletCount?.toLocaleString() ?? 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Blocks</span>
              <span>{blockCount?.toLocaleString() ?? 'N/A'}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { SystemStatus };
