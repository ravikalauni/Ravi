// Questions data
const lifeQuestions = [
    { question: "Which district he was born?", answer: "Baitadi" },
    { question: "Where do Ravi go to College?", answer: "Brixton College"},
    { question: "What local language he speaks?", answer: "Dotyali" }
];

const mathQuestions = [
    { question: "What will be derivatives of f(x)=(x³−3x)/(x²+1)", answer: "x = 2" },
    { question: "Let A = {1,2,3,4,5}, B={3,4,5,6,7} and C={1,5,7}. Find the number of elements in the set (A∪B)∩(B∪C).", answer: "6" },
    { question: "The ratio of the ages of A and B is 4:5, and the ratio of the ages of B and C is 3:4. If the sum of the ages of A, B, and C is 96 years, what is the ratio of the ages of A and C?", answer: "3:5" }
];

// CCTV Toggle
const cctvBtn = document.getElementById('cctvBtn');
let isCctvOn = true;

cctvBtn.addEventListener('click', () => {
    isCctvOn = !isCctvOn;
    cctvBtn.className = `btn cctv-btn ${isCctvOn ? 'on' : 'off'}`;
    const powerIndicator = cctvBtn.querySelector('.power-indicator');
    powerIndicator.style.backgroundColor = isCctvOn ? '#22c55e' : '#ef4444';
});

// Description Toggle
function toggleDescription() {
    const desc = document.getElementById('description');
    desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Daily Diary Verification
function openDailyDiary() {
    showModal('dailyDiaryModal');
}

function handleKnowRavi(knows) {
    if (!knows) {
        hideModal('dailyDiaryModal');
        return;
    }

    const form = document.getElementById('dailyDiaryForm');
    form.innerHTML = `
        <div class="form-group">
            <input type="text" id="raviName" placeholder="Enter Ravi's full name">
            <button class="btn" onclick="checkName()">Submit</button>
        </div>
    `;
}

function checkName() {
    const name = document.getElementById('raviName').value;
    if (name.toLowerCase() === 'ravi prasad kalauni') {
        const form = document.getElementById('dailyDiaryForm');
        form.innerHTML = `
            <div class="form-group">
                <input type="number" id="raviAge" placeholder="Enter Ravi's age (Predict) :">
                <button class="btn" onclick="checkAge()">Submit</button>
            </div>
        `;
    } else {
        alert('Incorrect name. Please try again.');
    }
}

function checkAge() {
    const age = parseInt(document.getElementById('raviAge').value);
    if (age >= 18 && age <= 22) {
        alert('Congratulation, You can access his diaries!');
        location.href = 'books/diary.html';
    } else {
        alert('Incorrect age. Please try again.');
    }
}

// Life Notes Verification
function openLifeNotes() {
    const questions = document.getElementById('lifeQuestions');
    questions.innerHTML = lifeQuestions
        .map((q, i) => `<div class="question">${q.question}</div>`)
        .join('');
    showModal('lifeNotesModal');
}

function verifyLifeAnswer() {
    const answer = document.getElementById('lifeAnswer').value;
    if (lifeQuestions.some(q => q.answer.toLowerCase() === answer.toLowerCase())) {
        alert('Congratulations!');
        location.href = 'lifenotes.html';
    } else {
        alert('Incorrect answer. Please try again.');
    }
}

// Sacrosanct I Verification
function openSacrosanctI() {
    const questions = document.getElementById('mathQuestions');
    questions.innerHTML = mathQuestions
        .map((q, i) => `<div class="question">${q.question}</div>`)
        .join('');
    showModal('sacrosanctIModal');
}

function verifyMathAnswer() {
    const answer = document.getElementById('mathAnswer').value;
    if (mathQuestions.some(q => q.answer.toLowerCase() === answer.toLowerCase())) {
        alert('Congratulations! You have unlocked the book!');
        location.href = 'sacrosanct1.html';
    } else {
        alert('Incorrect answer. Please try again.');
    }
}

// Sacrosanct II Verification
function openSacrosanctII() {
    showModal('sacrosanctIIModal');
}

function verifySacrosanctPassword() {
    const password = document.getElementById('sacrosanctPassword').value;
    // In a real application, this would be properly hashed and verified
    if (password === 'demo123') {
        alert('Congratulations! You\'ve unlocked the book!');
        location.href = 'sacrosanct2.html';
    } else {
        alert('Incorrect password. Please try again.');
    }
}

// Privacy Modal
function showPrivacyModal() {
    showModal('privacyModal');
}

function closePrivacyModal() {
    hideModal('privacyModal');
}

// Show Interest Modal
function showInterestModal() {
    showModal('interestModal');
}

function submitInterest() {
    const name = document.getElementById('interestName').value;
    if (name.trim()) {
        alert('Thanks for being honest, you\'ll have to wait for some time to get a response from Ravi.');
        hideModal('interestModal');
    } else {
        alert('Please enter your full name.');
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
};

// Enhanced tooltip handling
const cctvHelp = document.getElementById('cctvHelp');
const cctvTooltip = document.getElementById('cctvTooltip');

cctvHelp.addEventListener('click', (e) => {
    e.stopPropagation();
    cctvTooltip.classList.toggle('show');

    if(cctvTooltip.classList.contains('show')) {
        // Reset animation
        cctvTooltip.style.animation = 'none';
        cctvTooltip.offsetHeight; // Trigger reflow
        cctvTooltip.style.animation = null;
    }
});

// Close tooltip when clicking outside
document.addEventListener('click', (event) => {
    if (!cctvHelp.contains(event.target) && !cctvTooltip.contains(event.target)) {
        if(cctvTooltip.classList.contains('show')) {
            cctvTooltip.style.opacity = '0';
            cctvTooltip.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                cctvTooltip.classList.remove('show');
                cctvTooltip.style.opacity = '';
                cctvTooltip.style.transform = '';
            }, 300);
        }
    }
});
// for cctv enable/desable funtion

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("cctvBtn");
    const popup = document.getElementById("popup");
    let isEnabled = false;

    button.addEventListener("click", function () {
        isEnabled = !isEnabled;
        popup.textContent = isEnabled ? "CCTV Disabled" : "CCTV Enabled";
        
        // Show pop-up
        popup.classList.remove("hidden");
        popup.classList.add("show");

        // Hide after 1.5 seconds
        setTimeout(() => {
            popup.classList.remove("show");
            setTimeout(() => popup.classList.add("hidden"), 300);
        }, 1500);
    });
});


