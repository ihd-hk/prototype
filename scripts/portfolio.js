this.IHD=this.IHD||{},this.IHD.templates=this.IHD.templates||{},this.IHD.templates.portfolio=Handlebars.template({1:function(e,a,l,n,t){var i;return'      <div class="image-container">\n        '+(null!=(i=l.each.call(null!=a?a:{},null!=a?a.files:a,{name:"each",hash:{},fn:e.program(2,t,0),inverse:e.noop,data:t}))?i:"")+"\n      </div>\n"},2:function(e,a,l,n,t){return'<img src="images/portfolio/'+e.escapeExpression(e.lambda(a,a))+'" />'},4:function(e,a,l,n,t){return'          <span class="label label-default label-location">'+e.escapeExpression(e.lambda(a,a))+"</span>\n"},6:function(e,a,l,n,t){return'          <span class="label label-default label-code">'+e.escapeExpression(e.lambda(a,a))+"</span>\n"},8:function(e,a,l,n,t){return'          <span class="label label-default label-discipline">'+e.escapeExpression(e.lambda(a,a))+"</span>\n"},compiler:[7,">= 4.0.0"],main:function(e,a,l,n,t){var i,s,o=null!=a?a:{},c=l.helperMissing,r="function",p=e.escapeExpression;return'<div class="portfolio-item" data-locations="'+p((s=null!=(s=l.serializedLocations||(null!=a?a.serializedLocations:a))?s:c,typeof s===r?s.call(o,{name:"serializedLocations",hash:{},data:t}):s))+'" data-codes="'+p((s=null!=(s=l.serializedCodes||(null!=a?a.serializedCodes:a))?s:c,typeof s===r?s.call(o,{name:"serializedCodes",hash:{},data:t}):s))+'" data-disciplines="'+p((s=null!=(s=l.serializedDisciplines||(null!=a?a.serializedDisciplines:a))?s:c,typeof s===r?s.call(o,{name:"serializedDisciplines",hash:{},data:t}):s))+'">\n  <div class="card">\n'+(null!=(i=l["if"].call(o,null!=(i=null!=a?a.files:a)?i.length:i,{name:"if",hash:{},fn:e.program(1,t,0),inverse:e.noop,data:t}))?i:"")+'\n    <div class="card-content">\n      <h2>'+p((s=null!=(s=l.title_en||(null!=a?a.title_en:a))?s:c,typeof s===r?s.call(o,{name:"title_en",hash:{},data:t}):s))+'</h2>\n      <p class="labels">\n'+(null!=(i=l.each.call(o,null!=a?a.locationNames:a,{name:"each",hash:{},fn:e.program(4,t,0),inverse:e.noop,data:t}))?i:"")+(null!=(i=l.each.call(o,null!=a?a.codeNames:a,{name:"each",hash:{},fn:e.program(6,t,0),inverse:e.noop,data:t}))?i:"")+(null!=(i=l.each.call(o,null!=a?a.disciplineNames:a,{name:"each",hash:{},fn:e.program(8,t,0),inverse:e.noop,data:t}))?i:"")+"      </p>\n    </div>\n  </div>\n</div>\n"},useData:!0}),this.IHD.templates.portfolio_filter_button=Handlebars.template({compiler:[7,">= 4.0.0"],main:function(e,a,l,n,t){var i,s=null!=a?a:{},o=l.helperMissing,c="function",r=e.escapeExpression;return'<li data-location="'+r((i=null!=(i=l.location_code||(null!=a?a.location_code:a))?i:o,typeof i===c?i.call(s,{name:"location_code",hash:{},data:t}):i))+'">\n  <a class="flag flag-'+r((i=null!=(i=l.location_code||(null!=a?a.location_code:a))?i:o,typeof i===c?i.call(s,{name:"location_code",hash:{},data:t}):i))+'" data-toggle="tooltip" data-placement="top" title="'+r((i=null!=(i=l.location_name||(null!=a?a.location_name:a))?i:o,typeof i===c?i.call(s,{name:"location_name",hash:{},data:t}):i))+'">'+r((i=null!=(i=l.location_name||(null!=a?a.location_name:a))?i:o,typeof i===c?i.call(s,{name:"location_name",hash:{},data:t}):i))+"</a>\n</li>\n"},useData:!0}),this.IHD.templates.type_filter_button=Handlebars.template({compiler:[7,">= 4.0.0"],main:function(e,a,l,n,t){var i,s=null!=a?a:{},o=l.helperMissing,c="function",r=e.escapeExpression;return'<li data-type="'+r((i=null!=(i=l.type_code||(null!=a?a.type_code:a))?i:o,typeof i===c?i.call(s,{name:"type_code",hash:{},data:t}):i))+'">\n  <a>'+r((i=null!=(i=l.type_name||(null!=a?a.type_name:a))?i:o,typeof i===c?i.call(s,{name:"type_name",hash:{},data:t}):i))+"</a>\n</li>\n"},useData:!0}),function(e,a){"use strict";var l=e("#porfolio_grid"),n=e('#portfolio_filters select[name="location"]'),t=e('#portfolio_filters select[name="discipline"]'),i=e('#portfolio_filters select[name="type"]');e.getJSON("scripts/portfolio-data.json",function(s){var o=function(e){return Object.keys(e).map(function(a){return{id:a,text:e[a]}})};n.select2({data:o(s.countries),minimumResultsForSearch:1/0,theme:"classic"}),t.select2({data:o(s.disciplines),minimumResultsForSearch:1/0,theme:"classic"}),i.select2({data:o(s.codes),minimumResultsForSearch:1/0,theme:"classic"});e.each(s.items,function(e,a){a.serializedLocations=JSON.stringify([a.country_en]),a.locationNames=[a.country_en];var n=void 0===a.disciplines?[]:a.disciplines.split("");a.serializedDisciplines=JSON.stringify(n),a.disciplineNames=n.map(function(e){return s.disciplines[e]});var t=void 0===a.codes?[]:a.codes.split("");a.serializedCodes=JSON.stringify(t),a.codeNames=t.map(function(e){return s.codes[e]}),l.append(IHD.templates.portfolio(a))});var c=new a(l[0],{itemSelector:".portfolio-item"}),r=function(){var l,s=[],o=[],r=[];(l=n.val())&&"-1"!==l&&s.push(l),(l=t.val())&&"-1"!==l&&o.push(l),(l=i.val())&&"-1"!==l&&r.push(l),s.length+o.length+r.length>0?c.filter(function(a){var l=e(a);return!(null!==s&&_.intersection(l.data("locations"),s).length!==s.length||null!==o&&_.intersection(l.data("disciplines"),o).length!==o.length||null!==r&&_.intersection(l.data("codes"),r).length!==r.length)}):c.filter(a.ALL_ITEMS)};e("#portfolio_filters ").on("change","select",r)})}(jQuery,window.shuffle);