export interface BalanceProps {
  name: string;
  description: string;
  initialValue: number;
  usedValue?: number;
  remainingValue: number;
  userId: string;
}
