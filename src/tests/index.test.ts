import { describe, it, expectTypeOf, expect } from "vitest";
import { createPubSub } from "..";
import { PubSub } from "../types";

describe("pubsub test", () => {
  type MyEvents = {
    LOGIN: {
      name: string;
      email: string;
    };
    CHECKOUT: {
      price: number;
    };
  };
  it("Should be able to inherit types", () => {
    const pubsub = createPubSub<MyEvents>();

    expectTypeOf(pubsub).toMatchTypeOf<PubSub<MyEvents>>();
  });

  it("Should properly receive and publish events", () => {
    const pubsub = createPubSub<MyEvents>();

    pubsub.listen("CHECKOUT", (d) => {
      console.log(d.price);
      expectTypeOf(d).toMatchTypeOf<MyEvents["CHECKOUT"]>();
    });

    pubsub.publish("CHECKOUT", {
      price: 2,
    });
  });

  it("Should work with multiple consumers", () => {
    const pubsub = createPubSub<MyEvents>();

    pubsub.listen("CHECKOUT", (_) => {
      console.log("First");
    });

    pubsub.listen("CHECKOUT", (d) => {
      console.log("Second");
      expectTypeOf(d).toMatchTypeOf<MyEvents["CHECKOUT"]>();
    });

    pubsub.publish("CHECKOUT", {
      price: 2,
    });
  });

  it("Unsub feature should work", () => {
    const pubsub = createPubSub<MyEvents>();

    const unsub = pubsub.listen("LOGIN", (d) => {
      console.log(d.email, d.name);
    });

    pubsub.publish("LOGIN", {
      name: "Test",
      email: "test@test.co",
    });

    unsub();

    pubsub.publish("LOGIN", {
      name: "Test",
      email: "test@test.co",
    });
  });

  it("Should get correct listener count", () => {
    const pubusb = createPubSub<MyEvents>();

    pubusb.listen("CHECKOUT", (_) => {});

    pubusb.listen("CHECKOUT", (_) => {});

    const unsub = pubusb.listen("CHECKOUT", (_) => {});
    unsub();

    expect(pubusb.getListenerCount()).toBe(2);
  });

  it("Should return correct event and listener map", () => {
    const pubusb = createPubSub<MyEvents>();

    pubusb.listen("CHECKOUT", (d) => {
      console.log(d);
    });

    pubusb.listen("CHECKOUT", (_) => {});

    pubusb.listen("LOGIN", (d) => {
      console.log(d.name + " welcome!");
    });

    const map = new Map<keyof MyEvents, number>();
    map.set("LOGIN", 1);
    map.set("CHECKOUT", 2);

    expect(pubusb.getEventListenerCount()).toStrictEqual(map);
  });

  it("Should give type error if no generic passed", () => {
    const pubusb = createPubSub();

    // @ts-expect-error - Cannot listen to any events because no generic passed
    pubusb.listen("INVALID", (d) => {});
  });
});
