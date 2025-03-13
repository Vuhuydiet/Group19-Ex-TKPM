import { lightTheme, darkTheme } from './SubHeader.constants';

export const changeTheme = (isDarkMode: boolean) => {
    const theme = isDarkMode ? darkTheme : lightTheme;
    Object.keys(theme).forEach((key) => {
        document.documentElement.style.setProperty(key, theme[key]);
    });
}