import Transaction from "./modules/Transaction.js";
import Storage from "./modules/Storage.js";
import UI from "./modules/UI.js";
import Filter from "./modules/Filter.js";


let data = Storage.get();
let editId = null;
let chart;


document.addEventListener("DOMContentLoaded", () => {

    const filterType = document.getElementById("filterType");
    const sort = document.getElementById("sort");
    const subcategory = document.getElementById("subcategory");
    const dateInput = document.getElementById("date");

    
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("max", today);

    
    applyFilterSort();

    
    document.getElementById("openPopup").onclick = () => {
        document.getElementById("popup").classList.remove("hidden");
        dateInput.valueAsDate = new Date();
    };

    
    document.getElementById("closePopup").onclick = () => {
        document.getElementById("popup").classList.add("hidden");
    };

    
    const incomeOptions = ["Salary", "Bonus", "Allowance", "Petty Cash"];
    const expenseOptions = ["Rent", "Food", "Shopping", "Entertainment"];

    document.querySelectorAll("input[name='type']").forEach(radio => {
        radio.addEventListener("change", function () {

            subcategory.innerHTML = "<option value=''>Select</option>";

            let options = this.value === "income" ? incomeOptions : expenseOptions;

            options.forEach(opt => {
                const option = document.createElement("option");
                option.value = opt;
                option.textContent = opt;
                subcategory.appendChild(option);
            });
        });
    });

    
    function applyFilterSort() {

        const filtered = Filter.apply(
            data,
            filterType.value,
            sort.value
        );

        UI.display(filtered);

        
        renderChart(filtered);
        renderIncomeChart(filtered);
    }

    filterType.addEventListener("change", applyFilterSort);
    sort.addEventListener("change", applyFilterSort);

    
    document.getElementById("form").addEventListener("submit", e => {
        e.preventDefault();

        try {

            const amountInput = document.getElementById("amount");
            const typeInput = document.querySelector("input[name='type']:checked");
            const subInput = document.getElementById("subcategory");
            const descInput = document.getElementById("desc");

            const amount = amountInput.value;
            const date = dateInput.value;
            const type = typeInput?.value;
            const sub = subInput.value;
            const desc = descInput.value;

            
            document.querySelectorAll(".error").forEach(e => e.innerText = "");
            document.querySelectorAll("input, select").forEach(e => e.style.border = "");

            
            if (!amount || amount <= 0) return alert("Invalid amount");

            if (!date) {
                document.getElementById("dateError").innerText = "Date is required";
                dateInput.style.border = "2px solid red";
                return;
            }

            if (date > today) {
                document.getElementById("dateError").innerText = "Future date not allowed";
                dateInput.style.border = "2px solid red";
                return;
            }

            if (!type) return alert("Select type");

            if (!sub) {
                document.getElementById("subError").innerText = "Select subcategory";
                subInput.style.border = "2px solid red";
                return;
            }

            if (desc.length > 100) return alert("Description too long");

            
            if (editId) {
                data = data.map(item =>
                    item.id == editId
                        ? { ...item, amount, date, type, sub, desc }
                        : item
                );
                editId = null;

            } else {
                const t = new Transaction(
                    Date.now(),
                    amount,
                    date,
                    type,
                    sub,
                    desc
                );

                data.push(t);
            }

            Storage.save(data);
            applyFilterSort();

            document.getElementById("form").reset();
            subcategory.innerHTML = "<option value=''>Select</option>";

            document.getElementById("popup").classList.add("hidden");

        } catch (err) {
            alert(err);
        }
    });

    
    window.remove = function (id) {
        if (confirm("Delete this transaction?")) {
            data = data.filter(t => t.id != id);
            Storage.save(data);
            applyFilterSort();
        }
    };

    
    window.edit = function (id) {

        const t = data.find(item => item.id == id);

        document.getElementById("amount").value = t.amount;
        document.getElementById("date").value = t.date;
        document.querySelector(`input[value="${t.type}"]`).checked = true;

        const event = new Event("change");
        document.querySelector(`input[value="${t.type}"]`).dispatchEvent(event);

        setTimeout(() => {
            document.getElementById("subcategory").value = t.sub;
        }, 100);

        document.getElementById("desc").value = t.desc;

        editId = id;

        document.getElementById("popup").classList.remove("hidden");
    };

    
    function renderChart(data) {

        let categories = {};

        data.forEach(t => {
            if (t.type === "expense") {
                categories[t.sub] = (categories[t.sub] || 0) + Number(t.amount);
            }
        });

        const ctx = document.getElementById("chart");
        if (!ctx) return;

        if (chart && chart.destroy) chart.destroy();

        chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: Object.keys(categories),
                datasets: [{ data: Object.values(categories) }]
            }
        });
    }

    
    function renderIncomeChart(data) {

        let categories = {};

        data.forEach(t => {
            if (t.type === "income") {
                categories[t.sub] = (categories[t.sub] || 0) + Number(t.amount);
            }
        });

        const ctx = document.getElementById("incomeChart");
        if (!ctx) return;

        if (window.incomeChart && window.incomeChart.destroy) {
            window.incomeChart.destroy();
        }

        window.incomeChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories)
                }]
            }
        });
    }

    
    document.getElementById("downloadCSV").addEventListener("click", () => {

        let csv = "Date,Type,Subcategory,Description,Amount\n";

        data.forEach(t => {
            csv += `${t.date},${t.type},${t.sub},${t.desc},${t.amount}\n`;
        });

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "transactions.csv";
        a.click();
    });

});