/// <reference types="react" />
import { AuthState } from '@icatalyst/react-ui-components';
import SingularityClientAuthRepository, { SingularityClientAuthObservableType } from './SingularityClientAuthRepository';
import { SingularityClientAuthServiceProps } from './SingularityClientAuthService';
declare function useSingularityClientAuthService(props: SingularityClientAuthServiceProps): {
    auth: AuthState;
    setAuth: import("react").Dispatch<import("react").SetStateAction<AuthState>>;
    persist: boolean;
    setPersist: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    isInRole: (roles: string[]) => boolean;
    repository: SingularityClientAuthObservableType | undefined;
    clientInfo: import("dist/libs/singularity-libs/src").ClientInfoDto | null | undefined;
    authRepository: SingularityClientAuthRepository;
    canAuthenticate: () => boolean;
    requestAuthorisationCode: () => void;
    resolvingAuthorisationCode: boolean | undefined;
    getClientRedirectURL: () => void;
};
export default useSingularityClientAuthService;
