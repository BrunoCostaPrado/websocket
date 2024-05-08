import * as devalue from "devalue"
import * as esbuild from "esbuild"

import fs from "node:fs"

const result = await esbuild.build({
	entryPoints: ["src/server.ts"],
	bundle: true,
	outdir: "build/",
	minify: true,
	packages: "external",
	format: "esm",
	metafile: true,
	platform: "node",
	splitting: true,
	tsconfig: "tsconfig.json",
	// sourcemap: true,
	minifyIdentifiers: true,
	minifySyntax: true
})

fs.writeFileSync("meta.json", JSON.stringify(result.metafile))
fs.writeFileSync("meta.json", devalue.stringify(result.metafile))
console.log(await esbuild.analyzeMetafile(result.metafile))
