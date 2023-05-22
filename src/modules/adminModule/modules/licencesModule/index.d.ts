import { ReactModuleConfig, RepositoryModuleProps } from '@icatalyst/react-ui-components';
import { MasterDetailLayoutProps } from '@icatalyst/react-ui-layouts';
export type LicencesModuleProps = ReactModuleConfig;
declare function createLicencesModule(overrides?: Partial<RepositoryModuleProps<MasterDetailLayoutProps>>): LicencesModuleProps;
export default createLicencesModule;
