var mongojs=require('mongojs');

var db=mongojs('mongodb://admin:root@ds127399.mlab.com:27399/eatoeat');

var bcrypt=require('bcrypt-nodejs');
var jwt=require('jsonwebtoken');
module.exports.add_cook_info=function(req,res,next){

// res.send('Task API');

    db.cook_infos.find({cook_email : req.body.cook_email}, function (err,cook_details) {
        console.log(cook_details);
        if (cook_details !=""){
            

            res.status(404);
             res.send(cook_details);

        }else  if (cook_details ==""){
          
            db.cook_infos.save(
                { 
                    cook_name:req.body.cook_name,
                    cook_email:req.body.cook_email,
                    cook_contact:req.body.cook_contact_no,
                    cook_password:bcrypt.hashSync(req.body.cook_password,bcrypt.genSaltSync(10)),
                    status:"active"
                  
                }
                ,function(err,cook_details){

            if(err) throw err;


             res.send(cook_details);
            console.log('COOK DETAILS saved');

            });
            
           
        }
    });
};

module.exports.cook_login_check=function(req,res,next){

// res.send('Task API');
//   console.log(req.body);
db.cook_infos.find(
                { 
                    cook_email:req.body.email,
                  
                }
                ,function(err,cook){

                            if(err || cook=="")
                            {  

                                console.log(err);
                                res.status(404);
                                res.send('cook not find');
                            }else {
                                
                            if(bcrypt.compareSync(req.body.password,cook[0].cook_password))
                            {

                                    if(cook[0].status=="inactive"){
                                            res.status(400).send('account disabled');
                                            console.log('cook is inactive');
                                    }
                                    else{
                                        console.log(cook);
                                        res.status(200).json(cook);
                        
                                    }

                     
                 }
                 else
                 {
                     res.status(401).json('unauthorized');
                    
                 }
                }
        });
};

module.exports.cook_pass_update=function(req,res,next){

  console.log(req.body);
    var flag=false;
    db.cook_infos.find(
                    { 
                        _id: mongojs.ObjectId(req.body.cook_id)
                    
                    }
                    ,function(err,cook){

                    if(err || cook=="")
                    {  

                        console.log(err);
                        res.status(404);
                        res.send('cook not find');
                    }else {

                         if(bcrypt.compareSync(req.body.old_pass,cook[0].cook_password))
                                 
                                    {
                                    //     console.log(cook);
                                    // res.status(200).json(cook);
                                        db.cook_infos.findAndModify({
                                                    query: { _id: mongojs.ObjectId(req.body.cook_id) },
                                                    update: { $set: { 
                                                    
                                                                    cook_password:bcrypt.hashSync(req.body.new_pass,bcrypt.genSaltSync(10))
                                                        } },
                                                    new: true
                                                }, function (err, data, lastErrorObject) {
                                                    if(err){
                                                           
                                                           flag=false;

                                                            }    
                                                            res.status(200);
                                                            res.send(data);
                                                            flag=true;
                                                            console.log('COOK password UPDATED');
                                                })


                                    }
                                    else
                                    {
                                        if(flag){
                                            console.log('pass updated');
                                        }
                                        else  if(!flag){
                                             res.status(400).send('err');
                                            console.log('not match');
                                        }
                                        // res.status(200).send('fine');
                                      
                                        
                                    }


                    }
            });
        
};


module.exports.cook_deactivate=function(req,res,next){


console.log(req.body);

    
 db.cook_infos.find(
                { 
              
                   _id: mongojs.ObjectId(req.body.cook_id),
                    cook_email:req.body.cook_email,
                    cook_contact:req.body.cook_contact_no      
                }
                ,function(err,cook){

                      
                 if(err || cook=="")
                 {  
                      res.status(404);
                      res.status(404).send('details are incorrect');
                 }else {    
                    
                     
                      if(bcrypt.compareSync(req.body.cook_password,cook[0].cook_password))
                     {
                                db.cook_infos.findAndModify({
                                        query: { _id: mongojs.ObjectId(req.body.cook_id),
                                                
                                                
                                                },
                                        update: { $set: { 

                                                        status:"inactive"
                                            } },
                                        new: true
                                    }, function (err, data, lastErrorObject) {
                                        if(err){
                                                res.status(400);
                                                res.send('error');
                                                console.log('err');
                                                throw err;

                                                }    
                                               
                                                res.status(200).send('acount deactivated');
                                              
                                    });
                                        
                     }
                     else{

                         res.status(404).send('password not match');
                         console.log('password not match');
                     }
            }

        });

};

