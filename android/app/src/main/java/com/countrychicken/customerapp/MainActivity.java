package com.countrychicken.customerapp;
import android.os.Bundle;
import com.ionicframework.capacitor.Checkout;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    registerPlugin(PaymentGatewayPlugin.class);
    super.onCreate(savedInstanceState);

    registerPlugin(Checkout.class);
  }
}
