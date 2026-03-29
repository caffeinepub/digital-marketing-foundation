import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export type CheckoutSession = {
  id: string;
  url: string;
};

export type ShoppingItem = {
  name: string;
  description: string;
  amount: number;
  currency: string;
  quantity: number;
};

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (items: ShoppingItem[]): Promise<CheckoutSession> => {
      if (!actor) throw new Error("Actor not available");
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      const result = await (actor as any).createCheckoutSession(
        items,
        successUrl,
        cancelUrl,
      );
      const session = JSON.parse(result) as CheckoutSession;
      if (!session?.url) {
        throw new Error("Stripe session missing url");
      }
      return session;
    },
  });
}

export function useStripeConfig() {
  const { actor } = useActor();

  const checkConfigured = async (): Promise<boolean> => {
    if (!actor) return false;
    try {
      return await (actor as any).isStripeConfigured();
    } catch {
      return false;
    }
  };

  const configure = async (
    secretKey: string,
    allowedCountries: string[],
  ): Promise<void> => {
    if (!actor) throw new Error("Actor not available");
    await (actor as any).setStripeConfiguration({
      secretKey,
      allowedCountries,
    });
  };

  return { checkConfigured, configure };
}
