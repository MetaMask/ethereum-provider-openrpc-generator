import * as path from "path";
import { move } from "fs-extra";
import { readFile } from "fs-extra";
import * as fs from "fs";
import { promisify } from "util";
import { template } from "lodash";
import { components } from "@open-rpc/generator";

const writeFile = promisify(fs.writeFile);

const tsTemplate = template(`
// Code generated by ethereum-provider-openrpc-generator DO NOT EDIT.
import { EventEmitter } from "events";

<%= methodTypings.getSchemaTypings("typescript") %>

// tslint:disable-next-line: interface-name
export interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

// tslint:disable-next-line: interface-name
export interface ProviderConnectInfo {
  readonly chainId: string;
}

// tslint:disable-next-line: interface-name
export interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

<% openrpcDocument.methods.forEach((method) => { %>
export interface <%= method.name %> {
  readonly method: "<%= method.name %>";
  readonly params: [<%= methodTypings.getParamsTyping("typescript", method, ",").split(",").map((paramString) => paramString.split(":")[1]).join(",") %>] | {
    <%= methodTypings.getParamsTyping("typescript", method, ",\\n    ") %>
  }
}
<% }); %>

// tslint:disable-next-line: interface-name
export interface EIP1193Provider extends EventEmitter {
<% openrpcDocument.methods.forEach((method) => { %>
  /**
   * <%= method.name %>
   * @param args Arguments for <%= method.name %> request
   * @param args.method - <%= method.description || method.summary %>
   */
  request(args: <%= method.name %>) : Promise<<%= methodTypings.getTypingNames("typescript", method).result %>>;
<% }) %>
}
`);

const hooks: components.IHooks = {
  afterCopyStatic: [
    async (dest, frm, component): Promise<void> => {
      if (component.language === "typescript") {
        return await move(path.join(dest, "_package.json"), path.join(dest, "package.json"), { overwrite: true });
      }
    },
  ],
  afterCompileTemplate: [
    async (dest, frm, component, openrpcDocument): Promise<void> => {
      if (component.language === "typescript") {
        const packagePath = path.join(dest, "package.json");
        const fileContents = await readFile(packagePath);
        const pkg = JSON.parse(fileContents.toString());
        const updatedPkg = JSON.stringify({
          ...pkg,
          name: component.name,
          version: openrpcDocument.info.version,
        });

        return await writeFile(packagePath, updatedPkg);
      }
    }
  ],
  templateFiles: {
    typescript: [
      {
        path: "src/index.ts",
        template: tsTemplate,
      },
    ],
  },
};

const providerComponent: components.IComponentModule = {
  hooks,
  staticPath: (language: string, type?: string)=> {
    if(!type || type?.search("nostatic") > -1) return undefined
    return path.resolve(__dirname, '..', '..', `templates/provider/`);
  },
}

export default providerComponent;
