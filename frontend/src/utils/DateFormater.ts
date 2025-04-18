//Viết cho tôi cái hàm dateFormatter truyền vào là một string hoặc một Dat

export const dateFormatter = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    return dateObj.toLocaleString('en-US', options);
}