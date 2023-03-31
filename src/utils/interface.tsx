export interface IEvent {
  _id: string;
  name: string;
  description: string;
  participants: IParticipant[];
}

export interface IParticipant {
  _id: string;
  name: string;
  destinations: IDestination[];
}

export interface IDestination {
  _id: string;
  name: string;
  img: string;
}
