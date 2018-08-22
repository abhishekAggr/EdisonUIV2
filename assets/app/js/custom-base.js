$(function () {
    $("#m_header").load("theme/header.html");
    $("#footer").load("theme/footer.html");

    var menuSetup = function () {

        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/sidenav.json',
            'dataType': "json",
            'success': function (data) {

                var source = builddata(data);
                var ul = $("<ul class='m-menu__nav  m-menu__nav--dropdown-submenu-arrow ' ></ul>");
                ul.appendTo("#m_ver_menu");
                buildUL(ul, source);

                $('ul.m-menu__subnav').wrap(`<div class="m-menu__submenu m--font-light">
                <span class="m-menu__arrow"></span></div>`);

            }

        });
    }



    var builddata = function (data) {
        var source = [];
        var items = [];
        // build hierarchical source.
        for (i = 0; i < data.length; i++) {
            var item = data[i];
            var label = item["value"];
            var parentid = item["parentid"];
            var id = item["id"];
            var icon = item["icon"];
            //var liClass = item["class"];
            var url = item["url"];

            if (items[parentid]) {
                var item = {
                    parentid: parentid,
                    label: label,
                    item: item
                };
                if (!items[parentid].items) {
                    items[parentid].items = [];
                }
                items[parentid].items[items[parentid].items.length] = item;
                items[id] = item;
            } else {
                items[id] = {
                    parentid: parentid,
                    label: label,
                    item: item
                };
                source[id] = items[id];
            }
        }

        return source;
    }

    var renderBreadcrumbs = function (data) {
        $("#breadcrumb").html('');
        $.each(data, function (key, value) {
            $("#breadcrumb").append(`
			<li class="m-nav__item">
							<a href="${value.link}" class="m-nav__link test11">
								<span class="m-nav__link-text m--font-darkblue">${value.title}</span>
							</a>
						</li>`);

            if (value.saperator == "1") {
                $("#breadcrumb").append(` <li class="m-nav__separator">></li>`);
            }


        });
    }

    var buildUL = function (parent, items) {

        $.each(items, function () {

            if (this.label) {

                // create LI element and append it to the parent element.
                if (this.items && this.items.length > 0) {

                    //var li = $("<li class='m-menu__item m-menu__item--submenu m-menu__item--active m-menu__item--open  '>" + this.label + "</li>");
                    var li = $(`<li class="m-menu__item  m-menu__item--submenu m-menu__item--open ${this.item['liClass']}" aria-haspopup="true" m-menu-submenu-toggle="click">
                <a href="javascript:;" class="m-menu__link m-menu__toggle">
                    <i class="m-menu__link-icon ${this.item['icon']}"></i>
                    <span class="m-menu__link-text">${this.label}</span>
                    <i class="m-menu__ver-arrow la la-angle-right"></i>
                </a>
                </li>`);


                    var ul = $(`<ul class="m-menu__subnav"><li class="m-menu__item  m-menu__item--parent" aria-haspopup="true">
                <span class="m-menu__link">
                    <span class="m-menu__link-text">${this.label}</span>
                </span>
            </li>
            </ul>`);
                    ul.appendTo(li);

                    buildUL(ul, this.items);

                } else {
                    var li = $(`<li class="m-menu__item ${this.item['class']} " aria-haspopup="true">
                <a href="${this.item['url']}" class="m-menu__link m--font-light m--font-boldest ">
                    <i class="m-menu__link-icon  ${this.item['icon']}"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">${this.label}</span>

                        </span>
                    </span>
                </a>
            </li>`)
                }
                li.appendTo(parent);
            }
        });

        $(".m-menu__link").on('click', function (e) {
            loadHTMLPage(e,$(this));
        });
      
    }

    menuSetup();
    menusSearch();
  
    $(".menu-search").on('click', function (e) {
        alert("menu-searchW3");
        loadHTMLPage(e,$(this));
    });
 
});
function renderPageTitle(title) {
    $("#page-title").text(title);
}

function renderBreadcrumbs(data) {

    $.each(data, function (key, value) {
        $("#breadcrumb").append(`
        <li class="m-nav__item">
                        <a href="${value.link}" class="m-nav__link breadcrumbs">
                            <span class="m-nav__link-text m--font-darkblue">${value.title}</span>
                        </a>
                    </li>`);

        if (value.saperator == "1") {
            $("#breadcrumb").append(` <li class="m-nav__separator"> -</li>`);
        }


    });
}

function menusSearch() {
    var t;
    t = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: "inc/api/typeahead/sidenav.json"
    }), $("#m_typeahead_4").typeahead(null, {
        name: "best-pictures",
        display: "value",
        source: t,
        templates: {
            empty: ['<div class="empty-message" style="padding: 10px 15px; text-align: center;">', "unable to find any, that match the current query", "</div>"].join("\n"),
            suggestion: Handlebars.compile("<div ><strong>{{value}}</strong> </div>")
        }
        
   
    })
}

function loadHTMLPage(e,obj){

        e.preventDefault();
        if (obj.attr('href') != "" && (obj.attr('href') != '#') && (obj.attr('href') != 'javascript:;')) {
            $("#page").html('')
            $("#page").load(obj.attr('href'));
        }
        return false;
}


/*
divid :: DiveID for the portlet
strFun :: function called on load/Reload
refresh :: set true if required
collapse :: set true if required

*/
function renderPortler(divID, strFun, reload, collapse) {
    // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
    var portlet = new mPortlet(divID);
    //Create the function call from function name and parameter.
    var funcCall = strFun + "();";

    //Call the function
    eval(funcCall);


    //approval();
    //== Toggle event handlers

    if (collapse == true) {
        portlet.on('beforeCollapse', function (portlet) {
            setTimeout(function () {
                toastr.info('Before collapse event fired!');
            }, 100);
        });

        portlet.on('afterCollapse', function (portlet) {
            setTimeout(function () {
                toastr.warning('Before collapse event fired!');
            }, 2000);
        });

        portlet.on('beforeExpand', function (portlet) {
            setTimeout(function () {
                toastr.info('Before expand event fired!');
            }, 100);
        });

        portlet.on('afterExpand', function (portlet) {
            setTimeout(function () {
                toastr.warning('After expand event fired!');
            }, 2000);
        });

    }


    //== Reload event handlers
    if (reload == true) {
        portlet.on('reload', function (portlet) {
            toastr.info('Reload event fired!');
            eval(funcCall);
            mApp.block(portlet.getSelf(), {
                type: 'loader',
                state: 'success',
                message: 'Please wait...'
            });

            // update the content here

            setTimeout(function () {
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });
    }

}

