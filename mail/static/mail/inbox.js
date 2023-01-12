document.addEventListener("DOMContentLoaded", function () {
  // Use buttons to toggle between views

  document
    .querySelector("#inbox")
    .addEventListener("click", () => load_mailbox("inbox"));

  //This is the Sent button at the top of the page.
  document
    .querySelector("#sent")
    .addEventListener("click", () => load_mailbox("sent"));

  //TODO: for the archive button.  Could use these, but the listener is added to the button itself.  Could use these if
  //the listeners were added when the HTML is created.
  //  document
  //  .querySelector("#archive")
  //  .addEventListener("click", () => archive_email(email.id, email.archived));

  //TODO: for the reply button.
  // document
  // .querySelector("#reply")
  // .addEventListener("click", () => reply(email.id));

  document
    .querySelector("#archived")
    .addEventListener("click", () => load_mailbox("archive"));

  //Listener on the Compose button at the top of the page.
  document.querySelector("#compose").addEventListener("click", compose_email);

  // Send Mail: When a user submits the email composition form.  Prevent default is needed to prevent the inbox from loading by default.
  //This is the listener on the form.
  document
    .querySelector("#compose-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      submit_email();
    });

  // By default, load the inbox
  load_mailbox("inbox");
});

function compose_email() {
  document.querySelector("#containerInbox").style.display = "none";
  document.querySelector("#containerSent").style.display = "none";
  document.querySelector("#containerArchive").style.display = "none";

  // Show compose view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#email-open").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";

  // Clear out composition fields
  document.querySelector("#compose-recipients").value = "";
  document.querySelector("#compose-subject").value = "";
  document.querySelector("#compose-body").value = "";

  //FIXME: If the email is a reply then prefill th appropriate fields.

  //wait until the form submits before Posting.
  return true;
}

function submit_email() {
  //TODO:Add the logic here for composing.

  document.querySelector("#email-open").style.display = "none";

  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: document.querySelector("#compose-recipients").value,
      subject: document.querySelector("#compose-subject").value,
      body: document.querySelector("#compose-body").value,
      read: false,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      // Print result
      console.log(result);
    });

  //timeout so that database is updated.
  setTimeout(() => {
    load_mailbox("sent");
    console.log("Delayed for 100 milliseconds.");
  }, "100");

  //wait until the form is submitted.
  return false;
}

function load_email(email, mailbox) {
  //TODO: Need to set the mail to read here with a put statement and display everthing.
  //TODO: Need a reply button that creates a form.
  //TODO: Is mailbox needed above?  recipient is sender of original.

  document.querySelector("#containerInbox").style.display = "none";
  document.querySelector("#containerSent").style.display = "none";
  document.querySelector("#containerArchive").style.display = "none";

  // Show compose view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "none";
  document.querySelector("#email-open").style.display = "block";

  const email_view = document.querySelector("#email-open");

  fetch(`/emails/${email.id}`)
    .then((response) => response.json())
    .then((email) => {
      // Print email
      console.log(email);
     // ... do something else with email ...

      email_view.innerHTML = `
      <div><strong>From:</strong> <span>${email.sender}</span><div>
      <div><strong>To:</strong> <span>${email.recipients}</span><div>
      <div><strong>Subject:</strong> <span>${email.subject}</span><div>
      <div><strong>Timestamp:</strong> <span>${email.timestamp}</span><div>
      <button class="btn btn-sm btn-outline-primary mt-2" id="reply" onclick="reply('${email.id}');">Reply</button>
      <button class="btn btn-sm btn-outline-primary mt-2" id="archiveIT" onclick="archive_email(${email.id}, ${email.archived});">Archive</button>
      <hr>
      <div>${email.body}</div>
    `;

      if (email.archived === true) {
        document.getElementById("archiveIT").innerHTML = "Unarchive";
      }
    });

  //Update the email to set the read = true flag
  fetch(`/emails/${email.id}`, {
    method: "PUT",
    body: JSON.stringify({
      read: true,
    }),
  });
}

function reply(emailID) {
  //TODO: Reply and save the body and the subject and the email addresses. See the requirements.
  ////Do a PUT afterwards to update the body of the email.
  debugger;
  compose_email();




  return false;
}

