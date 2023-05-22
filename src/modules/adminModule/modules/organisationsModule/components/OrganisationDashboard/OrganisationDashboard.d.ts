import { BaseComponent } from '@icatalyst/react-ui-components';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface OrganisationDashboardProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
}
export declare function OrganisationDashboard({ className, style, classes: classesProp, }: OrganisationDashboardProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default OrganisationDashboard;
