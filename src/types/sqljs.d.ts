declare module 'sql.js' {
  export interface SqlJsStatic {
    Database: new (data?: Uint8Array | number[]) => Database
  }

  export interface Statement {
    bind(values?: unknown[] | Record<string, unknown>): void
    run(values?: unknown[] | Record<string, unknown>): void
    step(): boolean
    getAsObject(): Record<string, unknown>
    free(): void
  }

  export interface Database {
    run(sql: string, params?: unknown[] | Record<string, unknown>): Database
    exec(sql: string, params?: unknown[] | Record<string, unknown>): Array<{ columns: string[]; values: unknown[][] }>
    prepare(sql: string, params?: unknown[] | Record<string, unknown>): Statement
    export(): Uint8Array
  }

  export interface InitSqlJsConfig {
    locateFile?: (file: string) => string
  }

  export default function initSqlJs(config?: InitSqlJsConfig): Promise<SqlJsStatic>
}

declare module 'sql.js/dist/sql-wasm.wasm?url' {
  const url: string
  export default url
}
