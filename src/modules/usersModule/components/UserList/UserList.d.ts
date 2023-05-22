import { ActionsProps, BaseComponent } from '@icatalyst/react-ui-components';
import { UserDto } from '@icatalyst/singularity-libs';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "avatar" | "actions" | "listItem" | "userName", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface UserListProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    users: UserDto[];
    actions?: ActionsProps['actions'];
}
export declare function UserList({ className, style, classes: classesProp, users, actions, }: UserListProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default UserList;
