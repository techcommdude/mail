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
  //TODO: setting the values to

  document.querySelector("#inboxEmails").style.display = "none";
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
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";
  document.querySelector("#inboxEmails").style.display = "flex";

  // Show the mailbox name with the first name capitalized.
  document.querySelector("#emails-view").innerHTML = `<h3>${
    mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
  }</h3>`;

  //TODO: logic here  for the various mailboxes.

  if (mailbox === "inbox") {
    document.querySelector("#mailbox").innerHTML = "In the inbox";

    //TODO: When the user clicks on the link for the email.  then call the email view for display.

    document.querySelector("#sentEmails").style.display = "none";
    document.querySelector("#archiveEmails").style.display = "none";

    fetch("/emails/inbox")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        //Select the ul in the HTML.
        // const inboxHTML = document.querySelector("#inboxEmails");

        for (let i = 0; i < emails.length; i++) {
          let obj = emails[i];
          //debugger;

          // Create the div tags for the inbox emails

          // const sender = document.createElement("li");
          // sender.innerHTML = obj.sender;
          // document.querySelector("#inboxEmails").append(sender);

          // const subject = document.createElement("li");
          // subject.innerHTML = obj.subject;
          // document.querySelector("#inboxEmails").append(subject);

          // const timestamp = document.createElement("li");
          // timestamp.innerHTML = obj.timestamp;
          // document.querySelector("#inboxEmails").append(timestamp);

          // console.log(obj.id);
          // console.log(obj.sender);
          // console.log(obj.subject);
          // console.log(obj.timestamp);

          //TODO: delete the above eventually
          debugger;
          // const inboxHTML = document.querySelector("#containerInbox");
          sender2 = document.createElement("div");
          sender2.class = "inboxSender";
          document.querySelector("#containerInbox").append(sender2);

          //create p within the div for the sender
          sender3 = document.createElement("p");
          sender3.class = "left";
          sender3.innerHTML = obj.sender;
          document.querySelector("#containerInbox").append(sender3);

          //create p within the div for the subject
          subject3 = document.createElement("p");
          subject3.class = "middle";
          subject3.innerHTML = obj.subject;
          document.querySelector("#containerInbox").append(subject3);

          //create p within the div for the timestamp
          timestamp3 = document.createElement("p");
          timestamp3.class = "right";
          timestamp3.innerHTML = obj.timestamp;
          document.querySelector("#containerInbox").append(timestamp3);





          // sender2.id = "inboxSender";
          // // const sender2 = document.getElementById("inboxSender")
          // sender2.innerHTML = obj.sender;
          // document.querySelector("#containerInbox").append(sender2);

          // const subject2 = document.createElement("div");
          // subject2.id = "inboxSubject";
          // // const sender2 = document.getElementById("inboxSender")
          // subject2.innerHTML = obj.subject;
          // document.querySelector("#containerInbox").append(subject2);

          // const timestamp2 = document.createElement("div");
          // timestamp2.id = "inboxTimestamp";
          // // const sender2 = document.getElementById("inboxSender")
          // timestamp2.innerHTML = obj.timestamp;
          // document.querySelector("#containerInbox").append(timestamp2);

          // debugger;
          // const subject2 = document.getElementById("inboxSubject")
          // subject2.innerHTML = obj.subject;
          // document.querySelector("#inboxSubject").appendChild(subject2);

          // const timestamp2 = document.getElementById("inboxTimestamp")
          // timestamp2.innerHTML = obj.timestamp;
          // document.querySelector("#inboxTimestamp").appendChild(timestamp2);
        }

        // ... do something else with emails ...
      });
  } else if (mailbox === "sent") {
    document.querySelector("#inboxEmails").style.display = "none";
    document.querySelector("#sentEmails").style.display = "flex";
    document.querySelector("#archiveEmails").style.display = "none";

    document.querySelector("#mailbox").innerHTML = "In the sent box";
    // document.querySelector("#inboxEmails").innerHTML = '';

    fetch("/emails/sent")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        // ... do something else with emails ...
        //debugger;

        //TODO: Somehow set the inbox emails to null before this?  The below works and creates a new list for sent email.

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
    document.querySelector("#inboxEmails").style.display = "none";
    document.querySelector("#sentEmails").style.display = "none";
    document.querySelector("#archiveEmails").style.display = "flex";

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
          //debugger;
        }
      });
  }
}
