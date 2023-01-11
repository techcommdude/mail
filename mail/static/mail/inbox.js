document.addEventListener("DOMContentLoaded", function () {
  // Use buttons to toggle between views

  document
    .querySelector("#inbox")
    .addEventListener("click", () => load_mailbox("inbox"));

  debugger;
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
  document.querySelector("#containerInbox").style.display = "none";
  document.querySelector("#sentEmails").style.display = "none";
  document.querySelector("#archiveEmails").style.display = "none";

  // Show compose view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";

  document.querySelector("#mailbox").innerHTML = "Composing email";

  // Clear out composition fields
  document.querySelector("#compose-recipients").value = "";
  document.querySelector("#compose-subject").value = "";
  document.querySelector("#compose-body").value = "";

  //TODO:Add the logic here for composing.

  //debugger;

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
  debugger;

  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";
  document.querySelector("#containerInbox").style.display = "flex";

  // Show the mailbox name with the first name capitalized.
  document.querySelector("#emails-view").innerHTML = `<h3>${
    mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
  }</h3>`;

  //logic here  for the various mailboxes.

  if (mailbox === "inbox") {
    document.querySelector("#containerInbox").style.display = "none";
    document.querySelector("#containerInbox").style.display = "flex";

    document.querySelector("#containerSent").style.display = "none";
    document.querySelector("#containerArchive").style.display = "none";

    //clear the page before you load the data again.
    document.getElementById("containerInbox").innerHTML = " ";

    fetch("/emails/inbox")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        let counter = 0;

        for (let i = 0; i < emails.length; i++) {
          let obj = emails[i];
          debugger;
          sender2 = document.createElement("div");
          sender2.className = "inbox" + counter;

          document.querySelector("#containerInbox").append(sender2);

          //TODO: add an event listener for each div to open the view email function. You can get the ID at this point.
          //Test with an alert.

          //create p within the div for the sender
          sender3 = document.createElement("p");
          sender3.className = "left";
          sender3.innerHTML = obj.sender;

          document.querySelector(".inbox" + counter).append(sender3);

          //create p within the div for the subject
          subject3 = document.createElement("p");
          subject3.className = "middle";
          subject3.innerHTML = obj.subject;
          document.querySelector(".inbox" + counter).append(subject3);

          //create p within the div for the subject
          timestamp3 = document.createElement("p");
          timestamp3.className = "right";
          timestamp3.innerHTML = obj.timestamp;
          document.querySelector(".inbox" + counter).append(timestamp3);

          //Need to update stylesheet here.  Flag to mark email as read.
          if (obj.read === true) {
            console.log(obj.id);
            //Change the classname
            sender2.className = "inbox" + counter + "_read";
          }

          counter++;
        }

        return true;

        // Sent email
      });
  } else if (mailbox === "sent") {
    document.querySelector("#containerInbox").style.display = "none";
    // document.querySelector("#sentEmails").style.display = "flex";
    // document.querySelector("#archiveEmails").style.display = "none";
    document.querySelector("#containerSent").style.display = "flex";
    document.querySelector("#containerArchive").style.display = "none";

    fetch("/emails/sent")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        // ... do something else with emails ...
        //debugger;

        const inboxHTML = document.querySelector("#sentEmails");

        for (let i = 0; i < emails.length; i++) {
          let obj = emails[i];

          //debugger;

          // Create a list item for the new task and add the task to it
          const recipients = document.createElement("li");
          recipients.innerHTML = obj.recipients;
          document.querySelector("#sentEmails").append(recipients);

          const subject = document.createElement("li");
          subject.innerHTML = obj.subject;
          document.querySelector("#sentEmails").append(subject);

          const timestamp = document.createElement("li");
          timestamp.innerHTML = obj.timestamp;
          document.querySelector("#sentEmails").append(timestamp);

          console.log(obj.id);
          console.log(obj.recipients);
          console.log(obj.subject);
          console.log(obj.timestamp);
          //debugger;
        }
      });
  } else {
    document.querySelector("#containerInbox").style.display = "none";
    document.querySelector("#sentEmails").style.display = "none";
    document.querySelector("#archiveEmails").style.display = "flex";

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
          //debugger;
        }
      });
  }
}
