export interface IEvent {
  _id: string;
  name: string;
  description: string;
  participants: Participant[];
}

export interface Participant {
  _id: string;
  name: string;
  destinations: Destination[];
}

export interface Destination {
  _id: string;
  name: string;
  img: string;
}
