document.addEventListener("DOMContentLoaded", function () {
  // Use buttons to toggle between views
  document
    .querySelector("#inbox")
    .addEventListener("click", () => load_mailbox("inbox"));
  document
    .querySelector("#sent")
    .addEventListener("click", () => load_mailbox("sent"));
  document
    .querySelector("#archived")
    .addEventListener("click", () => load_mailbox("archive"));
  document.querySelector("#compose").addEventListener("click", compose_email);

  // By default, load the inbox
  load_mailbox("inbox");
});

function compose_email() {
  // Show compose view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";

  debugger;

  document.querySelector("#mailbox").innerHTML = 'Composing email';

  // Clear out composition fields
  document.querySelector("#compose-recipients").value = "";
  document.querySelector("#compose-subject").value = "";
  document.querySelector("#compose-body").value = "";

  //TODO:Add the logic here for composing.
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";

  // Show the mailbox name with the first name capitalized.
  document.querySelector("#emails-view").innerHTML = `<h3>${
    mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
  }</h3>`;

//TODO: logic here  for the various mailboxes.


  debugger;
  if (mailbox === "inbox") {
    document.querySelector("#mailbox").innerHTML = `<h3>${mailbox}</h3>`;

    fetch("/emails/inbox")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        // ... do something else with emails ...
      });
  } else if (mailbox === "sent") {
    document.querySelector("#mailbox").innerHTML = "In the sent box";
    fetch("/emails/sent")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        // ... do something else with emails ...
      });
  } else {
    document.querySelector("#mailbox").innerHTML = "In the archive mail box.";
    fetch("/emails/archive")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        // ... do something else with emails ...
      });
  }
}
