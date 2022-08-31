export const jsonMiddleware = () => ({
  inbound(message: Buffer) {
    return JSON.parse(message.toString());
  },
  outbound(message: Record<string, any>) {
    return Buffer.from(JSON.stringify(message))
  }
});
