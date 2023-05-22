import { DataApi } from '@icatalyst/js-core';
import { AxiosInstance } from 'axios';
import { AuthDto } from './types';
export type SingularityClientAuthServiceProps = {
    baseURL: string;
    clientID: string;
    clientKey: string;
    clientSecret: string;
    axios?: AxiosInstance;
};
export declare class SingularityClientAuthService<DataType extends AuthDto> extends DataApi<'id', DataType> {
    private clientID;
    constructor(props: SingularityClientAuthServiceProps);
    getClientInfo(clientID: string): Promise<import("axios").AxiosResponse<any, any>>;
    logoutUser(accessToken: string): Promise<void>;
    getSession(accessToken: string): Promise<import("axios").AxiosResponse<any, any>>;
    resolveAccessCode(accessCode: string, redirectURI?: string): Promise<import("axios").AxiosResponse<any, any>>;
}
