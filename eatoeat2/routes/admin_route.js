
var express=require('express');

var router=express.Router();
var mongojs=require('mongojs');
var bcrypt=require('bcrypt-nodejs');
var db=mongojs('mongodb://admin:root@ds127399.mlab.com:27399/eatoeat');

router

.post('/add-user-info',function(req,res,next){

// res.send('Task API');

db.user_infos.save({
                    username:req.body.user_name,
                    email:req.body.user_email,
                    phone:req.body.user_contact_no,
                    password:bcrypt.hashSync(req.body.user_password,bcrypt.genSaltSync(10))
              
                    
                    },function(err,user){

                          if(err) throw err;
                            
                         res.send(user);
                        console.log('user saved');

                  })

});

router
.post('/add-cook-info',function(req,res,next){

// res.send('Task API');
db.cook_infos.save({
                     cook_name:req.body.cook_name,
                    cook_email:req.body.cook_email,
                    cook_contact:req.body.cook_contact_no,
                    cook_password:bcrypt.hashSync(req.body.cook_password,bcrypt.genSaltSync(10))
              
                    
                    },function(err,cook){

                          if(err) throw err;
                            
                         res.send(cook);
                        console.log('cook saved');

                  })

});

router
.get('/get-all-users',function(req,res,next){

// res.send('Task API');
   db.user_infos.find(function(err, users) {
  if( err || !users) console.log("No  users found");
  else 
      {
            res.status(200).send(users);
      }     
});

});

router
.get('/get-all-cooks',function(req,res,next){

// res.send('Task API');
   db.cook_infos.find(function(err, cooks) {
  if( err || !cooks) console.log("No  cook found");
  else 
      {
            res.status(200).send(cooks);
      }     
});

});


      router
        .post('/delete-cook',function(req,res,next){


            for (var i=0; i<req.body.length; i++){
          
                  db.cook_infos.remove({"_id": db.ObjectId(req.body[i])});
            }

 
            res.status(200).send('ooook');
      });

      router
        .get('/delete-all-cook',function(req,res,next){


             db.cook_infos.remove();
              res.status(200).send('All Deleted');
              console.log('all cook deletedddd');
      });

   
   router
      .post('/delete-user',function(req,res,next){


      for (var i=0; i<req.body.length; i++){
          
            db.user_infos.remove({"_id": db.ObjectId(req.body[i])});
      }

      res.status(200).send('ooook');

      });

      
   router
        .get('/delete-all-user',function(req,res,next){


             db.user_infos.remove();
              res.status(200).send('All Deleted');
              console.log('all user deletedddd');
      });

   

// res.send('Task API');

router
.post('/save-global-setting',function(req,res,next){


// res.send('Task API');
 db.global_setting_infos.save({
                     
                      site_name:req.body.site_name,
                     display_email:req.body.display_email,
                     send_from_email:req.body.send_from_email

              
                    
                     },function(err,g_setting){

                           if(err) throw err;
                            
                         res.send(g_setting);
                         console.log('global setting saved');

                  })

});


router

.post('/add-info-pages',function(req,res,next){



db.information_pages.save({
                    info_title:req.body.info_title,
                    info_desc:req.body.info_desc,
                    info_meta_tag:req.body.info_meta_tag,
                    info_meta_desc:req.body.info_meta_desc,
                    info_seo_url:req.body.info_seo_url,
                    info_status:req.body.info_status,
                    info_sort_order:req.body.info_sort_order,
                
              
                    
                    },function(err,info){

                          if(err) throw err;
                            

                         res.status(200).send(info);
                        console.log('information saved');

                  })

});


router

.post('/add-coupon-info',function(req,res,next){

console.log(req.body);

db.coupon_infos.save({
                    coupon_name:req.body.coupon_name,
                    coupon_code:req.body.coupon_code,
                    coupon_due_start:req.body.coupon_due_start,
                    coupon_due_end:req.body.coupon_due_end,
                    coupon_voucher:req.body.coupon_voucher,
                    coupon_uses_per_customer:req.body.coupon_uses_per_customer,
                    coupon_status:req.body.coupon_status,
                
              
                    
                    },function(err,coupon){

                          if(err) throw err;
                            

                         res.status(200).send(coupon);
                        console.log('COUPON saved');

                  })

});

router

.post('/add-social-info',function(req,res,next){

console.log(req.body);
db.social_infos.save({
                    facebook:req.body.facebook,
                    google_plus:req.body.google_plus,
                    linked_in:req.body.linked_in,
                    instagram:req.body.instagram,
                    flickr:req.body.flickr,
                    pinterest:req.body.pinterest,
                    rss:req.body.coupon_status,
                    twitter:req.body.rss,
                    vimeo:req.body.vimeo  ,
                   
                    
                    },function(err,coupon){

                          if(err) throw err;
                            

                         res.status(200).send(coupon);
                        console.log('SOCIAL INFO saved');

                  })

});



router

.get('/get-social-infos',function(req,res,next){


//res.send('this is social infos');
 db.social_infos.find(
                { 
              
                   _id: mongojs.ObjectId('58956efa325e380c1ce8c94a')
                           
                }
                ,function(err,social_infos){

                        
                 if(err || social_infos=="")
                 {  
                      res.status(404);
                      res.send('info not found');
                 }else {    

                    //    res.status(200).json(user);
                    res.send(social_infos[0]);  
                    console.log(social_infos);
                 }
        });
});


module.exports = router;