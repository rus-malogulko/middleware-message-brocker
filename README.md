# ZeroMQ client-server

This project describes the middleware pattern that might be used along with message broker (ZeroMQ) as a transport.

## Meaningful parts

### MiddlewareManager.ts

Works as a main entry point which maintains middlewares management on both sides (request/response).
This approach works well if you need adding some transport compression or encoding before sending
message to message broker. And maintains vice-versa operations based on described in middleware logic.

### *.middleware.ts

Conventional function that should return object with two keys (inbound/outbound). Based on that convetion the MiddlewareManager would add corresponding part to inbound/outbound middleware set to be applied to messages in ZMQ.

## How to run

Rename `.env.sample` to `.env`.

```bash
npm run server
```

open another terminal and

```bash
npm run client
```
