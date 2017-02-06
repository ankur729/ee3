
var express=require('express');

var router=express.Router();
var mongojs=require('mongojs');
var bcrypt=require('bcrypt-nodejs');
var db=mongojs('mongodb://admin:root@ds127399.mlab.com:27399/eatoeat');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gupta.ankur792@gmail.com',
        pass: '9268264810'
    }
});

// setup email data with unicode symbols

router

.post('/add-user-info',function(req,res,next){

// res.send('Task API');
        // res.writeHead(302, {'Location': 'http://192.168.1.101:3000/#/user_login'});
        // res.end();
db.user_infos.save({
                    username:req.body.user_name,
                    email:req.body.user_email,
                    phone:req.body.user_contact_no,
                    password:bcrypt.hashSync(req.body.user_password,bcrypt.genSaltSync(10)),
                    isVerified:"false",
                    status:"active",
              
                    
                    },function(err,user){

                          if(err) throw err;
                           
                              var mailOptions = {
                                    from: '"EatoEato 👻" <gupta.ankur792@gmail.com>', // sender address
                                    to: req.body.user_email, // list of receivers
                                    subject: 'Welcome To EatoEato ', // Subject line
                                    text: 'Please Activate Your EatoEato Account', // plain text body
                                    html: '<b>Your Account Has Been Created by, Please Click on Below Link to Verify your Account</b> <br> <a href="http://192.168.1.101:3000/#/verify-user-params/'+user._id+'">'+randomValueHex(100)+'</a>' // html body
                                };

                                        transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                            console.log(error);
                                            res.json({yo: 'error'});
                                        }else{
                                            console.log('Message sent: ' + info.response);
                                           
                                        };
                                    });
                            
                         res.send(user);
                        console.log(user._id);

                  })

});

router

.get('/user-verify/:user_id',function(req,res,next){
// console.log(req.params['user_id']);
// res.send('Task API');
        // res.writeHead(302, {'Location': 'http://192.168.1.101:3000/#/user_login'});
        // res.end();
      db.user_infos.findAndModify({
                query: { _id: mongojs.ObjectId(req.params['user_id']) },
                update: { $set: { 
                                isVerified:"true"
                               
                     } },
                new: true
            }, function (err, user, lastErrorObject) {
                if(err){
                        res.status(400);
                        res.send('error');
                         throw err;

                        }    
                        res.status(200);
                         res.send(user);
                        console.log('user Verified');
            });
});


router

.post('/user-login',function(req,res,next){

// res.send('Task API');
//  console.log(req.body);
db.user_infos.find(
                { 
              
                    email:req.body.email,
                           
                }
                ,function(err,user){

                        
                 if(err || user=="")
                 {  
                      res.status(404);
                      res.send('user not found');
                 }else {

                      if(bcrypt.compareSync(req.body.password,user[0].password))
                 {
                     
                      if(user[0].status=="inactive"){
                                res.status(200).send('account disabled');
                                console.log('user is inactive');
                        }
                        else{
                            console.log(user);
                             res.status(200).send(user);
              
                        }

                 
                 
                 }
                 else
                 {
                     res.status(401).json('unauthorized');
                    
                 }
                     
                 }
        });


});


router

