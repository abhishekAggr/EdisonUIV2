    //== Five Year Chart
    var chart_five_year = function () {
        var json = (function () {
            var json = null;
            $.ajax({
                'async': true,
                'global': false,
                'url': 'json/customer_credit/chart_five_year.json',
                'dataType': "json",
                'success': function (data) {
                    json = data;
                    //== AREA CHART
                    new Morris.Area({
                        element: 'm_morris_2',
                        data: json,
                        xkey: 'y',
                        ykeys: ['a'],
                        labels: ['Series A']
                    });
                }
            });
            return;
            // return json;
        })();
    }

    // == Last 16 months chart
    var last_months_chart = function () {
        var json = (function () {
                var json = null;
                $.ajax({
                    'async': true,
                    'global': false,
                    'url': 'json/customer_credit/chart_sixteen_months.json',
                    'dataType': "json",
                    'success': function (data) {
                        json = data;
                        // BAR CHART
                        var morisBarChart = new Morris.Bar({
                            element: 'm_morris_3',
                            data: json,
                            xkey: 'y',
                            ykeys: ['a'],
                            labels: ['Series A']
                        });
                    }
                });
                return;
                // return json;
            })
            ();

        //  return morisBarChart;
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
    }
    var approval = function () {
        var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/customer_credit/credit_detail.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
                $.each(json, function (i, val) {

                    var approvalHTML = "";

                    $.each(val['approval'], function (k, value) {

                        var leftWidth = "3";
                        var rightWidth = "9";

                        approvalHTML = approvalHTML + `<div class="col-lg-${leftWidth} col-md-${leftWidth} col-sm-${leftWidth}  m--font-thin m--padding-5"  >${k}:</div>
                    <div class="col-lg-${rightWidth} col-md-${rightWidth} col-sm-${rightWidth} m--padding-5 m--font-bold" >
                    ${value}
                    </div>`;

                    });
                    $("#approval").html(approvalHTML);
                });
            }
        });
    }
    var credit = function () {
        var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/customer_credit/credit_detail.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
                $.each(json, function (i, val) {

                    var creditTopHTML = "";
                    var crediBottomtHTML = "";
                    var count = 1;
                    $.each(val['credit'], function (k, value) {

                        //crediBottomtHTML += `<div class="${value.label_class}">${value.label}</div><div class="${value.value_class}">${value.value}</div>`;

                        if (count <= 4) {
                            creditTopHTML += `<div class="${value.label_class}">${value.label}<br/><span class="${value.value_class}">${value.value}</span></div>`;
                        } else {
                            crediBottomtHTML += `<div class="${value.label_class}">${value.label}</div><div class="${value.value_class}">${value.value}</div>`;
                        }
                        count++;

                    });

                    $("#credit_header_row").html(creditTopHTML);
                    $("#credit_header_row").append(`<div class="m--space-20 col-lg-12 col-md-12 col-sm-12"></div>`);
                    $("#credit_header_row").append(crediBottomtHTML);
                });
            }
        });
    }
    var customer = function () {
        var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/customer_credit/credit_detail.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
                $.each(json, function (i, val) {
                    setStatus(val.status);
                    var customerHTML = "";
                    var count = 1;
                    $.each(val['customer'], function (k, value) {

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
    //Progress Bar 
    var progress_bar = function () {

        var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/customer_credit/progress_bar.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
                var current_progress = 0;
                //Calculate percentage for progress bar
                current_progress = (json[0].value * 100) / (json[0].end - json[0].start);

                //Round off the progress
                current_progress = current_progress.toFixed();

                var css_class = "";


                if (current_progress > 50) {
                    css_class = " bg-success";
                } else {
                    css_class = "bg-warning";
                }

                $("#dynamic")
                    .css("width", current_progress + "%")
                    .attr("aria-valuenow", current_progress)
                    .removeClass()
                    .addClass("progress-bar  progress-bar-striped active" + css_class);
                //  .text(current_progress + "% Complete");

                $("#progress-bar-start").text(json[0].currency + " " + json[0].start);
                $("#progress-bar-value").text(json[0].currency + " " + json[0].value);
                $("#progress-bar-end").text(json[0].currency + " " + json[0].end);
                $("#invc-count").text(json[0].invc_count);
                $("#invc-overdue-date").text(json[0].invc_overdue_date);
                $("#overdue").text(json[0].overdue);
            }
        });





    }

    var PortletTools = function () {
        //== Toastr
        var initToastr = function () {
            toastr.options.showDuration = 1000;
        }

        var pageSetup = function () {
            //var json = null;
            $.ajax({
                'async': true,
                'global': false,
                'url': 'json/customer_credit/customer_credit.json',
                'dataType': "json",
                'success': function (data) {
                    renderPageTitle(data[0].pageTitle);
                    renderBreadcrumbs(data[0].breadCrums);
                    renderButtons(data[0].buttons);
                    $(".breadcrumbs").on('click', function (e) {
                        loadHTMLPage(e,$(this));
                    });

                    $(".accept").on('click', function (e) {
                        //TODO :: Approve Action call here
                        swal({
                            position: "top-right",
                            type: "success",
                            title: "Request is Approved",
                            showConfirmButton: !1,
                            timer: 2000
                        });
                        $("#page").load('profitmargin.html');
                    });
                    $(".hold").on('click', function (e) {
                        //TODO :: Hold Action call here
                        $("#page").load('profitmargin.html');
                    });
                    $(".reject").on('click', function (e) {
                        //TODO :: Reject Action call here
                        $("#page").load('profitmargin.html');
                    });


                }

            });
        }



        var renderButtons = function (data) {
            $("#buttons").html("");
            //"0":{"class":"info","icon":"la la-check","text":"Approve","text_class":"m--icon-font-size-sm5"},
            $.each(data, function (key, value) {
                $("#buttons").append(`<button type="button" class="btn m-btn--pill m--padding-top-5 m--padding-bottom-5 ${value.class} btn-sm m-btn m-btn--custom">
            <i class="${value.icon}"></i>
            <span class="${value.text_class}">${value.text}</span>
        </button>`);
            });
        }


        return {
            //main function to initiate the module
            init: function () {
                initToastr();
                pageSetup();
                renderPortler("m_portlet_tools_1", "approval", true, true);
                renderPortler("m_portlet_tools_2", "credit", true, true);
                renderPortler("m_portlet_tools_3", "customer", true, true);
                renderPortler("m_portlet_tools_4", "progress_bar", true, true);
                renderPortler("m_portlet_tools_5", "last_months_chart", true, true);
                renderPortler("m_portlet_tools_6", "chart_five_year", true, true);
            }
        };
    }();

    jQuery(document).ready(function () {
        PortletTools.init();
    });