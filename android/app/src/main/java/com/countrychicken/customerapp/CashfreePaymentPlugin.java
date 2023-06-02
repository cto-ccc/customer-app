package com.countrychicken.customerapp;

import com.cashfree.pg.api.CFPaymentGatewayService;
import com.cashfree.pg.core.api.CFSession;
import com.cashfree.pg.core.api.CFTheme;
import com.cashfree.pg.core.api.callback.CFCheckoutResponseCallback;
import com.cashfree.pg.core.api.exception.CFException;
import com.cashfree.pg.core.api.utils.CFErrorResponse;
import com.cashfree.pg.ui.api.CFDropCheckoutPayment;
import com.cashfree.pg.ui.api.CFPaymentComponent;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "CashfreePaymentPlugin")
public class CashfreePaymentPlugin extends Plugin implements CFCheckoutResponseCallback {

    CFSession.Environment cfEnvironment = CFSession.Environment.PRODUCTION;
    PluginCall paymentCallback;

    @Override
    public void onPaymentVerify(String orderID) {
        JSObject ret = new JSObject();
        ret.put("status", "SUCCESS");
        this.paymentCallback.resolve(ret);
    }

    @Override
    public void onPaymentFailure(CFErrorResponse cfErrorResponse, String orderID) {
        System.out.println(("============error===========" + cfErrorResponse.getDescription()));
        JSObject ret = new JSObject();
        ret.put("status", "FAILURE");
        this.paymentCallback.resolve(ret);
    }

    @PluginMethod()
    public void initiatePayment(PluginCall call) {

        try {
            CFSession cfSession = new CFSession.CFSessionBuilder()
                    .setEnvironment(cfEnvironment)
                    .setPaymentSessionID(call.getData().getString("paymentSessionId"))
                    .setOrderId(call.getData().getString("orderId"))
                    .build();

            CFPaymentComponent cfPaymentComponent = new CFPaymentComponent.CFPaymentComponentBuilder()
                    .add(CFPaymentComponent.CFPaymentModes.CARD)
                    .add(CFPaymentComponent.CFPaymentModes.UPI)
                    .add(CFPaymentComponent.CFPaymentModes.WALLET)
                    .add(CFPaymentComponent.CFPaymentModes.NB)
                    .add(CFPaymentComponent.CFPaymentModes.PAY_LATER)
                    .build();

            CFTheme cfTheme = new CFTheme.CFThemeBuilder()
                    .setNavigationBarBackgroundColor("#a4243d")
                    .setNavigationBarTextColor("#ffffff")
                    .setButtonBackgroundColor("#a4243d")
                    .setButtonTextColor("#ffffff")
                    .setPrimaryTextColor("#000000")
                    .setSecondaryTextColor("#000000")
                    .build();

            CFDropCheckoutPayment cfDropCheckoutPayment = new CFDropCheckoutPayment.CFDropCheckoutPaymentBuilder()
                    .setSession(cfSession)
                    .setCFUIPaymentModes(cfPaymentComponent)
                    .setCFNativeCheckoutUITheme(cfTheme)
                    .build();

            CFPaymentGatewayService.getInstance().setCheckoutCallback(this);
            CFPaymentGatewayService gatewayService = CFPaymentGatewayService.getInstance();
            gatewayService.doPayment(getContext(), cfDropCheckoutPayment);
        } catch (CFException exception) {
            exception.printStackTrace();
        }
        this.paymentCallback = call;
    }
}
