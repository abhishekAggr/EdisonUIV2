var PortletTools = function () {

	var renderTopTabs = function (data) {
		$("#approval-top-tab").html("");
		$.each(data, function (key, value) {
			$("#approval-top-tab").append(`
			
			<div class="col-md-12 col-lg-6 col-xl-3">
                                    <div class="m-widget24">
										<div class="m-widget24__item">
											
                                            <h4 class="m-widget24__title m--margin-top-10">
											 ${value.title}
                                            </h4>
                                            <br>
                                            <span class="m-widget24__desc">
											${value.description}
                                            </span>
                                            <span class="m-widget24__stats m--font-${value.color}">
											${value.Count}
                                            </span>
											<div class="m--space-10"></div>  
											<div class="progress m-progress--sm">
							<div class="progress-bar m--bg-${value.color}" role="progressbar" style="width: ${value.Percentage};" aria-valuenow="${value.valueNow}" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<span class="m-widget24__change">
						${value.value1}
						</span>
						<span class="m-widget24__number">
						${value.value2}
					    </span>
				    </div>		  
										   
                                        </div>
                                    </div>
                                </div>`);
		});
		$(".top-tabs").on('click', function (e) {
			loadHTMLPage(e, $(this));
		});

	}


	var pageSetup = function () {
		//var json = null;
		$.ajax({
			'async': true,
			'global': false,
			'url': 'json/profit_margin/order_detail.json',
			'dataType': "json",
			'success': function (data) {
				renderPageTitle(data[0].PageTitle);
				setValToID("customer_name",data[0].customerName);
				renderBreadcrumbs(data[0].BreadCrums);
				renderTopTabs(data[0].TopTabs);

				$(".breadcrumbs").on('click', function (e) {
					loadHTMLPage(e, $(this));
				});
				renderButtons(data[0].buttons);
				$(".accept").on('click', function (e) {
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
				$(".hold").on('click', function (e) {
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
				$(".reject").on('click', function (e) {
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
				$.each(json, function (i, val) {
				setStatus(val['status']);
				$("#order_details").html("");
				$("#order_details").append(`<div id="order_info"><h4>Order info: </h4></div>`);
				$.each(val['orderInfo'], function (i, orderInfo) {
					$("#order_info").append(`<div class="row  m--padding-left-20"><span class=" m--font-bold">${orderInfo['label']}</span>:<span>${orderInfo['value']}</span></div>`);
				});
				$("#order_details").append(`<div id="logistic_info"><h4>Logistical Info:  </h4></div>`);
				$.each(val['logisticInfo'], function (i, logisticInfo) {
					$("#logistic_info").append(`<div class="row  m--padding-left-20"><span class="m--font-bold">${logisticInfo['label']}</span>:<span>${logisticInfo['value']}</span></div>`);
				});
				$("#order_details").append(`<div id="cost_charge"><h4>Costs & Charges:</h4></div>`);
				$.each(val['costAndCharge'], function (i, costAndCharge) {
					$("#cost_charge").append(`<div class="row  m--padding-left-20"><span class="m--font-bold">${costAndCharge['label']}</span>:<span>${costAndCharge['value']}</span></div>`);
				});
			});
	}
	
	});
}

	var setStatus = function (statusid) {
		var status = {
			1: {
				'title': 'Pending',
				'class': 'metal'
			},
			2: {
				'title': 'On Hold',
				'class': 'info'
			},

		};
		$('#status').html(`<span class=" m-badge m-badge--${status[statusid].class} m-badge--wide ">${status[statusid].title}</span>`);
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
				autoHide: true,

			},
			// columns definition
			columns: [
				{
					field: "recordID",
					title: "Indicator",
					template: function (row) {
						return `<span class="m-badge  m-badge--danger m-badge--wide">Below Cost</span> <br/> <br/><span class="m-badge  m-badge--metal m-badge--wide">Provison</span> <br/> <br/><span class="m-badge  m-badge--success m-badge--wide">Rebate</span> `;
					}
				},
				{
					field: "ProductImage",
					title: "Product",
					width: 120,
					sortable: false,
					selector: false,
					textAlign: 'center',
					template: function (row) {
						return `<img src="assets/app/media/img/products/${row.productImage}" style="max-width:80px;" /> <br/> ${row.PLC}`;
						//Any column value can be integrated as row.field variable
					}
				}, 
				{
					field: "QTY",
					width: 40,
					textAlign: 'center',
					title: "QTY"
				},
				{
					field: "costPrice",
					title: "Cost Price"
				},
				{
					field: "standardPrice",
					title: "Standard Price"
				},
							
				{
					field: "price",
					title: "Actual Price"
				},
				{
					field: "marginDiff",
					title: "Margin Difference"
				},
				{
					field: "actions",
					width: 110,
					title: "Actions",
					sortable: false,
					overflow: 'visible',
					template: function (row, index, datatable) {
						return `<a href="#" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill">
                       <i class="la la-check"></i>
                     </a>
                     <span class="btn m-btn m-btn-light m-btn--icon m-btn--icon-only m-btn--pill" >
                     <i class="la la-pause"></i>
                   </span>
                   
                 
                 <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                   <i class="la la-remove"></i>
                 </a>`;
					}
				},

				{
					field: "priceDiff",
					title: "Price Difference"
				},
				{
					field: "orderLineID",
					title: "Order Line ID"
				},
				{
					field: "margin",
					title: "Margin"
				},
				{
					field: "actMargin",
					title: "Actual Margin"
				},
				
				{
					field: "reasonforChange",
					title: "Reason for Change"
				},
				{
					field: "productDescription",
					title: "Product Description"
				},
				{
					field: "PLC",
					title: "PLC"
				},
				{
					field: "QTY",
					title: "QTY"
				},
				
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
				}

			]
		});
		// Filter event handler




		$('.m_datatable thead th').each(function (i) {
			var title = $('.m_datatable thead th').eq($(this).index()).text();
			var name = $(this).data('field');

			$(this).append('<input type="text" class="searchbox m-input" placeholder="Search ' + title + '" data-col-field = "' + name + '"  data-col-index="' + i + '" name="' + name + '" />');
		});



		$('input.searchbox').on('keyup', function () {
			// debugger;
			var val = this.value;

			table.search($(this).val().toLowerCase(), $(this).data('col-field'));

		});



	};

	
	//End DataTable  

	return {
		//main function to initiate the module
		init: function () {
			initTable();
			pageSetup();
			orderTotal();
		}
	};
}();

jQuery(document).ready(function () {
	PortletTools.init();

});