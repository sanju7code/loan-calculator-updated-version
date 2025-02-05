document.getElementById("loanForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let annualRate = parseFloat(document.getElementById("interestRate").value);
    let loanTenure = parseInt(document.getElementById("loanTenure").value);
    let startDate = new Date(document.getElementById("startDate").value);

    if (loanAmount <= 0 || annualRate <= 0 || loanTenure <= 0) {
        alert("Please enter valid loan details.");
        return;
    }

    let monthlyRate = annualRate / 12 / 100;
    let EMI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) / 
              (Math.pow(1 + monthlyRate, loanTenure) - 1);

    let tableBody = document.getElementById("loanSchedule");
    tableBody.innerHTML = ""; // Clear previous results

    let balance = loanAmount;
    for (let i = 1; i <= loanTenure; i++) {
        let interestPayment = balance * monthlyRate;
        let principalPayment = EMI - interestPayment;
        balance -= principalPayment;

        let paymentDate = new Date(startDate);
        paymentDate.setMonth(startDate.getMonth() + i);

        let row = `<tr>
            <td>${i}</td>
            <td>${paymentDate.toISOString().split("T")[0]}</td>
            <td>₹${balance + principalPayment}</td>
            <td>₹${EMI.toFixed(2)}</td>
            <td>₹${principalPayment.toFixed(2)}</td>
            <td>₹${interestPayment.toFixed(2)}</td>
            <td>₹${balance.toFixed(2)}</td>
        </tr>`;

        tableBody.innerHTML += row;
    }
});