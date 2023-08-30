//
//  PaymentViewController.swift
//  App
//
//  Created by ccc on 29/08/23.
//

import UIKit
import Capacitor
import Foundation
import CashfreePGCoreSDK
import CashfreePGUISDK
import CashfreePG

class PaymentViewController: UIViewController {
    
    var orderId:String = ""
    var sessionId:String = ""
    var pluginCall : CAPPluginCall = CAPPluginCall()
    
    private let cfPaymentGatewayService = CFPaymentGatewayService.getInstance()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.cfPaymentGatewayService.setCallback(self)
        invokeNativeiOSSDK("invoking pg sdk")
    }
    

    private func getSession() -> CFSession? {
        do {
            let session = try CFSession.CFSessionBuilder()
                .setEnvironment(.PRODUCTION)
                .setOrderID(orderId)
                .setPaymentSessionId(sessionId)
                .build()
            return session
        } catch let e {
            let error = e as! CashfreeError
            print(error.localizedDescription)
            // Handle errors here
        }
        return nil
    }
    
    
    @IBAction func invokeNativeiOSSDK(_ sender: Any) {
           if let session = self.getSession() {
               do {
                 
                   // Set Components
                   let paymentComponents = try CFPaymentComponent.CFPaymentComponentBuilder()
                       .enableComponents([
                           "order-details",
                           "card",
                           "upi",
                           "wallet",
                           "netbanking",
                           "paylater"
                       ])
                       .build()
                   
                   // Set Theme
                   let theme = try CFTheme.CFThemeBuilder()
                       .setPrimaryFont("Foregen")
                       .setSecondaryFont("Roboto")
                       .setButtonTextColor("#FFFFFF")
                       .setButtonBackgroundColor("#a4243d")
                       .setNavigationBarTextColor("#FFFFFF")
                       .setNavigationBarBackgroundColor("#a4243d")
                       .setPrimaryTextColor("#000000")
                       .setSecondaryTextColor("#000000")
                       .build()
                   
                   // Native payment
                   let nativePayment = try CFDropCheckoutPayment.CFDropCheckoutPaymentBuilder()
                       .setSession(session)
                       .setTheme(theme)
                       .setComponent(paymentComponents)
                       .build()
                   
                   // Invoke SDK
                   try self.cfPaymentGatewayService.doPayment(nativePayment, viewController: self)
                   
                   
               } catch let e {
                   let error = e as! CashfreeError
                   print("====error in initialization====")
                   print(error.localizedDescription)
                   // Handle errors here
               }
           }
       }
}


extension PaymentViewController: CFResponseDelegate {
    
    func onError(_ error: CFErrorResponse, order_id: String) {
        pluginCall.resolve([
            "status": "FAILURE"
        ])
        print(error.message)
        self.dismiss(animated: true)
    }
    
    func verifyPayment(order_id: String) {
        pluginCall.resolve([
                "status": "SUCCESS"
        ])
        self.dismiss(animated: true)
    }
    
}
