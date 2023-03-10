# Mock email application built with Javascript

This project is a single-page Javascript application.  It is a mock email client application that makes API calls to compose, send and archive/unarchive email.  This project utilizes pre-built Python APIs with GET, POST and PUT requests in Javascript.  AJAX is used to fetch data from the server.  Javascript is used to display/hide information and manipulate the DOM for the various views in the app.

You can use these credentials for the application:
User email: **guest@example.com**
Password: **123**

You can also use these email addresses with the same password of "123" without the quotes: **foo@example.com**, **bar@example.com**, **baz@example.com**.

You can also register and create your own credentials.

This project is deployed on Heroku (please have patience since the instance is likely sleeping but will wake up after a few seconds): <a href="https://mail-client-gfarnell.herokuapp.com/">https://mail-client-gfarnell.herokuapp.com/</a>

A screencast of the project is available on YouTube:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=V2s00sozPkU
" target="_blank"><img src="mail/static/mail/Mail.gif"
alt="Commerce by Geoff Farnell" width="600" height="360" /></a>

You can log in to the Heroku app above with this account that is already entered by default. No registration is required (although you can register):

* Email: **guest**
* Password: **123**

Some of the technologies I used when building this demo application:

* Javascript (vanilla, not a framework)
* Visual Studio Code
* Django web framework
* Git
* HTML
* CSS
* Heroku hosting

-----------
## Project overview

Using JavaScript, HTML, and CSS, complete the implementation of your single-page-app email client inside of inbox.js (and not additional or other files; for grading purposes, we’re only going to be considering inbox.js!). You must fulfill the following requirements:

* **Send Mail**: When a user submits the email composition form, add JavaScript code to actually send the email.
    * You’ll likely want to make a POST request to /emails, passing in values for recipients, subject, and body.
    * Once the email has been sent, load the user’s sent mailbox.

* **Mailbox**: When a user visits their Inbox, Sent mailbox, or Archive, load the appropriate mailbox.
    * You’ll likely want to make a GET request to /emails/<mailbox> to request the emails for a particular mailbox.
    * When a mailbox is visited, the application should first query the API for the latest emails in that mailbox.
    * When a mailbox is visited, the name of the mailbox should appear at the top of the page (this part is done for you).
    * Each email should then be rendered in its own box (e.g. as a <div> with a border) that displays who the email is from, what the subject line is, and the timestamp of the email.
    * If the email is unread, it should appear with a white background. If the email has been read, it should appear with a gray background.

* **View Email**: When a user clicks on an email, the user should be taken to a view where they see the content of that email.
    * You’ll likely want to make a GET request to /emails/<email_id> to request the email.
    * Your application should show the email’s sender, recipients, subject, timestamp, and body.
    * You’ll likely want to add an additional div to inbox.html (in addition to emails-view and compose-view) for displaying the email. Be sure to update your code to hide and show the right views when navigation options are clicked.
    * Once the email has been clicked on, you should mark the email as read. Recall that you can send a PUT request to /emails/<email_id> to update whether an email is read or not.

* **Archive and Unarchive**: Allow users to archive and unarchive emails that they have received.
    * When viewing an Inbox email, the user should be presented with a button that lets them archive the email. When viewing an Archive email, the user should be presented with a button that lets them unarchive the email. This requirement does not apply to emails in the Sent mailbox.
    * Recall that you can send a PUT request to /emails/<email_id> to mark an email as archived or unarchived.
    * Once an email has been archived or unarchived, load the user’s inbox.

* **Reply**: Allow users to reply to an email.
    * When viewing an email, the user should be presented with a “Reply” button that lets them reply to the email.
    * When the user clicks the “Reply” button, they should be taken to the email composition form.
    * Pre-fill the composition form with the recipient field set to whoever sent the original email.
    * Pre-fill the subject line. If the original email had a subject line of foo, the new subject line should be Re: foo. (If the subject line already begins with Re: , no need to add it again.)
    * Pre-fill the body of the email with a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original text of the email.

## Screen captures of the application:
![Mail Application](Mail_1.png)

![Mail Application](Mail_2.png)

![Mail Application](Mail_3.png)

![Mail Application](Mail_4.png)