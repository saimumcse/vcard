/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 98.03571428571429, "KoPercent": 1.9642857142857142};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5815789473684211, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.725, 500, 1500, "https://testapp.cisstaging.com/generator-10"], "isController": false}, {"data": [0.4, 500, 1500, "https://testapp.cisstaging.com/generator-12"], "isController": false}, {"data": [0.0, 500, 1500, "https://testapp.cisstaging.com/generator-11"], "isController": false}, {"data": [0.9, 500, 1500, "https://testapp.cisstaging.com/generator?_rsc=19g6o"], "isController": false}, {"data": [0.35, 500, 1500, "https://api.vcard.cisstaging.com/api/storedata"], "isController": false}, {"data": [0.8, 500, 1500, "https://testapp.cisstaging.com/generator-14"], "isController": false}, {"data": [0.875, 500, 1500, "https://testapp.cisstaging.com/?_rsc=19g6o"], "isController": false}, {"data": [0.775, 500, 1500, "https://testapp.cisstaging.com/generator-13"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.725, 500, 1500, "https://testapp.cisstaging.com/generator-16"], "isController": false}, {"data": [0.2, 500, 1500, "https://testapp.cisstaging.com/generator-15"], "isController": false}, {"data": [0.775, 500, 1500, "https://testapp.cisstaging.com/generator-50"], "isController": false}, {"data": [0.0, 500, 1500, "https://testapp.cisstaging.com/generator-0"], "isController": false}, {"data": [0.275, 500, 1500, "https://testapp.cisstaging.com/generator-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://testapp.cisstaging.com/generator-2"], "isController": false}, {"data": [0.025, 500, 1500, "https://testapp.cisstaging.com/generator-3"], "isController": false}, {"data": [0.7, 500, 1500, "https://testapp.cisstaging.com/generator-39"], "isController": false}, {"data": [0.375, 500, 1500, "https://testapp.cisstaging.com/generator-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://testapp.cisstaging.com/generator-5"], "isController": false}, {"data": [0.025, 500, 1500, "https://testapp.cisstaging.com/generator-6"], "isController": false}, {"data": [0.0, 500, 1500, "https://testapp.cisstaging.com/generator-7"], "isController": false}, {"data": [0.375, 500, 1500, "https://testapp.cisstaging.com/generator-8"], "isController": false}, {"data": [0.05, 500, 1500, "https://testapp.cisstaging.com/generator-9"], "isController": false}, {"data": [0.825, 500, 1500, "https://testapp.cisstaging.com/generator-43"], "isController": false}, {"data": [0.7, 500, 1500, "https://testapp.cisstaging.com/generator-42"], "isController": false}, {"data": [0.5, 500, 1500, "https://testapp.cisstaging.com/generator-45"], "isController": false}, {"data": [0.775, 500, 1500, "https://testapp.cisstaging.com/generator-44"], "isController": false}, {"data": [0.825, 500, 1500, "https://testapp.cisstaging.com/generator-47"], "isController": false}, {"data": [0.85, 500, 1500, "https://testapp.cisstaging.com/generator-46"], "isController": false}, {"data": [0.725, 500, 1500, "https://testapp.cisstaging.com/generator-49"], "isController": false}, {"data": [0.85, 500, 1500, "https://testapp.cisstaging.com/generator-48"], "isController": false}, {"data": [0.75, 500, 1500, "https://testapp.cisstaging.com/generator-41"], "isController": false}, {"data": [0.7, 500, 1500, "https://testapp.cisstaging.com/generator-40"], "isController": false}, {"data": [0.675, 500, 1500, "https://testapp.cisstaging.com/generator-29"], "isController": false}, {"data": [0.7, 500, 1500, "https://testapp.cisstaging.com/generator-28"], "isController": false}, {"data": [0.825, 500, 1500, "https://testapp.cisstaging.com/generator-32"], "isController": false}, {"data": [0.75, 500, 1500, "https://testapp.cisstaging.com/generator-31"], "isController": false}, {"data": [0.6, 500, 1500, "https://testapp.cisstaging.com/generator-34"], "isController": false}, {"data": [0.725, 500, 1500, "https://testapp.cisstaging.com/generator-33"], "isController": false}, {"data": [0.85, 500, 1500, "https://testapp.cisstaging.com/generator-36"], "isController": false}, {"data": [0.7, 500, 1500, "https://testapp.cisstaging.com/generator-35"], "isController": false}, {"data": [0.675, 500, 1500, "https://testapp.cisstaging.com/generator-38"], "isController": false}, {"data": [0.8, 500, 1500, "https://testapp.cisstaging.com/generator-37"], "isController": false}, {"data": [0.825, 500, 1500, "https://testapp.cisstaging.com/generator-30"], "isController": false}, {"data": [0.9, 500, 1500, "https://testapp.cisstaging.com/generator-18"], "isController": false}, {"data": [0.775, 500, 1500, "https://testapp.cisstaging.com/generator-17"], "isController": false}, {"data": [0.775, 500, 1500, "https://testapp.cisstaging.com/generator-19"], "isController": false}, {"data": [0.0, 500, 1500, "https://testapp.cisstaging.com/generator"], "isController": false}, {"data": [0.775, 500, 1500, "https://testapp.cisstaging.com/generator-21"], "isController": false}, {"data": [0.925, 500, 1500, "https://testapp.cisstaging.com/generator-20"], "isController": false}, {"data": [0.8, 500, 1500, "https://testapp.cisstaging.com/generator-23"], "isController": false}, {"data": [0.625, 500, 1500, "https://testapp.cisstaging.com/generator-22"], "isController": false}, {"data": [0.8, 500, 1500, "https://testapp.cisstaging.com/generator-25"], "isController": false}, {"data": [0.85, 500, 1500, "https://testapp.cisstaging.com/generator-24"], "isController": false}, {"data": [0.825, 500, 1500, "https://testapp.cisstaging.com/generator-27"], "isController": false}, {"data": [0.775, 500, 1500, "https://testapp.cisstaging.com/generator-26"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1120, 22, 1.9642857142857142, 3119.991964285719, 54, 55686, 590.0, 6107.499999999998, 19458.25000000002, 48768.659999999996, 18.034555496513857, 1611.1385772426452, 20.95152156498076], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://testapp.cisstaging.com/generator-10", 20, 0, 0.0, 695.0500000000001, 203, 1645, 512.0, 1346.7, 1630.35, 1645.0, 0.4144390567367069, 3.5332548489369637, 0.26145276430850845], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-12", 20, 0, 0.0, 2040.4000000000003, 286, 10238, 1296.5, 5146.200000000004, 9992.899999999998, 10238.0, 0.40145326080411087, 12.858265671731669, 0.25914121620265357], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-11", 20, 2, 10.0, 12802.75, 1952, 29610, 11132.0, 27458.300000000007, 29520.199999999997, 29610.0, 0.37248109658434836, 133.80044790851863, 0.21083012068387527], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator?_rsc=19g6o", 20, 0, 0.0, 294.25, 54, 1641, 140.0, 749.4000000000001, 1596.5499999999993, 1641.0, 0.5359774889454643, 2.878261925499129, 0.3402200857563982], "isController": false}, {"data": ["https://api.vcard.cisstaging.com/api/storedata", 40, 0, 0.0, 1644.7500000000002, 303, 8383, 1083.0, 3745.7, 4638.45, 8383.0, 0.9818842358485934, 0.7134002651087437, 0.728742206293878], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-14", 20, 0, 0.0, 1121.1499999999999, 170, 11396, 380.5, 3393.3000000000056, 11009.349999999995, 11396.0, 0.41577448391992183, 1.3159424827973307, 0.24930227844417188], "isController": false}, {"data": ["https://testapp.cisstaging.com/?_rsc=19g6o", 20, 0, 0.0, 295.55, 54, 1124, 145.5, 761.2000000000003, 1106.6499999999996, 1124.0, 0.5210232897410514, 2.303391047517324, 0.3261483678945449], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-13", 20, 0, 0.0, 718.15, 139, 2687, 377.0, 2367.800000000002, 2676.0499999999997, 2687.0, 0.4170576582212491, 0.64424004274841, 0.26595571368991766], "isController": false}, {"data": ["Test", 20, 9, 45.0, 51363.2, 30440, 61641, 51677.0, 58587.5, 61496.75, 61641.0, 0.3213522502691325, 805.6415144929865, 10.894280632903257], "isController": true}, {"data": ["https://testapp.cisstaging.com/generator-16", 20, 0, 0.0, 743.8, 175, 2412, 391.5, 2080.500000000001, 2398.0, 2412.0, 0.4147828611721764, 0.6643006760960637, 0.2531633674146584], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-15", 20, 1, 5.0, 2216.5, 924, 4681, 1785.0, 3865.7000000000007, 4641.799999999999, 4681.0, 0.4084967320261438, 34.94518005770016, 0.24709265216503268], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-50", 20, 0, 0.0, 537.2, 165, 1750, 414.0, 1473.7000000000016, 1739.6999999999998, 1750.0, 0.44876253730338594, 1.8921651670518544, 0.28485903246796956], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-0", 20, 0, 0.0, 23816.2, 1989, 45246, 24173.0, 42287.100000000006, 45119.65, 45246.0, 0.42030051486813075, 291.25183881475255, 0.25119522958915624], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-1", 20, 0, 0.0, 2315.7999999999993, 174, 9422, 1761.5, 5405.600000000004, 9230.449999999997, 9422.0, 0.42912929665708277, 9.255614888640947, 0.2682058104106767], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-2", 20, 0, 0.0, 8011.299999999999, 2340, 19930, 6283.5, 19077.3, 19888.6, 19930.0, 0.37176794245032246, 62.62329335278919, 0.23634856497574216], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-3", 20, 0, 0.0, 6178.8, 944, 21873, 4541.0, 14663.0, 21513.699999999997, 21873.0, 0.39812879466507417, 40.83969406290435, 0.251163282571912], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-39", 20, 0, 0.0, 667.15, 279, 2126, 466.0, 1491.3000000000006, 2095.8499999999995, 2126.0, 0.43200276481769484, 1.012084602341455, 0.26451731791083466], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-4", 20, 0, 0.0, 1565.3000000000004, 468, 3787, 1157.0, 3342.9000000000005, 3766.2499999999995, 3787.0, 0.4291477126426916, 0.4392058621577547, 0.2728273055960862], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-5", 20, 0, 0.0, 22262.55, 8900, 34765, 24025.5, 31286.300000000007, 34604.2, 34765.0, 0.35951178299868775, 199.94507614908954, 0.22855680735561107], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-6", 20, 0, 0.0, 4470.449999999998, 819, 10362, 3636.5, 9510.100000000004, 10328.1, 10362.0, 0.42077801855631064, 34.32052897056658, 0.26462992573267974], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-7", 20, 3, 15.0, 5991.35, 1541, 19647, 4740.5, 13082.700000000006, 19331.749999999996, 19647.0, 0.40080160320641284, 67.88044839679358, 0.21492203156312625], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-8", 20, 2, 10.0, 2216.6499999999996, 329, 14153, 1257.0, 5462.300000000003, 13724.999999999993, 14153.0, 0.42537805474615564, 7.967031871450751, 0.24151836038028796], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-9", 20, 1, 5.0, 4182.8, 566, 10646, 3474.5, 9689.5, 10598.699999999999, 10646.0, 0.40863027133050017, 40.560225717146125, 0.24489882569875776], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-43", 20, 0, 0.0, 511.8999999999999, 110, 2156, 363.5, 985.1000000000004, 2098.249999999999, 2156.0, 0.43782837127845886, 0.5908972745183888, 0.26936706436077057], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-42", 20, 0, 0.0, 729.7, 111, 1959, 382.5, 1547.0, 1938.4499999999998, 1959.0, 0.43696744592527853, 0.7527447017697181, 0.26841066746777364], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-45", 20, 0, 0.0, 1306.65, 294, 4642, 903.0, 2457.1000000000004, 4533.949999999999, 4642.0, 0.4370151862777231, 17.727708811318692, 0.26758644706653556], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-44", 20, 0, 0.0, 591.1, 105, 2128, 371.5, 1388.8000000000006, 2092.4999999999995, 2128.0, 0.4384234293480644, 1.1311666995484237, 0.2684487208996449], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-47", 20, 0, 0.0, 578.0, 97, 2835, 304.0, 2229.500000000002, 2808.7, 2835.0, 0.4425953793042401, 1.1872275272196158, 0.27446100181464106], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-46", 20, 0, 0.0, 489.2500000000001, 101, 1719, 341.0, 1421.4000000000008, 1705.7499999999998, 1719.0, 0.44081992506061274, 1.0336021875688781, 0.2707770828741459], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-49", 20, 0, 0.0, 673.7999999999998, 120, 2062, 389.5, 1781.6000000000001, 2048.25, 2062.0, 0.44522606353375926, 0.4739222746599586, 0.2726140056988936], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-48", 20, 0, 0.0, 557.4000000000001, 123, 2062, 381.5, 1470.6000000000006, 2033.8999999999996, 2062.0, 0.4447607187333215, 0.5607286014499199, 0.2727634095356698], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-41", 20, 0, 0.0, 617.55, 116, 2281, 393.0, 1711.7000000000003, 2253.0999999999995, 2281.0, 0.43743575162398024, 0.3981348833140133, 0.26869832790183945], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-40", 20, 0, 0.0, 705.9999999999999, 123, 2633, 413.5, 1728.9000000000003, 2588.2999999999993, 2633.0, 0.43674797458126785, 0.5796293920468194, 0.26699632039831417], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-29", 20, 0, 0.0, 763.0000000000001, 68, 2016, 544.5, 1592.9000000000005, 1996.0499999999997, 2016.0, 0.416831662533086, 0.626061618140514, 0.25644916737875406], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-28", 20, 0, 0.0, 725.8999999999999, 211, 1967, 525.0, 1326.7, 1935.0999999999995, 1967.0, 0.41337687569757353, 0.4065141736596255, 0.2563421055351164], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-32", 20, 0, 0.0, 578.6500000000001, 155, 1583, 413.0, 1474.2000000000005, 1578.8, 1583.0, 0.42107922605638254, 0.4942746383982146, 0.2574175737414995], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-31", 20, 0, 0.0, 782.5000000000001, 160, 4499, 396.0, 1695.6000000000008, 4360.649999999998, 4499.0, 0.417510385570841, 0.4639910339644699, 0.25482811619314033], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-34", 20, 0, 0.0, 930.9000000000001, 107, 2709, 732.0, 2248.8000000000015, 2689.8999999999996, 2709.0, 0.42757883484767506, 0.6455438268305719, 0.2643138695884554], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-33", 20, 0, 0.0, 683.35, 108, 1639, 459.5, 1525.6000000000001, 1633.8, 1639.0, 0.42499840625597657, 0.6171607715846066, 0.26064355383667315], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-36", 20, 0, 0.0, 474.54999999999995, 201, 1004, 410.0, 932.1000000000003, 1001.0, 1004.0, 0.43093232207881754, 0.7065775085647799, 0.2638618808041197], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-35", 20, 1, 5.0, 685.8499999999999, 204, 1857, 496.5, 1440.0, 1836.3999999999996, 1857.0, 0.428183005416515, 0.6082163970005781, 0.2482750580723201], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-38", 20, 1, 5.0, 689.3, 119, 2326, 422.0, 1684.800000000001, 2296.3499999999995, 2326.0, 0.4333694474539545, 0.5665332137053088, 0.2520864368905742], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-37", 20, 0, 0.0, 615.7500000000001, 103, 2182, 402.0, 2038.400000000002, 2179.3, 2182.0, 0.43174164579915375, 1.055658918703048, 0.2639358108108108], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-30", 20, 0, 0.0, 505.74999999999994, 100, 1721, 390.5, 1277.1000000000013, 1702.0499999999997, 1721.0, 0.41688379364252215, 0.40548462741010943, 0.2560741271495571], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-18", 20, 0, 0.0, 461.34999999999997, 132, 1441, 380.0, 984.9000000000004, 1419.1499999999996, 1441.0, 0.4091736737658299, 0.3788053151660222, 0.2513381257799873], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-17", 20, 1, 5.0, 628.7499999999999, 267, 2411, 394.0, 1362.1000000000004, 2359.499999999999, 2411.0, 0.4125667842482002, 0.5703413474431174, 0.23883748994368464], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-19", 20, 0, 0.0, 606.3, 127, 1656, 414.0, 1343.9000000000005, 1641.6, 1656.0, 0.4121416943145053, 0.749421713685165, 0.2535637377130257], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator", 20, 9, 45.0, 47483.90000000001, 19477, 55686, 49002.0, 54179.100000000006, 55618.799999999996, 55686.0, 0.34596689096853434, 863.4611933262987, 10.779030946738398], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-21", 20, 0, 0.0, 727.05, 186, 2835, 369.5, 1964.5, 2791.6499999999996, 2835.0, 0.4122861265718408, 0.6808357812822099, 0.2532499742321171], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-20", 20, 0, 0.0, 441.04999999999995, 162, 2177, 334.0, 547.2000000000003, 2095.999999999999, 2177.0, 0.41095608934185385, 0.46072030328559394, 0.25203166416668377], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-23", 20, 0, 0.0, 552.6999999999999, 153, 1951, 350.5, 1225.4000000000005, 1915.8999999999996, 1951.0, 0.413890153553247, 0.4757311628243864, 0.2542352603369066], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-22", 20, 0, 0.0, 921.3, 203, 2118, 760.5, 1829.2000000000003, 2104.0499999999997, 2118.0, 0.4071329696278805, 0.6671573467144369, 0.24928942573894633], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-25", 20, 0, 0.0, 648.0999999999999, 170, 2112, 401.5, 1703.0000000000005, 2092.85, 2112.0, 0.4176673279732693, 0.4886381434687272, 0.25655541923358044], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-24", 20, 1, 5.0, 461.8499999999999, 140, 1718, 382.5, 1017.400000000001, 1685.2999999999995, 1718.0, 0.41670139178264853, 0.47582904044087004, 0.2427773929077423], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-27", 20, 0, 0.0, 523.5500000000001, 167, 1415, 395.0, 1155.5, 1402.1999999999998, 1415.0, 0.41502386387217266, 0.6808985266652833, 0.2533104637891679], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-26", 20, 0, 0.0, 634.15, 181, 2642, 394.0, 2311.7000000000025, 2632.2, 2642.0, 0.4130780510977549, 0.4093668029824235, 0.2577703854018217], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 13, 59.09090909090909, 1.1607142857142858], "isController": false}, {"data": ["Assertion failed", 9, 40.90909090909091, 0.8035714285714286], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1120, 22, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 13, "Assertion failed", 9, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-11", 20, 2, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-15", 20, 1, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-7", 20, 3, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-8", 20, 2, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-9", 20, 1, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-35", 20, 1, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-38", 20, 1, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-17", 20, 1, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator", 20, 9, "Assertion failed", 9, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://testapp.cisstaging.com/generator-24", 20, 1, "Non HTTP response code: javax.net.ssl.SSLException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
