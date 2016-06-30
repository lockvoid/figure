
declare module "objection" {
  import knex = require('knex');


    export interface ModelOptions {
        patch: boolean;
        skipValidation: boolean;
    }

    export class ValidationError {
        statusCode: number;
        data: any;
        new (...args);
    }

    export class Model {
        static tableName: string;
        static jsonSchema: any;
        static idColumn: string;
        static relationMappings: any;
        static jsonAttributes: any;
        static uidProp: string;
        static uidRefProp: string;
        static propRefRegex: RegExp;
        static QueryBuilder: any;
        static RelatedQueryBuilder: any;

        static OneToOneRelation: Function;
        static OneToManyRelation: Function;

        static query(): QueryBuilder;

        static knex(instance: knex): knex;

        static raw(...args): any;

        static fn(): any;

        static formatter(): any;

        static knexQuery(): any;

        static bindKnex(knex: knex): () => any;

        static bindTransaction(transaction: any): () => any;

        static extend(subclassConstructor: () => any);

        static fromJson(json: Object, opt: ModelOptions): Model;

        static fromDatabaseJson(row: Object): Model;

        static omitImpl(obj: Object, prop: string);

        static loadRelated(models: Array<Model|Object>, expression: string, filters: {filterName: string, filterFunction: (queryBuilder: QueryBuilder) => void});

        static traverse(filterConstructor: FunctionConstructor, models: Model|Array<Model>, traverser: (model: Model, parentModel: string, relationName: string) => void);
        static traverse(models: Model|Array<Model>, traverser: (model: Model, parentModel: string, relationName: string) => void);


        $id(): number|string;
        $id(id: number|string): void;

        $beforeValidate(jsonSchema: Object, json: Object, opt: ModelOptions): Object;

        $validate(): ValidationError;

        $toDatabaseJson(): Object;

        $toJson(): Object;

        toJSON(): Object;

        $afterValidate(json: Object, opt: ModelOptions);

        $parseDatabaseJson(json: Object): Object;

        $formatDatabaseJson(json: Object): Object;

        $parseJson(json: Object, opt: ModelOptions): Object;

        $formatJson(json: Object): Object;

        $setJson(json: Object, opt: ModelOptions): Model;

        $setDatabaseJson(json: Object): Model;

        $set(obj: Object): Model;

        $omit(keys: string|Array<string|Object>): Model;

        $pick(keys: string|Array<string>|Object): Model
        $pick(...keys): Model;

        $clone(): Model;

        $query(): Model;

        $relatedQuery(relationName: string): QueryBuilder;

        $loadRelated(expression: string, filters: Object): Promise<any>;

        $traverse(...args);

        $beforeInsert(queryContext: Object): Promise<any> | void;

        $afterInsert(queryContext: Object): Promise<any> | void;

        $beforeUpdate(opt: ModelOptions, queryContext: Object): Promise<any> | void;

        $afterUpdate(opt: ModelOptions, queryContext: Object): Promise<any> | void;

    }


    export interface QueryBuilderStatic {

        extend(subclassConstructor: FunctionConstructor): void;
        forClass(modelClass: Model): QueryBuilder;
    }

    export interface QueryBuilder extends knex.QueryBuilder {

        findById(id: any|Array<any>): QueryBuilder;

        insert(modelsOrObjects: Object|Model|Array<Object>|Array<Model>): QueryBuilder;

        insertAndFetch(modelsOrObjects: Object|Model|Array<Object>|Array<Model>): QueryBuilder;

        insertWithRelated(graph: Object|Model|Array<Object>|Array<Model>): QueryBuilder;

        update(modelOrObject: Object|Model): QueryBuilder;

        updateAndFetchById(id: string|number, modelOrObject: Object|Model): QueryBuilder;

        patch(modelOrObject: Object|Model): QueryBuilder;

        patchAndFetchById(id: string|number, modelOrObject: Object|Model): QueryBuilder;

        delete(): QueryBuilder;

        deleteById(id: any|Array<any>): QueryBuilder;

        relate(ids: Array<any>): QueryBuilder;

        unrelate(): QueryBuilder;

        whereRef(leftRef: string, operator: string, rightRef: string): QueryBuilder;

