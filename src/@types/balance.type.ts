export interface BalanceProps {
  balanceId: string;
  name: string;
  description: string;
  initialValue: number | string;
  usedValue?: number | string;
  remainingValue: number | string;
  userId: string;
}
