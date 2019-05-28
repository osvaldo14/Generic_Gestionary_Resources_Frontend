export interface Reservation {
  id: number;
  name: string;
  resourceList: string[];
  start: Date;
  end: Date;
}
