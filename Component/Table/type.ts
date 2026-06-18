export interface Column<T> {
  key: keyof T | string;
  title: string;
  className?: string;
  numbering?: boolean;

  render?: (row: T, index: number) => React.ReactNode;
}
