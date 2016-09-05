'use strict';

$(function(){

	/*
	 *	UI Event handlers
	 */

	$('#callback-button').click(function(){
		getHighestPayments(function(data){
			renderTable(data);			
		})
	});

	$('#promise-button').click(function(){
		var promise = getPaymentsFromMerchantPromise('Ginger');
		promise.then(function(data){
			renderTable(data);
		});

	});

	$('#payment-filter-button').click(function(){
		getPaymentsWithPaymentMethodFilter($('#filter-select').val(), 
			function(data){
				renderTable(data);
			})
	});

	$('#payment-form').submit(function(event){
		$('#created').val(new Date());
	});

	/* 
	 *  Helpers
	 */

	function getHighestPayments(callback){
		$.getJSON('http://localhost:3000/payments?_sort=amount&_order=DESC&_limit=20'
			, function(data){
			callback(data);
		});
	}

	function getPaymentsFromMerchantPromise(merchantName){
		var promise = new Promise(function(resolve, reject){
			$.getJSON('http://localhost:3000/payments?merchant=' + merchantName
				, function(data){
				resolve(data);
			});			
		});

		return promise;
	}

	function getPaymentsWithPaymentMethodFilter(paymentMethod, callback){
		$.getJSON('http://localhost:3000/payments', function(data){
				data = data.filter(function(el){
					return el.method===paymentMethod;
				});

				data.sort(function(a, b){
					return (a.amount < b.amount) || (a.amount === b.amount) -1;
				});

				callback(data);			
		});
	}

	function renderTable(data){
		$('#table1').show();
		$('#table1').find('tbody').remove();
		data.forEach(function(el){
			$('#table1').append('<tr id="row_' + el.id + '"></tr>');		
			$('#row_' + el.id).append('<td>' + el.method + '</td>');
			$('#row_' + el.id).append('<td>' + el.currency + '</td>');
			$('#row_' + el.id).append('<td>' + Number(el.amount / 100).toLocaleString() + '</td>');
			$('#row_' + el.id).append('<td>' + moment(new Date(el.created)).format('llll') + '</td>');
			$('#row_' + el.id).append('<td>' + el.status + '</td>');
			$('#row_' + el.id).append('<td>' + el.merchant + '</td>');
		});
	}

})