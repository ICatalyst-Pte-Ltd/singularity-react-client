import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "logoIcon" | "actionWrapper" | "action", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface RequireAuthorisationProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    loginPath?: string;
    registerPath?: string;
}
export declare function RequireAuthorisation({ className, style, classes: classesProp, loginPath, registerPath, }: RequireAuthorisationProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default RequireAuthorisation;
