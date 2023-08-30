//
//  CashfreePaymentPlugin.m
//  App
//
//  Created by ccc on 27/08/23.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(CashfreePaymentPlugin, "CashfreePaymentPlugin",
    CAP_PLUGIN_METHOD(initiatePayment, CAPPluginReturnPromise);
)
