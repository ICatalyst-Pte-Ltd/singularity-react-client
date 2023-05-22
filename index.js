import { jsx, jsxs } from '@emotion/react/jsx-runtime';
import { useAuthorisation, SuspenseLoader, Container, ApplicationRepositoryBase, createModelRepository, createModelFields, createModuleFromRepository, LocalizationContext, useApplication, Image, Button, useEffectOnce, Loader, axios as axios$2, useAxios, useMemoDeepCompare, useObservable, localStore, ErrorWrapper, useApplicationRepository, findModule, Card, RepositoryGrid, createDateRangeConstraint, useAuthContext, useRepository, Avatar, DropdownMenu } from '@icatalyst/react-ui-components';
import { useLocation, Outlet, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { _, DataApi, DataRepository, ObservableData, handleAxiosError, tinycolor, stripHtml } from '@icatalyst/js-core';
import axios$1 from 'axios';
import { makeStyles } from 'tss-react/mui';
import { Typography, CardContent, ListItemText } from '@mui/material';
import { MasterDetailLayout, MasterDetailLayoutDefaults, SettingsLayout, SettingsLayoutDefaults, InfoPage, EmptyLayout, EmptyLayoutDefaults, ErrorPage, TitledPage } from '@icatalyst/react-ui-layouts';
import jwtDecode from 'jwt-decode';
import { of, tap, switchMap, map, catchError } from 'rxjs';
import CryptoJS from 'crypto-js';

function SingularityAuthGuard({
  roles,
  paths
}) {
  const {
    auth = {},
    isInRole
  } = useAuthorisation();
  const {
    user
  } = auth;
  const location = useLocation();
  // Prevent looping
  const isUnauthorised = location.pathname === paths.unauthorised;
  return isUnauthorised || isInRole(roles) ?
  // The user has the appropriate role assigned
  jsx(SuspenseLoader, {
    children: jsx(Outlet, {})
  }) : jsx(Navigate, {
    to: user ?
    // There is a user but they are not authorised for this page
    paths === null || paths === void 0 ? void 0 : paths.unauthorised :
    // There is no user so ask them to log in
    paths === null || paths === void 0 ? void 0 : paths.login,
    state: {
      from: location
    },
    replace: true
  });
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function useSingularityAuthorisation() {
  return useContext(AuthContext);
}
const AuthContext = createContext({});
function SingularityAuthProvider({
  children,
  paths = {}
}) {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist') || 'false'));
  const [authPaths] = useState(_.merge({}, {
    login: '/auth/login',
    unauthorised: '/auth/unauthorised',
    logout: '/auth/logout'
  }, paths));
  const logoutUser = accessToken => {
    console.log('redirect to singularity logout page');
  };
  const isInRole = useCallback(roles => {
    if (!auth || !auth.user) {
      return false;
    }
    return false;
  }, [auth]);
  return jsx(AuthContext.Provider, Object.assign({
    value: {
      auth,
      setAuth,
      persist,
      setPersist,
      GuardComponent: _a => {
        var {
            roles
          } = _a,
          rest = __rest(_a, ["roles"]);
        return jsx(SingularityAuthGuard, Object.assign({
          paths: authPaths,
          roles: roles
        }, rest));
      },
      isInRole,
      logoutUser
    }
  }, {
    children: children
  }));
}

const BASE_URL = 'http://localhost:3500';
var axios = axios$1.create({
  baseURL: BASE_URL
});
const axiosPrivate = axios$1.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const useRefreshToken = () => {
  const {
    setAuth
  } = useAuthorisation();
  const refresh = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get('/refresh', {
      withCredentials: true
    });
    setAuth(prev => {
      return Object.assign(Object.assign({}, prev), {
        // TODO: Extract this properly
        roles: response.data.roles,
        accessToken: response.data.accessToken
      });
    });
    return response.data.accessToken;
  });
  return refresh;
};

const useStyles$6 = makeStyles()(theme => {
  return {
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      overflow: 'auto'
    },
    section: {
      marginBottom: theme.spacing(3),
      '&:last-child': {
        marginBottom: theme.spacing(0)
      }
    },
    sectionTitle: Object.assign(Object.assign({}, theme.typography.h5), {
      marginBottom: theme.spacing(2)
    }),
    sectionContent: {
      minHeight: theme.spacing(8),
      display: 'flex',
      flexDirection: 'row'
    },
    widget: {
      width: 'auto'
    },
    widget_small: {
      flexBasis: '25%',
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: theme.spacing(0)
      }
    },
    widget_medium: {
      flexBasis: '50%',
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: theme.spacing(0)
      }
    },
    widget_large: {
      maxWidth: '100%'
    }
  };
});
function AdminDashboard({
  className,
  style,
  classes: classesProp
}) {
  const {
    classes,
    cx
  } = useStyles$6(undefined, {
    props: {
      classes: classesProp
    }
  });
  return jsxs("div", Object.assign({
    className: cx(classes.root, className),
    style: style
  }, {
    children: [jsxs("div", Object.assign({
      className: cx(classes.section)
    }, {
      children: [jsx(Typography, Object.assign({
        variant: "h2",
        className: cx(classes.sectionTitle)
      }, {
        children: "Analytics"
      })), jsxs("div", Object.assign({
        className: cx(classes.sectionContent)
      }, {
        children: [jsxs(Container, Object.assign({
          className: cx(classes.widget, classes.widget_small)
        }, {
          children: ["User Count", jsx("div", {
            children: " with a nice graph"
          }), jsx("div", {
            children: " with a nice graph"
          })]
        })), jsxs(Container, Object.assign({
          className: cx(classes.widget, classes.widget_small)
        }, {
          children: ["User Dropoff", jsx("div", {
            children: " with a nice graph"
          }), jsx("div", {
            children: " with a nice graph"
          })]
        })), jsxs(Container, Object.assign({
          className: cx(classes.widget, classes.widget_small)
        }, {
          children: ["Device Count", jsx("div", {
            children: " with a nice graph"
          }), jsx("div", {
            children: " with a nice graph"
          })]
        })), jsxs(Container, Object.assign({
          className: cx(classes.widget, classes.widget_small)
        }, {
          children: ["Process Count", jsx("div", {
            children: " with a nice graph"
          }), jsx("div", {
            children: " with a nice graph"
          })]
        }))]
      }))]
    })), jsxs("div", Object.assign({
      className: cx(classes.section)
    }, {
      children: [jsx(Typography, Object.assign({
        variant: "h2",
        className: cx(classes.sectionTitle)
      }, {
        children: "Recent Activity"
      })), jsxs("div", Object.assign({
        className: cx(classes.sectionContent)
      }, {
        children: [jsx(Container, Object.assign({
          className: cx(classes.widget, classes.widget_medium)
        }, {
          children: "Last User added"
        })), jsx(Container, Object.assign({
          className: cx(classes.widget, classes.widget_medium)
        }, {
          children: "Last Payment"
        }))]
      }))]
    })), jsxs("div", Object.assign({
      className: cx(classes.section)
    }, {
      children: [jsx(Typography, Object.assign({
        variant: "h2",
        className: cx(classes.sectionTitle)
      }, {
        children: "Transactions"
      })), jsx("div", Object.assign({
        className: cx(classes.sectionContent)
      }, {
        children: jsxs(Container, Object.assign({
          className: cx(classes.widget, classes.widget_large)
        }, {
          children: ["Transactions", jsx("div", {
            children: " with a nice table"
          }), jsx("div", {
            children: " with a nice table"
          }), jsx("div", {
            children: " with a nice table"
          }), jsx("div", {
            children: " with a nice table"
          }), jsx("div", {
            children: " with a nice table"
          })]
        }))
      }))]
    }))]
  }));
}

