import { describe, it, expect, expectTypeOf } from "vitest";
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

    pubsub.listen("CHECKOUT", (d) => {
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
});
