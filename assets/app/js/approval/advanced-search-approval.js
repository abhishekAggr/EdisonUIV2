var DatatablesSearchOptionsAdvancedSearch = function () {

	$.fn.dataTable.Api.register('column().title()', function () {
		return $(this.header()).text().trim();
	});



	var pageSetup = function () {
		//var json = null;
		$.ajax({
			'async': true,
			'global': false,
			'url': 'json/approval/approval.json',
			'dataType': "json",
			'success': function (data) {
				renderPageTitle(data[0].PageTitle);
				renderBreadcrumbs(data[0].BreadCrums);
				renderTopTabs(data[0].TopTabs);

			}

		});
	}
	/*

	*/
	var renderTopTabs = function (data) {
		
		$.each(data, function (key, value) {

			$("#approval-top-tab").append(`
			<div class="col-md-12 col-lg-6 col-xl-3">

                                    <!--begin::Total Profit-->
                                    <div class="m-widget24">
                                        <div class="m-widget24__item">
                                            <h4 class="m-widget24__title m--margin-top-10">
											<i class="${value.Icon}"></i> &nbsp; ${value.title}
                                            </h4>
                                            <br>
                                            <span class="m-widget24__desc">
											${value.Details}
                                            </span>
                                            <span class="m-widget24__stats m--font-${value.color}">
											${value.Count}
                                            </span>
                                            <div class="m--space-10"></div>
                                           
                                           
                                           
                                        </div>
                                    </div>

                                    <!--end::Total Profit-->
                                </div>`);
		});
	}


	var approvalDataTable = function () {
		// begin first table
		var t = $('#m_table_1').DataTable({
			responsive: true,
			//== Pagination settings
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			// read more: https://datatables.net/examples/basic_init/dom.html

			lengthMenu: [5, 10, 25, 50],

			pageLength: 10,


			
			scrollY: "300px",
			
			language: {
				'lengthMenu': 'Display _MENU_',
			},
			searchDelay: 500,
			processing: !0,
			serverSide: !0,
			ajax: {
				async: true,
				url: 'inc/api/datatables/demos/approval.php', //Calling this file for server side search
				//url:'json/approval/approvals_list.json',
				type: 'POST',
				data: {
					// parameters for custom backend script demo
					columnsDef: [
						'RecordID', 'DateCreated', 'Owner', 'CustomerID', 'Customer', 'Approval', 'Status', 'Approver', 'Actions'
					],
				},
			},

			columns: [{
					data: 'RecordID'
				},
				{
					data: 'DateCreated'
				},
				{
					data: 'Owner'
				},
				{
					data: 'CustomerID'
				},
				{
					data: 'Customer'
				},
				{
					data: 'Approval'
				},

				{
					data: 'Status'
				},
				{
					data: 'Approver'
				},
				{
					data: 'Actions'
				},
			],
			initComplete: function () {
				var a = $('<tr class="filter"></tr>').appendTo($(t.table().header()));
				this.api().columns().every(function () {
					var e;
					var column = this;

					switch (column.title()) {
						case "ID":
							e = "";
							break;

						case 'Approver':
							e = $('<select class="form-control form-control-sm form-filter m-input" title="Select" data-col-index="' + this.index() + '">\n\t\t\t\t\t\t\t\t\t\t<option value="">Select</option></select>'), this.data().unique().sort().each(function (t, a) {
								$(e).append('<option value="' + t + '">' + t + "</option>")
							});
							break;

						case 'Owner':
							e = $('<select class="form-control form-control-sm form-filter m-input" title="Select" data-col-index="' + this.index() + '">\n\t\t\t\t\t\t\t\t\t\t<option value="">Select</option></select>'), this.data().unique().sort().each(function (t, a) {
								$(e).append('<option value="' + t + '">' + t + "</option>")
							});
							break;

						case "Customer":
						case "Name":
							e = $('<input type="text" class=" inline-search form-control form-control-sm form-filter m-input" data-col-index="' + this.index() + '"/>');
							break;

						case 'DateCreated':
							e = $('\n\t\t\t\t\t\t\t<div class="input-group date">\n\t\t\t\t\t\t\t\t<input type="text" class="inline-search form-control form-control-sm m-input" readonly placeholder="From" id="m_datepicker_1"\n\t\t\t\t\t\t\t\t data-col-index="' + this.index() + '"/>\n\t\t\t\t\t\t\t\t<div class="input-group-append">\n\t\t\t\t\t\t\t\t\t<span class="input-group-text"><i class="la la-calendar-o glyphicon-th"></i></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="input-group date">\n\t\t\t\t\t\t\t\t<input type="text" class="form-control form-control-sm m-input" readonly placeholder="To" id="m_datepicker_2"\n\t\t\t\t\t\t\t\t data-col-index="' + this.index() + '"/>\n\t\t\t\t\t\t\t\t<div class="input-group-append">\n\t\t\t\t\t\t\t\t\t<span class="input-group-text"><i class="la la-calendar-o glyphicon-th"></i></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>');
							break;
						case 'Approval Type':
							var approval = {
								1: {
									'title': 'Profit Margin',
									'class': 'm-badge--brand'
								},
								2: {
									'title': 'Customer Credit',
									'class': ' m-badge--metal'
								},
								3: {
									'title': 'Customer Data',
									'class': ' m-badge--primary'
								},
								4: {
									'title': 'Discount',
									'class': ' m-badge--primary'
								}
							};

							e = $('<select class=" inline-search form-control form-control-sm form-filter m-input" title="Select" data-col-index="' + this.index() + '">\n\t\t\t\t\t\t\t\t\t\t<option value="">Select</option></select>'), this.data().unique().sort().each(function (t, a) {
								$(e).append(`<option value="${t}">${approval[t].title}</option"`);
								$('.m-input[data-col-index="4"]').append('<option value="' + t + '">' + approval[t].title + '</option>');
							});
							break;

						case 'Status':
							var status = {
								1: {
									'title': 'Pending',
									'class': 'm-badge--brand'
								},
								2: {
									'title': 'On Hold',
									'class': ' m-badge--metal'
								},
								3: {
									'title': 'Rejected',
									'class': ' m-badge--primary'
								}
							};
							column.data().unique().sort().each(function (d, j) {
								$('.m-input[data-col-index="5"]').append('<option value="' + d + '">' + status[d].title + '</option>');
							});
							e = $('<select class="form-control form-control-sm form-filter m-input" title="Select" data-col-index="' + this.index() + '">\n\t\t\t\t\t\t\t\t\t\t<option value="">Select</option></select>'), this.data().unique().sort().each(function (t, a) {
								$(e).append('<option value="' + t + '">' + status[t].title + "</option>")
							});
							break;
						case 'Actions':
							var i = $('<button class="btn btn-brand m-btn btn-sm m-btn--icon">\n\t\t\t\t\t\t\t  <span>\n\t\t\t\t\t\t\t    <i class="la la-search"></i>\n\t\t\t\t\t\t\t    <span>Search</span>\n\t\t\t\t\t\t\t  </span>\n\t\t\t\t\t\t\t</button>'),
								s = $('<button class="btn btn-secondary m-btn btn-sm m-btn--icon">\n\t\t\t\t\t\t\t  <span>\n\t\t\t\t\t\t\t    <i class="la la-close"></i>\n\t\t\t\t\t\t\t    <span>Reset</span>\n\t\t\t\t\t\t\t  </span>\n\t\t\t\t\t\t\t</button>');
							$("<th>").append(i).append(s).appendTo(a), $(i).on("click", function (e) {
								e.preventDefault();
								var n = {};
								$(a).find(".m-input").each(function () {

									var t = $(this).data("col-index");
									n[t] ? n[t] += "|" + $(this).val() : n[t] = $(this).val()

									console.log('$(this).data("col-index")' + $(this).data("col-index") + n[t]);
								}), $.each(n, function (a, e) {
									console.log(a + e);
									t.column(a).search(e || "", !1, !1);
									// t.table().draw();
								}), t.table().draw()
							}), $(s).on("click", function (e) {
								e.preventDefault(), $(a).find(".m-input").each(function (a) {
									console.log('$(this).data("col-index")' + $(this).data("col-index"));
									$(this).val(""), t.column($(this).data("col-index")).search("", !1, !1)
								}), t.table().draw()
							}),
							$(".accept").on('click',function(e){
								//TODO :: Approve Action call here
								swal({
									title: "Are you sure?",
									text: "You won't be able to revert this!",
									type: "warning",
									showCancelButton: !0,
									confirmButtonText: "Yes!"
								}).then(function (e) {
									e.value && swal("Approved!", "Request is Approved.", "success")
								})
							}) ,
							$(".reject").on('click',function(e){
								//TODO :: Approve Action call here
								swal({
									title: "Are you sure?",
									text: "You won't be able to revert this!",
									type: "warning",
									showCancelButton: !0,
									confirmButtonText: "Yes, reject it!",
									cancelButtonText: "No, cancel!",
									reverseButtons: !0
								}).then(function (e) {
									e.value ? swal("Rejected!", "Request is rejected.", "success") : "cancel" === e.dismiss && swal("Cancelled", "Your imaginary file is safe :)", "error")
								})
							}); 

					}

					if (e != null) {
						$(e).appendTo($("<th>").appendTo(a))
					}
				}), $("#m_datepicker_1,#m_datepicker_2").datepicker()

			},

			columnDefs: [{
					'targets': 0,
					'searchable': false,
					'orderable': false,
					'className': 'dt-body-center',
					'render': function (data, type, full, meta) {
						return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
					}
				},
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
					render: function (data, type, full, meta) {
						return `
						   <a href="#" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill accept" aria-expanded="true" title="Accept">
                              <i class="la la-check"></i>
                            </a>
							<span class="btn m-btn m-btn-light m-btn--icon m-btn--icon-only m-btn--pill"  aria-expanded="true"
							 title="Hold">
							<i class="la la-pause"></i>
						  </span>  
							<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill reject"
							title="Reject">
							<i class="la la-remove"></i>
							</a>`;
					},
				},
				{
					targets: 5,
					render: function (data, type, full, meta) {
						var status = {
							1: {
								'title': 'Profit Margin',
								'class': 'm-badge--brand',
								'link': 'profitmargin.html'
							},
							2: {
								'title': 'Customer Credit',
								'class': ' m-badge--metal',
								'link': 'customercredit.html'
							},
							3: {
								'title': 'Customer Data',
								'class': ' m-badge--primary',
								'link': ''
							},
							4: {
								'title': 'Discount',
								'class': ' m-badge--success',
								'link': ''
							}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						var approvalType = status[data].title;
						return `<span class="m--font-bold">${status[data].title}</span><a href="${status[data].link}"></a>`;

					},
				},
				// {
				// 	targets: 5,
				// 	render: function(data, type, full, meta) {
				// 		var status = {
				//             1: {'title': 'Non Profitable', 'state': 'danger'},
				//             2: {'title': 'Budget', 'state': 'primary'},
				//             3: {'title': 'Profitable', 'state': 'accent'}
				// 		};
				// 		if (typeof status[data] === 'undefined') {
				// 			return data;
				// 		}

				// 		return '<span class="m-badge m-badge--' + status[data].state + ' m-badge--dot"></span>&nbsp;' +
				// 			'<span class="m--font-bold">' + status[data].title + '</span>';

				// 	},
				// },
				
				{
					targets: 6,
					render: function (data, type, full, meta) {
						var status = {
							1: {
								'title': 'Pending',
								'state': 'dark'
							},
							2: {
								'title': 'On Hold',
								'state': 'info'
							},
							3: {
								'title': 'Rejected',
								'state': 'accent'
							},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="m-badge m--font-light m-badge--' + status[data].state + ' m-badge--wide">' + status[data].title + '</span>';

					}
				},
				{
					
					targets: 7,
					render: function (data, type, full, meta) {
						
						return data;

					}
				}
			],


		});






	};



	return {

		//main function to initiate the module
		init: function () {
			pageSetup();
			approvalDataTable();

		},

	};

}();

jQuery(document).ready(function () {
	DatatablesSearchOptionsAdvancedSearch.init();

	$('#m_table_1').on('click', 'tbody tr td', function () {
		if ($(this).find('.accept').length == 1) {
			return false;
		} else {
			if ($('a', $(this).parent()).attr('href') != "") {
				$("#page").load($('a', $(this).parent()).attr('href'));
			}
		}

	});


});