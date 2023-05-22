import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "userMenu" | "userInfo" | "userAvatar", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface ProfileToolbarActionsProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    hideRole?: boolean;
}
export declare function ProfileToolbarActions({ className, style, classes: classesProp, hideRole, }: ProfileToolbarActionsProps): import("@emotion/react/jsx-runtime").JSX.Element | null;
export default ProfileToolbarActions;
