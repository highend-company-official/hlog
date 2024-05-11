export type APIResponse<DataType, ErrorType = void> = {
  data: DataType;
  error: ErrorType;
};
