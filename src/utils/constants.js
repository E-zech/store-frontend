export const RoleTypes = {
    none: 1, //can see products .
    business: 2, //all of the above + add to faves +(will recive mails about marketing)
    admin: 3, //can do all + CRUD + CRM (can view all users , change thier status, delete) . // owner of the site
    master: 4, //can do all + can edit users detailes. // me
};

export const pages = [
    { route: '/about', title: 'About' },
    { route: '/login', title: 'Login', permissions: [RoleTypes.none] },
    { route: '/signup', title: 'Signup', permissions: [RoleTypes.none] },
    { route: '/faves', title: 'Favorites ', permissions: [RoleTypes.business, RoleTypes.admin, RoleTypes.master] },
    { route: '/product-management', title: 'Prm', permissions: [RoleTypes.admin, RoleTypes.master] },
    { route: '/user-management', title: 'Crm', permissions: [RoleTypes.admin, RoleTypes.master] }];

export const disable = [
    '/user-management', '/about', '/login', '/signup', '/account', '/checkout', '/my-orders'
];