.post('/user-pass-update',function(req,res,next){

 
  console.log(req.body);
var flag=false;
    db.user_infos.find(
                    { 
                        _id: mongojs.ObjectId(req.body.user_id)                    
                    }
                    ,function(err,user){

                    if(err || user=="")
                    {  

                        console.log(err);
                        res.status(404);
                        res.send('user not find');
                    }else {

                         if(bcrypt.compareSync(req.body.old_pass,user[0].password))
                                 
                                    {
                                  
                                        db.user_infos.findAndModify({
                                                    query: { _id: mongojs.ObjectId(req.body.user_id) },
                                                    update: { $set: { 
                                                    
                                                                    password:bcrypt.hashSync(req.body.new_pass,bcrypt.genSaltSync(10))
                                                        } },
                                                    new: true
                                                }, function (err, data, lastErrorObject) {
                                                    if(err){
                                                           
                                                           flag=false;

                                                            }    
                                                            res.status(200);
                                                            res.send(data);
                                                            flag=true;
                                                            console.log('User password UPDATED');
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
        
});

router

.post('/user-profile-update',function(req,res,next){


  db.user_infos.findAndModify({
                query: { _id: mongojs.ObjectId(req.body.user_id) },
                update: { $set: { 
                    firstname:req.body.user_firstname,
                    lastname:req.body.user_lastname,
                    dob:req.body.user_dob,
                    gender:req.body.user_gender

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
            });


});

router

.post('/user-address-add',function(req,res,next){

  

         if(req.body.hasOwnProperty('address_default'))
         {  
            console.log('has property');

             db.user_infos.findAndModify(
                    
                    {query:{_id: mongojs.ObjectId(req.body.user_id)},
                     update: {
                             $push:{'address': {'address_name':req.body.address_name,'address_details':req.body.address_details,'address_locality':req.body.address_locality_landmark,'address_pincode':req.body.address_pincode,'address_state':req.body.address_state,'address_city':req.body.address_city,'address_contact':req.body.address_contact_no,'address_type':req.body.address_type,'address_default':'true'}}
                            
                         },
                     new:true
                }
                , function (err, data, lastErrorObject) {
                if(err){
                        res.status(400);
                        res.send('error');
                         throw err;

                        }    
                        res.status(200);
                        res.send(data);
                        
            });

            }

            else
            {

              
                db.user_infos.findAndModify(
                    
                    {query:{_id: mongojs.ObjectId(req.body.user_id)},
                     update: {
                             $push:{'address': {'address_name':req.body.address_name,'address_details':req.body.address_details,'address_locality':req.body.address_locality_landmark,'address_pincode':req.body.address_pincode,'address_state':req.body.address_state,'address_city':req.body.address_city,'address_contact':req.body.address_contact_no,'address_type':req.body.address_type,'address_default':'false'}}
                            
                         },
                     new:true
                }
                , function (err, data, lastErrorObject) {
                if(err){
                        res.status(400);
                        res.send('error');
                         throw err;

                        }    
                        res.status(200);
                         res.send(data);
                      
                       
            });
                
                
            }

});
    // console.log(req.body);
    //                    db.user_infos.findAndModify({
    //             query: { _id: mongojs.ObjectId(req.body.user_id) ,
    //                       'address.address_name':'cccccccdddd'
    //                         },
    //             update: { $set: { 
                    
    //                       'address.$.address_name':'yooooooooo'
                
    //                  } },
    //             new: true
    //         }, function (err, data, lastErrorObject) {
    //             if(err){
    //                     res.status(400);
    //                     res.send('error');
    //                      throw err;

    //                     }    
    //                     res.status(200);
    //                      res.send(data);
    //                      console.log(data);
    //                     console.log('user UPDATED');
    //         })



    // console.log(req.body);
    //      if(req.body.hasOwnProperty('address_default'))
    //      {  
             

    //             db.user_infos.findAndModify(
                    
    //                 {query:{_id: mongojs.ObjectId(req.body.user_id)},

    //                 update: {
    //                         $push:{'address': {'address_name':req.body.address_name,'address_details':req.body.address_details,'address_default':'true'}}
                            
    //                     },
    //                 new:true
    //            });
    //         }

    //         else
    //         {
    //            db.user_infos.findAndModify(
                    
    //                 {query:{_id: mongojs.ObjectId(req.body.user_id)},

    //                 update: {
    //                         $push:{'address': {'address_name':req.body.address_name,'address_details':req.body.address_details,'address_default':'false'}}
                            
    //                     },
    //                 new:true
    //            });
    //         }

    //                     // db.user_infos.find({address: {$elemMatch: {address_type:'Home'}}},function(err, user) {

    //                     //         console.log(user);
    //                     //         // if(user="")
    //                     //         // { console.log('not found');}

    //                     //         // else
    //                     //         // {
    //                     //         //     console.log('found');
    //                     //         // }



    //                     // });
// });


router

.post('/get-user-address',function(req,res,next){

console.log(req.body);

 db.user_infos.find(
                { 
              
                   _id: mongojs.ObjectId(req.body.id)
                           
                }
                ,function(err,user){

                        
                 if(err || user=="")
                 {  
                      res.status(404);
                      res.send('user not find');
                 }else {    

                     res.status(200).json(user);

                    console.log(user);
                 }
        });
});


router

.post('/user-account-update',function(req,res,next){

console.log(req.body);
      db.user_infos.findAndModify({
                query: { _id: mongojs.ObjectId(req.body.user_id) },
                update: { $set: { 
                    email:req.body.user_email,
                    phone:req.body.user_mobile,
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
                        console.log('user PROFILE UPDATED');
            })
});

   


router
.post('/user-account-deactivate',function(req,res,next){

console.log(req.body);

    
 db.user_infos.find(
                { 
              
                   _id: mongojs.ObjectId(req.body.user_id),
                    email:req.body.deactivate_user_email
                    // phone:req.body.cook_contact_no      
                }
                ,function(err,user){

                      
                 if(err || user=="")
                 {  
                      res.status(404);
                      res.status(404).send('details are incorrect');
                 }else {    
                    
                     
                      if(bcrypt.compareSync(req.body.deactivate_user_password,user[0].password))
                     {
                               db.user_infos.findAndModify({
                                        query: { _id: mongojs.ObjectId(req.body.user_id),
                                                
                                                
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

    
//  db.user_infos.find(
//                 { 
              
//                    _id: mongojs.ObjectId(req.body.user_id),
//                     email:req.body.deactivate_user_email      
//                 }
//                 ,function(err,user){

                      
//                  if(err || user=="")
//                  {  
//                       res.status(404);
//                       res.status(404).send('details are incorrect');
//                  }else {    
                    
//                     //  res.status(200).json(user);

                     
//                       if(bcrypt.compareSync(req.body.deactivate_user_password,user[0].password))
//                      {
//                                 db.user_infos.findAndModify({
//                                         query: { _id: mongojs.ObjectId(req.body.user_id),
                                                
                                                
//                                                 },
//                                         update: { $set: { 

//                                                         status:"inactive"
//                                             } },
//                                         new: true
//                                     }, function (err, data, lastErrorObject) {
//                                         if(err){
//                                                 res.status(400);
//                                                 res.send('error');
//                                                 console.log('err');
//                                                 throw err;

//                                                 }    
                                               
//                                                 res.status(200).send('acount deactivated');
//                                                 console.log(data);
//                                     });
                                        
//                      }
//                      else{

//                          res.status(404).send('password not match');
//                          console.log('password not match');
//                      }
//             }

//         });
});


   


module.exports = router;