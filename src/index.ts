import { v4 } from "uuid";
import { Listener, PubSub } from "./types";

export const createPubSub = <T extends Record<string, any> = {}>(): PubSub<T> => {
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

    getListenerCount: () => {
      return listeners.length;
    },

    getListenerCountByEvent: (e) => {
      return listeners.filter((l) => l.type === e).length;
    },

    getEventListenerCount: () => {
      const data = new Map<keyof T, number>();

      for (const listener of listeners) {
        const count = data.get(listener.type) || 0;
        data.set(listener.type, count + 1);
      }

      return data;
    },
  };
};
