import { EventEmitter, EventSubscription } from "fbemitter";
import { AddListenerFunction, EmitFunction, EventsType } from "./emitter.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createEventEmitter = <T extends Record<string, any>>(
  emitter: EventEmitter
): {
  emit: EmitFunction<T>;
  addListener: AddListenerFunction<T>;
} => {
  const emit: EmitFunction<T> = (eventName, ...eventArg) => {
    emitter.emit(eventName, ...(eventArg as []));
  };

  const addListener: AddListenerFunction<T> = (
    eventName,
    handler
  ): EventSubscription => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return emitter.addListener(eventName, handler as any);
  };

  return { emit, addListener };
};

export const emitter = createEventEmitter<EventsType>(new EventEmitter());
