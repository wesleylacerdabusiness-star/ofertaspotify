import { THEME } from './theme.js';
export const PAYMENTS=[
 {id:'cash-app',label:'Cash App',description:'Cash App payout preview',subtitle:'Funds arrive instantly',logo:'cashapp-logo.png',symbol:'$',className:'cash-app'},
 {id:'paypal',label:'PayPal',description:'PayPal payout preview',subtitle:'Funds arrive within 1 minute',logo:'paypal-logo-CXd97tl4.png',symbol:'P',className:'paypal'},
 {id:'venmo',label:'Venmo',description:'Venmo payout preview',subtitle:'Funds arrive instantly',logo:'venmo-logo.png',symbol:'V',className:'venmo'},
 {id:'zelle',label:'Zelle',description:'Zelle payout preview',subtitle:'Funds arrive within minutes',logo:'zelle-logo.png',symbol:'Z',className:'zelle'},
 {id:'bank-transfer',label:'Bank Transfer (ACH)',description:'Bank account transfer preview',subtitle:'Arrives in 1-3 business days',logo:'ach-logo.png',symbol:'bank',className:'bank'},
 {id:'gift-card',label:`${THEME.name} gift card`,description:'Gift card redemption preview',subtitle:'Gift card redemption preview',logo:'',symbol:'spotify',className:'spotify'},
];
export const findPayment=id=>PAYMENTS.find(p=>p.id===id)||PAYMENTS[0];
