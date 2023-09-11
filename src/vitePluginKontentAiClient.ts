import { IDeliveryClientConfig } from "@kontent-ai/delivery-sdk";

export function vitePluginKontentAiClient(config: IDeliveryClientConfig) {
  const virtualModuleId = 'virtual:kontent-ai-client';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-kontent-ai-client',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `
          import { createDeliveryClient } from "@kontent-ai/delivery-sdk";
          
          export const kontentAiClient = createDeliveryClient(${JSON.stringify(config, undefined, 2)});
        `;
      }
    },
  };
}
