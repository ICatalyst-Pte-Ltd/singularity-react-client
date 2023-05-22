import { BaseComponent } from '@icatalyst/react-ui-components';
import { ResourceDto, UserDto } from '@icatalyst/singularity-libs';
import { SyntheticEvent } from 'react';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "root_expanded" | "accordion" | "accordion_expanded" | "accordionSummary" | "accordionTitle" | "accordionDetails" | "accordionContent" | "actions" | "userList" | "description", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface ManageResourcePermissionsProps extends Omit<BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>>, 'resource'> {
    resource: ResourceDto;
    expanded?: boolean;
    onExpandedToggle?: (event: SyntheticEvent, value: boolean) => void;
    onAddUser?: (resource: ResourceDto) => void;
    expandIcon?: string;
    users: UserDto[];
    title?: string;
}
export declare function ManageResourcePermissions({ className, style, classes: classesProp, resource, expanded, expandIcon, users, onAddUser, onExpandedToggle, title, }: ManageResourcePermissionsProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default ManageResourcePermissions;
