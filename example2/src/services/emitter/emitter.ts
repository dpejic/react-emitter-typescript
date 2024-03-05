import { EventEmitter, EventSubscription } from "fbemitter";

import {
  EventPayload,
  EventsWithPayload,
  EventsEmitter,
} from "./emitter.types";

const createEventEmitter = (emitter: EventEmitter) => {
  function addListener<T extends EventsWithPayload>(
    event: T,
    callback: (payload: EventPayload<T>) => void
  ): EventSubscription;
  function addListener(
    event: Exclude<EventsEmitter, EventsWithPayload>,
    callback: () => void
  ): EventSubscription;
  function addListener<T extends EventsEmitter>(
    event: T,
    callback: (payload: EventPayload<T>) => void
  ): EventSubscription {
    return emitter.addListener(event, callback);
  }

  function emit<T extends EventsWithPayload>(
    event: T,
    payload: EventPayload<T>
  ): void;
  function emit(event: Exclude<EventsEmitter, EventsWithPayload>): void;
  function emit<T extends EventsEmitter>(
    event: T,
    payload?: EventPayload<T>
  ): void {
    if (payload !== undefined) {
      emitter.emit(event, payload);
    } else {
      emitter.emit(event);
    }
  }

  return {
    emit,
    addListener,
  };
};

export const emitter = createEventEmitter(new EventEmitter());
