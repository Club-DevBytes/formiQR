package com.akshay.makerfest;

import android.content.Intent;
import android.graphics.Typeface;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity{

    public String QR_Output = "";
    //View Objects
    private Button buttonScan;
    private TextView userWelcome;

    private TextView totalCountTxt;
    private TextView maleCountTxt;
    private TextView femaleCountTxt;


    //qr code scanner object
    private IntentIntegrator qrScan;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        Typeface custom_font = Typeface.createFromAsset(getBaseContext().getAssets(), "font/caviar.ttf");
//
//        totalCountTxt.setTypeface(custom_font);
        //totalCountTxt.setTypeface(custom_font);

        //View objects
        buttonScan = (Button) findViewById(R.id.scanBtn);
        userWelcome = (TextView) findViewById(R.id.userWelcome);

        totalCountTxt = (TextView) findViewById(R.id.totalCount);
        maleCountTxt = (TextView) findViewById(R.id.maleCount);
        femaleCountTxt = (TextView) findViewById(R.id.femaleCount);


        //intializing scan object
        qrScan = new IntentIntegrator(this);
        qrScan.setBeepEnabled(false);

        //attaching onclick listener
        buttonScan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                qrScan.initiateScan();

            }
        });


        final FirebaseDatabase mFirebaseDatabase = FirebaseDatabase.getInstance();

        final DatabaseReference counterRef = mFirebaseDatabase.getReference().child("count");


        counterRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                Integer maleCount = dataSnapshot.child("Male").getValue(Integer.class);
                Integer femaleCount = dataSnapshot.child("Female").getValue(Integer.class);
                Integer overallCount = dataSnapshot.child("overAllTotal").getValue(Integer.class);


                totalCountTxt.setText(""+overallCount);
                maleCountTxt.setText(""+maleCount);
                femaleCountTxt.setText(""+femaleCount);

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });


    }

    private void AddToFirebase(final String Maker_ID) {


//        Toast.makeText(this, "In Add Firebase", Toast.LENGTH_LONG).show();



        final FirebaseDatabase mFirebaseDatabase = FirebaseDatabase.getInstance();

        final DatabaseReference MakerRef = mFirebaseDatabase.getReference().child("maker").child(Maker_ID);

        final DatabaseReference AtEventReference  = mFirebaseDatabase.getReference().child("atEvent");

        MakerRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                String name = dataSnapshot.child("name").getValue(String.class);
                String email = dataSnapshot.child("email").getValue(String.class);
                String gender = dataSnapshot.child("gender").getValue(String.class);


//                String Details = ("ID-"+Maker_ID+" "+name+" "+email);
                String Details = ("Welcome "+name+" "+"to MakerFest");

                userWelcome.setText(Details);

                Map<String, String> DataMap = new HashMap<>();
                DataMap.put("name",name);
                DataMap.put("email",email);
                DataMap.put("gender",gender);

                AtEventReference.child(GetDate()).child(Maker_ID).setValue(DataMap);


//                AtEventReference.child(GetDate()).child(Maker_ID).child("name").setValue(name);
//                AtEventReference.child(GetDate()).child(Maker_ID).child("email").setValue(email);
//                AtEventReference.child(GetDate()).child(Maker_ID).child("gender").setValue(gender);

//                AtEventReference.child(Maker_ID).child("phone").setValue(phone);


            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

                Log.w("ERROR", "Failed to read value.", databaseError.toException());

            }
        });



    }


    /**
     * @return Month and Year like Sep-2018
     */
    private String GetMonthYear() {
        Date c = Calendar.getInstance().getTime();
        SimpleDateFormat df = new SimpleDateFormat("MMM-yyyy");
        String formattedDate = df.format(c);
        return formattedDate;
    }

    /**
     * @return Month and Year like 16-Sep-2018
     */
    private String GetDate() {
        Date c = Calendar.getInstance().getTime();
        SimpleDateFormat df = new SimpleDateFormat("dd-MMM-yyyy");
        String formattedDate = df.format(c);
        return formattedDate;
    }

    private String GetTime() {
        Date c = Calendar.getInstance().getTime();
        SimpleDateFormat df1 = new SimpleDateFormat("HH:mm:ss");
        String formattedTime = df1.format(c);
        return formattedTime;
    }

    //Getting the scan results
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null) {
            //if qrcode has nothing in it
            if (result.getContents() == null) {
                Toast.makeText(this, "Result Not Found", Toast.LENGTH_LONG).show();
            } else {
                QR_Output = result.getContents();

                Toast.makeText(this, QR_Output, Toast.LENGTH_LONG).show();

                int actualVal = Integer.parseInt(QR_Output) - 1000;

                //Date.setText(GetDate());
                //Time.setText(GetTime());
                AddToFirebase(Integer.toString(actualVal));


            }
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

}