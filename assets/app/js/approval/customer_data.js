var PortletTools = function () {

	var pageSetup = function () {
		//var json = null;
		$.ajax({
			'async': true,
			'global': false,
			'url': 'json/customer_data/customer_data.json',
			'dataType': "json",
			'success': function (data) {

				renderPageTitle(data[0].PageTitle);
				setValToID("customer_name", data[0].customerName);
				renderBreadcrumbs(data[0].BreadCrums);
				setIndecators(data[0].indecators);

				$(".breadcrumbs").on('click', function (e) {
					loadHTMLPage(e, $(this));
				});
				renderButtons(data[0].buttons);
				// $(".accept").on('click', function (e) {
				// 	//TODO :: Approve Action call here
				// 	swal({
				// 		position: "top-right",
				// 		type: "success",
				// 		title: "Request is Approved",
				// 		showConfirmButton: !1,
				// 		timer: 2000
				// 	});

				// 	$("#page").load('customercredit.html');
				// });
				// $(".hold").on('click', function (e) {
				// 	swal({
				// 		position: "top-right",
				// 		type: "warn",
				// 		title: "Request is marked on Hold",
				// 		showConfirmButton: !1,
				// 		timer: 2000
				// 	});
				// 	//TODO :: Hold Action call here
				// 	$("#page").load('customercredit.html');
				// });
				// $(".reject").on('click', function (e) {
				// 	swal({
				// 		position: "top-right",
				// 		type: "danger",
				// 		title: "Request is rejected",
				// 		showConfirmButton: !1,
				// 		timer: 2000
				// 	});
				// 	//TODO :: Reject Action call here
				// 	$("#page").load('customercredit.html');
				// });
			}

		});
	}

	var setIndecators = function (data) {;
		$("#indecators").html("");
		$.each(data, function (key, value) {
			$('#indecators').append(`<span class=" m-badge m-badge--${value.color} m-badge--wide ">${value.value}</span>`);
		});
	}


	var renderButtons = function (data) {
		$("#buttons").html("");
		//"0":{"class":"info","icon":"la la-check","text":"Approve","text_class":"m--icon-font-size-sm5"},
		$.each(data, function (key, value) {
			$("#buttons").append(`<button type="button" class="btn m-btn--pill ${value.class} btn-sm m-btn m-btn--custom ${value.text_class}" data-toggle="modal" data-target="${value.modal}"> <i class="${value.icon}"></i>${value.text}</button>`);
		});
	}

	//Start DataTable
	//Start DataTable
	var initTable = function () {
		// begin first table


		var table = $('#m_table_4').mDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: 'json/customer_data/mutation.json',
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
					field: "date",
					title: "Date"
				},
				{
					field: "subject",
					title: "Subject",
					template: function (row) {
						return `<span class="subject">${row.subject}</span>`
					}
				},
				{
					field: "oldValue",
					title: "Old Value",
					template: function (row) {
						return `<span class="oldValue">${row.oldValue}</span>`
					}
				},
				{
					field: "newValue",
					title: "New Value",
					template: function (row) {
						return `<span class="newValue">${row.newValue}</span>`
					}
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
				}

			]
		});
	};
	
	//End DataTable  

	return {
		//main function to initiate the module
		init: function () {
			
			pageSetup();
			initTable();
			$('#m_table_4').on('click', 'tbody tr td', function () {
				
				$("#subject").text($('.subject', $(this).parent()).text());
				$("#oldValue").val($('.oldValue', $(this).parent()).text());
				$("#newValue").val($('.newValue', $(this).parent()).text());
				
				$('#m_modal_6').modal('show'); 

		
			});
		}
	};
}();

jQuery(document).ready(function () {
	PortletTools.init();

});