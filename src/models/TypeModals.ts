export interface TypeModal {
  id: string;
  name: string;
  status: string;
  data?: Record<string, any>;
}

export type TypeModals = TypeModal[];
