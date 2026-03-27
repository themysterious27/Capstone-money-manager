export default class UI {

    static display(data) {
        const list = document.getElementById("list");
        list.innerHTML = "";

        let income = 0, expense = 0;

        
        if (data.length === 0) {
            list.innerHTML = `
                <tr>
                    <td colspan="6">No transactions found</td>
                </tr>
            `;
        }

        data.forEach(t => {

            const row = document.createElement("tr");

            
            const amountClass = t.type === "income" ? "green" : "red";

            row.innerHTML = `
                <td>${t.date}</td>
                <td>${t.type}</td>
                <td>${t.sub}</td>
                <td>${t.desc || "-"}</td>
                <td style="color:${amountClass}">
                    ₹${Number(t.amount).toLocaleString()}
                </td>
                <td>
                    <button onclick="edit('${t.id}')">Edit</button>
                    <button onclick="remove('${t.id}')">Delete</button>
                </td>
            `;

            list.appendChild(row);

            
            if (t.type === "income") {
                income += Number(t.amount);
            } else {
                expense += Number(t.amount);
            }
        });


        document.getElementById("income").innerText = "₹" + income.toLocaleString();
        document.getElementById("expense").innerText = "₹" + expense.toLocaleString();
        document.getElementById("balance").innerText = "₹" + (income - expense).toLocaleString();
    }
}