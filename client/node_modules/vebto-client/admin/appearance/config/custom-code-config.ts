import {AppearanceFieldConfig} from "../../../core/types/vebto-config-structure";

export const customCode: AppearanceFieldConfig = {
    name: 'Custom Code',
    route: '/',
    fields: [
        {
            name: 'Custom CSS',
            type: 'code',
            key: 'custom_code.css',
            config: {language: 'css'}
        },
        {
            name: 'Custom Javascript',
            type: 'code',
            key: 'custom_code.js',
            config: {language: 'javascript'}
        }
    ]
};