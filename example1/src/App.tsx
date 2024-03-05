import { useEffect } from "react";
import { emitter } from "./services/emitter/emitter";
import { EventsEmitter } from "./services/emitter/emitter.types";
import { EventSubscription } from "fbemitter";

export const App = () => {
  useEffect(() => {
    const listeners: EventSubscription[] = [];

    const testEventListener = emitter.addListener(
      EventsEmitter.TEST_EVENT,
      () => {
        console.log("without payload");
      }
    );

    const testEvent2Listener = emitter.addListener(
      EventsEmitter.TEST_EVENT2,
      (payload) => {
        console.log("with payload", payload);
      }
    );

    listeners.push(testEventListener, testEvent2Listener);

    return () => {
      listeners.forEach((listener) => listener.remove());
    };
  }, []);

  const sendEventWithoutPayload = () => {
    emitter.emit(EventsEmitter.TEST_EVENT);
  };

  const sendEventWithPayload = () => {
    emitter.emit(EventsEmitter.TEST_EVENT2, "test");
  };

  return (
    <>
      <button type="button" onClick={sendEventWithoutPayload}>
        Send Event Without Required Payload
      </button>
      <button type="button" onClick={sendEventWithPayload}>
        Send Event With Required Payload
      </button>
    </>
  );
};
