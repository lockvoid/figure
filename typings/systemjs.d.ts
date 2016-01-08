interface System {
  config: any;
  import(name: string): any;
}

declare var System: System;

declare module "systemjs" {
  export = System;
}
