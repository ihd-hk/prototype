(function ($, Shuffle, portfolio_conf) {
  'use strict';
  var $list = $('#porfolio_grid'),
    $locationFilter = $('#portfolio_filters select[name="location"]'),
    $disciplineFilter = $('#portfolio_filters select[name="discipline"]'),
    $typeFilter = $('#portfolio_filters select[name="type"]');



  $.getJSON(portfolio_conf.base_path + 'scripts/portfolio-data.json', function(data) {
    // @TODO - figure out how to deal with the Chinese side of this.
    var kvMapper = function(object) {
      return Object.keys(object).map(function(key) {
        return { id: key, text: object[key][portfolio_conf.lang] };
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
      var disciplines = (portfolio.disciplines === undefined) ? [] : portfolio.disciplines.split('');
      var codes = (portfolio.codes === undefined) ? [] : portfolio.codes.split('');

      var portfolio_data = {
        portfolio_base_path : portfolio_conf.base_path,
        serializedLocations : JSON.stringify([portfolio.country_en]),
        locationNames : [portfolio['country_' + portfolio_conf.lang]],

        serializedDisciplines : JSON.stringify(disciplines),
        disciplineNames : disciplines.map(function(code) { return data.disciplines[code][portfolio_conf.lang]; }),

        serializedCodes : JSON.stringify(codes),
        codeNames : codes.map(function(code) { return data.codes[code][portfolio_conf.lang]; }),

        files: portfolio.files,
        title: portfolio['title_' + portfolio_conf.lang]
      };

      $list.append(IHD.templates.portfolio(portfolio_data));


    });
    var shuffle = new Shuffle($list[0], {
      itemSelector: '.portfolio-item'
    });


    var updateFilter = function() {
      var selectedLocations = [],
          selectedDisciplines = [],
          selectedTypes = [];

      var v;
      if (!!(v = $locationFilter.val()) && (v !== '-1')) {
        selectedLocations.push(v);
      }
      if (!!(v = $disciplineFilter.val()) && (v !== '-1')) {
        selectedDisciplines.push(v);
      }
      if (!!(v = $typeFilter.val()) && (v !== '-1')) {
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

})(jQuery, window.shuffle, portfolio_conf);
