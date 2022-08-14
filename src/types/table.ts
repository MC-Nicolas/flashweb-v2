export interface tableRow {
  id: string;
  name: string;
  value:
    | string
    | number
    | { min: number; max: number }
    | { firstOp: string; secondOp: string; operator: string };
  symbol: string;
  type: string;
}
[];
