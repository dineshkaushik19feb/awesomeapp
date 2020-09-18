import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.7.0
 * Query Engine version: eaade828a21d8ee3f4940f0af7da3ae0922db4df
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {

}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Examples
 * const examples = await prisma.example.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Examples
   * const examples = await prisma.example.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.example`: Exposes CRUD operations for the **Example** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Examples
    * const examples = await prisma.example.findMany()
    * ```
    */
  get example(): ExampleDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const ExampleDistinctFieldEnum: {
  id: 'id',
  email: 'email',
  name: 'name'
};

export declare type ExampleDistinctFieldEnum = (typeof ExampleDistinctFieldEnum)[keyof typeof ExampleDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model Example
 */

export type Example = {
  id: number
  email: string
  name: string | null
}


export type AggregateExample = {
  count: number
  avg: ExampleAvgAggregateOutputType | null
  sum: ExampleSumAggregateOutputType | null
  min: ExampleMinAggregateOutputType | null
  max: ExampleMaxAggregateOutputType | null
}

export type ExampleAvgAggregateOutputType = {
  id: number
}

export type ExampleSumAggregateOutputType = {
  id: number
}

export type ExampleMinAggregateOutputType = {
  id: number
}

export type ExampleMaxAggregateOutputType = {
  id: number
}


export type ExampleAvgAggregateInputType = {
  id?: true
}

export type ExampleSumAggregateInputType = {
  id?: true
}

export type ExampleMinAggregateInputType = {
  id?: true
}

export type ExampleMaxAggregateInputType = {
  id?: true
}

export type AggregateExampleArgs = {
  where?: ExampleWhereInput
  orderBy?: Enumerable<ExampleOrderByInput>
  cursor?: ExampleWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ExampleDistinctFieldEnum>
  count?: true
  avg?: ExampleAvgAggregateInputType
  sum?: ExampleSumAggregateInputType
  min?: ExampleMinAggregateInputType
  max?: ExampleMaxAggregateInputType
}

export type GetExampleAggregateType<T extends AggregateExampleArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetExampleAggregateScalarType<T[P]>
}

export type GetExampleAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ExampleAvgAggregateOutputType ? ExampleAvgAggregateOutputType[P] : never
}
    
    

export type ExampleSelect = {
  id?: boolean
  email?: boolean
  name?: boolean
}

export type ExampleGetPayload<
  S extends boolean | null | undefined | ExampleArgs,
  U = keyof S
> = S extends true
  ? Example
  : S extends undefined
  ? never
  : S extends ExampleArgs | FindManyExampleArgs
  ? 'include' extends U
    ? Example 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Example ? Example[P]
: 
 never
    }
  : Example
: Example


