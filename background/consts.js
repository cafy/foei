consts = {
  ages: {
    AllAge: 1,
    MultiAge: 1,
    StoneAge: 2,
    BronzeAge: 2,
    IronAge: 3,
    EarlyMiddleAge: 4,
    HighMiddleAge: 5,
    LateMiddleAge: 6,
    ColonialAge: 7,
    ProgressiveEra: 8,
    IndustrialAge: 9,
    ModernEra: 10,
    PostModernEra: 11,
    ContemporaryEra: 12,
    TomorrowEra: 13,
    FutureEra: 14,
    ArcticFuture: 15,
    OceanicFuture: 16,
    VirtualFuture: 17
  },

  getGoodsAge: function (goodName) {
    if (!consts.goods.hasOwnProperty(goodName)) {
      sendNotification('missingGood', 'error', goodName + ' is missing in goods');
      return 1;
    }
    goodAge = consts.goods[goodName];
    return consts.getAge(goodAge);
  },

  getAge: function (age) {
    if (consts.ages[age] !== undefined) {
      return consts.ages[age];
    }

    sendNotification('missingAge', 'warning', age + ' is missing in ages');

    return 1;
  },

  valueGoods: function (goodsArray) {
    amount = 0;
    for (var i = 0; i < goodsArray.length; i++) {
      amount += goodsArray[i].value * Math.pow(2, consts.getGoodsAge(goodsArray[i].good_id) - 1);
    }
    return amount;
  },

  amountGoods: function (goodsArray) {
    amount = 0;
    for (var i = 0; i < goodsArray.length; i++) {
      amount += goodsArray[i].value;
    }
    return amount;
  },

  units: {
    javeliner: { name: 'Speerman', type: 'licht' },

    militiaman: { name: 'Soldaat', type: 'licht' },
    armoredswordsman: { name: 'Gepasterde infaterie', type: 'zwaar' },
    archer: { name: 'Boogschutter', type: 'range'},

    mounted_bowman: { name: 'Bereden boogschutter', type: 'range'},

    catapult: { name: 'Katapult', type: 'kata'},
    cataphract: { name: 'Zware calvalerie', type: 'snel' },
    spearman: { name: 'Huurling', type: 'licht'},

    trebuchet: { name: 'Trebuchet', type: 'treb' },
    feudal_knight: { name: 'Ridder', type: 'snel' },
    crossbowman: { name: 'Kruisboogschutter', type: 'range' },
    legionnaire: { name: 'Legionair', type: 'zwaar' },
    dismounted_knight: { name: 'Zware infanterie', type: 'zwaar' },
    axe_hammer_warrior: { name: 'Berserker', type: 'licht' },

    bombarde: { name: 'Kanon', type: 'kanon' },
    imperial_knight: { name: 'Zware ridder', type: 'snel' },
    biedenhaender_mercenary: { name: 'Langzwaardkrijger', type: 'licht' },
    pikeman: { name: 'Keizerlijke garde', type: 'zwaar' },
    longbowman: {name: 'Langboogshutter', type: 'range' },

    marksman: {name: 'Musketier', type: 'musk'},
    grenadier: { name: 'Grenadier', type: 'gren' },
    cannoniers: { name: 'Veldkanon', type: 'vkanon' },

    IronAge_champion: { name: 'Kampioen', type: 'champ' },
    EarlyMiddleAge_champion: { name: 'Kampioen', type: 'champ' },
    HighMiddleAge_champion: { name: 'Kampioen', type: 'champ' },
    LateMiddleAge_champion: { name: 'Kampioen', type: 'champ' },
    color_guard: { name: 'Vaandeldrager', type: 'vaandel' },
    military_drummer: { name: 'Militaire drummer', type: 'drum' },
    rogue: { name: 'Schurk', type: 'schurk' }
  }
};
