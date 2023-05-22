import { ReactModuleConfig, RepositoryModuleProps } from '@icatalyst/react-ui-components';
import { MasterDetailLayoutProps } from '@icatalyst/react-ui-layouts';
export type UsersModuleProps = ReactModuleConfig;
declare function createUsersModule(overrides?: Partial<RepositoryModuleProps<MasterDetailLayoutProps>>): UsersModuleProps;
export default createUsersModule;
