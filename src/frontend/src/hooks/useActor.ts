// Shim: pre-bound useActor for this project
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActor as useActorLib } from "@caffeineai/core-infrastructure";
import { createActor as backendCreateActor } from "../backend";

// Adapt the backend createActor to the library's expected signature
const boundCreateActor = (
  canisterId: string,
  uploadFile: (file: any) => Promise<Uint8Array>,
  downloadFile: (file: Uint8Array) => Promise<any>,
  options: any,
) => {
  return backendCreateActor(canisterId, uploadFile, downloadFile, options);
};

export function useActor() {
  return useActorLib(boundCreateActor as any);
}
