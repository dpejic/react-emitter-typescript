import { EventSubscription } from "fbemitter";

export enum EventsEmitter {
  TEST_EVENT = "TEST_EVENT",
  TEST_EVENT2 = "TEST_EVENT2",
}

export type EventsType = {
  [EventsEmitter.TEST_EVENT]: [];
  [EventsEmitter.TEST_EVENT2]: [payload: string];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EmitFunction<TEvents extends Record<string, any>> = <
  TEventName extends keyof TEvents & string
>(
  eventName: TEventName,
  ...eventArg: TEvents[TEventName]
) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AddListenerFunction<TEvents extends Record<string, any>> = <
  TEventName extends keyof TEvents & string
>(
  eventName: TEventName,
  handler: (...eventArg: TEvents[TEventName]) => void
) => EventSubscription;
