(function ($, Shuffle) {
  'use strict';
  var $list = $('#porfolio_grid'),
    $locationFilter = $('#location_filter ul'),
    $disciplineFilter = $('#discipline_filter ul'),
    $typeFilter = $('#type_filter ul');

  $.getJSON('scripts/portfolio-data.json', function(data) {
    // @TODO - figure out how to deal with the Chinese side of this.

    var code;
    for (code in data.disciplines) {
      $disciplineFilter.append(IHD.templates.type_filter_button({
        type_code: code,
        type_name: data.disciplines[code]
      }));
    }

    for (code in data.codes) {
      $typeFilter.append(IHD.templates.type_filter_button({
        type_code: code,
        type_name: data.codes[code]
      }));
    }

    var locations = [];
    $.each(data.items, function (i, portfolio) {
      if ($.inArray(portfolio.country_en, locations) === -1) {
        locations.push(portfolio.country_en);
        $locationFilter.append(IHD.templates.type_filter_button({
          type_code: portfolio.country_en,
          type_name: portfolio.country_en
        }));
      }

      portfolio.serializedLocations = JSON.stringify([portfolio.country_en]);
      portfolio.locationNames = [portfolio.country_en];

      var disciplines = (portfolio.disciplines === undefined) ? [] : portfolio.disciplines.split('');

      portfolio.serializedDisciplines = JSON.stringify(disciplines);
      portfolio.disciplineNames = disciplines.map(function(code) { return data.disciplines[code]; });

      var codes = (portfolio.codes === undefined) ? [] : portfolio.codes.split('');
      portfolio.serializedCodes = JSON.stringify(codes);
      portfolio.codeNames = codes.map(function(code) { return data.codes[code]; });

      $list.append(IHD.templates.portfolio(portfolio));

    });
    $locationFilter.find('[data-toggle="tooltip"]').tooltip();



    var shuffle;
    var $images = $list.find('img');
    var imgLoad = new imagesLoaded($images.get()); //eslint-disable-line new-cap
    imgLoad.on('always', function () {
      shuffle = new Shuffle($list[0], {
        itemSelector: '.portfolio-item'
      });
    });

    var updateFilter = function() {
      var selectedLocation = [],
          selectedDiscipline = [],
          selectedTypes = [];

      $locationFilter.find('li.active').each(function(i, el) {
        selectedLocation.push(el.getAttribute('data-type'));
      });
      $disciplineFilter.find('li.active').each(function(i, el) {
        selectedDiscipline.push(el.getAttribute('data-type'));
      });
      $typeFilter.find('li.active').each(function(i, el) {
        selectedTypes.push(el.getAttribute('data-type'));
      });

      if (selectedLocation.length + selectedTypes.length + selectedDiscipline.length > 0 ) {
        shuffle.filter(function(element) {
          var $el = $(element);
          return (selectedLocation   === null ||  _.intersection($el.data('locations'  ), selectedLocation  ).length === selectedLocation.length) &&
                 (selectedDiscipline === null ||  _.intersection($el.data('disciplines'), selectedDiscipline).length === selectedDiscipline.length) &&
                 (selectedTypes      === null ||  _.intersection($el.data('codes'      ), selectedTypes     ).length === selectedTypes.length);
        });
      }
      else {
        shuffle.filter(Shuffle.ALL_ITEMS);
      }
    };


    $('.portfolio-filter').on('click', 'a', function(event) {
      var $clickedLink = $(event.currentTarget);
      var $parentLi = $clickedLink.parent('li');
      $parentLi.toggleClass('active').siblings('li').removeClass('active');

      updateFilter();
    });
  });

})(jQuery, window.shuffle);
