export interface IStateSlice<T> {
  loading: boolean;
  data?: T | null;
  error?: string | null;
}
