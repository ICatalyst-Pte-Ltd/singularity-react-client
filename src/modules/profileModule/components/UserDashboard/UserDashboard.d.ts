import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "card" | "profileWrapper" | "avatar", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface UserDashboardProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
}
export declare function UserDashboard({ className, style, classes: classesProp, }: UserDashboardProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default UserDashboard;
