# kontent-ai-astro

An integration inspired by Contentful for astro for those using Kontent.ai as their headless CMS and wish to map Content Models to their Astro components.

## Installation

Install `@simply007org/kontent-ai-astro`:

```bash
npm install @simply007org/kontent-ai-astro
```

Add the following code to `astro.config.mjs`

```js
import { defineConfig } from "astro/config";
import kontentAiAstro from "kontent-ai-astro";

export default defineConfig({
  integrations: [
    kontentAiAstro({
      environmentId: "ENVIRONMENT_ID",
      previewApiKey: "PREVIEW_API_KEY",
      secureApiKey: "SECURE_API_KEY",
      components: {
        // add your components here
      },
    }),
  ],
});
```

## How to set it up

Add your Kontent.ai `environmentId` (previewApiKey & secureApiKey is currently ignored).

Hopefully you will have created a component for each Content Model you have in Kontent.ai. This configuration allows you to effectively register all your components so that when Kontent.ai is rendering your page it has them all available to use.

Edit the config you added earlier to include each component by name and path (exlcuding the `src` part of the path):

```javascript
components: {
  page: "components/Page/Page",
  hero: "components/Hero/Hero"
},
```

This is just an example structure for a components location, but choose whatever the path is for where you store your components. As long as they exist inside the `src` folder they will be found.

Once you've registered your components in the `astro.config.mjs` file, you can use `<KontentAiComponent />` that comes with this package, to ensure that all your content will get correctly rendered from Kontent.ai with their correlating component.

The example below shows a potential idea for looping through components and using the `<KontentAiComponent />` to render each one.

```jsx
---
import KontentAiComponent from '@simply007org/kontent-ai-astro/KontentAiComponent.astro';
import { useKontentAiClient } from "@simply007org/kontent-ai-astro";

const deliveryClient = useKontentAiClient();

const response = await deliveryClient
  .types(["page", "hero"]) // depends what you want to fetch and have registered the components for
  .depthParameter(1)
  .toAllPromise();

const items  =  response.data.items;
---

<>
  {items?.map((item) => {
    return <KontentAiComponent type={item.system.type} {...item.elements} />
  })}
</>
```

## Wall of fame

Thank you @ajsummerfield for putting together the [Contentful integration](https://github.com/ajsummerfield/contentful-astro) I can customize.