module.exports.cook_profile_update=function(req,res,next){


console.log(req.body);
/**********************NOTES
 * Make a array subdocument in cook_infos which stores  available hours
 * 
 * 
 * ********** */
 db.cook_infos.findAndModify({
                                            query: { _id: mongojs.ObjectId(req.body.cook_id) ,
                                                        },
                                            update: { $unset: { 
                                                
                                                      'available_hours':null
                                                      
                                            
                                                 } },
                                            new: true
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                  
                                                    console.log('cook UPDATED');
                                        });

  db.cook_infos.findAndModify({
                query: { _id: mongojs.ObjectId(req.body.cook_id)    },
                update: { $set: { 
                    cook_name:req.body.cook_name,
                    cook_email:req.body.cook_email,
                    cook_contact:req.body.cook_contact,
                    additional_phone:req.body.additional_phone,
                    street_address:req.body.street_address,
                    gender:req.body.gender,
                    landmark:req.body.landmark,
                    city:req.body.city,
                    pincode:req.body.pincode,
                    state:req.body.user_lastname,
                    longitude:req.body.longitude,
                    latitude:req.body.latitude,
           
                  }
                
                     }
                     ,
                new: true
            }, function (err, data, lastErrorObject) {
                if(err){
                        res.status(400);
                        res.send('error');
                         throw err;

                        }    

                        else{
                           
                           if(req.body.available_hours.hasOwnProperty('mon_from'))
                           {
                              
                                   db.cook_infos.findAndModify({
                                            query: { _id: mongojs.ObjectId(req.body.cook_id) ,
                                                        },
                                            update: { $set: { 
                                                
                                                      'available_hours.mon_from':req.body.available_hours.mon_from,
                                                      'available_hours.mon_to':req.body.available_hours.mon_to,
                                            
                                                 } },
                                            new: true
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                  
                                                    console.log('cook MON UPDATED');
                                        });
                           }
                            if(req.body.available_hours.hasOwnProperty('tue_from'))
                           {
                                   db.cook_infos.findAndModify({
                                            query: { _id: mongojs.ObjectId(req.body.cook_id) ,
                                                        },
                                            update: { $set: { 
                                                
                                                      'available_hours.tue_from':req.body.available_hours.tue_from,
                                                      'available_hours.tue_to':req.body.available_hours.tue_to,
                                            
                                                 } },
                                            new: true
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                  
                                                    console.log('cook UPDATED');
                                        });
                           }

                            if(req.body.available_hours.hasOwnProperty('wed_from'))
                           {
                                   db.cook_infos.findAndModify({
                                            query: { _id: mongojs.ObjectId(req.body.cook_id) ,
                                                        },
                                            update: { $set: { 
                                                
                                                      'available_hours.wed_from':req.body.available_hours.wed_from,
                                                      'available_hours.wed_to':req.body.available_hours.wed_to,
                                            
                                                 } },
                                            new: true
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                  
                                                    console.log('cook UPDATED');
                                        });
                           }

                            if(req.body.available_hours.hasOwnProperty('thu_from'))
                           {
                                   db.cook_infos.findAndModify({
                                            query: { _id: mongojs.ObjectId(req.body.cook_id) ,
                                                        },
                                            update: { $set: { 
                                                
                                                      'available_hours.thu_from':req.body.available_hours.thu_from,
                                                      'available_hours.thu_to':req.body.available_hours.thu_to,
                                            
                                                 } },
                                            new: true
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                  
                                                    console.log('cook UPDATED');
                                        });
                           }

                            if(req.body.available_hours.hasOwnProperty('fri_from'))
                           {
                                   db.cook_infos.findAndModify({
                                            query: { _id: mongojs.ObjectId(req.body.cook_id) ,
                                                        },
                                            update: { $set: { 
                                                
                                                      'available_hours.fri_from':req.body.available_hours.fri_from,
                                                      'available_hours.fri_to':req.body.available_hours.fri_to,
                                            
                                                 } },
                                            new: true
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                  
                                                    console.log('cook UPDATED');
                                        });
                           }

                            if(req.body.available_hours.hasOwnProperty('sat_from'))
                           {
                                   db.cook_infos.findAndModify({
                                            query: { _id: mongojs.ObjectId(req.body.cook_id) ,
                                                        },
                                            update: { $set: { 
                                                
                                                      'available_hours.sat_from':req.body.available_hours.sat_from,
                                                      'available_hours.sat_to':req.body.available_hours.sat_to,
                                            
                                                 } },
                                            new: true
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                  
                                                    console.log('cook UPDATED');
                                        });
                           }

                            if(req.body.available_hours.hasOwnProperty('sun_from'))
                           {
                                   db.cook_infos.findAndModify({
                                            query: { _id: mongojs.ObjectId(req.body.cook_id) ,
                                                        },
                                            update: { $set: { 
                                                
                                                      'available_hours.sun_from':req.body.available_hours.sun_from,
                                                      'available_hours.sun_to':req.body.available_hours.sun_to,
                                            
                                                 } },
                                            new: true
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                  
                                                    console.log('cook UPDATED');
                                        });
                           }

                        
                        }

                         res.status(200).send('success');
  });
//                             //     db.user_infos.findAndModify(
                                        
                            //             {query:{_id: mongojs.ObjectId(req.body.user_id)},
                            //             update: {
                            //                     $push:{'address': {'address_name':req.body.address_name,'address_details':req.body.address_details,'address_locality':req.body.address_locality_landmark,'address_pincode':req.body.address_pincode,'address_state':req.body.address_state,'address_city':req.body.address_city,'address_contact':req.body.address_contact_no,'address_type':req.body.address_type,'address_default':'false'}}
                                                
                            //                 },
                            //             new:true
                            //         }
                            //         , function (err, data, lastErrorObject) {
                            //         if(err){
                            //                 res.status(400);
                            //                 res.send('error');
                            //                 throw err;

                            //                 }    
                            //                 res.status(200);
                            //                 res.send(data);
                                        
                                        
                            // });
                
                        // }
                        // res.status(200);
                        //  res.send(data);
            //             console.log('Cook PROFILE UPDATED');
            // });

}
module.exports.get_cook_profile_data=function(req,res,next){


db.cook_infos.find(
                { 
                    _id: mongojs.ObjectId(req.body.cook_id)
                  
                }
                ,function(err,cook){

                 if(err || cook=="")
                 {  

                      console.log(err);
                      res.status(404);
                      res.send('cook not find');
                 }else {
                    
                    res.status(200).send(cook);
                     
                }
        });
    }

module.exports.cook_company_details_update=function(req,res,next){
  
  db.cook_infos.findAndModify({
                query: { _id: mongojs.ObjectId(req.body._id) },
                update: { $set: { 
                    about_us:req.body.about_us,
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    display_email:req.body.display_email,
                    display_phone:req.body.display_phone,
                    bank_type:req.body.bank_type,
                    bank_account_no:req.body.bank_account_no,
                    bank_ifsc:req.body.bank_ifsc
                    

                  } },
                new: true
            }, function (err, data, lastErrorObject) {
                if(err){
                        res.status(400);
                        res.send('error');
                         throw err;

                        }    
                        res.status(200);
                         res.send(data);
                        console.log('cook PROFILE UPDATED');
            });



}




