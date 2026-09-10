import { createFileRoute } from "@tanstack/react-router";
import App from "../App";
import "../styles/global.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CryptoWave — Decentralized Future Cryptocurrency Assets" },
      {
        name: "description",
        content:
          "CryptoWave — a decentralized platform for managing, swapping and tracking cryptocurrency assets.",
      },
      { property: "og:title", content: "CryptoWave — Decentralized Future Cryptocurrency Assets" },
      {
        property: "og:description",
        content:
          "CryptoWave — a decentralized platform for managing, swapping and tracking cryptocurrency assets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