const classRepositoryGenerators = {};
class SingularityClientRepositories extends ApplicationRepositoryBase {
  static registerRepository(name, generator) {
    classRepositoryGenerators[name] = generator;
    return generator;
  }
  createDefinitions() {
    return Object.assign({}, Object.entries(classRepositoryGenerators).reduce((acc, [name, generator]) => {
      acc[name] = generator(this.baseURL, this.axios);
      return acc;
    }, {}));
  }
}

function registerClientGroupsRepository() {
  SingularityClientRepositories.registerRepository('clientGroupsDefinition', (baseURL, axios) => {
    return createModelRepository({
      baseURL,
      dtoPath: 'api/client/{clientID}/groups',
      axios,
      model: {
        name: 'clientGroups',
        title: 'Group',
        icon: 'group',
        fields: createModelFields({
          guid: {
            type: 'string',
            readonly: true
          },
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          accessrole: {
            type: 'boolean'
          },
          code: {
            type: 'string'
          },
          displayable: {
            type: 'boolean'
          },
          featurerole: {
            type: 'boolean'
          },
          mutuallyexclusive: {
            type: 'boolean'
          }
        })
      }
    });
  });
}

function createGroupsModule(overrides) {
  // register the repository
  registerClientGroupsRepository();
  const repositoryName = 'singularityClient';
  const dataDefinition = 'clientGroupsDefinition';
  return createModuleFromRepository(repositoryName, dataDefinition, MasterDetailLayout, {
    layoutConfig: MasterDetailLayoutDefaults,
    repositoryName,
    dataDefinition
  }, overrides);
}

function registerClientLicencesRepository() {
  SingularityClientRepositories.registerRepository('clientLicencesDefinition', (baseURL, axios) => {
    return createModelRepository({
      baseURL,
      dtoPath: 'api/client/{clientID}/licences',
      axios,
      model: {
        name: 'clientLicences',
        title: 'Licence',
        icon: 'fa file-contract',
        fields: createModelFields({
          guid: {
            type: 'string',
            readonly: true
          },
          active: {
            type: 'boolean'
          },
          duration: {
            type: 'number'
          },
          template: {
            type: 'string'
          },
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          }
        })
      }
    });
  });
}

function createLicencesModule(overrides) {
  // register the repository
  registerClientLicencesRepository();
  const repositoryName = 'singularityClient';
  const dataDefinition = 'clientLicencesDefinition';
  return createModuleFromRepository(repositoryName, dataDefinition, MasterDetailLayout, {
    layoutConfig: MasterDetailLayoutDefaults,
    repositoryName,
    dataDefinition
  }, overrides);
}

function registerClientOrgansiationsRepository() {
  SingularityClientRepositories.registerRepository('clientOrganisationsDefinition', (baseURL, axios) => {
    return createModelRepository({
      baseURL,
      dtoPath: 'api/client/{clientID}/organisations',
      axios: axios,
      model: {
        name: 'clientOrganisations',
        title: 'Organisation',
        identityField: 'guid',
        primaryTextField: 'name',
        icon: 'account_tree',
        fields: createModelFields({
          guid: {
            type: 'string',
            readonly: true
          },
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          featureImageURI: {
            type: 'string'
          },
          logoURI: {
            type: 'string'
          },
          privacyURI: {
            type: 'string'
          },
          tagline: {
            type: 'string'
          },
          websiteURI: {
            type: 'string'
          }
        })
      }
    });
  });
}

function createOrganisationsModule(overrides) {
  // register the repository
  registerClientOrgansiationsRepository();
  const repositoryName = 'singularityClient';
  const dataDefinition = 'clientOrganisationsDefinition';
  return createModuleFromRepository(repositoryName, dataDefinition, MasterDetailLayout, {
    layoutConfig: MasterDetailLayoutDefaults,
    repositoryName,
    dataDefinition
  }, overrides);
}

function registerClientRolesRepository() {
  SingularityClientRepositories.registerRepository('clientRolesDefinition', (baseURL, axios) => {
    return createModelRepository({
      baseURL,
      dtoPath: 'api/client/{clientID}/roles',
      axios,
      model: {
        name: 'clientRoles',
        title: 'Role',
        icon: 'fa sitemap',
        fields: createModelFields({
          guid: {
            type: 'string',
            readonly: true
          },
          accessrole: {
            type: 'boolean'
          },
          displayable: {
            type: 'boolean'
          },
          featurerole: {
            type: 'boolean'
          },
          mutuallyexclusive: {
            type: 'boolean'
          },
          code: {
            type: 'string'
          },
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          }
        })
      }
    });
  });
}

function createRolesModule(overrides) {
  // register the repository
  registerClientRolesRepository();
  const repositoryName = 'singularityClient';
  const dataDefinition = 'clientRolesDefinition';
  return createModuleFromRepository(repositoryName, dataDefinition, MasterDetailLayout, {
    layoutConfig: MasterDetailLayoutDefaults,
    repositoryName,
    dataDefinition
  }, overrides);
}

function registerClientSettingsRepository() {
  return SingularityClientRepositories.registerRepository('clientSettingsDefinition', (baseURL, axios) => {
    return createModelRepository({
      baseURL,
      dtoPath: 'api/client',
      axios,
      model: {
        name: 'clientSettings',
        title: 'Settings',
        icon: 'settings',
        fields: createModelFields({
          guid: {
            type: 'string',
            readonly: true
          },
          adminEmail: {
            type: 'string'
          },
          backgroundURI: {
            type: 'imageURL'
          },
          billingEmail: {
            type: 'string'
          },
          clientType: {
            type: 'string'
          },
          companyID: {
            type: 'string'
          },
          defaultScope: {
            type: 'string'
          },
          hasCredentials: {
            type: 'boolean'
          },
          initialRoleID: {
            type: 'string'
          },
          description: {
            type: 'richtext'
          },
          logoURI: {
            type: 'imageURL'
          },
          name: {
            type: 'string'
          },
          privacyURI: {
            type: 'string'
          },
          redirectionURIs: {
            label: 'Redirection URIs',
            type: 'string'
          },
          requireTermsAccepted: {
            type: 'boolean'
          },
          termsURI: {
            type: 'string'
          },
          websiteURI: {
            type: 'string'
          }
        })
      }
    });
  });
}

