var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require("../index")
var expect = require('chai').expect;


//tests runs with npx mocha
   
  

    it.only('API status code should return 200 for GET call when getting all notes', function(done){
      chai.request(app)
          .get('/notes').end((err,res)=>{
              if(err) done(err);
              expect(res).to.have.status(200);
              
              done();
          }) 
       })

    it.only('API status code should return 200 for POST call when adding note', function(done){
        chai.request(app)
            .post('/notes').end((err,res)=>{
                if(err) done(err);
                expect(res).to.have.status(200);
                
                done();
            }) 
         })

    it.only('API status code should return 200 for GET call when getting one note', function(done){
          chai.request(app)
              .get('/notes/64f54ca62d364704c2233dec').end((err,res)=>{
                  if(err) done(err);
                  expect(res).to.have.status(200);
                  
                  done();
              }) 
           })

    
    it.only('API status code should return 200 for PUT call when updating note', function(done){
            chai.request(app)
                .put('/notes/64f54ca62d364704c2233dec').end((err,res)=>{
                    if(err) done(err);
                    expect(res).to.have.status(200);
                    console.log(JSON.stringify(res.body,"",2));
                    done();
                }) 
             }) 

    it.only('API status code should return 200 for DELETE call when deleting note', function(done){
              chai.request(app)
                  .delete('/notes/64f54ca62d364704c2233dec').end((err,res)=>{
                      if(err) done(err);
                      expect(res).to.have.status(200);
                      
                      done();
                  }) 
               })