import { Dispatch, SetStateAction } from 'react';
export declare class SingularityService {
    makeRequestInEffect<T>(setData: Dispatch<SetStateAction<T>>): () => () => void;
}
