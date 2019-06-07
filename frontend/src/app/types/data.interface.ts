export interface Data {
  sourceId: number;
  destinationId: number;
  sourceName: string;
  destinationName: string;
  meanTravelTime: number;
  hourOfDay?: number;
}
