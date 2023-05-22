import { ReactModuleConfig, RepositoryModuleProps } from '@icatalyst/react-ui-components';
import { MasterDetailLayoutProps } from '@icatalyst/react-ui-layouts';
export type GroupsModuleProps = ReactModuleConfig;
declare function createGroupsModule(overrides?: Partial<RepositoryModuleProps<MasterDetailLayoutProps>>): GroupsModuleProps;
export default createGroupsModule;
