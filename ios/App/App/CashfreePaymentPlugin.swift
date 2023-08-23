//
//  CashfreePaymentPlugin.swift
//  App
//
//  Created by ccc on 05/06/23.
//

import Foundation
import UIKit
import CashfreePGCoreSDK
import CashfreePGUISDK
import CashfreePG
import Capacitor

@objc(CashfreePaymentPlugin)
public class CashfreePaymentPlugin: CAPPlugin {
    
    
  private let cfPaymentGatewayService = CFPaymentGatewayService.getInstance()
    

    
  @objc func initiatePayment(_ call: CAPPluginCall) {
      
    print("=>> Initiating Cashfree Payment ")
      
    let paymentSessionId = call.getString("paymentSessionId") ?? "empty"
    let orderId          = call.getString("orderId") ?? "empty"
    var session : CFSession
      
    do {
          session = try CFSession.CFSessionBuilder()
                      .setEnvironment(.PRODUCTION)
                      .setOrderID(orderId)
                      .setPaymentSessionId(paymentSessionId)
                      .build()
        
            let paymentComponents = try CFPaymentComponent.CFPaymentComponentBuilder()
                                .enableComponents([
                                    "order-details",
                                    "card",
                                    "paylater",
                                    "wallet",
                                    "emi",
                                    "netbanking",
                                    "upi"
                                ])
                                .build()
            
            let theme = try CFTheme.CFThemeBuilder()
                                .setPrimaryFont("Source Sans Pro")
                                .setSecondaryFont("Gill Sans")
                                .setButtonTextColor("#FFFFFF")
                                .setButtonBackgroundColor("#FF0000")
                                .setNavigationBarTextColor("#FFFFFF")
                                .setNavigationBarBackgroundColor("#FF0000")
                                .setPrimaryTextColor("#FF0000")
                                .setSecondaryTextColor("#FF0000")
                                .build()
        
            let nativePayment = try CFDropCheckoutPayment.CFDropCheckoutPaymentBuilder()
                                .setSession(session)
                                .setTheme(theme)
                                .setComponent(paymentComponents)
                                .build()
        
        let parentView = bridge?.viewController
        guard let view = parentView else {
          return
        }


        try self.cfPaymentGatewayService.doPayment(nativePayment,viewController: parentView!)

        
            print("===========yo=====")
        } catch let e {
            print("=====err===")
              let error = e as! CashfreeError
              print(error.localizedDescription)
        }
      

    print(orderId)
    print(paymentSessionId)
      
  }
}


