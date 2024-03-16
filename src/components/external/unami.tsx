import Script from "next/script";

export default function Unami() {
  return (
    process.env.NODE_ENV === "production" && (
      <Script
        defer
        src="https://eu.umami.is/script.js"
        data-website-id="fa03eb8d-13e4-469d-b119-386ed291ac64"
      />
    )
  );
}
