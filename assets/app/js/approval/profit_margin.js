var PortletTools = function () {

	var pageSetup = function(){
		//var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/profit_margin/order_detail.json',
            'dataType': "json",
            'success': function (data) {
				renderPageTitle(data[0].PageTitle);
				renderBreadcrumbs(data[0].BreadCrums);
				$(".breadcrumbs").on('click',function(e){
					loadHTMLPage(e,$(this));
					// e.preventDefault();
					// if($(this).attr('href')!="" && ($(this).attr('href')!='#')){
					// 	$("#page").load($(this).attr('href'));
					// }
					// return false;
				}); 
				renderButtons(data[0].buttons);
				$(".accept").on('click',function(e){
					//TODO :: Approve Action call here
					swal({
                        position: "top-right",
                        type: "success",
                        title: "Request is Approved",
                        showConfirmButton: !1,
                        timer: 2000
					});
					
					$("#page").load('customercredit.html');
				}); 
				$(".hold").on('click',function(e){
					swal({
                        position: "top-right",
                        type: "warn",
                        title: "Request is marked on Hold",
                        showConfirmButton: !1,
                        timer: 2000
					});
					//TODO :: Hold Action call here
					$("#page").load('customercredit.html');
				}); 
				$(".reject").on('click',function(e){
					swal({
                        position: "top-right",
                        type: "danger",
                        title: "Request is rejected",
                        showConfirmButton: !1,
                        timer: 2000
					});
					//TODO :: Reject Action call here
					$("#page").load('customercredit.html');
				}); 
			}
			
        });
	}


	// var renderPageTitle = function(title){
	// 	$("#page-title").text(title);
	// }

	// var renderBreadcrumbs = function(data){
		
	// 	$.each(data, function(key, value){
	// 		$("#breadcrumb").append(`
	// 		<li class="m-nav__item">
	// 						<a href="${value.link}" class="m-nav__link breadcrumbs">
	// 							<span class="m-nav__link-text m--font-darkblue">${value.title}</span>
	// 						</a>
	// 					</li>`);

	// 		if(value.saperator=="1"){
	// 			$("#breadcrumb").append(` <li class="m-nav__separator">></li>`);
	// 		}
						
			
	// 	});
	// }
	
	var renderButtons = function (data) {
		$("#buttons").html("");
        //"0":{"class":"info","icon":"la la-check","text":"Approve","text_class":"m--icon-font-size-sm5"},
        $.each(data, function (key, value) {
            $("#buttons").append(`<button type="button" class="btn m-btn--pill ${value.class} btn-sm m-btn m-btn--custom" data-toggle="modal" data_target="${value.modal}" >
            <i class="${value.icon}"></i>
            <span class="${value.text_class}">${value.text}</span>
        </button>`);
        });
    }
	
	var orderTotal = function () {
		var json = null;
		$.ajax({
			'async': true,
			'global': false,
			'url': 'json/profit_margin/order_detail.json',
			'dataType': "json",
			'success': function (json) {
				//json = data;
						//console.log('json["order_overview"].["Total Lines"]'+val["order_overview"]["Total Lines"]);
		$.each(json, function (i, val) {
			setStatus(val["order_overview"]["status"]);
			$("#total_lines").text(val["order_overview"]["Total Lines"]);
			$("#contribution").text(val["order_overview"]["Contribution"]);
			$("#netto-contribution").text(val["order_overview"]["Netto Contribution"]);

			$("#Nedis-Margin").text(val["order_details"]["Nedis Margin"]);
			$("#Std-Margin").text(val["order_details"]["Std Margin"]);
			$("#Transport-Costs").text(val["order_details"]["Transport Costs"]);

			$("#Order-Amount").text(val["order_details"]["Order Amount"]);
			$("#Standard-Order-Amount").text(val["order_details"]["Standard OrderAmount"]);
			$("#Total-Amount").text(val["order_details"]["Total Amount"]);
		});
			}
		});

	}

	var setStatus = function (statusid) {
		var status = {
			1: {
				'title': 'Pending',
				'class': 'gray'
			},
			2: {
				'title': 'On Hold',
				'class': 'info'
			},

		};
		$('#status').html(`<span class=" btn m--valign-top m--icon-font-size-sm5  btn-${status[statusid].class} m-btn btn-sm m-btn--icon m-btn--pill py-sm-0">
	${status[statusid].title}
</span>`);
		//return '<span class="m-badge ' + status[row.Status].class + ' m-badge--wide">' + status[row.Status].title + '</span>';
	}

	//Start DataTable
	var initTable = function () {
		// begin first table


		var table = $('#m_table_1').mDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: 'json/profit_margin/order_line.json',
				pageSize: 10,
				serverPaging: !0,
				serverFiltering: !0,
				serverSorting: !0
			},
			


			// layout definition
			layout: {
				theme: 'default', // datatable theme
				class: '', // custom wrapper class
				scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
				footer: !1 // display/hide footer
			},

			// column sorting
			sortable: !0,

			pagination: !0,

			search: {
				input: $('#generalSearch')
			},
			rows: {
				// auto hide columns, if rows overflow
				autoHide: false,

			},
			// columns definition
			columns: [{
					field: "recordID",
					title: "#",
					width: 50,
					sortable: false,
					selector: false,
					textAlign: 'center',
					template: function (row) {
						return `<input type="checkbox" class="check-value" value="${row.recordID}" />`;
					}
				}, {
					field: "orderLineID",
					title: "Order Line ID"
				},
				// {
				// 	field: "standardPrice",
				// 	title: "Standard Price"
				// },
				// {
				// 	field: "price",
				// 	title: "Price"
				// },
				{
					field: "priceDiff",
					title: "Price Difference"
				},
				// {
				// 	field: "margin",
				// 	title: "Margin"
				// },
				// {
				// 	field: "actMargin",
				// 	title: "Actual Margin"
				// },
				{
					field: "marginDiff",
					title: "Margin Difference"
				 },
				// {
				// 	field: "reasonforChange",
				// 	title: "Reason for Change"
				// },
				// {
				// 	field: "productDescription",
				// 	title: "Product Description"
				// },
				// {
				// 	field: "PLC",
				// 	title: "PLC"
				// },
				// {
				// 	field: "QTY",
				// 	title: "QTY"
				// },
				// {
				// 	field: "costPrice",
				// 	title: "Cost Price"
				// },
				{
					field: "ProductImage",
					title: "Image",
					template: function (row) {
						return `<img src="assets/app/media/img/products/${row.productImage}" style="max-width:50px;" />`;
					}
				},
				/*{
				field: "ShipCountry",
				title: "Ship Country",
				template: function (row) {
					// callback function support for column rendering
					return row.ShipCountry + ' - ' + row.ShipCity;
				}
			},*/
				{
					field: "status",
					title: "Status",
					// callback function support for column rendering
					template: function (row) {
						var status = {
							1: {
								'title': 'Pending',
								'class': 'm-badge--brand'
							},
							2: {
								'title': 'On Hold',
								'class': ' m-badge--info'
							},

						};
						return '<span class="m-badge ' + status[row.status].class + ' m-badge--wide">' + status[row.status].title + '</span>';
					}
				},


				{
					field: "actions",
					width: 110,
					title: "Actions",
					sortable: false,
					overflow: 'visible',
					template: function (row, index, datatable) {
						return `<a href="#" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                       <i class="la la-check"></i>
                     </a>
                     <span class="btn m-btn m-btn-light m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                     <i class="la la-pause"></i>
                   </span>
                   
                 
                 <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                   <i class="la la-remove"></i>
                 </a>`;
					}
				}

			]
		});
		// Filter event handler
		
	

	
		$('.m_datatable thead th').each( function (i) {
			var title = $('.m_datatable thead th').eq( $(this).index() ).text();
			var name =  $(this).data('field');

			$(this).append( '<input type="text" class="searchbox m-input" placeholder="Search '+title+'" data-col-field = "'+name+'"  data-col-index="'+i+'" name="'+name+'" />' );
		} );

	
		
		$( 'input.searchbox').on( 'keyup',  function () {
			// debugger;
			var val = this.value;

			table.search($(this).val().toLowerCase(), $(this).data('col-field') );

		} );

		

	};

	var searchOrderLine = function (recordID) {
		
		var json = null;
		$.ajax({
			'async': true,
			'global': false,
			'url': 'json/profit_margin/order_line.json',
			'dataType': "json",
			'success': function (data) {

				$.each(data, function (i, v) {
					if (v.recordID == recordID) {
						$("#applicant").text(v.applicant);
						$("#request-date").text(v.requestDate);
						$("#reason-for-change").text(v.reasonforChange);
						$("#product-description").text(v.productDescription);
						$("#PLC").text(v.PLC);
						$("#QTY").text(v.QTY);

						$("#cost-price").text(v.costPrice);
						$("#orderline-image").html(`<img src="assets/app/media/img/products/${v.productImage}" style="max-width:100px;" />`);

						$("#standard-price").text(v.standardPrice);
						$("#price").text(v.price);
						$("#difference").text(v.priceDiff);
						$("#margin").text(v.margin);
						$("#act-margin").text(v.actMargin);
						$("#mrg-difference").text(v.marginDiff);





						return;
					}
				});
			}

		});


	}

	var customer = function () {
		var json = null;
		$.ajax({
			'async': true,
			'global': false,
			'url': 'json/profit_margin/order_detail.json',
			'dataType': "json",
			'success': function (json) {
				$.each(json, function (i, val) {

					var customerHTML = "";
					var count = 1;
					$.each(val['customer'], function (k, value) {
						//console.log("k"+k +"::"+"value"+value );
						var keyClass;
						var valueClass;
						if (count % 2 == 0) {
							keyClass = "col-lg-3 col-md-3 col-sm-3";
							valueClass = "col-lg-3 col-md-3 col-sm-3";
						} else {
							keyClass = "col-lg-2 col-md-2 col-sm-2";
							valueClass = "col-lg-4  col-md-4 col-sm-4";
						}
						customerHTML = customerHTML + `<div class="${keyClass}  m--font-thin m--padding-5"  >${k}:</div>
						<div class="${valueClass}  m--padding-5 m--font-bold" >
						${value}
						</div>`;
						count++;
					});
					$("#customer").html(customerHTML);
				});
			}
		});

		


	}

	
		//== Render Customer Portlet
		var renderOrderTotalPortlet = function () {
			// This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
			var portlet = new mPortlet('m_portlet_tools_1');
			orderTotal();
		   
			//== Reload event handlers
			portlet.on('reload', function (portlet) {
				toastr.info('Reload event fired!');
	
				mApp.block(portlet.getSelf(), {
					overlayColor: '#000000',
					type: 'spinner',
					state: 'brand',
					opacity: 0.05,
					size: 'lg'
				});
	
				// update the content here
	
				setTimeout(function () {
					orderTotal();
					mApp.unblock(portlet.getSelf());
				}, 2000);
			});
		}


	//== Render Customer Portlet
    var renderCustomerPortlet = function () {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_5');
        customer();
       
        //== Reload event handlers
        portlet.on('reload', function (portlet) {
            toastr.info('Reload event fired!');

            mApp.block(portlet.getSelf(), {
                overlayColor: '#000000',
                type: 'spinner',
                state: 'brand',
                opacity: 0.05,
                size: 'lg'
            });

            // update the content here

            setTimeout(function () {
                customer();
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });
    }



	//End DataTable  

	return {
		//main function to initiate the module
		init: function () {
			initTable();
			pageSetup();
			renderOrderTotalPortlet();
			searchOrderLine(2);
			
			renderCustomerPortlet();
			$('#m_table_1').on('click', 'tbody tr', function () {
				searchOrderLine($('.check-value', this).val());

			});
			
			

		}
	};
}();

jQuery(document).ready(function () {
	PortletTools.init();
	
});