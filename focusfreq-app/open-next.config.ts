import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // No R2 incremental cache for now (free tier trial)
  // Add `incrementalCache: r2IncrementalCache` when R2 bucket is available
});
