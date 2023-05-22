import { AuthGuardProps, AuthPaths } from '@icatalyst/react-ui-components';
export type SingularityClientAuthGuardProps = AuthGuardProps & {
    paths: AuthPaths;
};
export declare function SingularityClientAuthGuard({ roles, paths, }: SingularityClientAuthGuardProps): import("@emotion/react/jsx-runtime").JSX.Element | null;
export default SingularityClientAuthGuard;
