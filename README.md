# Mock email application built with Javascript

This project is a single-page Javascript mock email client application that makes API calls to compose, send and archive/unarchive email.  This project utilizes pre-built Python APIs with GET, POST and PUT requests in Javascript.

Feel free to  use these credentials for the application:
User email: **guest@example.com**
Password: **123**

You can also use these email addresses with the same password of "123" without the quotes: **foo@example.com**, **bar@example.com**, **baz@example.com**.

You can also register and create your own credentials.

This project is deployed on Heroku (please have patience since the instance is likely sleeping but will wake up after a few seconds): <a href="??????????">?????????</a>

A screencast of the project can be found here: <a href="????????">??????????</a>

You can log in to the Heroku app above with this account. No registration is required (although you can register):

* Email: **guest**
* Password: **123**

Some of the technologies I used when building this demo application:

* Javascript
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







* **Models**: Application contains more than three models in addition to the User model: one for auction listings, one for bids, and one for comments made on auction listings.  See the **models.py** file for more information.

* **Create Listing**: Users can visit a page to create a new listing. They should be able to specify a title for the listing, a text-based description, and what the starting bid should be. Users can also optionally be able to provide a URL for an image for the listing and/or a category (e.g. Fashion, Toys, Electronics, Home, etc.).

* **Active Listings Page**: The default route of the web application lets users view all of the currently active auction listings. For each active listing, this page displays (at minimum) the title, description, current price, and photo (if one exists for the listing).

* **Listing Page**: Clicking on a listing takes users to a page specific to that listing. On that page, users can view all details about the listing, including the current price for the listing.
    * If the user is signed in, the user should be able to add the item to their “Watchlist.” If the item is already on the watchlist, the user should be able to remove it.
    * If the user is signed in, the user should be able to bid on the item. The bid must be at least as large as the starting bid, and must be greater than any other bids that have been placed (if any). If the bid doesn’t meet those criteria, the user should be presented with an error.
    * If the user is signed in and is the one who created the listing, the user can “close” the auction from this page, which makes the highest bidder the winner of the auction and makes the listing no longer active.
    * If a user is signed in on a closed listing page, and the user has won that auction, the page should say so.
    * Users who are signed in can add comments to the listing page. The listing page displays all comments that have been made on the listing.
* **Watchlist**: Users who are signed in can visit a Watchlist page which displays all of the listings that a user has added to their watchlist. Clicking on any of those listings takes the user to that listing’s page.
* **Categories**: Users can visit a page that displays a list of all listing categories. Clicking on the name of any category takes the user to a page that displays all of the active listings in that category.
* **Django Admin Interface**: Via the Django admin interface, as a site administrator you can view, add, edit, and delete any listings, comments, and bids made on the site.

## Screen capture of the application:
![Mail Application](??.png)