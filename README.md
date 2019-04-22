

<div style="text-align:center"><img src ="https://lh3.googleusercontent.com/ep2NABYBe15KDKJl7hIVxKbKtHD6vxzRiyChQKJA--r6pLKEMVzGpTUefic9YQ0YqlgcEhvvffQ2kmTUdbGbrFWksnqSU_oa_z1lAFaSS33Dr09Uk0Xavr2KBSKV3jTtph8gCozj7bRI0XHQxWKZerwMfjFrZliqN_P-w3ywESrxb1KGs7uXu5h10kl7oVoHPuBZe44LB7BelO4H9touza-Lf9Y_Vjh_tvYbhpJUcBGS9wzdTN4kReVgKHxzfYsk6wWH01UuXyL3zXog6soIjB8rdYVq6SIk8oXDVcUhRO_096suQQioio4IBA1Ux_DN6iAK2clGZjZvmfAD6J9weY42VctDjKwoqajbaMkNwTBrDcIhUfmsKqVhd5BQ99xcTTYTEU_FU70QYTZqYd2709WumkPzw3TWv5egkGoEeRkE7w0YXEwTMi63tFYPEIqV9A7MNIBpxhila3WuQzrRG-tcCVywDJoTw_SlsGsqCIDJAfmkpKLaTBIit8mCkVjTMqvYxcJSCu4R5WPJko-sgPMupzdrnlq7BG3cPZGQlUrD-lZZSwcfqGxlg0vpDuFAf8-b63RM2DUrUJq21CUbyYGx4mH8oCqSxoh-mJUgT7eV3xvzmd76VMn20m_uq0Dv6LVBTfnVFvQOYjFWpMIYu7fyl-C8WSM=w780-h585-no" /></div>

# formiQR 
## Leverages google form with help of firebase cloud function to be a complete event management platform



# What is formiQR ?


## Overall Idea
* First the user fills in the google form and instantly receives a QR code with an onboarding email.
* During the event day, user shows the QR to the organizer to confirm the presence. 
* The organizer can see the real time statistics of the attendee present in the venue, with the specific details filled in the form initially, like age group, gender, grade,etc.

## Why is formiQR important
> formiQR works with Google Forms, which is one of the most common and best survey administration app. 

>The firebase cloud function, provides an instant personalized email to the user on successful submission of the google form. This email is dynamically generated with cloud function and contains a QR which is generated with Google Charts api.

>This sort of functionality provides a professionalism to the event and gives a good feedback to the end user.

> During the event day, when the Organizing team scan the QR-code, they get a real time data of the attendees and can distribute the resource or preform actions based on it.
> After the session the Organizers can get a csv data of the attendees present in the event.


## formiQR basically consist of 3 parts 
* Google form and sheets
* Firebase Realtime Database and Cloud Functions
* Android app for QR Scan generated from Google charts api and Dashboard

## TO-DO List
* Refactor the android app to a general template, the current app contains UI and fields for MakerFest Vadodara.
* Add option to add attendees without QR to the at Event node.

