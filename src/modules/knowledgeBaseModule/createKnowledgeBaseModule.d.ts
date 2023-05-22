import { ReactModuleConfig } from '@icatalyst/react-ui-components';
export type KnowledgeBaseModuleProps = ReactModuleConfig & {
    hideAdmin: boolean;
};
export declare function createKnowledgeBaseModule(overrides?: Partial<KnowledgeBaseModuleProps>): KnowledgeBaseModuleProps;
