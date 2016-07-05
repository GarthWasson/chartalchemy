var stocks=[
    "GOOG","MSFT","INTL","MSI","AVEO","MU","ZU","AAPL","CSCO","QQQ","FB","HBAN","INTC","SQQQ","NFLX","TSLA","FTR","AMAT","XIV","SIRI","EBAY","FOXA","NVDA","AMZN","BAC","BIDU","GS","RIMM","SINA","S","PBR","FCX","TSM","JCP","VALE","SUNE","ABX","ITUB","F","ABEV","T","GE","NLY","RF","KGC","WMB","MBLY","WFC","NGD","LNG","SAND","ONVO","NOG","GORO","GTE","HLTH","ATNM","SYN","SYRG","GIG","DHY","TPLM","FAX","GGN","TXMD","TRXC","NBG","ALU","ITUB","ABX","GE","RF","SDRL","AUY","C","AA","HTZ","TWTR","NLY","JPM","WMB","IAG","KMI","PG","BP","POT","SD","BABA","RAD","PFE","EL","SAN","CVX","XRX","CHK","RIG","MRO","WMT","VZ","HAL","XOM","DIS","KO","GM","AU","ZU","MU","FTR","YHOO","CMCSA","QXOM","TVIX","KITE","SPY","UGAZ","UWTI","EEM","LU","TWX","MOT","TXN","HPQ","EMC","NT","FON","NWSA","NOK","TYC","MRK","AMD","IBM","VIAB","MCD","KRB"
];
$(document).ready(function() {
          $('#inputTicker').betterAutocomplete('init', stocks, {}, {});
});
