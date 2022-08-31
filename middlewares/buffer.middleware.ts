export const bufferMiddleware = () => ({
  inbound(message: Buffer) {
    return message.toString();
  },
  outbound(message: Record<string, any>) {
    return message.toString();
  },
});