function createSettingsModule(overrides) {
  // register the repository
  const generator = registerClientSettingsRepository();
  // Create a repository just to get access to the fields for the settings
  const definition = generator('/', null).getDescriptor();
  const repositoryName = 'singularityClient';
  const dataDefinition = 'clientSettingsDefinition';
  function toLowerCaseID(field) {
    return Object.assign(Object.assign({}, field), {
      id: field.id.toLowerCase()
    });
  }
  return createModuleFromRepository(repositoryName, dataDefinition, SettingsLayout, {
    layoutConfig: SettingsLayoutDefaults,
    repositoryName,
    dataDefinition,
    settingsID: (overrides === null || overrides === void 0 ? void 0 : overrides.settingsID) || '',
    categories: [{
      name: 'General',
      icon: 'build',
      fields: [definition.fields['name'], definition.fields['logoURI'], definition.fields['backgroundURI'], definition.fields['name'], definition.fields['description'], definition.fields['privacyURI'], definition.fields['termsURI']].map(toLowerCaseID)
    }, {
      name: 'Contacts',
      icon: 'contact_page',
      fields: [definition.fields['adminEmail'], definition.fields['billingEmail']].map(toLowerCaseID)
    }, {
      name: 'Advanced',
      icon: 'developer_board',
      fields: [
      // This should be dropdown for available companies
      definition.fields['companyID'], definition.fields['websiteURI'], definition.fields['clientType'], definition.fields['defaultScope'], definition.fields['hasCredentials'], definition.fields['initialRoleID'], definition.fields['redirectionURIs'], definition.fields['requireTermsAccepted']].map(toLowerCaseID)
    }]
  }, overrides);
}

function registerClientUsersRepository() {
  SingularityClientRepositories.registerRepository('clientUsersDefinition', (baseURL, axios) => {
    return createModelRepository({
      baseURL,
      dtoPath: 'api/client/{clientID}/users',
      axios,
      model: {
        name: 'clientUsers',
        title: 'User',
        icon: 'fa users',
        fields: createModelFields({
          guid: {
            type: 'string',
            readonly: true
          },
          displayName: {
            type: 'string'
          },
          profileImageUri: {
            type: 'string'
          },
          profileUri: {
            type: 'string'
          }
        })
      }
    });
  });
}

function createUsersModule(overrides) {
  // register the repository
  registerClientUsersRepository();
  const repositoryName = 'singularityClient';
  const dataDefinition = 'clientUsersDefinition';
  return createModuleFromRepository(repositoryName, dataDefinition, MasterDetailLayout, {
    layoutConfig: MasterDetailLayoutDefaults,
    repositoryName,
    dataDefinition
  }, overrides);
}

const adminModuleCreateDefault = moduleParams => {
  return [createGroupsModule(moduleParams === null || moduleParams === void 0 ? void 0 : moduleParams.groups), createLicencesModule(moduleParams === null || moduleParams === void 0 ? void 0 : moduleParams.licences), createOrganisationsModule(moduleParams === null || moduleParams === void 0 ? void 0 : moduleParams.organisations), createRolesModule(moduleParams === null || moduleParams === void 0 ? void 0 : moduleParams.roles), createSettingsModule(moduleParams === null || moduleParams === void 0 ? void 0 : moduleParams.settings), createUsersModule(moduleParams === null || moduleParams === void 0 ? void 0 : moduleParams.users)];
};
const adminModuleDefaults = {
  name: 'adminModule',
  title: 'Admin',
  enabled: true,
  // auth: ['admin'],
  icon: 'admin_panel_settings',
  path: 'admin',
  navigation: true,
  modules: adminModuleCreateDefault(),
  routes: [{
    title: 'home',
    component: AdminDashboard,
    index: true
  }]
};
function createAdminModule(overrides) {
  const config = _.merge({}, adminModuleDefaults, overrides);
  return config;
}

const useStyles$5 = makeStyles()(theme => {
  return {
    root: {},
    logoIcon: {
      width: theme.spacing(16),
      height: theme.spacing(16)
    },
    actionWrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row'
      }
    },
    action: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2)
    }
  };
});
function RequireAuthorisation({
  className,
  style,
  classes: classesProp,
  loginPath = '/login',
  registerPath = '/register'
}) {
  var _a, _b;
  const {
    classes,
    cx
  } = useStyles$5(undefined, {
    props: {
      classes: classesProp
    }
  });
  const {
    t
  } = useContext(LocalizationContext);
  const {
    config
  } = useApplication();
  useAuthorisation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = ((_b = (_a = location.state) === null || _a === void 0 ? void 0 : _a.from) === null || _b === void 0 ? void 0 : _b.pathname) || '/';
  return jsx(InfoPage, Object.assign({
    className: cx(classes.root, className),
    style: style,
    title: t('Welcome to {0}', config === null || config === void 0 ? void 0 : config.name),
    imageSrc: config === null || config === void 0 ? void 0 : config.featureImage,
    imageAlpha: 0.1,
    verticalAlign: "center",
    horizontalAlign: "center",
    icon: jsx("div", {
      children: jsx(Image, {
        className: cx(classes.logoIcon),
        src: config === null || config === void 0 ? void 0 : config.logo,
        alt: `logo for ${config === null || config === void 0 ? void 0 : config.name}`
      })
    }),
    excerpt: t('You are not currently logged in.  Not to worry, you are just a click away.')
  }, {
    children: jsxs("div", Object.assign({
      className: cx(classes.actionWrapper)
    }, {
      children: [jsx("div", Object.assign({
        className: cx(classes.action)
      }, {
        children: jsx(Button, Object.assign({
          color: "primary",
          variant: "contained",
          onClick: () => {
            navigate(loginPath, {
              state: {
                from: from
              },
              replace: true
            });
          }
        }, {
          children: t('Log in')
        }))
      })), jsx(Typography, Object.assign({
        variant: "body1"
      }, {
        children: t('OR')
      })), jsx("div", Object.assign({
        className: cx(classes.action)
      }, {
        children: jsx(Button, Object.assign({
          color: "primary",
          variant: "contained",
          onClick: () => {
            navigate(registerPath, {
              state: {
                from: from
              },
              replace: true
            });
          }
        }, {
          children: t('Create Account')
        }))
      }))]
    }))
  }));
}

