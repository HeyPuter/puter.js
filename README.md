<h3 align="center">Puter.js</h3>
<h4 align="center">Cloud and AI features right in your frontend app!</h4>
<p align="center">
    <a href="https://docs.puter.com/playground/"><strong>« LIVE DEMO »</strong></a>
    <br />
    <br />
    <a href="https://docs.puter.com">Docs</a>
    ·
    <a href="https://puter.com">Puter.com</a>
    ·
    <a href="https://discord.com/invite/PQcx7Teh8u">Discord</a>
    ·
    <a href="https://reddit.com/r/puter">Reddit</a>
    ·
    <a href="https://twitter.com/HeyPuter">X (Twitter)</a>
</p>

## Run development server

```
npm start
```

With every change made to the source code, the development server will automatically re-build the project as well.

## Build

```
npm run build
```

### Example
Make sure the development server is running. 

```html
<html>
<body>
    <script src="http://127.0.0.1:8080/dist/puter.dev.js"></script>
    <script>
        // Loading ...
        puter.print(`Loading...`);

        // Chat with GPT-3.5 Turbo
        puter.ai.chat(`What color was Napoleon's white horse?`).then((response) => {
            puter.print(response);
        });
    </script>
</body>
</html>
```
