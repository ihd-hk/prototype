JSON.stringify(jQuery('#listview > tbody > tr > td > table > tbody > tr img').closest('tr').map(function(i, el) {
  return {
    image: jQuery('td:first > img', el).prop('src'),
    title: jQuery('td:nth-child(2) table td:first > strong', el).text().trim(),
    type:  jQuery('td:nth-child(2) table td:first > span', el).text().trim(),
    description: jQuery('td:nth-child(2) table tr:eq(1)', el).text().trim(),
  };
}));
