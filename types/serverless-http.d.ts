declare module "serverless-http" {
  import { RequestListener } from "http";

  type Options = {
    binary?: boolean | string[];
    provider?: "aws" | "azure";
    requestIdHeader?: string;
    request?: (
      req: any,
      event: any,
      context: any
    ) => any | Promise<any>;
    response?: (
      res: any,
      event: any,
      context: any
    ) => any | Promise<any>;
  };

  function serverless(
    app: RequestListener | any,
    options?: Options
  ): (event: any, context: any) => Promise<any>;

  export default serverless;
}
