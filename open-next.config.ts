import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No R2 or other cache binding. Incremental cache stays on the default (no paid storage).
export default defineCloudflareConfig();
