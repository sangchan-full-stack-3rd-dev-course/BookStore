export type ThemeName = 'light' | 'dark';
export type ColorKey = 'primary' | 'background' | 'secondary' | 'third';
export type HeadingSize = 'large' | 'medium' | 'small';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonScheme = 'primary' | 'normal';

interface Theme {
    name : ThemeName;
    color : Record<ColorKey, string>;
    heading : {
        [key in HeadingSize] : {
            fontSize : string;
        };
    };
    button : {
        [key in ButtonSize] : {
            fontSize : string;
            padding : string;
        };
    };
    buttonScheme : {
        [key in ButtonScheme] : {
            color : string;
            backgroundColor : string;
        };
    };
    borderRadius : {
        default : string;
    };

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
    },
    button : {
        large : {
            fontSize : '1.5rem',
            padding : '1rem 2rem'
        },
        medium : {
            fontSize : '1rem',
            padding : '0.5rem 1rem'
        },
        small : {
            fontSize : '0.75rem',
            padding : '0.25rem 0.5rem'
        }
    },
    buttonScheme : {
        primary : {
            color : 'white',
            backgroundColor : 'midnightblue'
        },
        normal : {
            color : 'black',
            backgroundColor : 'lightgray'
        }
    },
    borderRadius : {
        default : '4px'
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