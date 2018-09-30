chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.revenue) {
        updateRevenue(request.revenue);
      }
    }
  );

function updateRevenue (revenue) {
  plunderRows = '';
  if (revenue.spMax.value > 0) {
    plunderRows += addPlunderRow('sp', revenue.spMax);
  }
  for (var i = 0; i < revenue.goods.length; i++) {
    plunderRows += addPlunderRow((i == 0 ? 'goods' : ''), revenue.goods[i]);
  }
  if (revenue.suppliesMax.value > 0) {
    plunderRows += addPlunderRow('supplies', revenue.suppliesMax);
  }
  if (revenue.moneyMax.value > 0) {
    plunderRows += addPlunderRow('money', revenue.moneyMax);
  }
  if (revenue.clanPowerMax.value > 0) {
    plunderRows += addPlunderRow('clan_power', revenue.clanPowerMax);
  }
  if (plunderRows == '') {
    plunderRows = '<td colspan="4">Nothing to plunder</td>';
  }
  $('#plunder-body').html(plunderRows);
}

function createAllRows (all) {
  allRows = '';
  if (all.sp) {
    allRows += addPlunderRow('sp', {value: all.sp});
  }
  if (all.goods) {
    allRows += addPlunderRow('goods', { value: processRawGoodsPlunderData(all.goods)});
  }
  if (all.supplies) {
    allRows += addPlunderRow('supplies', {value: all.supplies});
  }
  if (all.money) {
    allRows += addPlunderRow('money', {value: all.money });
  }
  if (all.clanPower) {
    allRows += addPlunderRow('clan_power', {value: all.clanPower});
  }
  return allRows;
}

function addPlunderRow (resource, revenue) {
  row = '<tr><td>' + iconImage(resource) + '</td><td>' + revenue.value + '</td>' + (revenue.name ? '<td>' + l10n(revenue.name) + '</td>' : '');
  row += '<td>';
  if (revenue.all) {
    row += '<table>' + createAllRows(revenue.all) + '</table>';
  } else if (revenue.raw) {
    row += processRawGoodsPlunderData(revenue.raw);
  }
  row += '</td></tr>';
  return row;
}

function processRawGoodsPlunderData (raw) {
  list = [];
  for (var i = 0; i < raw.length; i++) {
    list.push((raw[i].value == 1 ? '' : raw[i].value + ' ') + raw[i].good_id);
  }
  return list.join(', ');
}

function iconImage (name) {
  if (name === undefined || !name) {
    return '';
  }
  return '<img src="icons/' + name + '.png">';
}

function l10n (key) {
  value = i18n[key];
  return value ? value : key;
}
