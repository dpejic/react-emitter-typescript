export enum EventsEmitter {
  TEST_EVENT = "TEST_EVENT",
  TEST_EVENT2 = "TEST_EVENT2",
}

interface IEventPayload {
  [EventsEmitter.TEST_EVENT2]: string;
}

type EventPayloadMap = {
  [K in keyof IEventPayload]: K;
};

export type EventPayload<T> = T extends keyof EventPayloadMap
  ? IEventPayload[T]
  : undefined;

export type EventsWithPayload = {
  [K in keyof EventPayloadMap]: K;
}[keyof EventPayloadMap];
