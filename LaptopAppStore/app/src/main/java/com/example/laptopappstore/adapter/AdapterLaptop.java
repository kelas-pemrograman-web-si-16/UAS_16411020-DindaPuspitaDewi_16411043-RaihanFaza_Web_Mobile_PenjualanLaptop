package com.example.laptopappstore.adapter;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.laptopappstore.R;
import com.example.laptopappstore.data.DataLaptop;

import java.util.List;

public class AdapterLaptop extends BaseAdapter {
    private Activity activity;
    private LayoutInflater inflater;
    private List<DataLaptop> item;

    public AdapterLaptop(Activity activity, List<DataLaptop> item) {
        this.activity = activity;
        this.item = item;
}
    @Override
    public int getCount() {
        return item.size();
    }

    @Override
    public Object getItem(int location) {
        return item.get(location);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        if (inflater == null)
            inflater = (LayoutInflater) activity
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        if (convertView == null)
            convertView = inflater.inflate(R.layout.content_laptop, null);


        TextView kodelaptop         = (TextView) convertView.findViewById(R.id.txtkodelaptop);
        TextView merklaptop        = (TextView) convertView.findViewById(R.id.txtmerklaptop);
        TextView tipelaptop     = (TextView) convertView.findViewById(R.id.txttipelaptop);
        TextView warna    = (TextView) convertView.findViewById(R.id.txtwarna);
        TextView harga        = (TextView) convertView.findViewById(R.id.txtharga);

        kodelaptop.setText(": "+item.get(position).getKodeLaptop());
        merklaptop.setText(": "+item.get(position).getMerkLaptop());
        tipelaptop.setText(": "+item.get(position).getTipeLaptop());
        warna.setText(": "+item.get(position).getWarna());
        harga.setText(": "+item.get(position).getHarga());

        return convertView;
    }
}
