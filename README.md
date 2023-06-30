![maintenance-status](https://img.shields.io/badge/maintenance-actively--developed-brightgreen.svg)

# TypeSub

TypeSub is a very basic yet strongly typed pubsub system for typescript

## Running Tests

To run tests, run the following command

```bash
  pnpm run test
```

## Installation

Install typesub with npm, yarn or pnpm etc

```bash
  pnpm install @typedts/typesub
```

## Examples

Create a pubsub instance using a type

```javascript
    const pubsub = createPubsub<MyEvents>();
```

Now you can listen on your events safely

```javascript
    pubusb.listen("LOADING_DONE", (data) => {
    console.log(data.id);
    console.log(data.place);
    });

    // Registering multiple listeners</span>

    pubusb.listen("LOADING_DONE", (data) => {
    console.log("Second listener");
    });
```

To publish events

```javascript
    pubsub.publish("LOADING_DONE", {
    id: "1",
    place: "base.ts",
    });
```

## Unsubscribing

Unsubscribe to events that you no more want or dont want to listen to

```javascript
    const unsub = pubsub.listen("LOADING_DONE", (data) => ...);
    unsub();
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
