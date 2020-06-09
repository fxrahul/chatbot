const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var firestore=admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.webhook = functions.https.onRequest((request, response) => {
switch(request.body.result.action){
    case 'branch_address': 
   

    firestore.collection('users').get()
                .then((querySnapshot) => {

                    var orders = [];
                    var speech='';
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });
                    // now orders have something like this [ {...}, {...}, {...} ]

                    // converting array to speech
                    

                    orders.forEach((eachOrder, index) => {
                       if(eachOrder.pin==request.body.result.parameters['pin_for_branch_addr']){
                        speech+=`Your branch Address is ${eachOrder.branch_address}`
                       }
                      
                    })

                    response.send({
                        speech: speech
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })
                break;

                case 'check_balance':
                firestore.collection('users').get()
                .then((querySnapshot) => {

                    var orders = [];
                    var speech='';
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });

                    orders.forEach((eachOrder, index) => {
                       if(eachOrder.pin==request.body.result.parameters['pin_id']){
                        if(request.body.result.parameters['account_type']=="current"){
                            
                                speech += `Current Account balance is ${eachOrder.current_account_balance}` 
                        }else{
                         
                                speech += `Savings Account balance is ${eachOrder.saving_account_balance}`
                              }
                            }
                      
                    })

                    response.send({
                        speech: speech
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })
                break;
               
case 'transfer_money':
if(request.body.result.parameters['acc_type']=='current'){
var pin_number_account='';

    firestore.collection('users').get()
                .then((querySnapshot) => {

                    var orders = [];
                    var speech='';
                    
                   
                    querySnapshot.forEach((doc) => { orders.push(doc) });
                    // now orders have something like this [ {...}, {...}, {...} ]

                    // converting array to speech
                    

                    orders.forEach((eachOrder, index) => {
                        var data1=eachOrder.data();
                       if(data1.account_number==request.body.result.parameters['acc_no']){
                        var totalAmount= data1.saving_account_balance + parseInt(request.body.result.parameters['amount_to_transfer']);
                        eachOrder.ref.update({saving_account_balance : totalAmount});
                        // recent_trans_1=`You have Recieved ${request.body.result.parameters['amount_to_transfer']} From Account Number:${pin_number_account} To Your Savings Account`;
                        // eachOrder.ref.update({recent_transaction : recent_trans_1});
     
                       }
                       if(data1.pin==request.body.result.parameters['pin_no']){
                           pin_number_account=data1.account_number;
                        var DeductedAmount= data1.current_account_balance - parseInt(request.body.result.parameters['amount_to_transfer']);
                        eachOrder.ref.update({current_account_balance : DeductedAmount});
                        speech+=`${request.body.result.parameters['amount_to_transfer']} rupees has been transfered to account no:${request.body.result.parameters['acc_no']}`
                        
                        //var totalAmount= data1.saving_account_balance + parseInt();
                            recent_trans=`You have Sent ${request.body.result.parameters['amount_to_transfer']} To Account Number:${request.body.result.parameters['acc_no']} from Your Current Account`;
                            eachOrder.ref.update({recent_transaction : recent_trans});
                       }


                    })

                  
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })


                firestore.collection('users').get()
                .then((querySnapshot) => {

                    var orders = [];
                   
                    
                   
                    querySnapshot.forEach((doc) => { orders.push(doc) });
                    // now orders have something like this [ {...}, {...}, {...} ]

                    // converting array to speech
                    

                    orders.forEach((eachOrder, index) => {
                        var data1=eachOrder.data();
                        if(data1.account_number==request.body.result.parameters['acc_no']){
                            recent_trans_1=`You have Recieved ${request.body.result.parameters['amount_to_transfer']} To Your Savings Account`;
                        eachOrder.ref.update({recent_transaction : recent_trans_1});
                        }

                    })

                  
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })



                response.send({
                    speech: `Transfer Complete:${request.body.result.parameters['amount_to_transfer']} has been sent to Account Number:${request.body.result.parameters['acc_no']}`
                });
            }else{
                var pin_number_account='';

    firestore.collection('users').get()
                .then((querySnapshot) => {

                    var orders = [];
                    var speech='';
                    
                   
                    querySnapshot.forEach((doc) => { orders.push(doc) });
                    // now orders have something like this [ {...}, {...}, {...} ]

                    // converting array to speech
                    

                    orders.forEach((eachOrder, index) => {
                        var data1=eachOrder.data();
                       if(data1.account_number==request.body.result.parameters['acc_no']){
                        var totalAmount= data1.saving_account_balance + parseInt(request.body.result.parameters['amount_to_transfer']);
                        eachOrder.ref.update({saving_account_balance : totalAmount});
                        // recent_trans_1=`You have Recieved ${request.body.result.parameters['amount_to_transfer']} From Account Number:${pin_number_account} To Your Savings Account`;
                        // eachOrder.ref.update({recent_transaction : recent_trans_1});
     
                       }
                       if(data1.pin==request.body.result.parameters['pin_no']){
                           pin_number_account=data1.account_number;
                        var DeductedAmount= data1.current_account_balance - parseInt(request.body.result.parameters['amount_to_transfer']);
                        eachOrder.ref.update({saving_account_balance : DeductedAmount});
                        speech+=`${request.body.result.parameters['amount_to_transfer']} rupees has been transfered to account no:${request.body.result.parameters['acc_no']}`
                        
                        //var totalAmount= data1.saving_account_balance + parseInt();
                            recent_trans=`You have Sent ${request.body.result.parameters['amount_to_transfer']} To Account Number:${request.body.result.parameters['acc_no']} from Your Savings Account`;
                            eachOrder.ref.update({recent_transaction : recent_trans});
                       }


                    })

                  
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })


                firestore.collection('users').get()
                .then((querySnapshot) => {

                    var orders = [];
                   
                    
                   
                    querySnapshot.forEach((doc) => { orders.push(doc) });
                    // now orders have something like this [ {...}, {...}, {...} ]

                    // converting array to speech
                    

                    orders.forEach((eachOrder, index) => {
                        var data1=eachOrder.data();
                        if(data1.account_number==request.body.result.parameters['acc_no']){
                            recent_trans_1=`You have Recieved ${request.body.result.parameters['amount_to_transfer']} To Your Savings Account`;
                        eachOrder.ref.update({recent_transaction : recent_trans_1});
                        }

                    })

                  
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })



                response.send({
                    speech: `Transfer Complete:${request.body.result.parameters['amount_to_transfer']} has been sent to Account Number:${request.body.result.parameters['acc_no']}`
                });
            }
            //for trnsferring from savings account

            

break;

case 'pin_change':
    // let pin_change_params=request.body.result.parameters;
    //     pin_nooo=pin_change_params.pin_noo;
    //     pin_pass=pin_change_params.user_password;
    //     new_pin_no=pin_change_params.new_pin;

firestore.collection('users').get()
.then((querySnapshot) => {

    var orders = [];
    var speech='';
    querySnapshot.forEach((doc) => { orders.push(doc) });
    // now orders have something like this [ {...}, {...}, {...} ]

    // converting array to speech
    

    orders.forEach((eachOrder, index) => {
        var data=eachOrder.data();
       if(data.pin==request.body.result.parameters['pin_noo'] && data.password==request.body.result.parameters['user_password']){
        
            eachOrder.ref.update({pin :request.body.result.parameters['new_pin']});            
            //  console.log(doc.data());
        
        //
       

      
        speech+=`PIN number changed successfully.`
        
       }
      
    })

    response.send({
        speech: speech
    });
})
.catch((err) => {
    console.log('Error getting documents', err);

    response.send({
        speech: "something went wrong when reading from database"
    })
})
break;

case 'view_transaction':
firestore.collection('users').get()
.then((querySnapshot) => {

    var orders = [];
    var speech='';
    querySnapshot.forEach((doc) => { orders.push(doc.data()) });

    orders.forEach((eachOrder, index) => {
       if(eachOrder.pin==request.body.result.parameters['pinn']){
      speech+=`Recent Transaction Details: ${eachOrder.recent_transaction}`
       }
    })

    response.send({
        speech: speech
    });
})
.catch((err) => {
    console.log('Error getting documents', err);

    response.send({
        speech: "something went wrong when reading from database"
    })
})



break;

case 'loan_availability':
var loan='';
firestore.collection('users').get()
.then((querySnapshot) => {

    var orders = [];
    var speech='';
    querySnapshot.forEach((doc) => { orders.push(doc.data()) });

    orders.forEach((eachOrder, index) => {
       if(eachOrder.pin==request.body.result.parameters['pin_for_loan']){
        if(eachOrder.loan_available=='true'){
            
                speech+="Loan is Available for You!"
        
        }else{
            
            speech+="Loan is not Available for You!"
        }
       }
    })

    response.send({
        speech: speech
    });
})
    break;

    case 'IFSC':
      
       
    firestore.collection('users').get()
    .then((querySnapshot) => {

        var orders = [];
        var speech='';
        querySnapshot.forEach((doc) => { orders.push(doc.data()) });
        // now orders have something like this [ {...}, {...}, {...} ]

        // converting array to speech
        

        orders.forEach((eachOrder, index) => {
           if(eachOrder.pin==request.body.result.parameters['pin_for_ifsc']){
            speech+=`Your IFSC Code is ${eachOrder.ifsc_code}`
           }
          
        })

        response.send({
            speech: speech
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);

        response.send({
            speech: "something went wrong when reading from database"
        })
    })
            break;

            case 'block_credit_card':
            
            firestore.collection('users').get()
.then((querySnapshot) => {

    var orders = [];
    var speech='';
    querySnapshot.forEach((doc) => { orders.push(doc) });
    // now orders have something like this [ {...}, {...}, {...} ]

    // converting array to speech
    

    orders.forEach((eachOrder, index) => {
        var data2=eachOrder.data();
       if(data2.pin==request.body.result.parameters['pin_for_blocking_cc']){
            var status='deactive';
            eachOrder.ref.update({credit_card_status :status});            
            //  console.log(doc.data());
      
        speech+=`Credit Card Blocked Successfully successfully.`

       }
      
    })

    response.send({
        speech: speech
    });
})
.catch((err) => {
    console.log('Error getting documents', err);

    response.send({
        speech: "something went wrong when reading from database"
    })
})
                break;

                case 'block_debit_card':
            
                firestore.collection('users').get()
    .then((querySnapshot) => {
    
        var orders = [];
        var speech='';
        querySnapshot.forEach((doc) => { orders.push(doc) });
        // now orders have something like this [ {...}, {...}, {...} ]
    
        // converting array to speech
        
    
        orders.forEach((eachOrder, index) => {
            var data2=eachOrder.data();
           if(data2.pin==request.body.result.parameters['pin_for_blocking_dc']){
                var status='deactive';
                eachOrder.ref.update({debit_card_status :status});            
                //  console.log(doc.data());
          
            speech+=`Debit Card Blocked Successfully successfully.`
    
           }
          
        })
    
        response.send({
            speech: speech
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    
        response.send({
            speech: "something went wrong when reading from database"
        })
    })
                    break;
    

      case 'activate_debit_card':
            
                    firestore.collection('users').get()
        .then((querySnapshot) => {
        
            var orders = [];
            var speech='';
            querySnapshot.forEach((doc) => { orders.push(doc) });
            // now orders have something like this [ {...}, {...}, {...} ]
        
            // converting array to speech
            
        
            orders.forEach((eachOrder, index) => {
                var data3=eachOrder.data();
               if(data3.pin==request.body.result.parameters['pin_for_activating_dc']){
                    var status='active';
                    eachOrder.ref.update({debit_card_status :status});            
                    //  console.log(doc.data());
              
                speech+=`Debit Card Activated Successfully successfully.`
        
               }
              
            })
        
            response.send({
                speech: speech
            });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        
            response.send({
                speech: "something went wrong when reading from database"
            })
        })
                        break;

             case 'activate_credit_card':
            
            firestore.collection('users').get()
            .then((querySnapshot) => {
            
                var orders = [];
                var speech='';
                querySnapshot.forEach((doc) => { orders.push(doc) });
                // now orders have something like this [ {...}, {...}, {...} ]
            
                // converting array to speech
                
            
                orders.forEach((eachOrder, index) => {
                    var data4=eachOrder.data();
                   if(data4.pin==request.body.result.parameters['pin_for_activating_cc']){
                        var status='active';
                        eachOrder.ref.update({credit_card_status :status});            
                        //  console.log(doc.data());
                  
                    speech+=`Credit Card Activated Successfully successfully.`
            
                   }
                  
                })
            
                response.send({
                    speech: speech
                });
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            
                response.send({
                    speech: "something went wrong when reading from database"
                })
            })
                            break;
            default:
            response.send({
                speech: "No Action Matched in WebHook"
            })
}


});


