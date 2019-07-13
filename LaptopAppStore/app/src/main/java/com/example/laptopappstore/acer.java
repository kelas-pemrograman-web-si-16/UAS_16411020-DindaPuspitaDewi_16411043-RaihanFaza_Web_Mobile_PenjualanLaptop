package com.example.laptopappstore;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import butterknife.ButterKnife;
import butterknife.OnClick;

public class acer extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_acer);
        ButterKnife.bind(this);
    }

    @OnClick(R.id.btnKembali)
    void btnKembali(){

        Intent a = new Intent(acer.this, merklaptop.class);
        startActivity(a);
        finish();
    }
}
