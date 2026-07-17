/*====================================
ONE-TIME CERTIFICATE
====================================*/

const certificateKey = "DFG_CERTIFICATE_USED";

document.querySelectorAll(".print-certificate").forEach(button => {

    button.addEventListener("click", function () {

        if (localStorage.getItem(certificateKey)) {

            alert("This certificate has already been issued for this student.");

            return;

        }

        localStorage.setItem(certificateKey, "YES");

        window.print();

    });

});

document.querySelectorAll(".download-certificate").forEach(button => {

    button.addEventListener("click", function () {

        if (localStorage.getItem(certificateKey)) {

            alert("This certificate has already been issued for this student.");

            return;

        }

        localStorage.setItem(certificateKey, "YES");

        window.print();

    });

});
/*=========================================
LOCK CERTIFICATE AFTER FIRST USE
=========================================*/

function lockCertificate() {

    document.querySelectorAll(
        ".print-certificate,.download-certificate"
    ).forEach(function(button){

        button.disabled = true;

        button.innerHTML = "Certificate Already Issued";

    });

}

function unlockCertificate() {

    document.querySelectorAll(
        ".print-certificate,.download-certificate"
    ).forEach(function(button){

        button.disabled = false;

    });

}

if(localStorage.getItem("certificateIssued")){

    lockCertificate();

}

document.querySelectorAll(".print-certificate").forEach(function(button){

    button.addEventListener("click",function(){

        if(localStorage.getItem("certificateIssued")){

            alert("This certificate has already been issued.");

            return;

        }

        localStorage.setItem("certificateIssued","YES");

        lockCertificate();

        window.print();

    });

});

document.querySelectorAll(".download-certificate").forEach(function(button){

    button.addEventListener("click",function(){

        if(localStorage.getItem("certificateIssued")){

            alert("This certificate has already been issued.");

            return;

        }

        localStorage.setItem("certificateIssued","YES");

        lockCertificate();

        window.print();

    });

});
/*=========================================
LIMIT FINAL EXAM TO 2 ATTEMPTS
=========================================*/

let attempts = Number(localStorage.getItem("finalAttempts")) || 0;

const finalButton = document.querySelector("#final-assessment .submit-quiz");

if (finalButton) {

    finalButton.addEventListener("click", function () {

        if (localStorage.getItem("academyPassed") === "YES") {

            alert("You have already completed this academy.");
            return;

        }

        attempts++;

        localStorage.setItem("finalAttempts", attempts);

        if (finalScore >= 12) {

            localStorage.setItem("academyPassed", "YES");

            alert("Congratulations! You passed the Final Assessment.");

            document.getElementById("passSection").style.display = "block";
            document.getElementById("failSection").style.display = "none";

            return;

        }

        /* FAILED */

        if (attempts >= 2) {

            alert("You have used both assessment attempts.");

            document.getElementById("final-assessment").style.display = "none";

            document.getElementById("passSection").style.display = "none";

            document.getElementById("failSection").innerHTML = `
                <div class="warning-box">
                    <h2>Thank You for Attending</h2>

                    <p>
                        Thank you for attending the
                        <strong>Destined For Greatness LLC Work From Home Academy.</strong>
                    </p>

                    <p>
                        You did not achieve the required passing score of
                        <strong>12 out of 15</strong> after two assessment
                        attempts.
                    </p>

                    <p>
                        No Certificate of Completion will be issued.
                    </p>

                    <p>
                        Thank you for participating, and we wish you success
                        in your future endeavors.
                    </p>
                </div>
            `;

            document.getElementById("failSection").style.display = "block";

        } else {

            alert(
                "Assessment not passed.\n\nYou have " +
                (2 - attempts) +
                " attempt remaining."
            );

        }

    });

}
/*=========================================
SHOW CERTIFICATE ONLY IF PASSED
=========================================*/

const certificateSection =
document.getElementById("certificate");

if(certificateSection){

if(localStorage.getItem("academyPassed")==="YES"){

certificateSection.style.display="block";

}else{

certificateSection.style.display="none";

}

}

/*=========================================
LOCK CERTIFICATE BUTTONS
=========================================*/

document.querySelectorAll(
".print-certificate,.download-certificate"
).forEach(function(button){

button.addEventListener("click",function(){

if(localStorage.getItem("academyPassed")!=="YES"){

alert("A certificate is only issued to students who successfully pass the Final Assessment.");

return;

}

window.print();

});

});

/*=========================================
THANK YOU PAGE
=========================================*/

function showThankYouPage(){

hideAllPages();

const thankYou=document.createElement("section");

thankYou.className="lesson";

thankYou.innerHTML=`

<h2>Thank You for Attending</h2>

<p>

Thank you for attending the
<strong>Destined For Greatness LLC Work From Home Academy.</strong>

</p>

<p>

You have completed your two Final Assessment attempts.

</p>

<p>

A passing score was not achieved, therefore no Certificate of Completion has been issued.

</p>

<p>

We appreciate your participation and wish you continued success.

</p>

`;

document.body.appendChild(thankYou);

thankYou.style.display="block";

window.scrollTo({

top:0,

behavior:"smooth"

});

}
/*=========================================
PREVENT MULTIPLE CERTIFICATES
=========================================*/

