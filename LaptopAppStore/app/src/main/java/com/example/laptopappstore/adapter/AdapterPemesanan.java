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
import com.example.laptopappstore.data.DataPemesanan;

import java.util.List;

public class AdapterPemesanan extends BaseAdapter {
    private Activity activity;
    private LayoutInflater inflater;
    private List<DataPemesanan> item;

    public AdapterPemesanan(Activity activity, List<DataPemesanan> item) {
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


        TextView kodepemesanan         = (TextView) convertView.findViewById(R.id.txtKode);
        TextView nama        = (TextView) convertView.findViewById(R.id.txtJudul);
        TextView notelp     = (TextView) convertView.findViewById(R.id.txtSinopsis);
        TextView kodelaptop    = (TextView) convertView.findViewById(R.id.txtpengarang);

        kodepemesanan.setText(": "+item.get(position).getKodePemesanan());
        nama.setText(": "+item.get(position).getNama());
        notelp.setText(": "+item.get(position).getNotelp());
        kodelaptop.setText(": "+item.get(position).getKodeLaptop());

        return convertView;
    }
}
