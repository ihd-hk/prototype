(function ($, Shuffle) {
  'use strict';
  var $list = $('#porfolio_grid'),
    $locationFilter = $('#portfolio_filters select[name="location"]'),
    $disciplineFilter = $('#portfolio_filters select[name="discipline"]'),
    $typeFilter = $('#portfolio_filters select[name="type"]');



  $.getJSON('scripts/portfolio-data.json', function(data) {
    // @TODO - figure out how to deal with the Chinese side of this.
    var kvMapper = function(object) {
      return Object.keys(object).map(function(key) {
        return { id: key, text: object[key] };
      });
    };

    $locationFilter.select2({
      data: kvMapper(data.countries),
      minimumResultsForSearch: Infinity,
      theme: 'classic'
    });

    $disciplineFilter.select2({
      data: kvMapper(data.disciplines),
      minimumResultsForSearch: Infinity,
      theme: 'classic'
    });
    $typeFilter.select2({
      data: kvMapper(data.codes),
      minimumResultsForSearch: Infinity,
      theme: 'classic'
    });

    var locations = [];
    $.each(data.items, function (i, portfolio) {
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
    var shuffle = new Shuffle($list[0], {
      itemSelector: '.portfolio-item'
    });


    var updateFilter = function() {
      var selectedLocations = [],
          selectedDisciplines = [],
          selectedTypes = [];

      var v;
      if (!!(v = $locationFilter.val()) && (v !== "-1")) {
        selectedLocations.push(v);
      }
      if (!!(v = $disciplineFilter.val()) && (v !== "-1")) {
        selectedDisciplines.push(v);
      }
      if (!!(v = $typeFilter.val()) && (v !== "-1")) {
        selectedTypes.push(v);
      }

      if (selectedLocations.length + selectedDisciplines.length + selectedTypes.length > 0 ) {
        shuffle.filter(function(element) {
          var $el = $(element);
          return (selectedLocations   === null ||  _.intersection($el.data('locations'  ), selectedLocations  ).length === selectedLocations.length) &&
                 (selectedDisciplines === null ||  _.intersection($el.data('disciplines'), selectedDisciplines).length === selectedDisciplines.length) &&
                 (selectedTypes       === null ||  _.intersection($el.data('codes'      ), selectedTypes      ).length === selectedTypes.length);
        });
      }
      else {
        shuffle.filter(Shuffle.ALL_ITEMS);
      }
    };

    $('#portfolio_filters ').on('change', 'select', updateFilter);
  });

})(jQuery, window.shuffle);
