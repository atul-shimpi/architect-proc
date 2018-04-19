export interface VebtoConfigStructure {
    environment?: 'production'|'dev',
    navbar?: {
        defaultPosition: string,
        dropdownItems: {route: string, name: string, icon: string}[],
    },
    admin: {
        appearance: VebtoConfigAppearance,
        analytics?: {stats: {name: string, icon: string}[]},
        ads?: {slot: string, description: string}[],
        pages: {name: string, icon: string, route: string, permission: string}[],
        settingsPages?: {name: string, route: string}[],
    }
}

export interface VebtoConfigAppearance {
    navigationRoutes: string[],
    defaultRoute: string,
    fields: {[key: string]: AppearanceFieldConfig},
    menus: {
        availableRoutes: string[],
    }
}

export interface AppearanceFieldConfig {
    name: string,
    route?: string,
    fields: AppearanceEditableField[],
}

export interface AppearanceEditableField {
    name: string,
    type?: 'code'|'color'|'image'|'text',
    key: string,
    value?: any,
    defaultValue?: any,
    image_type?: string,
    input_type?: string,
    selector?: string,
    config?: { [key: string]: any };
}