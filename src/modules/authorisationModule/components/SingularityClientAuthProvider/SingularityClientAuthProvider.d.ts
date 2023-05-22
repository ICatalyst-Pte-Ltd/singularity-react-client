import { AuthContextProps, AuthProviderProps } from '@icatalyst/react-ui-components';
import { ClientInfoDto } from '@icatalyst/singularity-libs';
import SingularityClientAuthRepository, { SingularityClientAuthObservableType } from '../../services/SingularityAuthService/SingularityClientAuthRepository';
import useSingularityClientAuthService from '../../services/SingularityAuthService/useSingularityClientAuthService';
export declare function useSingularityClient(): SingularityClientContextProps;
type SingularityClientContextProps = AuthContextProps & {
    clientID: string | null;
    client?: ClientInfoDto | null;
    repository?: SingularityClientAuthObservableType;
    authRepository?: SingularityClientAuthRepository;
    logoutUser?: () => void;
    canAuthenticate: ReturnType<typeof useSingularityClientAuthService>['canAuthenticate'];
    requestAuthorisationCode: ReturnType<typeof useSingularityClientAuthService>['requestAuthorisationCode'];
    getClientRedirectURL: ReturnType<typeof useSingularityClientAuthService>['getClientRedirectURL'];
};
export declare function SingularityClientAuthProvider({ children, paths, }: AuthProviderProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default SingularityClientAuthProvider;
