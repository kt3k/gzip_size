import { parse } from "https://deno.land/std@0.106.0/flags/mod.ts";
import { gzipSize } from "./mod.ts";
import { prettyBytes } from "https://deno.land/x/pretty_bytes@v1.0.4/mod.ts";

type Args = {
  help: boolean;
  level: string;
  "include-original": boolean;
  raw: boolean;
  _: string[];
}
const {
  help,
  level,
  "include-original": includeOriginal,
  raw,
  _: args,
} = parse(Deno.args, {
  string: ["level"],
  boolean: ["help", "raw", "include-original"],
  alias: {
    h: "help",
  },
}) as Args;

if (help) {
  console.log(`Usage: gzip_size [options] <filename>

Options:
  --level             Compression level [0-9] (Default: 9)
  --raw               Display value in bytes
  --include-original  Include original size

Examples
  $ gzip-size unicorn.png
  192 kB
  $ gzip-size unicorn.png --raw
  192256
  $ gzip-size unicorn.png --include-original
  392 kB → 192 kB`);
  Deno.exit(0);
}

if (args.length === 0) {
  console.log("Error: No file is given");
  console.log("Usage: gzip_size [options] <filename>")
  Deno.exit(1);
}

let bytes: Uint8Array
try {
  bytes = await Deno.readFile(args[0]);
} catch (e) {
  if (e.name === "PermissionDenied") {
    console.log(e);
    Deno.exit(1);
  }
  console.log(`Error: Cannot read file "${args[0]}"`)
  console.log("Usage: gzip_size [options] <filename>")
  Deno.exit(1);
}

const originalLength = bytes.byteLength;
const gzippedSize = gzipSize(bytes, { level: +level || 9 });

if (includeOriginal && raw) {
  console.log(originalLength + ' → ' + gzippedSize);
} else if (includeOriginal) {
  console.log(prettyBytes(originalLength), '→', prettyBytes(gzippedSize));
} else if (raw) {
  console.log(String(gzippedSize));
} else {
  console.log(prettyBytes(gzippedSize));
}
