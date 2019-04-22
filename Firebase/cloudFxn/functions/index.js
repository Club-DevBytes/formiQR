const functions = require("firebase-functions");
const nodemailer = require("nodemailer");


const fs = require("fs");
const path = require('path');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp()

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

exports.makerFxn = functions.database
  .ref("/maker/{id}")
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const makers = snapshot.val();
    console.log(makers.name);
    console.log(makers.email);

    const makerID = context.params.id;

    // return snapshot.ref.parent.parent.child('confMaker')
    // .child(makerID).child(makers.name).set(makers.stamp);

    //firebase functions:config:set gmail.email=myemailID@gmail.com gmail.password=Mypassword
    //To set email and password

    //To view the set email and pass firebase functions:config:get

    sendEmail(makers, makerID);

    return null;
  });

function sendEmail(makers, makerID) {

  //http://www.google.com/accounts/DisplayUnlockCaptcha
  //https://myaccount.google.com/lesssecureapps
  //This link is important to enable accesses to google account

  var UNIQUE_NAME = makers.name;
  // var UNIQUE_ID = makerID;

  var UNIQUE_QR = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${+makerID + 1000}`
  

  var filePath = path.join(__dirname, 'templates/makerEmail.html');

  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    data = data.toString();
    data = data.replace(/##UNIQUE_NAME/g, UNIQUE_NAME);
    // data = data.replace(/##UNIQUE_ID/g, UNIQUE_ID);
    data = data.replace(/##UNIQUE_QR/g, UNIQUE_QR);


    var mailOptions = {
        from: '"MakerFest" <noreply@firebase.com>', // sender address 
        to: makers.email, // list of receivers 
        subject: 'Thank You For Registration', // Subject line 
        html: data // html body
    };


  // const mailOptions = {
  //   from: '"Aks Corp." <noreply@firebase.com>',
  //   to: makers.email,
  // };
  // // Building Email message.
  // mailOptions.subject = "Thanks and Welcome!";
  // mailOptions.text =
  // "Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.";

  

  try {
    mailTransport.sendMail(mailOptions);
  } catch(error) {
    console.error('There was an error while sending the email:', error);

    // errorEmails = functions.database.ref(`/emailError/${makerID}`).set({
    //   email: makers.email
    // })

  }


  return console.log(
    `Sending mail to ${makers.name} with stamp ${makers.stamp}`
  );
  }); 
}

//To deploy firebase deploy --only functions:makerFxn



exports.visitorFxn = functions.database
  .ref("/atEvent/{date}/{id}")
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const Visitor = snapshot.val();
    console.log("Inside Visitor Fxn");
    console.log(Visitor);

    console.log(Visitor.name);
    
//---------------------------------------------------
//Working gender counter
    const genderCountersRef = admin
    .database()
    .ref(`count/${Visitor.gender}`);

    return genderCountersRef
    .transaction(counter_value => {
      return (counter_value || 0) + 1;
    })
//-----------------------------------------------
    // const overallCountersRef = admin
    // .database()
    // .ref(`count/overAllTotal`);

    // return overallCountersRef
    // .transaction(counter_value => {
    //   return (counter_value || 0) + 1;
    // })

    

    // const genderRef = admin
    // .database()
    // .ref(`count/${makers.gender}`);  
    
    // return countersRef.transaction(currentData => {
    //   // currentData= (currentData || 0) + 1;
    //   console.log("Inside currentData Fxn");

    //   console.log(currentData+" llllll"+ Visitor.gender+" "+ countersRef);
    //   // currentData[Visitor.gender] = (currentData[Visitor.gender] || 0) + 1;

    // if (currentData !== null) {
    //   currentData[Visitor.gender] = (currentData[Visitor.gender] || 0) + 1;
    //   return currentData;
    // }

    // });
    // return snapshot.ref.parent.parent.child('confMaker')
    // .child(makerID).child(makers.name).set(makers.stamp);

  

    //To view the seted email and pass firebase functions:config:get

  });
  //To deploy firebase deploy --only functions:visitorFxn
 




  exports.overallFxn = functions.database
  .ref("/atEvent/{date}/{id}")
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const Visitor = snapshot.val();
    console.log("Inside Visitor Fxn");
    console.log(Visitor);

    console.log(Visitor.name);
    
//---------------------------------------------------
//Working gender counter
    // const genderCountersRef = admin
    // .database()
    // .ref(`count/${Visitor.gender}`);

    // return genderCountersRef
    // .transaction(counter_value => {
    //   return (counter_value || 0) + 1;
    // })
//-----------------------------------------------
    const overallCountersRef = admin
    .database()
    .ref(`count/overAllTotal`);

    return overallCountersRef
    .transaction(counter_value => {
      return (counter_value || 0) + 1;
    })

    
  });