const useStyles$4 = makeStyles()(( /*theme*/
) => {
  return {
    root: {
      width: '100%',
      height: '100%'
    }
  };
});
function SignOut({
  className,
  style,
  classes: classesProp
}) {
  const {
    classes,
    cx
  } = useStyles$4(undefined, {
    props: {
      classes: classesProp
    }
  });
  const {
    logoutUser
  } = useAuthorisation();
  useEffectOnce(() => {
    logoutUser && logoutUser();
  }, [logoutUser]);
  return jsx("div", Object.assign({
    className: cx(classes.root, className),
    style: style
  }, {
    children: jsx(Loader, {
      variant: "circular"
    })
  }));
}

const useStyles$3 = makeStyles()(theme => {
  return {
    root: {},
    actionWrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row'
      }
    },
    action: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2)
    }
  };
});
function Unauthorised({
  className,
  style,
  classes: classesProp
}) {
  const {
    classes,
    cx
  } = useStyles$3(undefined, {
    props: {
      classes: classesProp
    }
  });
  const {
    t
  } = useContext(LocalizationContext);
  const {
    config
  } = useApplication();
  const navigate = useNavigate();
  return jsx(InfoPage, Object.assign({
    className: cx(classes.root, className),
    style: style,
    title: t('Unauthorised'),
    imageSrc: config === null || config === void 0 ? void 0 : config.featureImage,
    imageAlpha: 0.1,
    verticalAlign: "center",
    horizontalAlign: "center",
    icon: "key_off",
    excerpt: t('Your account does not have access to this page.')
  }, {
    children: jsxs("div", Object.assign({
      className: cx(classes.actionWrapper)
    }, {
      children: [jsx("div", Object.assign({
        className: cx(classes.action)
      }, {
        children: jsx(Button, Object.assign({
          color: "primary",
          variant: "contained",
          onClick: () => {
            navigate('/');
          }
        }, {
          children: t('Return home')
        }))
      })), jsx(Typography, Object.assign({
        variant: "body1"
      }, {
        children: t('OR')
      })), jsx("div", Object.assign({
        className: cx(classes.action)
      }, {
        children: jsx(Button, Object.assign({
          color: "primary",
          variant: "contained",
          onClick: () => {
            navigate(-1);
          }
        }, {
          children: t('Go back')
        }))
      }))]
    }))
  }));
}

const moduleDefaults$2 = {
  name: 'authorisation',
  title: 'Authorisation',
  icon: 'key',
  enabled: true,
  path: '/auth',
  layout: EmptyLayout,
  layoutComponentProps: {
    layoutConfig: Object.assign(Object.assign({}, EmptyLayoutDefaults), {
      footer: {
        display: false
      }
    })
  },
  modules: [{
    name: 'signOut',
    title: 'Sign Out',
    icon: 'power_settings_new',
    enabled: true,
    path: 'signout',
    auth: ['user'],
    navigation: true,
    component: SignOut
  }],
  routes: [{
    index: false,
    title: 'login',
    navigation: false,
    component: RequireAuthorisation,
    path: 'login'
  }, {
    index: false,
    title: 'unauthorised',
    navigation: false,
    component: Unauthorised,
    path: 'unauthorised'
  }]
};
function createAuthorisationModule(overrides = {}) {
  var _a;
  const {
      moduleConfig,
      signout
    } = overrides,
    rest = __rest(overrides, ["moduleConfig", "signout"]);
  const authorisationConfig = _.merge({}, {
    paths: {
      login: '/login',
      register: '/register'
    }
  }, moduleConfig || {});
  const config = _.merge({}, moduleDefaults$2, {
    modules: [signout]
  }, rest);
  // Update the component properties with the configured paths
  const loginPath = (_a = config.routes) === null || _a === void 0 ? void 0 : _a.find(r => r.path === 'login');
  if (loginPath) {
    loginPath.componentProps = {
      loginPath: authorisationConfig.paths.redirectLogin || authorisationConfig.paths.login,
      registerPath: authorisationConfig.paths.redirectRegister || authorisationConfig.paths.register
    };
  }
  return config;
}