        orWhereRef(leftRef: string, operator: string, rightRef: string): QueryBuilder;

        whereComposite(columns: Array<string>, operator: string, values: Array<any>): QueryBuilder;

        whereInComposite(columns: Array<string>, values: Array<any>): QueryBuilder;
        whereInComposite(column: string, values: Array<any>): QueryBuilder;

        whereJsonEquals(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        orWhereJsonEquals(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        whereJsonNotEquals(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        where(...args: any[]): QueryBuilder;
        whereNot(...args: any[]): QueryBuilder;

        orWhereJsonNotEquals(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        whereJsonSupersetOf(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        orWhereJsonSupersetOf(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        whereJsonNotSupersetOf(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        orWhereJsonNotSupersetOf(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        whereJsonSubsetOf(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        orWhereJsonSubsetOf(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        whereJsonNotSubsetOf(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        orWhereJsonNotSubsetOf(fieldExpression: any, jsonObjectOrFieldExpression: any): QueryBuilder;

        whereJsonIsArray(fieldExpression: any): QueryBuilder;

        orWhereJsonIsArray(fieldExpression: any): QueryBuilder;

        whereJsonNotArray(fieldExpression: any): QueryBuilder;

        orWhereJsonNotArray(fieldExpression: any): QueryBuilder;

        whereJsonIsObject(fieldExpression: any): QueryBuilder;

        orWhereJsonIsObject(fieldExpression: any): QueryBuilder;

        whereJsonNotObject(fieldExpression: any): QueryBuilder;

        orWhereJsonNotObject(fieldExpression: any): QueryBuilder;

        whereJsonHasAny(fieldExpression: any, keys: string|Array<string>): QueryBuilder;

        orWhereJsonHasAny(fieldExpression: any, keys: string|Array<string>): QueryBuilder;

        whereJsonHasAll(fieldExpression: any, keys: string|Array<string>): QueryBuilder;

        orWhereJsonHasAll(fieldExpression: any, keys: string|Array<string>): QueryBuilder;

        whereJsonField(fieldExpression: any, operator: string, value: boolean|number|string): QueryBuilder;

        orWhereJsonField(fieldExpression: any, operator: string, value: boolean|number|string): QueryBuilder;

        context(queryContext: Object): QueryBuilder;

        reject(reason: any): QueryBuilder;

        resolve(value: any): QueryBuilder;

        isExecutable(): boolean;

        runBefore(fn: (builder: QueryBuilder) => QueryBuilder): QueryBuilder;

        onBuild(fn: (builder: QueryBuilder) => QueryBuilder): QueryBuilder;

        runAfter(fn: (builder: QueryBuilder) => QueryBuilder): QueryBuilder;

        eager(relationExpression: any, filters: Object): QueryBuilder;

        allowEager(relationExpression: any): QueryBuilder;

        allowInsert(relationExpression: any): QueryBuilder;

        modelClass(): Model;

        toString(): string;

        toSql(): string;

        dumpSql(logger: (sql: string) => any): QueryBuilder;

        clone(): QueryBuilder;

        map(mapper: () => any): Promise<any>;

        catch(errorHandler: (...args) => any): Promise<any>;

        asCallback(callback: Function): Promise<any>;

        bind(context: any): Promise<any>;

        nodeify(callback: Function): Promise<any>;

        resultSize(): Promise<any>;

        page(page: number, pageSize: number): QueryBuilder;

        range(start: number, end: number): QueryBuilder;

        pluck(propertyName: string): QueryBuilder;

        first(): QueryBuilder;

        traverse(modelClass: Model, traverser: (model: Model, parentModel: Model, relationName: string) => any): QueryBuilder;
        traverse(traverser: (model: Model, parentModel: Model, relationName: string) => any): QueryBuilder;

        pick(modelClass: Model, properties: Array<string>): QueryBuilder;
        pick(properties: Array<string>): QueryBuilder;

        omit(modelClass: Model, properties: Array<string>): QueryBuilder;
        omit(properties: Array<string>): QueryBuilder;

    }

    export class transaction {
        static start(...args: Array<Model>): Promise<transaction>;

        commit();
        rollback();
    }

}
