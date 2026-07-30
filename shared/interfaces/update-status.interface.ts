export interface UpdateStatus {
  status: UpdateStatusEnum;

  progress?: number;
  version?: string;
}

export enum UpdateStatusEnum {
  downloading = "A Transferir",
  downloaded = "Terminado"
}
