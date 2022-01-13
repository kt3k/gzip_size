# gzip_size v0.2.3

[![ci](https://github.com/kt3k/gzip_size/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/gzip_size/actions/workflows/ci.yml)

> Shows the gzipped size of the given file

# CLI usage

You can install the command with the following command

```sh
deno install -qf --allow-read https://deno.land/x/gzip_size@v0.2.3/cli.ts
```

```shellsession
$ gzip_size tiger.svg
347 kiB
$ gzip_size tiger.svg --raw
355041
$ gzip_size tiger.svg --include-original
357 kiB → 347 kiB
$ gzip_size tiger.svg --include-original --decimal
365 kB → 355 kB
```

See `gzip_size -h` for more details.

# API usage

```ts
import { gzipSize } from "https://deno.land/x/gzip_size@v0.2.3/mod.ts";

gzipSize(bytes);
// returns gzipped size of the bytes
```

# License

MIT
