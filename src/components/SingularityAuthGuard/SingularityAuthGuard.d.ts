/*****
 * TODO: THIS SHOULD BE REMOVED, REPLACED BY modules/authorisationModule/components/SinglarityClientAuthGuard
 *****/
import { AuthGuardProps, AuthPaths } from '@icatalyst/react-ui-components';
export type SingularityAuthGuardProps = AuthGuardProps & {
    paths: AuthPaths;
};
export declare function SingularityAuthGuard({ roles, paths, }: SingularityAuthGuardProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default SingularityAuthGuard;
