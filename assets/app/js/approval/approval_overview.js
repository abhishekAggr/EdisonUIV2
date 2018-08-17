var DatatablesSearchOptionsColumnSearch = function () {

    
var data = [
    {
        "text": "Dashboard",
        "id": "1",
        "icon":"flaticon-squares-1",
        "url":"#",
        "class":"",
        "parentid": "-1"
    }, 
    {
        "text": "Sales",
        "id": "2",
        "icon":"fa fa-handshake",
        "url":"#",
        "class":"",
        "parentid": "-1"
    },
    {
        "text": "Customer",
        "id": "3",
        "icon":"",
        "url":"#",
        "class":"",
        "parentid": "2"
    },
    
    {
        "text": "Pricing",
        "id": "4",
        "icon":"",
        "url":"#",
        "class":"",
        "parentid": "2"
    },
    {
        "text": "Assortment",
        "id": "5",
        "icon":"",
        "url":"#",
        "class":"",
        "parentid": "2"
    },
    {
        "text": "Approvals",
        "id": "6",
        "icon":"",
        "url":"approval_overview.html",
        "class":"",
        "parentid": "2"
    },
    {
        "text": "Purchase",
        "id": "7",
        "icon":"flaticon-diagram",
        "url":"#",
        "class":"",
        "parentid": "-1"
    },
    {
        "text": "Inventory",
        "id": "8",
        "icon":"flaticon-file",
        "url":"#",
        "class":"",
        "parentid": "-1"
    },
    {
        "text": "Fincance",
        "id": "9",
        "icon":"flaticon-analytics",
        "url":"#",
        "class":"",
        "parentid": "-1"
    },
    {
        "text": "WareHouse",
        "id": "10",
        "icon":"fa fa-warehouse",
        "url":"#",
        "class":"",
        "parentid": "-1"
    },
    {
        "text": "Administration",
        "id": "11",
        "icon":"flaticon-user",
        "url":"#",
        "class":"",
        "parentid": "-1"
    },
    {
        "text": "System",
        "id": "12",
        "icon":"flaticon-laptop",
        "url":"#",
        "class":"",
        "parentid": "-1"
    },
    {
        "text": "Settings",
        "id": "13",
        "icon":"flaticon-settings",
        "url":"#",
        "class":"",
        "parentid": "-1"
    },
   
]
    
    var builddata = function () {
        var source = [];
        var items = [];
        // build hierarchical source.
        for (i = 0; i < data.length; i++) {
            var item = data[i];
            var label = item["text"];
            var parentid = item["parentid"];
            var id = item["id"];
            var icon = item["icon"];
            var url = item["url"];
    
            if (items[parentid]) {
                var item = { parentid: parentid, label: label, item: item };
                if (!items[parentid].items) {
                    items[parentid].items = [];
                }
                items[parentid].items[items[parentid].items.length] = item;
                items[id] = item;
            }
            else {
                items[id] = { parentid: parentid, label: label, item: item };
                source[id] = items[id];
            }
        }
        console.log(source);
        return source;
    }
    var source = builddata();
    
    
    
    
    var buildUL = function (parent, items) {
        
        $.each(items, function () {
            
            if (this.label) {
                
                // create LI element and append it to the parent element.
                if (this.items && this.items.length > 0) {
                    
                //var li = $("<li class='m-menu__item m-menu__item--submenu m-menu__item--active m-menu__item--open  '>" + this.label + "</li>");
                var li = $(`<li class="m-menu__item  m-menu__item--submenu m-menu__item--open m-menu__item--active" aria-haspopup="true" m-menu-submenu-toggle="click">
                <a href="javascript:;" class="m-menu__link m-menu__toggle">
                    <i class="m-menu__link-icon ${this.item['icon']}"></i>
                    <span class="m-menu__link-text">${this.label}</span>
                    <i class="m-menu__ver-arrow la la-angle-right"></i>
                </a>
                </li>`);

               // var div = $(`<div class="m-menu__submenu m--font-light"></div>`);
                var ul = $(`<ul class="m-menu__subnav"><li class="m-menu__item  m-menu__item--parent" aria-haspopup="true">
                <span class="m-menu__link">
                    <span class="m-menu__link-text">${this.label}</span>
                </span>
            </li>
            </ul>`);
                ul.appendTo(li);
                
                buildUL(ul, this.items);

                }else{
                  //  alert(this.items.length +i);
                //var li = $("<li class='m-menu__item  '>" + this.label + "</li>");
                var li = $(`<li class="m-menu__item  " aria-haspopup="true">
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
                li.appendTo(parent);            }
        });
    }
    var ul = $("<ul class='m-menu__nav  m-menu__nav--dropdown-submenu-arrow ' ></ul>");
    ul.appendTo("#m_ver_menu");
    buildUL(ul, source);
    //$('ul.m-menu__subnav').insertBefore(`<span class="m-menu__arrow"></span>`);
    $('ul.m-menu__subnav').wrap(`<div class="m-menu__submenu m--font-light">
    <span class="m-menu__arrow"></span></div>`);
    
}();

jQuery(document).ready(function () {
    DatatablesSearchOptionsColumnSearch.init(); 
    
});