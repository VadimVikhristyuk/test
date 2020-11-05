export function Tooltip() {
    this.tooltip = document.createElement("div"); // Создание div для тени
    this.tooltip.style.position = "absolute";     // Абсолютное позиционирование.
    this.tooltip.style.visibility = "hidden";
    this.tooltip.className = "tooltip";
}

export function links() {
    let testLinks;
    return testLinks = {
        link1: 'http://www.filltext.com/?rows=10&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&message=%7Blorem%7C32%7D&timestamp',
        link2: 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%20%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D1%82%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B2%20%D0%B2%D0%B8%D0%B4%D0%B5%20%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0.%20xx-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D1%82%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B2%20%D0%B2%D0%B8%D0%B4%D0%B5%20%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0.%20xx%7D&message=%7Blorem%7C32%7D&timestamp={date}&delay=3',
        link3: 'http://www.filltext.com/?rows=100&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%20%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D1%82%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B2%20%D0%B2%D0%B8%D0%B4%D0%B5%20%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0.%20xx-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D1%82%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B2%20%D0%B2%D0%B8%D0%B4%D0%B5%20%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0.%20xx%7D&message=%7Blorem%7C32%7D&timestamp={date}&delay=1&err=408'
    }
}

export function arraySorting(i) {
    let res = i.sort((a, b) => {
        if (a.timestamp > b.timestamp) {
            return 1;
        }
        if (a.timestamp < b.timestamp) {
            return -1;
        }
        return 0;
    });
    return res
}