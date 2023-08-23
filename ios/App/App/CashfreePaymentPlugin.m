//
//  CashfreePaymentPlugin.m
//  App
//
//  Created by ccc on 05/06/23.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(CashfreePaymentPlugin, "CashfreePaymentPlugin",
  CAP_PLUGIN_METHOD(initiatePayment, CAPPluginReturnPromise);
)
