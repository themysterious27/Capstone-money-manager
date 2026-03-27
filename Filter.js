export default class Filter {

    static apply(data, filterType, sortType) {

        let filtered = [...data];

        
        if (filterType) {
            filtered = filtered.filter(t => t.type === filterType);
        }

        
        if (sortType === "dateDesc") {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        if (sortType === "dateAsc") {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        if (sortType === "amountHigh") {
            filtered.sort((a, b) => b.amount - a.amount);
        }

        if (sortType === "amountLow") {
            filtered.sort((a, b) => a.amount - b.amount);
        }

        return filtered;
    }
}