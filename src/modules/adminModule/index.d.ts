/// <reference types="react" />
import { ReactModuleConfig } from '@icatalyst/react-ui-components';
import createOrganisationsModule from './modules/organisationsModule';
export { createOrganisationsModule };
export type AdminModuleProps = ReactModuleConfig;
export declare const adminModuleCreateDefault: (moduleParams?: {
    groups?: any;
    licences?: any;
    organisations?: any;
    roles?: any;
    settings?: any;
    users?: any;
}) => (import("@icatalyst/react-ui-components").ModuleConfig<Record<string, any>, import("@icatalyst/react-ui-components").LayoutContainerProps<import("@icatalyst/react-ui-components").LayoutDefinition<string>, any>, import("react").JSXElementConstructor<import("@icatalyst/react-ui-components").LayoutContainerProps<import("@icatalyst/react-ui-components").LayoutDefinition<string>, any>>> | import("@icatalyst/react-ui-components").ModuleConfigFunction<Record<string, any>, import("@icatalyst/react-ui-components").LayoutContainerProps<import("@icatalyst/react-ui-components").LayoutDefinition<string>, any>, import("react").JSXElementConstructor<import("@icatalyst/react-ui-components").LayoutContainerProps<import("@icatalyst/react-ui-components").LayoutDefinition<string>, any>>>)[];
export declare const adminModuleDefaults: AdminModuleProps;
export declare function createAdminModule(overrides?: Partial<AdminModuleProps>): AdminModuleProps;
export default createAdminModule;
