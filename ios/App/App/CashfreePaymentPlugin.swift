//
//  CashfreePaymentPlugin.swift
//  App
//
//  Created by ccc on 27/08/23.
//
import Capacitor
import Foundation
import UIKit
import CashfreePGCoreSDK
import CashfreePGUISDK
import CashfreePG

@objc(CashfreePaymentPlugin)
public class CashfreePaymentPlugin: CAPPlugin {
    
    @objc func initiatePayment(_ call: CAPPluginCall) {
        
        let orderId : String = call.getValue("orderId") as! String
        let sessionId : String = call.getValue("paymentSessionId") as! String
        
        DispatchQueue.main.async {
            let pgView  = PaymentViewController()
            pgView.orderId = orderId
            pgView.sessionId = sessionId
            pgView.pluginCall = call
            self.bridge?.viewController!.present(pgView, animated: true)
        }
    }
}
    



