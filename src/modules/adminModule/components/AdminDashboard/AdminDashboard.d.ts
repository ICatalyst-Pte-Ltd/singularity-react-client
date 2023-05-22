import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "section" | "sectionTitle" | "sectionContent" | "widget" | "widget_small" | "widget_medium" | "widget_large", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface AdminDashboardProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
}
export declare function AdminDashboard({ className, style, classes: classesProp, }: AdminDashboardProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default AdminDashboard;
