function money(num:number, decimal:number) {
    if (num || num === 0){
        return num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return "-.--"
}
export default money;
