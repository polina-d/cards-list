export const formatTitle = (number: number, titles: string[]) => {
    //titles example ['день', 'дня', 'дней'] [именительный, родительный, родительный мн ч]
    const cases = [2, 0, 1, 1, 1, 2];
    if (!number) number = 0;
    return titles[
        Math.abs(number) % 100 > 4 && Math.abs(number) % 100 < 20
            ? 2
            : cases[Math.abs(number) % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
};
