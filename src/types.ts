export type UnSubscribe = () => void;

export type EventValue<
  T extends Record<string, any>,
  K extends Events<T>["type"]
  > = Extract<Events<T>, { type: K }>["value"];

export type TypeOfEvents<T extends Record<string, any>> = Events<T>["type"];


export type PubSub<T extends Record<string, any>> = {
  publish: <E extends TypeOfEvents<T>>(e: E, data: EventValue<T, E>) => void;

  listen: <E extends TypeOfEvents<T>>(
    event: E,
    handler: Handler<T, E>
  ) => UnSubscribe;

  getListenerCount: () => number;

  getListenerCountByEvent: (e: keyof T) => number;

  getEventListenerCount: () => Map<
    keyof T, number
  >;
};

export type Events<T extends Record<string, any>> = {
  [X in keyof T]: {
    type: X;
    value: T[X];
  };
}[keyof T];

export type Handler<
  T extends Record<string, any>,
  K extends TypeOfEvents<T>
> = (data: EventValue<T, K>) => void;

export type Listener<
  T extends Record<string, any>,
  E extends TypeOfEvents<T>
> = {
  id: string;
  type: E;
  handler: Handler<T, E>;
};
