import { DtoType } from '@icatalyst/js-core';
import { ApplicationRepositoryBase, RepositoryFactory, RepositoryGenerator } from '@icatalyst/react-ui-components';
export declare class SingularityClientRepositories extends ApplicationRepositoryBase {
    static registerRepository<IDFieldName extends string, T extends DtoType<IDFieldName>>(name: string, generator: RepositoryGenerator<IDFieldName, T>): RepositoryGenerator<IDFieldName, T>;
    protected createDefinitions(): Record<string, RepositoryFactory<any>>;
}
export default SingularityClientRepositories;
