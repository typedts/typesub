import { v4 } from "uuid";
import { Listener, PubSub } from "./types";

export const createPubSub = <T extends Record<string, any>>(): PubSub<T> => {
  let listeners: Listener<T, any>[] = [];

  return {
    publish: (e, d) => {
      const subs = listeners.filter((l) => l.type === e);

      subs.forEach((s) => s.handler(d));
    },

    listen: (e, h) => {
      const id = v4();
      listeners.push({
        id,
        type: e,
        handler: h,
      });

      return () => {
        listeners = listeners.filter((l) => l.id !== id);
      };
    },
  };
};
