# OpenRPC Etheruem Provider Generator

A Generator tool for the [open-rpc](https://github.com/open-rpc/spec) Ethereum APIs.

## Features:

- Built in components for:
  - Types

- Easy to create new components


## Usage

The generator CLI has a generate command which takes a config to run. The config specifies what components you want to make, as well as the configuration for each component.

Using the CLI's `init` command, you can walk though an interactive config builder.

### Quick start

```sh
yarn install


yarn start
open-rpc-generator generate -c open-rpc-generator-config.json
```

should generate the type file into `generated/custom/typescript`

![image](https://user-images.githubusercontent.com/364566/136591763-f093641a-8d51-45a2-bf65-f980b03cb409.png)

you can now publish or use in your projects:

![image](https://user-images.githubusercontent.com/364566/136592834-34ef15b6-9250-4136-b333-58ab461aac0a.png)


## Resources

- [@open-rpc/generator package](https://www.npmjs.com/package/@open-rpc/generator)
- https://github.com/etclabscore/eth-provider-generator
