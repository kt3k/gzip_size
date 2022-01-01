# gzip_size v0.2.3

[![ci](https://github.com/kt3k/gzip_size/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/gzip_size/actions/workflows/ci.yml)

> Shows the gzipped size of the given file

# CLI usage

You can install the command with the following command

```sh
deno install -qf --allow-read https://deno.land/x/gzip_size@v0.2.3/cli.ts
```

```shellsession
$ gzip_size myscript.js
1.67 kB
$ gzip_size --include-original myscript.js
4.04 kB → 1.67 kB
$ gzip_size --raw myscript.js
1671
$ gzip_size --include-original --raw myscript.js
4041 → 1671
```

# API usage

```ts
import { gzipSize } from "https://deno.land/x/gzip_size@v0.2.3/mod.ts";

gzipSize(bytes);
// returns gzipped size of the bytes
```

# License

MIT
