package com.example.laptopappstore;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import butterknife.ButterKnife;
import butterknife.OnClick;

public class asus extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_asus);
        ButterKnife.bind(this);
    }

    @OnClick(R.id.btnBeliAsus)
    void btnBeliAsus(){

        Intent a = new Intent(asus.this, pesanasus.class);
        startActivity(a);
        finish();
    }

    @OnClick(R.id.btnKembali)
    void btnKembali(){

        Intent a = new Intent(asus.this, merklaptop.class);
        startActivity(a);
        finish();
    }
}
