

<div style="text-align:center"><img src ="https://github.com/Club-DevBytes/formiQR/blob/master/G-Form/formiQR.png" /></div>

# formiQR 
## Leverages google form with help of firebase cloud function to be a complete event management platform

# The problem formiQR solves
 If you have been to any hackathon or similar event, there the initial time is wasted in registration desk, where we need to say our name and then they go around searching it up. But with formiQR it happens in an instant with a QR scan, plus it works alongside google form, what can be more awesome than that 😄

# What is formiQR ?


## Overall Idea
* First the user fills in the google form and instantly receives a QR code with an onboarding email.
* During the event day, user shows the QR to the organizer to confirm the presence. 
* The organizer can see the real time statistics of the attendee present in the venue, with the specific details filled in the form initially, like age group, gender, grade,etc.

## Why is formiQR important
> formiQR works with Google Forms, which is one of the most common and best survey administration app. 

>The firebase cloud function, provides an instant personalized email to the user on successful submission of the google form. This email is dynamically generated with cloud function and contains a QR which is generated with Google Charts api.

>This sort of functionality provides a professionalism to the event and gives a good feedback to the end user 😇

> During the event day, when the Organizing team scan the QR-code, they get a real time data of the attendees and can distribute the resource or preform actions based on it.
> After the session the Organizers can get a csv data of the attendees present in the event.


## formiQR basically consist of 3 parts 
* Google form and sheets
* Firebase Realtime Database and Cloud Functions
* Android app for QR Scan generated from Google charts api and Dashboard

## TO-DO List
* Refactor the android app to a general template, the current app contains UI and fields for MakerFest Vadodara.
* Add option to add attendees without QR to the at Event node.

