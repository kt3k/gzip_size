import { parse } from "https://deno.land/std@0.121.0/flags/mod.ts";
import { gzipSize } from "./mod.ts";
import { prettyBytes } from "https://deno.land/std@0.121.0/fmt/bytes.ts";

type Args = {
  decimal: boolean;
  help: boolean;
  level: string;
  "include-original": boolean;
  raw: boolean;
  _: string[];
};
const {
  decimal,
  help,
  level,
  "include-original": includeOriginal,
  raw,
  _: args,
} = parse(Deno.args, {
  string: ["level"],
  boolean: ["decimal", "help", "raw", "include-original"],
  alias: {
    h: "help",
    d: "decimal",
  },
}) as Args;

if (help) {
  console.log(`Usage: gzip_size [options] <filename>

Options:
  --level             Compression level [0-9] (Default: 9)
  --raw               Display value in bytes
  --include-original  Include original size
  -d, --decimal       Uses decimal byte units (e.g. kilobyte, megabyte).
                      Default is false.

Note: The sizes are shown in binary byte units by default (e.g. kibibyte, mebibyte)

Examples
  $ gzip-size unicorn.png
  347 kiB
  $ gzip-size unicorn.png --raw
  355041
  $ gzip-size unicorn.png --include-original
  357 kiB → 347 kiB
  $ gzip-size unicorn.png --include-original -d
  365 kB → 355 kB`);
  Deno.exit(0);
}

if (args.length === 0) {
  console.log("Error: No file is given");
  console.log("Usage: gzip_size [options] <filename>");
  Deno.exit(1);
}

let bytes: Uint8Array;
try {
  bytes = await Deno.readFile(args[0]);
} catch (e) {
  if (e.name === "PermissionDenied") {
    console.log(e);
    Deno.exit(1);
  }
  console.log(`Error: Cannot read file "${args[0]}"`);
  console.log("Usage: gzip_size [options] <filename>");
  Deno.exit(1);
}

const originalLength = bytes.byteLength;
const gzippedSize = gzipSize(bytes, { level: +level || 9 });

const binary = !decimal;

if (includeOriginal && raw) {
  console.log(originalLength + " → " + gzippedSize);
} else if (includeOriginal) {
  console.log(
    prettyBytes(originalLength, { binary }),
    "→",
    prettyBytes(gzippedSize, { binary }),
  );
} else if (raw) {
  console.log(String(gzippedSize));
} else {
  console.log(prettyBytes(gzippedSize, { binary }));
}
