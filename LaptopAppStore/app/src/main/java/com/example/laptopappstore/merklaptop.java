package com.example.laptopappstore;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;
import android.widget.Toast;

import butterknife.ButterKnife;
import butterknife.OnClick;

public class merklaptop extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_merklaptop);
        ButterKnife.bind(this);
    }

    @OnClick(R.id.btnasus)
    void btnasus(){

        Intent a = new Intent(merklaptop.this, asus.class);
        startActivity(a);
        finish();
    }

    @OnClick(R.id.btnacer)
    void btnacer(){

        Intent a = new Intent(merklaptop.this, acer.class);
        startActivity(a);
        finish();
    }
}
