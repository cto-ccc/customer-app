package com.countrychicken.customerapp;
import com.cashfree.pg.api.CFPaymentGatewayService;
import com.cashfree.pg.core.api.CFSession;
import com.cashfree.pg.core.api.CFTheme;
import com.cashfree.pg.core.api.callback.CFCheckoutResponseCallback;
import com.cashfree.pg.core.api.exception.CFException;
import com.cashfree.pg.core.api.exception.CFInvalidArgumentException;
import com.cashfree.pg.core.api.utils.CFErrorResponse;
import com.cashfree.pg.ui.api.CFDropCheckoutPayment;
import com.cashfree.pg.ui.api.CFPaymentComponent;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "PaymentGateway")
public class PaymentGatewayPlugin extends Plugin implements CFCheckoutResponseCallback {

    String orderID = "ORDER_ID";
    String paymentSessionID = "TOKEN";
    CFSession.Environment cfEnvironment = CFSession.Environment.SANDBOX;
    PluginCall paymentCallback;

    @Override
    public void onPaymentVerify(String orderID) {
        System.out.println("====success=====" + orderID);
        JSObject ret = new JSObject();
        ret.put("status", "SUCCESS");
        this.paymentCallback.resolve(ret);
    }

    @Override
    public void onPaymentFailure(CFErrorResponse cfErrorResponse, String orderID) {
        System.out.println("====failure=====" + orderID);
        JSObject ret = new JSObject();
        ret.put("status", "FAILURE");
        this.paymentCallback.resolve(ret);
    }

    @PluginMethod()
    public void initiatePayment(PluginCall call) throws CFInvalidArgumentException {

        System.out.println("============hello=======" + call.getData().getString("orderId"));
        String paymentParams = call.getString("params");
        JSObject ret = new JSObject();
        ret.put("params", paymentParams);
        System.out.println("======two======" + call.getString("orderId", "default name"));
        System.out.println("======three======" + call.getString("paymentSessionId", "default name"));
        try {
            CFSession cfSession = new CFSession.CFSessionBuilder()
                    .setEnvironment(cfEnvironment)
                    .setPaymentSessionID(call.getData().getString("paymentSessionId"))
                    .setOrderId(call.getData().getString("orderId"))
                    .build();
            CFPaymentComponent cfPaymentComponent = new CFPaymentComponent.CFPaymentComponentBuilder()
                    // Shows only Card and UPI modes
                    .add(CFPaymentComponent.CFPaymentModes.CARD)
                    .add(CFPaymentComponent.CFPaymentModes.UPI)
                    .build();
            // Replace with your application's theme colors
            CFTheme cfTheme = new CFTheme.CFThemeBuilder()
                    .setNavigationBarBackgroundColor("#fc2678")
                    .setNavigationBarTextColor("#ffffff")
                    .setButtonBackgroundColor("#fc2678")
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
//        call.resolve(ret);
    }
}
