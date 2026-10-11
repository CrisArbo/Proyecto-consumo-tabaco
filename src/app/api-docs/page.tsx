"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function ApiDocsPage() {
  useEffect(() => {
    const getBundle = () =>
      (window as unknown as { SwaggerUIBundle?: (config: Record<string, unknown>) => void })
        .SwaggerUIBundle;

    const init = () => {
      const bundle = getBundle();
      if (bundle) {
        bundle({
          url: "/api/v1/openapi.json",
          dom_id: "#swagger-ui",
          docExpansion: "list",
          deepLinking: true,
          defaultModelsExpandDepth: -1,
          displayRequestDuration: true,
        });
      }
    };

    if (getBundle()) {
      init();
      return;
    }

    window.addEventListener("swagger-ui-ready", init);
    return () => window.removeEventListener("swagger-ui-ready", init);
  }, []);

  return (
    <div style={{ background: "#fff", color: "#000", flex: "1 1 auto", colorScheme: "light" }}>
      <style>{".swagger-ui .topbar { display: none; }"}</style>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
      <Script
        id="swagger-ui-bundle-script"
        src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"
        onLoad={() => window.dispatchEvent(new Event("swagger-ui-ready"))}
      />
      <div id="swagger-ui" />
    </div>
  );
}