export interface ExampleDelegate {
  /**
   * Find zero or one Example.
   * @param {FindOneExampleArgs} args - Arguments to find a Example
   * @example
   * // Get one Example
   * const example = await prisma.example.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneExampleArgs>(
    args: Subset<T, FindOneExampleArgs>
  ): CheckSelect<T, Prisma__ExampleClient<Example | null>, Prisma__ExampleClient<ExampleGetPayload<T> | null>>
  /**
   * Find zero or more Examples.
   * @param {FindManyExampleArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Examples
   * const examples = await prisma.example.findMany()
   * 
   * // Get first 10 Examples
   * const examples = await prisma.example.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const exampleWithIdOnly = await prisma.example.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyExampleArgs>(
    args?: Subset<T, FindManyExampleArgs>
  ): CheckSelect<T, Promise<Array<Example>>, Promise<Array<ExampleGetPayload<T>>>>
  /**
   * Create a Example.
   * @param {ExampleCreateArgs} args - Arguments to create a Example.
   * @example
   * // Create one Example
   * const Example = await prisma.example.create({
   *   data: {
   *     // ... data to create a Example
   *   }
   * })
   * 
  **/
  create<T extends ExampleCreateArgs>(
    args: Subset<T, ExampleCreateArgs>
  ): CheckSelect<T, Prisma__ExampleClient<Example>, Prisma__ExampleClient<ExampleGetPayload<T>>>
  /**
   * Delete a Example.
   * @param {ExampleDeleteArgs} args - Arguments to delete one Example.
   * @example
   * // Delete one Example
   * const Example = await prisma.example.delete({
   *   where: {
   *     // ... filter to delete one Example
   *   }
   * })
   * 
  **/
  delete<T extends ExampleDeleteArgs>(
    args: Subset<T, ExampleDeleteArgs>
  ): CheckSelect<T, Prisma__ExampleClient<Example>, Prisma__ExampleClient<ExampleGetPayload<T>>>
  /**
   * Update one Example.
   * @param {ExampleUpdateArgs} args - Arguments to update one Example.
   * @example
   * // Update one Example
   * const example = await prisma.example.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ExampleUpdateArgs>(
    args: Subset<T, ExampleUpdateArgs>
  ): CheckSelect<T, Prisma__ExampleClient<Example>, Prisma__ExampleClient<ExampleGetPayload<T>>>
  /**
   * Delete zero or more Examples.
   * @param {ExampleDeleteManyArgs} args - Arguments to filter Examples to delete.
   * @example
   * // Delete a few Examples
   * const { count } = await prisma.example.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ExampleDeleteManyArgs>(
    args: Subset<T, ExampleDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Examples.
   * @param {ExampleUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Examples
   * const example = await prisma.example.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ExampleUpdateManyArgs>(
    args: Subset<T, ExampleUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Example.
   * @param {ExampleUpsertArgs} args - Arguments to update or create a Example.
   * @example
   * // Update or create a Example
   * const example = await prisma.example.upsert({
   *   create: {
   *     // ... data to create a Example
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Example we want to update
   *   }
   * })
  **/
  upsert<T extends ExampleUpsertArgs>(
    args: Subset<T, ExampleUpsertArgs>
  ): CheckSelect<T, Prisma__ExampleClient<Example>, Prisma__ExampleClient<ExampleGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyExampleArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateExampleArgs>(args: Subset<T, AggregateExampleArgs>): Promise<GetExampleAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Example.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ExampleClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Example findOne
 */
export type FindOneExampleArgs = {
  /**
   * Select specific fields to fetch from the Example
  **/
  select?: ExampleSelect | null
  /**
   * Filter, which Example to fetch.
  **/
  where: ExampleWhereUniqueInput
}


/**
 * Example findMany
 */
export type FindManyExampleArgs = {
  /**
   * Select specific fields to fetch from the Example
  **/
  select?: ExampleSelect | null
  /**
   * Filter, which Examples to fetch.
  **/
  where?: ExampleWhereInput
  /**
   * Determine the order of the Examples to fetch.
  **/
  orderBy?: Enumerable<ExampleOrderByInput>
  /**
   * Sets the position for listing Examples.
  **/
  cursor?: ExampleWhereUniqueInput
  /**
   * The number of Examples to fetch. If negative number, it will take Examples before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Examples.
  **/
  skip?: number
  distinct?: Enumerable<ExampleDistinctFieldEnum>
}


/**
 * Example create
 */
export type ExampleCreateArgs = {
  /**
   * Select specific fields to fetch from the Example
  **/
  select?: ExampleSelect | null
  /**
   * The data needed to create a Example.
  **/
  data: ExampleCreateInput
}


/**
 * Example update
 */
export type ExampleUpdateArgs = {
  /**
   * Select specific fields to fetch from the Example
  **/
  select?: ExampleSelect | null
  /**
   * The data needed to update a Example.
  **/
  data: ExampleUpdateInput
  /**
   * Choose, which Example to update.
  **/
  where: ExampleWhereUniqueInput
}


/**
 * Example updateMany
 */
export type ExampleUpdateManyArgs = {
  data: ExampleUpdateManyMutationInput
  where?: ExampleWhereInput
}


/**
 * Example upsert
 */
export type ExampleUpsertArgs = {
  /**
   * Select specific fields to fetch from the Example
  **/
  select?: ExampleSelect | null
  /**
   * The filter to search for the Example to update in case it exists.
  **/
  where: ExampleWhereUniqueInput
  /**
   * In case the Example found by the `where` argument doesn't exist, create a new Example with this data.
  **/
  create: ExampleCreateInput
  /**
   * In case the Example was found with the provided `where` argument, update it with this data.
  **/
  update: ExampleUpdateInput
}


/**
 * Example delete
 */
export type ExampleDeleteArgs = {
  /**
   * Select specific fields to fetch from the Example
  **/
  select?: ExampleSelect | null
  /**
   * Filter which Example to delete.
  **/
  where: ExampleWhereUniqueInput
}


/**
 * Example deleteMany
 */
export type ExampleDeleteManyArgs = {
  where?: ExampleWhereInput
}


/**
 * Example without action
 */
export type ExampleArgs = {
  /**
   * Select specific fields to fetch from the Example
  **/
  select?: ExampleSelect | null
}



/**
 * Deep Input Types
 */


export type ExampleWhereInput = {
  AND?: Enumerable<ExampleWhereInput>
  OR?: Array<ExampleWhereInput>
  NOT?: Enumerable<ExampleWhereInput>
  id?: number | IntFilter
  email?: string | StringFilter
  name?: string | StringNullableFilter | null
}

export type ExampleOrderByInput = {
  id?: SortOrder
  email?: SortOrder
  name?: SortOrder
}

export type ExampleWhereUniqueInput = {
  id?: number
  email?: string
}

export type ExampleCreateInput = {
  email: string
  name?: string | null
}

export type ExampleUpdateInput = {
  email?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type ExampleUpdateManyMutationInput = {
  email?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
  not?: string | NestedStringNullableFilter | null
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter | null
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter | null
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
  not?: NestedStringNullableFilter | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
