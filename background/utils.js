function humanReadableTime (seconds) {
  var hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  var minutes = '0' + Math.floor(seconds / 60);
  seconds -= minutes * 60;
  seconds = '0' + Math.floor(seconds);
  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

function sortByKey (array, key, ...keys) {
  for (var i = 0; i < array.length; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if (array[i][key] > array[j][key]) {
        [ array[i], array[j] ] = [ array[j], array[i] ];
      }
    }
  }
  return keys.length > 0 ? sortByKey(array, keys) : array;
}

function sortByKeyDesc (array, key, ...keys) {
  return sortByKey(array, key, keys).reverse();
}

function mapEqual (map1, map2, reversedOrder) {
  for (propName in map1) {
    if (!map1.hasOwnProperty(propName)) {
      continue;
    }

    if (!map2.hasOwnProperty(propName)) {
      return false;
    }
    if (map1[propName] != map2[propName]) {
      return false;
    }
  }
  // Make sure that all key/values of map2 are also present in map1
  return (reversedOrder ? true : mapEqual(map2, map1, true));
}

function copyRevenue (result) {
  revenue = {};

  if (result.revenue) {
    if (result.revenue.goods !== undefined && result.revenue.goods.length > 0) {
      revenue['goods'] = result.revenue.goods;
    }
    if (result.revenue.money) {
      revenue['money'] = result.revenue.money;
    }
    if (result.revenue.supplies) {
      revenue['supplies'] = result.revenue.supplies;
    }
    if (result.revenue.strategy_points && result.revenue.strategy_points.currentSP) {
      revenue['sp'] = result.revenue.strategy_points.currentSP;
    }
    if (result.revenue.medals) {
      revenue['medals'] = result.revenue.medals;
    }
  }
  if (entity.state.current_product && result.current_product.clan_power) {
    revenue['clan_power'] = entity.state.current_product.clan_power;
  }
  if (Object.keys(revenue).length > 1) {
    return revenue;
  }

  return undefined;
}

var msgCache = {};

function sendMessageCache (msg) {
  chrome.runtime.sendMessage(msg);

  msgCache = { ...msgCache, ...msg};
}

function sendNotification (id, type, message) {
  notifications = msgCache.notifications || {};
  if (message == '') {
    // Clear message
    delete notifications[id];
  } else {
    notifications[id] = {
      type: type,
      msg: message
    };
    if (debug) {
      switch (type) {
        case 'info':
          console.log(message);
          break;
        case 'warning':
          console.warn(message);
          break;
        default:
          console.error(message);
          break;
      }
    }
  }

  // Send and update
  sendMessageCache({notifications: notifications});
}

function sendPlayerArmies (playerId) {
  syncGet({'playerArmies': {}}, function (result) {
    playerArmies = result.playerArmies;
    var armyDetails = playerArmies[playerId] || {};

    chrome.runtime.sendMessage({'battleStats': armyDetails});
  });
}

function fixFloat (number) {
  return parseFloat(parseFloat(number).toPrecision(4));
}
