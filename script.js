    let records = JSON.parse(localStorage.getItem("studentRecords")) || [];

    function calculateGrade() {

        const name = document.getElementById("studentName").value.trim();
        const score1 = Number(document.getElementById("score1").value);
        const score2 = Number(document.getElementById("score2").value);
        const score3 = Number(document.getElementById("score3").value);

        if (name === "") {
            alert("Please enter the student's name.");
            return;
        }

        if (
            document.getElementById("score1").value === "" ||
            document.getElementById("score2").value === "" ||
            document.getElementById("score3").value === ""
        ) {
            alert("Please enter all three assessment scores.");
            return;
        }

        if (
            score1 < 0 || score1 > 100 ||
            score2 < 0 || score2 > 100 ||
            score3 < 0 || score3 > 100
        ) {
            alert("Scores must be between 0 and 100.");
            return;
        }

        const total = score1 + score2 + score3;
        const average = total / 3;
        let grade;

        if (average >= 70) {
            grade = "A";
        } else if (average >= 60) {
            grade = "B";
        } else if (average >= 50) {
            grade = "C";
        } else if (average >= 45) {
            grade = "D";
        } else if (average >= 40) {
            grade = "E";
        } else {
            grade = "F";
        }

        const status = average >= 40 ? "PASS" : "FAIL";

        const student = {
            id: Date.now(),
            name,
            score1,
            score2,
            score3,
            total,
            average: average.toFixed(2),
            grade,
            status
        };

        records.push(student);

        localStorage.setItem("studentRecords", JSON.stringify(records));

        displayRecords();

        document.getElementById("studentName").value = "";
        document.getElementById("score1").value = "";
        document.getElementById("score2").value = "";
        document.getElementById("score3").value = "";
    }

    function displayRecords() {
        const recordsDiv = document.getElementById("records");

        if (records.length === 0) {
            recordsDiv.innerHTML =
                '<div class="empty">No student records yet.</div>';
            return;
        }

        recordsDiv.innerHTML = "";

        records.forEach(function(student) {
            const record = document.createElement("div");
            record.className = "record";

            record.innerHTML = `
                <h3>${student.name}</h3>
                <p><strong>Assessment 1:</strong> ${student.score1}</p>
                <p><strong>Assessment 2:</strong> ${student.score2}</p>
                <p><strong>Assessment 3:</strong> ${student.score3}</p>
                <p><strong>Total Score:</strong> ${student.total}</p>
                <p><strong>Average Score:</strong> ${student.average}</p>
                <p><strong>Grade:</strong> ${student.grade}</p>
                <p><strong>Status:</strong> ${student.status}</p>
                <button class="delete-btn"
                    onclick="deleteRecord(${student.id})">
                    Delete Record
                </button>
            `;

            recordsDiv.appendChild(record);
        });
    }

    function deleteRecord(id) {
        records = records.filter(function(student) {
            return student.id !== id;
        });
        localStorage.setItem("studentRecords", JSON.stringify(records));
        displayRecords();
    }

    displayRecords();