class SingularityClientAuthService extends DataApi {
  constructor(props) {
    super(Object.assign(Object.assign({}, props), {
      dtoPath: '',
      // We are creating an instance of axios so that we can squirrel away the basic token
      axios: props.axios || axios$1.create({
        withCredentials: true
      })
    }));
    // There is an issue with overriding headers added through axios.create in axios so we do it here instead
    this.axios.defaults.headers.common = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${CryptoJS.SHA256(props.clientID + '|' + props.clientKey).toString()}:${props.clientSecret}`)
    };
    this.clientID = props.clientID;
  }
  getClientInfo(clientID) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.axios.get(`${this.getBasePath()}v2/api/clientinfo/${clientID}`);
    });
  }
  logoutUser(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
      window.location.href = `${this.getBasePath()}v2/auth/logout?accessToken=${accessToken}`;
    });
  }
  getSession(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.axios.get(`${this.getBasePath()}api/session`, {
        headers: {
          Authorization: `BEARER ${accessToken}`
        }
      });
    });
  }
  resolveAccessCode(accessCode, redirectURI) {
    return __awaiter(this, void 0, void 0, function* () {
      const params = {
        grant_type: 'authorization_code',
        code: accessCode
      };
      if (redirectURI) {
        params.redirect_uri = redirectURI;
      }
      return yield this.axios.post(`${this.getBasePath()}token`, params);
    });
  }
}

class SingularityClientAuthObservableService extends ObservableData {
  constructor() {
    super({
      name: SingularityClientAuthObservableService.name,
      global: false,
      idField: 'id',
      initialState: {
        gettingClientInfo: false,
        clientInfo: null,
        authenticatingUser: false,
        resolvingUserSession: false,
        userSession: null
      }
    });
  }
  gettingClientIdentifier(data) {
    this.setNextState({
      errors: [],
      clientIdentifier: data
    });
  }
  getClientInfo(data) {
    this.setNextState({
      errors: [],
      clientInfo: data
    });
  }
  gettingClientInfo(flag) {
    this.setNextState({
      gettingClientInfo: flag
    });
  }
  authenticatedUser(data) {
    this.setNextState({
      errors: [],
      authenticatedUser: data
    });
  }
  authenticatingUser(flag) {
    this.setNextState({
      authenticatingUser: flag
    });
  }
  unAuthenticatingUser(flag) {
    this.setNextState({
      unAuthenticatingUser: flag
    });
  }
  resolvingUserSession(flag) {
    this.setNextState({
      resolvingUserSession: flag
    });
  }
  getUserSession(data) {
    this.setNextState({
      errors: [],
      userSession: data
    });
  }
}
class SingularityClientAuthRepository extends DataRepository {
  constructor(args) {
    super(Object.assign(Object.assign({}, args), {
      global: true,
      dtoPath: '',
      observableService: new SingularityClientAuthObservableService(),
      apiService: new SingularityClientAuthService(args)
    }));
    this.accessToken = null;
    this.refreshToken = null;
  }
  getApiService() {
    return this.dataApi;
  }
  getClientInfo(clientID) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        this.observableService.gettingClientInfo(true);
        let result = null;
        if (clientID) {
          result = yield this.getApiService().getClientInfo(clientID);
        }
        this.observableService.getClientInfo(result && result.data);
      } catch (error) {
        const errors = handleAxiosError(error);
        this.observableService.error(errors);
      } finally {
        this.observableService.gettingClientInfo(false);
      }
    });
  }
  logoutUser() {
    return __awaiter(this, void 0, void 0, function* () {
      const accessToken = this.accessToken || '';
      try {
        this.observableService.unAuthenticatingUser(true);
        yield this.getApiService().logoutUser(accessToken);
        this.observableService.authenticatedUser('');
      } catch (error) {
        // The server could not redirect because of CORS
        const {
          redirect_uri
        } = jwtDecode(accessToken);
        if (redirect_uri) {
          window.location.href = redirect_uri;
        }
        const errors = handleAxiosError(error);
        this.observableService.error(errors);
      } finally {
        this.observableService.unAuthenticatingUser(false);
      }
    });
  }
  getAccessToken() {
    return this.accessToken || 'invalid token';
  }
  getRefreshToken() {
    return this.refreshToken || 'invalid token';
  }
  resolveUserSession(accessCode, redirectURI) {
    return __awaiter(this, void 0, void 0, function* () {
      of({
        accessCode,
        redirectURI
      }).pipe(tap(() => {
        this.observableService.resolvingUserSession(true);
      }), switchMap(args => {
        return this.getApiService().resolveAccessCode(args.accessCode, args.redirectURI);
      }), map(res => {
        return Object.assign(Object.assign({}, res.data), {
          token: jwtDecode(res.data.access_token)
        });
      }), switchMap(tokenInfo => {
        this.accessToken = tokenInfo.access_token;
        this.refreshToken = tokenInfo.refresh_token;
        // Update the global axios with the token
        axios$2.defaults.headers.common['Authorization'] = `${tokenInfo.token_type} ${tokenInfo.access_token}`;
        return this.getApiService().getSession(tokenInfo.access_token);
      }), map(sessionRes => {
        return sessionRes.data;
      }), tap(sessionData => {
        this.observableService.getUserSession(sessionData);
      }), catchError(err => {
        const errors = handleAxiosError(err);
        this.observableService.error(errors);
        return of(null);
      }), tap(() => {
        this.observableService.resolvingUserSession(false);
      })).subscribe();
    });
  }
}

let requestingProfile = false;
function useSingularityClientAuthService(props) {
  const [params, setParams] = useSearchParams();
  const axios = useAxios();
  const authRepository = useMemoDeepCompare(() => {
    return new SingularityClientAuthRepository(Object.assign({
      axios
    }, props));
  }, [props]);
  const [auth, setAuth] = useState({});
  const [accessCode] = useState(params.get('code') || null);
  const [persist, setPersist] = useState(false);
  const [initialToken] = useState(params.get('token'));
  const [repositoryState, setRepositoryState] = useState();
  useObservable(authRepository.getObservable(), setRepositoryState);
  // Extract the initial token if we have one
  useEffectOnce(() => {
    // Clear out the params so we don't confuse the user
    if (params.get('token')) {
      setParams({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * A user can only authenticate if there has been an initial
   * token provided by the server
   */
  const canAuthenticate = useCallback(() => {
    return Boolean(initialToken);
  }, [initialToken]);
  const isInRole = useCallback(
  /**
   * Checks that the user is in all roles specified
   * @param roles the roles the user must be in to access
   * @returns
   */
  roles => {
    var _a;
    if ((_a = auth.user) === null || _a === void 0 ? void 0 : _a.roles) {
      // Check that the user is in all of the roles specified
      return _.intersection(roles, auth.user.roles.map(r => r.id)).length === roles.length;
    }
    return false;
  }, [auth]);
  // If we have a code then we need to try to resolve it
  const resolvingAuthorisationCode = useMemo(() => {
    // We already have a user so we have resolved
    if (auth.user) {
      return false;
    }
    if (repositoryState && !requestingProfile) {
      requestingProfile = true;
      if (accessCode && !repositoryState.resolvingUserSession) {
        const redirect = localStore('auth:state:redirect') || window.location.origin;
        localStorage.removeItem('auth:state:redirect');
        // TODO: Check the accessState before triggering resolve session
        // We have not yet started resolving the access code, so do so now
        // TODO: Create redirect to last valid user location
        authRepository.resolveUserSession(accessCode, redirect);
      } else if (!accessCode && repositoryState.resolvingUserSession) {
        // We are still resolving the session
        console.log('resolving');
      }
    }
    return accessCode ? true : repositoryState === null || repositoryState === void 0 ? void 0 : repositoryState.resolvingUserSession;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoryState === null || repositoryState === void 0 ? void 0 : repositoryState.resolvingUserSession, auth]);
  useEffect(() => {
    if (repositoryState === null || repositoryState === void 0 ? void 0 : repositoryState.userSession) {
      setParams({});
      const session = repositoryState === null || repositoryState === void 0 ? void 0 : repositoryState.userSession;
      // The user profile has been updated, so update the auth to reflect the changes
      setAuth({
        token: authRepository.getAccessToken(),
        user: Object.assign(Object.assign({}, session.user), {
          name: session.user.displayname,
          id: session.user.userid,
          profileImage: session.user.profileimageuri,
          // When the session is set, we add a user role as the user is no longer anonymouse
          roles: [...session.user.roles.map(r => Object.assign(Object.assign({}, r), {
            id: r.guid
          })), {
            id: 'user',
            code: 'user',
            name: 'user'
          }]
        })
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoryState === null || repositoryState === void 0 ? void 0 : repositoryState.userSession, setAuth]);
  const requestAuthorisationCode = useCallback(() => {
    // DO NOTHING
  }, []);
  const getClientRedirectURL = useCallback(() => {
    // DO NOTHING
  }, []);
  return {
    auth,
    setAuth,
    persist,
    setPersist,
    isInRole,
    repository: repositoryState,
    clientInfo: repositoryState === null || repositoryState === void 0 ? void 0 : repositoryState.clientInfo,
    authRepository: authRepository,
    canAuthenticate,
    requestAuthorisationCode,
    resolvingAuthorisationCode,
    getClientRedirectURL
  };
}

function SingularityClientAuthGuard({
  roles,
  paths
}) {
  const location = useLocation();
  const {
    auth = {},
    isInRole
  } = useAuthorisation();
  const {
    user
  } = auth;
  const {
    login,
    unauthorised
  } = paths;
  const externalLogin = login.startsWith('http');
  // Prevent looping
  const isInGuard = location.pathname.endsWith(unauthorised) || location.pathname.endsWith(login);
  // Just for clarity on the code
  const isAuthenticated = Boolean(user);
  // If we are redirecting to an external login, update the location
  if (!isAuthenticated && externalLogin) {
    const redirectPath = `${window.location.origin}${location.pathname || '/'}`;
    localStore('auth:state:redirect', redirectPath);
    window.location.href = `${login}?redirectURI=${encodeURIComponent(redirectPath)}`;
    return null;
  } else {
    return isInGuard || isInRole(roles) ?
    // The user has the appropriate role assigned
    jsx(SuspenseLoader, {
      children: jsx(Outlet, {})
    }) : jsx(Navigate, {
      to: isAuthenticated ?
      // There is a user but they are not authorised for this page
      unauthorised :
      // There is no user so ask them to log in
      login,
      state: {
        from: location
      },
      replace: true
    });
  }
}

function useSingularityClient() {
  return useContext(SingularityClientContext);
}
const SingularityClientContext = createContext({});
function SingularityClientAuthProvider({
  children,
  paths = {}
}) {
  const {
    custom
  } = useApplication();
  const {
    t
  } = useContext(LocalizationContext);
  // Allow paths to be customised
  const authPaths = useMemo(() => {
    return _.merge({}, {
      login: `/login`,
      unauthorised: '/auth/unauthorised',
      logout: '/logout'
    }, paths);
  }, [paths]);
  const clientID = custom.singularity.clientID;
  const {
    auth,
    setAuth,
    persist,
    setPersist,
    isInRole,
    clientInfo,
    repository,
    authRepository,
    canAuthenticate,
    requestAuthorisationCode,
    resolvingAuthorisationCode,
    getClientRedirectURL
  } = useSingularityClientAuthService({
    baseURL: custom.singularity.apiRoot,
    clientID: custom.singularity.clientID,
    clientKey: custom.singularity.clientKey,
    clientSecret: custom.singularity.clientSecret
  });
  const loaderTitle = useMemo(() => {
    if (repository) {
      if (repository === null || repository === void 0 ? void 0 : repository.authenticatingUser) {
        return 'authenticating user';
      } else if (repository.gettingClientInfo) {
        return 'getting client settings';
      } else if (repository.resolvingUserSession) {
        return 'updating session';
      } else if (resolvingAuthorisationCode) {
        return 'validating access code';
      } else {
        return '';
      }
    } else {
      return 'configuring client';
    }
  }, [repository, resolvingAuthorisationCode]);
  const errors = (repository === null || repository === void 0 ? void 0 : repository.errors) || [];
  const hasErrors = errors && errors.length > 0;
  const navigate = useNavigate();
  return jsxs(SingularityClientContext.Provider, Object.assign({
    value: {
      clientID,
      client: clientInfo,
      auth,
      setAuth,
      persist,
      setPersist,
      GuardComponent: _a => {
        var {
            roles
          } = _a,
          rest = __rest(_a, ["roles"]);
        return jsx(SingularityClientAuthGuard, Object.assign({
          paths: authPaths,
          roles: roles
        }, rest));
      },
      isInRole,
      repository,
      authRepository,
      canAuthenticate,
      requestAuthorisationCode,
      getClientRedirectURL,
      logoutUser: () => {
        return authRepository.logoutUser();
      }
    }
  }, {
    children: [!hasErrors && resolvingAuthorisationCode && jsx(Loader, {
      variant: "circular",
      title: `${t(loaderTitle)}...`
    }), hasErrors && jsxs(ErrorPage, Object.assign({
      title: t('the following error(s) occurred while logging you in')
    }, {
      children: [jsx(ErrorWrapper, {
        errors: errors.map(e => {
          return {
            message: t(...e)
          };
        })
      }), jsx(Button, Object.assign({
        onClick: () => {
          navigate('/', {
            replace: true
          });
          window.location.reload();
        }
      }, {
        children: t('try again')
      }))]
    })), !resolvingAuthorisationCode && children]
  }));
}

const useStyles$2 = makeStyles()(theme => {
  const featureBackground = tinycolor(theme.palette.primary.main).setAlpha(0.1).toHex8String();
  return {
    root: {},
    content: {
      flexGrow: 1,
      flexShrink: 0,
      padding: theme.spacing(0, 1),
      overflow: 'auto',
      maxWidth: theme.breakpoints.values.lg,
      alignSelf: 'center',
      width: '100%'
    },
    footer: {
      overflow: 'hidden',
      borderTop: `thin solid ${theme.palette.divider}`,
      flexGrow: 0,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      maxWidth: theme.breakpoints.values.lg,
      alignSelf: 'center',
      width: '100%',
      flexDirection: 'column',
      padding: theme.spacing(3, 1, 1, 1),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6, 3, 6, 3),
        flexDirection: 'row'
      }
    },
    questionText: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 0,
      textAlign: 'center',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
        marginBottom: 0
      }
    },
    grid: {},
    card: {
      '& .MuiCardHeader-avatar img': {
        backgroundColor: featureBackground
      }
    },
    cardContent: {},
    cardTitle: {
      '& > p': {
        margin: 0
      }
    }
  };
});
function KnowledgeBase({
  className,
  style,
  classes: classesProp,
  externalURL,
  title,
  icon
}) {
  const {
    classes,
    cx
  } = useStyles$2(undefined, {
    props: {
      classes: classesProp
    }
  });
  const {
    repository,
    repositoryDescriptor
  } = useApplicationRepository('singularityClient', 'clientKnowledgeBasesDefinition');
  const {
    t
  } = useContext(LocalizationContext);
  const {
    modules
  } = useApplication();
  const helpCenterModule = useMemo(() => {
    return findModule('knowledgebaseModule', modules);
  }, [modules]);
  const renderCard = useCallback(kbItem => {
    return jsx(Card, Object.assign({
      elevation: 0,
      className: cx(classes.card),
      style: style,
      showTitle: true,
      title: jsx(Typography, {
        className: cx(classes.cardTitle),
        component: "h2",
        variant: "h5",
        dangerouslySetInnerHTML: {
          __html: kbItem.title || ''
        }
      }),
      thumbnailImage: kbItem.featureImageUrl
    }, {
      children: jsx(CardContent, Object.assign({
        className: cx(classes.cardContent)
      }, {
        children: jsx(Typography, {
          variant: "body1",
          component: "p",
          dangerouslySetInnerHTML: {
            __html: kbItem.content || ''
          }
        })
      }))
    }), kbItem.guid);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  return jsxs(TitledPage, Object.assign({
    className: cx(classes.root, className),
    style: style,
    title: t(title || (helpCenterModule === null || helpCenterModule === void 0 ? void 0 : helpCenterModule.title) || 'FAQs'),
    titleVariant: "condensed",
    icon: icon || (helpCenterModule === null || helpCenterModule === void 0 ? void 0 : helpCenterModule.icon),
    showDivider: true
  }, {
    children: [jsx("div", Object.assign({
      className: cx(classes.content)
    }, {
      children: jsx(RepositoryGrid, {
        className: cx(classes.grid),
        style: style,
        repository: repository,
        model: repositoryDescriptor,
        itemComponent: renderCard,
        gap: 2
      })
    })), externalURL && jsxs("div", Object.assign({
      className: cx(classes.footer)
    }, {
      children: [jsxs("div", Object.assign({
        className: cx(classes.questionText)
      }, {
        children: [jsx(Typography, Object.assign({
          variant: "h5",
          component: "h2"
        }, {
          children: t('Still have questions?')
        })), jsx(Typography, Object.assign({
          variant: "body1"
        }, {
          children: t('Check out our full frequently asked questions and website')
        }))]
      })), jsx("div", {
        children: jsx(Button, Object.assign({
          variant: "outlined",
          title: t('go to our site'),
          onClick: () => {
            window.open(externalURL);
          }
        }, {
          children: t('FAQs')
        }))
      })]
    }))]
  }));
}

function registerClientKowledgeBasesRepository() {
  SingularityClientRepositories.registerRepository('clientKnowledgeBasesDefinition', (baseURL, axios) => {
    return createModelRepository({
      baseURL,
      dtoPath: 'v2/api/knowledgebaseitems',
      axios,
      model: {
        name: 'clientKnowledgeBases',
        title: 'Knowledge Base Item',
        icon: 'fa book-reader',
        identityField: 'guid',
        primaryTextField: 'title',
        secondaryTextField: 'excerpt',
        getPrimaryText: model => {
          return stripHtml((model === null || model === void 0 ? void 0 : model.title) || '');
        },
        fields: createModelFields({
          guid: {
            type: 'string',
            readonly: true
          },
          clientID: {
            type: 'string',
            readonly: true
          },
          title: {
            type: 'richtext',
            description: 'The title to display for this item',
            minLength: 4,
            maxLength: 256,
            required: true
          },
          category: {
            type: 'string',
            maxLength: 256,
            description: 'A top level category for this item, helps with the organisation and presentation'
          },
          excerpt: {
            type: 'richtext',
            description: 'Displayed when unable to show the full content',
            minLength: 4,
            maxLength: 2048,
            required: true
          },
          content: {
            type: 'richtext',
            description: 'The full expanded content for this item',
            maxLength: 10000
          },
          featureImageUrl: {
            description: 'The image to display as visual content for this item',
            type: 'imageURL'
          },
          mediaUrl: {
            description: 'A direct link to a media resource to display as main visual content for this item',
            type: 'imageURL'
          },
          keywords: {
            type: 'string',
            maxLength: 4196,
            required: false
          },
          tags: {
            type: 'tags',
            maxLength: 1024,
            description: 'A list of tags to aid in searchability and organisation of the item'
          },
          authRoles: {
            type: 'tags',
            maxLength: 256,
            description: 'A list of roles that should be able to see this item, if empty no constraints are applied'
          },
          start: {
            type: 'date',
            validations: [createDateRangeConstraint({
              startFieldID: 'start',
              endFieldID: 'expiry'
            })],
            description: 'The date this item will start being displayed'
          },
          expiry: {
            type: 'date',
            validations: [createDateRangeConstraint({
              startFieldID: 'start',
              endFieldID: 'expiry'
            })],
            description: 'The date this item will stop being displayed, leave empty for never'
          },
          enabled: {
            type: 'boolean',
            default: false,
            description: 'A flag to turn this item on or off'
          },
          includeInKB: {
            type: 'boolean',
            default: true,
            description: 'If set this item will be searchable as part of the knowledge base'
          },
          includeInTips: {
            type: 'boolean',
            default: false,
            description: 'If set this item will be used to display tooltips for the user'
          },
          includeInTour: {
            type: 'boolean',
            default: false,
            description: 'If set this item will be used as part of the user onboarding tour'
          },
          tourControlID: {
            type: 'string',
            maxLength: 256,
            description: 'If included in tour this identifies with control the item should be attached to in the tour'
          },
          additionalData: {
            type: 'string',
            maxLength: 10000
          }
        }),
        layout: [['title', 'title'], ['excerpt', 'excerpt'], ['content', 'content'], ['category', 'category'], ['tags', 'tags'], ['featureImageUrl', 'mediaUrl'], ['start', 'expiry'], ['enabled', 'includeInKB'], ['includeInTips', 'includeInTour'], ['tourControlID'], ['authRoles', 'authRoles']],
        listLayout: ['featureImageUrl', 'title', 'excerpt']
      }
    });
  });
}

function createKnowledgeBaseAdminModule(overrides) {
  // register the repository
  registerClientKowledgeBasesRepository();
  const repositoryName = 'singularityClient';
  const dataDefinition = 'clientKnowledgeBasesDefinition';
  return createModuleFromRepository(repositoryName, dataDefinition, MasterDetailLayout, {
    layoutConfig: MasterDetailLayoutDefaults,
    repositoryName,
    dataDefinition
  }, overrides);
}

const moduleDefaults$1 = {
  name: 'knowledgebaseModule',
  title: 'Knowledge Base',
  enabled: true,
  icon: 'fa book-reader',
  path: 'knowledgebase',
  navigation: true,
  modules: [createKnowledgeBaseAdminModule()],
  routes: [{
    title: 'index',
    index: true,
    component: KnowledgeBase
  }],
  hideAdmin: false
};
function createKnowledgeBaseModule(overrides) {
  const config = _.merge({}, moduleDefaults$1, overrides);
  if ((overrides === null || overrides === void 0 ? void 0 : overrides.hideAdmin) === true) {
    const moduleOverrideConfig = config;
    moduleOverrideConfig.component = moduleOverrideConfig.routes[0].component;
    moduleOverrideConfig.modules = [];
    moduleOverrideConfig.routes = [];
    return moduleOverrideConfig;
  }
  return config;
}

const useStyles$1 = makeStyles()(theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100%'
    },
    card: {
      flexShrink: 0,
      marginBottom: theme.spacing(2),
      '&:last-child': {
        marginBottom: 0
      }
    },
    profileWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    avatar: {
      width: theme.spacing(18),
      height: theme.spacing(18),
      marginBottom: theme.spacing(2)
    }
  };
});
function UserDashboard({
  className,
  style,
  classes: classesProp
}) {
  var _a;
  const {
    classes,
    cx
  } = useStyles$1(undefined, {
    props: {
      classes: classesProp
    }
  });
  const {
    t
  } = useContext(LocalizationContext);
  const auth = useAuthContext();
  const {
    repository
  } = useApplicationRepository('singularityClient', 'profileDefinition');
  const [stateRepo, profileState] = useRepository(repository);
  useEffectOnce(() => {
    var _a;
    if ((_a = auth.user) === null || _a === void 0 ? void 0 : _a.id) {
      stateRepo.findOne(auth.user.id);
    }
  }, [(_a = auth.user) === null || _a === void 0 ? void 0 : _a.id]);
  const hasErrors = profileState.errors && profileState.errors.length > 0;
  const {
    user
  } = auth;
  console.log({
    user
  });
  if (!user) {
    return jsx(Loader, {});
  }
  return hasErrors ? jsx(TitledPage, Object.assign({
    className: cx(classes.root, className),
    title: t('Profile')
  }, {
    children: jsx(ErrorWrapper, {
      errors: profileState.errors.map(e => {
        return {
          message: t(...e)
        };
      })
    })
  })) : jsxs(TitledPage, Object.assign({
    className: cx(classes.root, className),
    title: t('Profile')
  }, {
    children: [jsx(Card, Object.assign({
      className: cx(classes.card),
      title: t('Basic Details')
    }, {
      children: jsxs(CardContent, Object.assign({
        className: cx(classes.profileWrapper)
      }, {
        children: [jsx(Avatar, {
          className: cx(classes.avatar),
          size: "inherit",
          src: user.profileimageuri,
          title: user.displayname
        }), jsx(Typography, Object.assign({
          variant: "h5",
          component: "h2"
        }, {
          children: user.displayname
        })), jsx(Typography, Object.assign({
          variant: "caption"
        }, {
          children: "User Email"
        }))]
      }))
    })), jsx(Card, Object.assign({
      className: cx(classes.card),
      title: t('Settings')
    }, {
      children: jsx(CardContent, {})
    }))]
  }));
}

function registerProfileRepository() {
  SingularityClientRepositories.registerRepository('profileDefinition', (baseURL, axios) => {
    return createModelRepository({
      baseURL,
      dtoPath: 'api/profile',
      axios: axios
    });
  });
}

const useStyles = makeStyles()(theme => {
  return {
    root: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        background: theme.palette.action.hover
      }
    },
    userMenu: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      cursor: 'pointer'
    },
    userInfo: {
      overflow: 'hidden',
      maxWidth: theme.spacing(20)
    },
    userAvatar: {
      marginLeft: theme.spacing(2),
      border: `thin solid ${theme.palette.divider}`
    }
  };
});
function ProfileToolbarActions({
  className,
  style,
  classes: classesProp,
  hideRole = false
}) {
  const {
    classes,
    cx
  } = useStyles(undefined, {
    props: {
      classes: classesProp
    }
  });
  const navigate = useNavigate();
  const {
    getAuthContext,
    modules
  } = useApplication();
  const {
    auth = {}
  } = getAuthContext();
  const {
    user
  } = auth;
  const profileModule = useMemo(() => {
    return findModule('profileModule', modules);
  }, [modules]);
  const signOutModule = useMemo(() => {
    return findModule('signOut', modules);
  }, [modules]);
  return user ? jsx("div", Object.assign({
    className: cx(classes.root, className),
    style: style
  }, {
    children: jsx(DropdownMenu, {
      menu: [profileModule && {
        title: profileModule.title,
        icon: profileModule.icon,
        onClick: () => {
          navigate(profileModule.fullPath || '/');
        }
      }, signOutModule && {
        title: signOutModule.title,
        icon: signOutModule.icon,
        onClick: () => {
          navigate(signOutModule.fullPath || '/');
        }
      }].filter(i => i),
      hideIconButton: true,
      label: jsxs("div", Object.assign({
        className: cx(classes.userMenu)
      }, {
        children: [jsx(ListItemText, {
          className: cx(classes.userInfo),
          primary: user.name,
          primaryTypographyProps: {
            noWrap: true,
            variant: 'body2',
            style: {
              fontWeight: 'bold'
            }
          },
          secondary: !hideRole && user.roles[0].name,
          secondaryTypographyProps: {
            noWrap: true,
            variant: 'caption'
          }
        }), jsx(Avatar, {
          className: cx(classes.userAvatar),
          title: user.name,
          src: user.profileImage || undefined,
          size: "small"
        })]
      }))
    })
  })) : null;
}

const moduleDefaults = {
  name: 'profileModule',
  title: 'Profile',
  enabled: true,
  icon: 'account_circle',
  path: 'profile',
  navigation: true,
  component: UserDashboard
};
function createProfileModule(overrides) {
  // Make sure the profile repository is created
  registerProfileRepository();
  const config = _.merge({}, moduleDefaults, overrides);
  return config;
}

const AUTHORIZATION = 'Authorization';
const useAxiosJWT = () => {
  const refresh = useRefreshToken();
  const {
    auth
  } = useAuthorisation();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(config => {
      console.log('axios interceptor 1', {
        config
      });
      if (config.headers && !config.headers[AUTHORIZATION]) {
        config.headers[AUTHORIZATION] = `Bearer ${auth === null || auth === void 0 ? void 0 : auth.token}`;
      }
      return config;
    }, error => Promise.reject(error));
    const responseIntercept = axiosPrivate.interceptors.response.use(response => response, error => __awaiter(void 0, void 0, void 0, function* () {
      var _a;
      const previousRequest = error === null || error === void 0 ? void 0 : error.config;
      console.log('axios interceptor', {
        error
      });
      if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === 403 && !(previousRequest === null || previousRequest === void 0 ? void 0 : previousRequest.sent)) {
        previousRequest.sent = true;
        const newAccessToken = yield refresh();
        previousRequest.headers[AUTHORIZATION] = `Bearer ${newAccessToken}`;
        return axiosPrivate(previousRequest);
      }
      return Promise.reject(error);
    }));
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return axiosPrivate;
};

class SingularityService {
  makeRequestInEffect(setData) {
    return () => {
      // This should have been configured
      const axios = useAxiosJWT();
      const navigate = useNavigate();
      const location = useLocation();
      let isMounted = true;
      const controller = new AbortController();
      const retrieveData = () => __awaiter(this, void 0, void 0, function* () {
        try {
          const response = yield axios.get('/users', {
            signal: controller.signal
          });
          isMounted && setData(response.data);
        } catch (err) {
          console.error(err);
          navigate('/login', {
            state: {
              from: location
            },
            replace: true
          });
        }
      });
      retrieveData();
      return () => {
        isMounted = false;
        controller.abort();
      };
    };
  }
}

export { AuthContext, KnowledgeBase, ProfileToolbarActions, SingularityAuthGuard, SingularityAuthProvider, SingularityClientAuthGuard, SingularityClientAuthProvider, SingularityClientRepositories, SingularityService, adminModuleCreateDefault, adminModuleDefaults, createAdminModule, createAuthorisationModule, createKnowledgeBaseAdminModule, createKnowledgeBaseModule, createOrganisationsModule, createProfileModule, useSingularityAuthorisation, useSingularityClient };
