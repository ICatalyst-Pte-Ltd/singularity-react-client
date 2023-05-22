import { ReactModuleConfig, RepositoryModuleProps } from '@icatalyst/react-ui-components';
import { MasterDetailLayoutProps } from '@icatalyst/react-ui-layouts';
export type RolesModuleProps = ReactModuleConfig;
declare function createRolesModule(overrides?: Partial<RepositoryModuleProps<MasterDetailLayoutProps>>): RolesModuleProps;
export default createRolesModule;
