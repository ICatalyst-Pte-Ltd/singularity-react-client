import { DeepPartial } from '@icatalyst/js-core';
import { LayoutContainerProps, ModuleConfig } from '@icatalyst/react-ui-components';
import { EmptyLayoutDefinitionProps } from '@icatalyst/react-ui-layouts';
export type AuthorisationModuleProps = ModuleConfig<undefined, LayoutContainerProps<EmptyLayoutDefinitionProps>> & {
    moduleConfig?: {
        paths?: {
            register?: string;
            login?: string;
            redirectLogin?: string;
            redirectRegister?: string;
        };
    };
};
type AuthorisationModuleConfigurationProps = DeepPartial<AuthorisationModuleProps> & {
    signout?: Partial<ModuleConfig>;
};
export declare function createAuthorisationModule(overrides?: AuthorisationModuleConfigurationProps): AuthorisationModuleProps;
export default createAuthorisationModule;
