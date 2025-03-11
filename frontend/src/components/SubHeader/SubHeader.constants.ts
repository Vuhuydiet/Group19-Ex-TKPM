type Theme = Record<string, string>;

export const lightTheme: Theme = {
    "--border-radius": "10px",
    "--main-color": "#80002a",
    "--main-scroll-color": "#3b3b3b93",
    "--background-color": "#fff",
    "--item-color": "#f2f2f2",
    "--text-color": "#000",
    "--text-in-background-color": "#fff",
};

export const darkTheme: Theme = {
    "--border-radius": "10px",
    "--main-color": "#fff",
    "--main-scroll-color": "#88878793",
    "--background-color": "#000",
    "--item-color": "#202020",
    "--text-color": "#fff",
    "--text-in-background-color": "#000",
};