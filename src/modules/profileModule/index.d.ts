import { ReactModuleConfig } from '@icatalyst/react-ui-components';
export { default as ProfileToolbarActions } from './components/ProfileToolbarActions';
export type ProfileModuleProps = ReactModuleConfig;
export declare function createProfileModule(overrides?: Partial<ProfileModuleProps>): ProfileModuleProps;
export default createProfileModule;
