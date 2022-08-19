import React from "react";
import logo from "./logo.svg";
import "./App.css";
import * as Sentry from "@sentry/browser";
import * as Sentry2 from "sentry2";

declare global {
  interface Window {
    __SENTRY__: any;
  }
}

Sentry.init({
  dsn: "https://123@sentry.io/456",
  integrations: [new Sentry.Dedupe()],
  defaultIntegrations: false,
  debug: true,
  beforeSend(event) {
    console.log("customer sentry", event);
    return null;
  },
});

const client1 = new Sentry2.BrowserClient({
  dsn: "https://123@sentry.io/123",
  integrations: [new Sentry2.Integrations.Dedupe()],
  beforeSend(event) {
    console.log("js client sentry", event);
    return null;
  },
});

new Sentry2.Hub(client1);

console.log(
  "There should only be one integration, but there are two.",
  window.__SENTRY__.globalEventProcessors
);

Sentry.captureException(new Error("error!"));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