const printButton = document.querySelector(".print-certificate");
const downloadButton = document.querySelector(".download-certificate");

if(localStorage.getItem("certificateIssued")==="YES"){

    if(printButton) printButton.disabled=true;
    if(downloadButton) downloadButton.disabled=true;

}

function issueCertificate(){

    if(localStorage.getItem("academyPassed")!=="YES"){

        alert("Certificate unavailable. A passing score of 12 out of 15 is required.");

        return;

    }

    if(localStorage.getItem("certificateIssued")==="YES"){

        alert("Your certificate has already been issued.");

        return;

    }

    localStorage.setItem("certificateIssued","YES");

    if(printButton) printButton.disabled=true;
    if(downloadButton) downloadButton.disabled=true;

    window.print();

}

if(printButton){

    printButton.addEventListener("click",issueCertificate);

}

if(downloadButton){

    downloadButton.addEventListener("click",issueCertificate);

}

/*=========================================
ACADEMY COMPLETE MESSAGE
=========================================*/

if(localStorage.getItem("academyPassed")==="YES"){

    const status=document.querySelector(".certificate-status");

    if(status){

        status.innerHTML="🎉 Congratulations! Your Certificate of Completion has been issued.";

    }

}
/*=========================================
DISABLE RETAKE AFTER PASS
=========================================*/

if(localStorage.getItem("academyPassed")==="YES"){

const exam=document.getElementById("final-assessment");

if(exam){

exam.style.display="none";

}

const passSection=document.getElementById("passSection");

if(passSection){

passSection.style.display="block";

}

}

/*=========================================
STUDENT COMPLETION RECORD
=========================================*/

const completionRecord={

student:
document.getElementById("certificateStudentName") ?
document.getElementById("certificateStudentName").textContent :
"Student",

date:new Date().toLocaleDateString(),

score:finalScore,

passed:(finalScore>=12),

certificate:
(localStorage.getItem("academyPassed")==="YES")

};

localStorage.setItem(
"academyCompletionRecord",
JSON.stringify(completionRecord)
);

/*=========================================
FINAL LOCK
=========================================*/

if(localStorage.getItem("certificateIssued")==="YES"){

document.querySelectorAll(
".submit-quiz,.print-certificate,.download-certificate"
).forEach(function(button){

button.disabled=true;

});

}

/*=========================================
ACADEMY COMPLETE
=========================================*/

console.log(
"Destined For Greatness Work From Home Academy Ready"
);
/*=========================================
STUDENT NAME
=========================================*/

const studentField = document.getElementById("studentName");
const certificateName = document.getElementById("certificateStudentName");

if (studentField && certificateName) {

    const savedName = localStorage.getItem("studentName");

    if (savedName) {

        studentField.value = savedName;
        certificateName.textContent = savedName;

    }

    studentField.addEventListener("input", function () {

        const name = this.value.trim();

        certificateName.textContent = name || "Student Name";

        localStorage.setItem("studentName", name);

    });

}
/*=========================================
AUTO LOGOUT AFTER COMPLETION
=========================================*/

function academyComplete(){

if(localStorage.getItem("academyPassed")==="YES"){

setTimeout(function(){

alert("Congratulations! Your training has been completed. You will now exit the academy.");

window.location.href="about:blank";

},5000);

}

if(Number(localStorage.getItem("finalAttempts"))>=2 &&
localStorage.getItem("academyPassed")!=="YES"){

setTimeout(function(){

alert("Thank you for attending the Destined For Greatness LLC Work From Home Academy.");

window.location.href="about:blank";

},5000);

}

}

academyComplete();
/*=========================================
PREVENT STUDENT FROM REENTERING ACADEMY
=========================================*/

if(localStorage.getItem("academyFinished")==="YES"){

document.body.innerHTML=`

<div style="
max-width:800px;
margin:80px auto;
padding:40px;
background:#fff;
border-radius:15px;
text-align:center;
box-shadow:0 10px 30px rgba(0,0,0,.15);
font-family:Arial,sans-serif;
">

<h1 style="color:#0d47a1;">
Destined For Greatness LLC
</h1>

<h2>
This Academy Has Already Been Completed
</h2>

<p>

Our records indicate this student has already completed this academy.

</p>

<p>

Each student may complete this academy only once.

</p>

<p>

If you believe this message is an error, please contact your instructor.

</p>

</div>

`;

throw new Error("Academy Complete");

}

/*=========================================
MARK ACADEMY COMPLETE
=========================================*/

function finishAcademy(){

localStorage.setItem(
"academyFinished",
"YES"
);

}

if(localStorage.getItem("academyPassed")==="YES"){

finishAcademy();

}

if(Number(localStorage.getItem("finalAttempts"))>=2 &&
localStorage.getItem("academyPassed")!=="YES"){

finishAcademy();

}