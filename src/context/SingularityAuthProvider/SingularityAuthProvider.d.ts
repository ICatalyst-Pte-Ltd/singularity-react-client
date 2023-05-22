/*****
 * TODO: THIS SHOULD BE REMOVED, REPLACED BY modules/authorisationModule/components/SinglarityClientAuthProvider
 *****/
/// <reference types="react" />
import { AuthContextProps, AuthProviderProps } from '@icatalyst/react-ui-components';
export declare function useSingularityAuthorisation(): AuthContextProps;
export declare const AuthContext: import("react").Context<AuthContextProps>;
export declare function SingularityAuthProvider({ children, paths, }: AuthProviderProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default SingularityAuthProvider;
