import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();
(config as any).buildCommand = "echo 'Skipping build in OpenNext'";

export default config;


