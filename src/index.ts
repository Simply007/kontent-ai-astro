
import type { AstroIntegration } from "astro";
import type { DeliveryClient, IDeliveryClientConfig } from "@kontent-ai/delivery-sdk";
import { vitePluginKontentAiClient } from "./vitePluginKontentAiClient";
import { vitePluginKontentAiComponents } from "./vitePluginKontentAiComponents";

export type IntegrationOptions = {
  deliveryClientConfig: IDeliveryClientConfig,
  components?: object;
};

export const useKontentAiClient = (): DeliveryClient => {
  return globalThis.kontentAiClient;
}

export default function kontentAiIntegration(options: IntegrationOptions): AstroIntegration {
  return {
    name: "kontent-ai-astro",
    hooks: {
      "astro:config:setup": ({ updateConfig, injectScript }) => {
        updateConfig({
          vite: {
            plugins: [
              vitePluginKontentAiClient(options.deliveryClientConfig),
              vitePluginKontentAiComponents(options.components)
            ]
          },
        });

        injectScript(
          "page-ssr",
          `
            import { kontentAiClient } from "virtual:kontent-ai-client";
            globalThis.kontentAiClient = kontentAiClient;
          `
        );
      },
    },
  };
}