function archive_email(emailID, archiveFlag) {
  //User can view the archived email and unarchive it. May want to just present the
  //load-email view and remove the reply button?

  //FIXME: Load the user's inbox after archiving or unarchiving.

  if (archiveFlag === false) {
    //Update the email to set the archived = true flag
    fetch(`/emails/${emailID}`, {
      method: "PUT",
      body: JSON.stringify({
        archived: true,
      }),
    });

    //timeout so that database is updated.
    setTimeout(() => {
      load_mailbox("inbox");
      console.log("Delayed for 100 milliseconds.");
    }, "100");

  } else {
    //Update the email to set the archived = false flag
    fetch(`/emails/${emailID}`, {
      method: "PUT",
      body: JSON.stringify({
        archived: false,
      }),
    });

    //timeout so that database is updated.
    setTimeout(() => {
      load_mailbox("inbox");
      console.log("Delayed for 100 milliseconds.");
    }, "100");
  }
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views

  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";
  document.querySelector("#containerInbox").style.display = "flex";
  document.querySelector("#email-open").style.display = "none";

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
    document.querySelector("#email-open").style.display = "none";

    //clear the page before you load the data again.
    document.getElementById("containerInbox").innerHTML = "";

    fetch("/emails/inbox")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        let counter = 0;

        //FIXME: if emails.lenght === 0 , pop a message. "You have no email in your inbox."

        for (let i = 0; i < emails.length; i++) {
          let obj = emails[i];
          sender2 = document.createElement("div");
          sender2.className = "inbox" + counter;

          document.querySelector("#containerInbox").append(sender2);

          //TODO: add an event listener for each div to open the view email function. You can get the ID at this point.
          //Test with an alert.
          sender2.addEventListener("click", () => {
            load_email(obj, mailbox);
          });

          //TODO: need to create a button that lets the user archive an email.  Add an event listener for this.

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

        // Sent email
      });
  } else if (mailbox === "sent") {
    document.querySelector("#containerInbox").style.display = "none";
    // document.querySelector("#sentEmails").style.display = "flex";
    // document.querySelector("#archiveEmails").style.display = "none";
    document.querySelector("#containerSent").style.display = "flex";
    document.querySelector("#containerArchive").style.display = "none";
    document.querySelector("#email-open").style.display = "none";

    document.getElementById("containerSent").innerHTML = "";

    fetch("/emails/sent")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        let counter = 0;

        //FIXME: if emails.lenght === 0 , pop a message.  "You have not sent any emails."

        for (let i = 0; i < emails.length; i++) {
          let obj = emails[i];
          sender2 = document.createElement("div");
          sender2.className = "sent" + counter;

          document.querySelector("#containerSent").append(sender2);

          //TODO: add an event listener for each div to open the view email function. You can get the ID at this point.
          //Test with an alert.

          //create p within the div for the sender
          sender3 = document.createElement("p");
          sender3.className = "left";
          sender3.innerHTML = obj.recipients;

          document.querySelector(".sent" + counter).append(sender3);

          //create p within the div for the subject
          subject3 = document.createElement("p");
          subject3.className = "middle";
          subject3.innerHTML = obj.subject;
          document.querySelector(".sent" + counter).append(subject3);

          //create p within the div for the subject
          timestamp3 = document.createElement("p");
          timestamp3.className = "right";
          timestamp3.innerHTML = obj.timestamp;
          document.querySelector(".sent" + counter).append(timestamp3);

          counter++;
        }
      });
  } else {
    document.querySelector("#containerInbox").style.display = "none";
    document.querySelector("#containerSent").style.display = "none";
    document.querySelector("#containerArchive").style.display = "flex";
    document.querySelector("#email-open").style.display = "none";

    //clear the page before you load the data again.
    document.getElementById("containerArchive").innerHTML = " ";

    fetch("/emails/archive")
      .then((response) => response.json())
      .then((emails) => {
        // Print emails
        console.log(emails);

        //TODO: need to create a button that lets the user unarhive an email.  Add an event listener for this.

        // ... do something else with emails ...
        //TODO: Need to test for archived value to display here. If statement?

        let counter = 0;

        //FIXME: if emails.lenght === 0 , pop a message. "You currently have no archived mail."

        for (let i = 0; i < emails.length; i++) {
          let obj = emails[i];
          sender2 = document.createElement("div");
          sender2.className = "archive" + counter;

          document.querySelector("#containerArchive").append(sender2);

          //TODO: add an event listener for each div to open the view email function. You can get the ID at this point.
          //Set a flag to say that archive = True in this case so display "Unarchive" button

          sender2.addEventListener("click", () => {
            load_email(obj, mailbox);
          });

          //create p within the div for the sender
          sender3 = document.createElement("p");
          sender3.className = "left";
          sender3.innerHTML = obj.sender;

          document.querySelector(".archive" + counter).append(sender3);

          //create p within the div for the subject
          subject3 = document.createElement("p");
          subject3.className = "middle";
          subject3.innerHTML = obj.subject;
          document.querySelector(".archive" + counter).append(subject3);

          //create p within the div for the subject
          timestamp3 = document.createElement("p");
          timestamp3.className = "right";
          timestamp3.innerHTML = obj.timestamp;
          document.querySelector(".archive" + counter).append(timestamp3);

          counter++;
        }
      });
  }
}
