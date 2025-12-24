
export interface Participant {
  id: string;
  name: string;
  isDuplicate: boolean;
}

export interface Group {
  id: number;
  members: string[];
}

export enum AppTab {
  LIST = 'list',
  DRAW = 'draw',
  GROUPING = 'grouping'
}
