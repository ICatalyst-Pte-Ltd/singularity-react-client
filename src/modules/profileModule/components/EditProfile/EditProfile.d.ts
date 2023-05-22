import { BaseComponent } from '@icatalyst/react-ui-components';
import { DeviceDto, LocationDto, ProfileDto, UserEmailDto } from '@icatalyst/singularity-libs';
import { Theme } from '@mui/material';
declare const useStyles: (params: void, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "profileContent" | "avatar" | "avatarWrapper" | "nameField" | "gridWrapper" | "profileGridArea" | "emailsGridArea" | "devicesGridArea" | "locationsGridArea", string>;
    theme: Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export interface EditProfileProps extends BaseComponent<'span', Partial<ReturnType<typeof useStyles>['classes']>> {
    user: ProfileDto;
    emails: UserEmailDto[];
    devices: DeviceDto[];
    locations: LocationDto[];
}
export declare function EditProfile({ className, style, classes: classesProp, user, emails, devices, locations, }: EditProfileProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default EditProfile;
