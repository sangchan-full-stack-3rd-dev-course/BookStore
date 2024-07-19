export type ThemeName = 'light' | 'dark';
export type ColorKey = 'primary' | 'background' | 'secondary' | 'third';
export type HeadingSize = 'large' | 'medium' | 'small';

interface Theme {
    name : ThemeName;
    color : Record<ColorKey, string>;
    heading : {
        [key in HeadingSize] : {
            fontSize : string;
        };
    }
}

export const light : Theme = {
    name : 'light',
    color : {
        primary : 'brown',
        background : 'lightgrey',
        secondary : 'blue',
        third : 'green'
    },
    heading : {
        large : {
            fontSize : '2rem'
        },
        medium : {
            fontSize : '1.5rem'
        },
        small : {
            fontSize : '1rem'
        }
    }
};

export const dark : Theme = {
    ...light,
    name : 'dark',
    color : {
        primary : 'coral',
        background : 'midnightblue',
        secondary : 'darkblue',
        third : 'darkgreen'
    }
};

export const getTheme = (themeName : ThemeName) => {
    switch (themeName) {
        case 'light':
            return light;
        case 'dark':
            return dark;
        default:
            return light;
    };
};