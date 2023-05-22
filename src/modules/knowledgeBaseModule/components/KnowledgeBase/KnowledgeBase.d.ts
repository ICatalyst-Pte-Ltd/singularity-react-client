import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "content" | "grid" | "footer" | "questionText" | "card" | "cardContent" | "cardTitle", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface KnowledgeBaseProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    externalURL: string;
    title?: string;
    icon?: string;
}
export declare function KnowledgeBase({ className, style, classes: classesProp, externalURL, title, icon, }: KnowledgeBaseProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default KnowledgeBase;
