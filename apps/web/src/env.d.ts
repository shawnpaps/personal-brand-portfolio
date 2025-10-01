/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare interface ImportMetaEnv {
	readonly PAYLOAD_API_URL?: string;
	readonly PAYLOAD_PREVIEW_SECRET?: string;
}

declare interface ImportMeta {
	readonly env: ImportMetaEnv;
}
