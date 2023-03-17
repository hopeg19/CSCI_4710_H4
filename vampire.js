google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
    var data = new google.visualization.DataTable();
    var modelOption = document.getElementById('mySelect').value;
    
    classmate_data_processing(document.getElementById('user_table'), data, modelOption);

    var options = {'title':'How many vampires in the class?',
                'width':400,
                'height':300};
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}


    
function add_results(result_data, num_human, num_vampire){
    result_data.addColumn('string', 'Element');
        result_data.addColumn('number', 'Count');
        result_data.addRows([     
            ['Human', num_human],
            ['Vampire', num_vampire]
        ]);
        console.log(result_data);
}


function classmate_data_processing(table_data, result_data, modelOption){
    // this function processes classmate data and creates data table
    var num_human = 0;
    var num_vampire = 0;
    console.log(modelOption);

    if (modelOption == 1){
        // iterate over each row in the table
        
        for (var i = 0; i < table_data.rows.length; i++) {
            var is_vampire = Math.random() < 0.5; // randomly determine if user is a vampire

            // update the number of humans and vampires based on the result
            if (is_vampire) {
                num_vampire++;
            } else {
                num_human++;
            }
        }
        add_results(result_data, num_human, num_vampire);

        
    } 
    else if (modelOption == 2){
        for (var i = 0; i < table_data.rows.length; i++) {
            var score = 0;
            var noShadow = (table_data.rows.item(i).cells[2].innerHTML === 'No') ? true : false;
            var complex = (table_data.rows.item(i).cells[4].innerHTML === 'Yes') ? true : false;;
            var hatesGarlic = (table_data.rows.item(i).cells[1].innerHTML === 'No') ? true : false;;

            score += (noShadow === true) ? 4 : 0;
            score += (complex === true) ? 3 : 0;
            score += (hatesGarlic === true) ? 3 : 0;
            
            console.log(score);
            // update the number of humans and vampires based on the result
            if (score > 6) {
                num_vampire++;
            } else {
                num_human++;
            }
        }
        add_results(result_data, num_human, num_vampire);

    }




    
    // update the chart title to reflect the number of vampires and humans
    var chart_title = 'Class makeup: ' + num_human + ' humans and ' + num_vampire + ' vampires';
    result_data.setTableProperty('title', chart_title);
}
        








function insert_user_info() {
    // Get form data
    var first_name = document.getElementById('first_name').value;
    var garlic_checkbox = document.getElementById('garlic_checkbox').checked;
    var shadow_checkbox = document.getElementById('shadow_checkbox').checked;
    var accent_checkbox = document.getElementById('accent_checkbox').checked;
    var complexion_checkbox = document.getElementById('complexion_checkbox').checked;
    
    // Create new table row
    var row = document.createElement('tr');
    
    // Add columns to row
    var name_col = document.createElement('td');
    name_col.textContent = first_name;
    row.appendChild(name_col);
    
    var garlic_col = document.createElement('td');
    garlic_col.textContent = garlic_checkbox ? "Yes" : "No";
    row.appendChild(garlic_col);
    
    var shadow_col = document.createElement('td');
    shadow_col.textContent = shadow_checkbox ? "Yes" : "No";
    row.appendChild(shadow_col);
    
    var accent_col = document.createElement('td');
    accent_col.textContent = accent_checkbox ? "Yes" : "No";
    row.appendChild(accent_col);
    
    var complexion_col = document.createElement('td');
    complexion_col.textContent = complexion_checkbox ? "Yes" : "No";
    row.appendChild(complexion_col);
    
    // Add row to table
    var table = document.getElementById('user_table');
    table.appendChild(row);

    drawChart();
}