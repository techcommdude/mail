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

  document.querySelector("#mailbox").innerHTML = "Composing email";

  // Clear out composition fields
  document.querySelector("#compose-recipients").value = "";
  document.querySelector("#compose-subject").value = "";
  document.querySelector("#compose-body").value = "";

  //TODO:Add the logic here for composing.

  debugger;

  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: "baz@example.com",
      subject: "Meeting time part 2",
      body: "Let's meet at 4 PM?",
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      // Print result
      console.log(result);
    });
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

  if (mailbox === "inbox") {
    // document.querySelector("#mailbox").innerHTML = `<h3>${mailbox}</h3>`;
    debugger;
    document.querySelector("#mailbox").innerHTML = "In the inbox";

    //TODO: When the user clicks on the link for the email.  then call the email view for display.

    fetch("/emails/inbox")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        //Select the ul in the HTML.
        const inboxHTML = document.querySelector("#inboxEmails");

        for (let i = 0; i < emails.length; i++) {
          let obj = emails[i];
          debugger;

          // Create a list item for the new task and add the task to it
          const sender = document.createElement("li");
          sender.innerHTML = obj.sender;
          document.querySelector("#inboxEmails").append(sender);

          const subject = document.createElement("li");
          subject.innerHTML = obj.subject;
          document.querySelector("#inboxEmails").append(subject);

          const timestamp = document.createElement("li");
          timestamp.innerHTML = obj.timestamp;
          document.querySelector("#inboxEmails").append(timestamp);

          console.log(obj.id);
          console.log(obj.sender);
          console.log(obj.subject);
          console.log(obj.timestamp);
        }

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

        const inboxHTML = document.querySelector("#sentEmails");

        for (let i = 0; i < emails.length; i++) {
          let obj = emails[i];

          debugger;
          console.log(obj.id);
          console.log(obj.recipients);
          console.log(obj.subject);
          console.log(obj.timestamp);
          debugger;
        }
      });
  } else {
    document.querySelector("#mailbox").innerHTML = "In the archive mail box.";
    fetch("/emails/archive")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        // ... do something else with emails ...
        //TODO: Need to test for archived value to display here. If statement?
        const inboxHTML = document.querySelector("#sentEmails");

        for (let i = 0; i < emails.length; i++) {
          let obj = emails[i];

          console.log(obj.id);
          console.log(obj.recipients);
          console.log(obj.subject);
          console.log(obj.timestamp);
          console.log(obj.archived);
          debugger;
        }
      });
  }
}
