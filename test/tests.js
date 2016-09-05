'use strict';

var assert = require('assert');
var Zombie = require('zombie');


describe('Assignment', function() {
    var browser = new Zombie();
    var url = 'file://' + process.argv[1].replace('node_modules/mocha/bin/_mocha', 'index.html');

    before(function(done){
        return browser.visit(url, done);
    })


    describe('Do callback action', function(){
                            
        before(function(done){
            browser.pressButton('Callback');                
            browser.wait(1000, done);
        });
            
        it('should be successful', function() {
            browser.assert.success();
        });

        it('should show table1', function(){
            browser.assert.element('#table1');
            //browser.assert.elements('tr', 20);                
                
        });
    });

    describe('Do promise action', function(){
                            
        before(function(done){
            browser.pressButton('Promise', done);
        });
            
        it('should be successful', function() {
            browser.assert.success();
        });

        it('should show table1', function(){
            browser.assert.element('#table1');
        });
    });    

    describe('Do filter action', function(){
                            
        before(function(done){
            browser.pressButton('Filter Payment-Method', done);
        });
            
        it('should be successful', function() {
            browser.assert.success();
        });

        it('should show table1', function(){
            browser.assert.element('#table1');
        });
    }); 

    describe('Do add payment action', function(){
                            
        before(function(done){
            browser
                .fill('amount', '11000')
                .fill('currency', 'CLP')
                .fill('merchant', 'test');

            browser.pressButton('Add payment', done);
        });
            
        it('should be successful', function() {
            browser.assert.success();
        });

    });        

});