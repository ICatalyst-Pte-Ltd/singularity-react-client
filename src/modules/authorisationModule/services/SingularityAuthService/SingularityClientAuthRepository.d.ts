import { DataRepository, DataRepositoryProps, DtoObserverState, ObservableData } from '@icatalyst/js-core';
import { ClientInfoDto } from '@icatalyst/singularity-libs';
import { SingularityClientAuthService } from './SingularityClientAuthService';
import { AuthDto } from './types';
export type SingularityClientAuthRepositoryProps = Omit<DataRepositoryProps<'id', AuthDto>, 'dtoPath' | 'global'> & {
    baseURL: string;
    clientID: string;
    clientKey: string;
    clientSecret: string;
};
export type SingularityClientAuthObservableType = {
    gettingClientInfo: boolean;
    clientInfo?: ClientInfoDto | null;
    authenticatingUser: boolean;
    unAuthenticatingUser: boolean;
    authenticatedUser?: string | null;
    clientIdentifier?: string | null;
    resolvingUserSession?: boolean;
    userSession?: unknown;
} & DtoObserverState<AuthDto>;
declare class SingularityClientAuthObservableService extends ObservableData<'id', AuthDto, SingularityClientAuthObservableType> {
    constructor();
    gettingClientIdentifier(data: string): void;
    getClientInfo(data: ClientInfoDto): void;
    gettingClientInfo(flag: boolean): void;
    authenticatedUser(data: string): void;
    authenticatingUser(flag: boolean): void;
    unAuthenticatingUser(flag: boolean): void;
    resolvingUserSession(flag: boolean): void;
    getUserSession(data: unknown): void;
}
export default class SingularityClientAuthRepository extends DataRepository<'id', AuthDto, SingularityClientAuthObservableType, SingularityClientAuthObservableService> {
    private accessToken;
    private refreshToken;
    constructor(args: SingularityClientAuthRepositoryProps);
    protected getApiService(): SingularityClientAuthService<AuthDto>;
    getClientInfo(clientID: string): Promise<void>;
    logoutUser(): Promise<void>;
    getAccessToken(): string;
    getRefreshToken(): string;
    resolveUserSession(accessCode: string, redirectURI?: string): Promise<void>;
}
export {};
