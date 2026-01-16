function calculateGrades() {
    const subjects = ['subject1', 'subject2', 'subject3', 'subject4', 'subject5',
                      'subject6', 'subject7', 'subject8', 'subject9', 'subject10'];
    
    let totalMarks = 0;
    
    for (let i = 0; i < subjects.length; i++) {
        const marks = parseFloat(document.getElementById(subjects[i]).value);
        if (isNaN(marks)) {
            alert('Please enter valid marks for all subjects!');
            return;
        }
        totalMarks += marks;
    }
    
    const average = (totalMarks / 10).toFixed(2);
    const statusColor = totalMarks >= 500 ? 'green' : 'red';
    const status = totalMarks >= 500 ? 'PASS' : 'FAIL';
    
    let grade;
    if (average >= 90) grade = 'A+';
    else if (average >= 80) grade = 'A';
    else if (average >= 70) grade = 'B';
    else if (average >= 60) grade = 'C';
    else if (average >= 50) grade = 'D';
    else grade = 'F';
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>Result</h2>
                          <p>Grade: ${grade}</p>
                          <p>Status: <span style="color: ${statusColor}; font-weight: bold;">${status}</span></p>`;
}

function clearForm() {
    const subjects = ['subject1', 'subject2', 'subject3', 'subject4', 'subject5',
                      'subject6', 'subject7', 'subject8', 'subject9', 'subject10'];
    for (let i = 0; i < subjects.length; i++) {
        document.getElementById(subjects[i]).value = '';
    }
    document.getElementById('result').innerHTML = '';
}
