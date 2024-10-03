# SumoBubble Web Component

## Dev

Of course start with a good old `npm install`

Then in one terminal (chat root) do `npm run dev` This will run the html server serving up the full build of the component. 

In another terminal (chat root as well) do `npm run watch` to watch build the component to refresh on changes. 

Navigate to localhost:5173/app/local.html (or deployed.html for the real one) to test.

## Install

Install on a page by inserting this code into the page html.

```
<script type="module" 
  src="https://sumobubble-app-bukyz.ondigitalocean.app/wc/sumobubble.js" 
  id="sumobubble-scriptastic">
</script>
<sumobubble-wc site="SITE_ID"/>
```

Enjoy.