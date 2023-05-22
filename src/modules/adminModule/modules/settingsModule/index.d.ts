import { ReactModuleConfig, RepositoryModuleProps } from '@icatalyst/react-ui-components';
import { SettingsLayoutProps } from '@icatalyst/react-ui-layouts';
export type SettingsModuleProps = ReactModuleConfig;
declare function createSettingsModule(overrides?: Partial<RepositoryModuleProps<SettingsLayoutProps> & {
    settingsID: SettingsLayoutProps['settingsID'];
}>): SettingsModuleProps;
export default createSettingsModule;