const allowedNames = ["Aarav", "John", "Alice", "Emma", "Ravi", "Sandhya", "Samiksha", "Prem", "Puja", "Krishna", "Kapil", "Rohit", "KP", "Mohan", "Sulav", "Aparichit", "Kailas", "Khagendra", "Bandana", "Kamal", "Hemesh", "Deepak", "Nischal", "Manju", "Birendra", "Aayush", "Naresh", "Pawan", "Manoj", "Baldev", "Dropati", "Parwati", "Ashish", "Binod", "Rakshya", "Milan", "Dipak", "Bikash", "Pooja", "Rohit", "Kishor", "Prabesh", "Sandesh", "Avinab", "Manish", "Himanshu", "Prakash", "Lochan", "Ramchandra", "Bipin", "Jeewan", "Priyanka", "Mukesh", "Jagdish", "Gayatri", "Kavi", "Sumit", "Sushil", "Bikesh", "Keshab", "Radika", "Yamuna", "Deepak", "Laxmi", "Bhupendra", "Sandip", "Chandra", "Swostika", "Janak", "Shankar", "Santosh", "Nitin", "Rajendra", "Kabita", "Prawati", "Rupesh", "Mohan", "Parash", "Upendra", "Lalit", "Anil", "Prakash", "Ritik", "Hemant", "Sushil", "Hira", "Ramchandra", "Pankaj", "Eklavya", "Mahesh", "Khemraj", "Trilochan", "GM Rock", "Bhanubhakta", "Yogesh", "HP", "Niharika", "Amar", "Dropati", "Gaur Singh", "Lokendra", "Devraj", "Madhu", "Lokendra", "Nikita", "Kamala", "Janaki", "Amrit", "Tilak", "Dilip", "Aman", "Prashant", "Naresh", "Govind", "Tekendra", "Rustam", "Sishir", "Tilak Raj", "Prem Datta", "Prabhat", "Sagar", "Ramit", "Niraj", "Deepak", "Devraj", "Dipak", "Anish", "Namraj", "Janaki Devi", "Kishor", "Dhirendra", "Santosh", "Manish", "Alina", "Srijana", "Sagar", "Raj", "Jagdish", "Keshab", "Suraj", "Suron", "Kailash", "Jagdish", "Bishal", "Tekraj", "Shahil", "Padam Raj", "Milan", "Chandra", "Rajendra", "Harish", "Shailesh", "Nisha", "Dharmesh", "Prakash", "Hari Datt", "Puspa", "Hemant", "Ganesh", "Xitij", "Ravi", "Bisan", "Laxit", "Birdatt", "Khyam", "Dev Raj", "Dhandev", "Debaki", "Pashupati", "Bashudev", "Sumit", "Bhatta Prasad", "Amit", "Yogesh", "Krishna", "Lalita", "Santosh", "Kiran", "Dipesh", "Geetu", "Hemant", "Kabita", "Mohan", "Rajmati", "Manisha", "Anish", "Sandy", "Keshab", "Santosh", "Dhirendra", "Bisan", "Muna", "Surendra", "Chandra", "Tek Raj", "Laxmi", "Prem Datta", "Milan", "Ritik", "Nabin", "Dipesh", "Mahadev", "Bhumika", "Aarav", "Abhishek", "Aayush", "Anil", "Ashish", "Bimal", "Bibek", "Binod", "Bishal", "Chandan", "Deepak", "Dipesh", "Dinesh", "Gaurav", "Ganesh", "Govinda", "Hari", "Hemant", "Ishwor", "Jitendra", "Kiran", "Krishna", "Laxman", "Lokesh", "Madhav", "Mahesh", "Manish", "Milan", "Nabin", "Naresh", "Niraj", "Nischal", "Pankaj", "Prabin", "Prakash", "Prashant", "Pratap", "Prem", "Rabi", "Ramesh", "Ramit", "Ranjan", "Rishi", "Rohit", "Roshan", "Rupesh", "Sagar", "Samir", "Sanjay", "Santosh", "Saroj", "Shankar", "Shishir", "Shyam", "Sudeep", "Suman", "Suraj", "Sujan", "Sunil", "Ujjwal", "Umesh", "Vikas", "Yubaraj", "Arjun", "Bikash", "Chirag", "Dhiraj", "Gopal", "Gyanendra", "Jeevan", "Keshav", "Lalit", "Mohan", "Narayan", "Nitesh", "Prajwal", "Rajendra", "Rajesh", "Rajkumar", "Rupak", "Siddharth", "Subash", "Sudip", "Sundar", "Tek", "Tilak", "Uday", "Upendra", "Vivek", "Yogesh", "Santos", "Devendra", "Harihar", "Indra", "Jayan", "Kapil", "Lokmani", "Madhu", "Nagendra", "Parash", "Rajib", "Sanjeev", "Tika", "Vibhor", "Aasha", "Aayusha", "Anjali", "Anisha", "Anjana", "Asmita", "Bandana", "Bimala", "Binita", "Chhaya", "Deepa", "Dipika", "Ganga", "Geeta", "Hema", "Ishwori", "Jamuna", "Januka", "Kabita", "Kamala", "Kanchan", "Kusum", "Laxmi", "Manju", "Manisha", "Maya", "Mina", "Naina", "Namrata", "Nisha", "Pabitra", "Poonam", "Pratibha", "Puja", "Rashmi", "Renu", "Rita", "Roshani", "Sabina", "Samikshya", "Sangita", "Sanjita", "Sarita", "Sharmila", "Shila", "Shristi", "Sita", "Soniya", "Sunita", "Susmita", "Tara", "Usha", "Yamuna", "Amrita", "Arati", "Bhavna", "Charu", "Dibya", "Gopika", "Indira", "Jayanti", "Karishma", "Lalita", "Madhu", "Nirmala", "Parbati", "Radha", "Rajina", "Rekha", "Sajana", "Saraswati", "Sharada", "Sharini", "Simran", "Sristy", "Sudha", "Sumitra", "Sweta", "Tanmaya", "Tulsi", "Uma", "Urmila", "Vandana", "Yashoda", "Alisha", "Archana", "Barsha", "Chitra", "Dikshya", "Gargi", "Kabya", "Liza", "Meera", "Nabina", "Nitu", "Prakriti", "Srijana", "Suchitra", "Suman", "Trishna", "Umaiya", "Vidya"];
   // Add allowed names here
        
        function submitName() {
            let name = document.getElementById("nameInput").value.trim();
            if (allowedNames.includes(name)) {
                localStorage.setItem("username", name);
                document.getElementById("overlay").style.display = "none";
            } else {
                document.getElementById("errorMessage").style.display = "block";
            }
        }



        // google sheet for names
        const scriptURL = 'https://script.google.com/macros/s/AKfycbztoE5Qh2_1kS-BDCuN9hkeScDAsiIKgRNqQlI0ADn7lw1YqPttK9L0y_aIuDn-6dB5xg/exec'

const form = document.forms['reader-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  
  
})
