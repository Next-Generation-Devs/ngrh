import { renderHook, waitFor } from "@testing-library/react";
import useSocket from "hooks/use-socket";
import { describe, it, expect } from "vitest";
import { Socket } from "socket.io-client";

describe("useSocket", () => {
  it("should set isConnecting to true", () => {
    const { result } = renderHook(() =>
      useSocket("https://ngrh-test-server.onrender.com")
    );
    const { isConnecting } = result.current;
    expect(isConnecting).toBe(true);
  });
  it("should return the right socket object", async () => {
    const { result } = renderHook(() =>
      useSocket("https://ngrh-test-server.onrender.com")
    );
    waitFor(
      () => {
        const { socketRef, isConnecting, isDisconnected } = result.current;
        expect(socketRef.current).toBeInstanceOf(Socket);
        expect(isConnecting).toBe(false);
        expect(isDisconnected).toBe(false);
      },
      { timeout: 3000, interval: 1000 }
    );
  });
});
