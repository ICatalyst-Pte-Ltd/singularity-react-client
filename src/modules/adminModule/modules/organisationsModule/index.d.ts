import { ReactModuleConfig, RepositoryModuleProps } from '@icatalyst/react-ui-components';
import { MasterDetailLayoutProps } from '@icatalyst/react-ui-layouts';
export type OrganisationsModuleProps = ReactModuleConfig;
declare function createOrganisationsModule(overrides?: Partial<RepositoryModuleProps<MasterDetailLayoutProps>>): OrganisationsModuleProps;
export default createOrganisationsModule;
