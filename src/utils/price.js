export function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function imageDefault()
{
    return 'https://123code.net/images/preloader.png';
}
