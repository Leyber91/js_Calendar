

let addNextMonth = function() {
    // this function will display the month After
    // get the current date that we have
    // get the current date we are
    // change the one we have
    // INFO: n2 get the year and n1 get the month

        let currentMonth = d.getMonth();
        let currentYear = d.getFullYear();
        console.log(currentMonth + " " + currentYear);
        currentMonth++ ;
        console.log(currentMonth + " " + currentYear);
        
        if (currentMonth === 12 & currentYear < 2021){
            
            currentMonth = 0;
            currentYear++;
            console.log(currentMonth + " " + currentYear);
            }

        else if(currentMonth === 12 & currentYear === 2021) { // This condition is placed in order to stopCurrent
            showMessage("Cannot go to 2021");
            currentMonth = 11;
            currentYear = 2021;
            console.log(currentMonth + " " + currentYear);
        };
        
        
        d.setMonth(currentMonth);
        d.setFullYear(currentYear);
        console.log(currentMonth + " " + currentYear);
        console.log(d)
    }


/*
    if ( n1 === 12){
        n2 = n2+1
        n1 = 0
    } else {

    }

    let n1NEXT = n + 1
*/


let addMonthBefore = function() {
    // this function will display the month Before

        // this function will display the month After
    // get the current date that we have
    // get the current date we are
    // change the one we have
    // INFO: n2 get the year and n1 get the month

    let currentMonth = d.getMonth();
    let currentYear = d.getFullYear();
    console.log(currentMonth + " " + currentYear);
    currentMonth-- ;
    console.log(currentMonth + " " + currentYear);
    
    if (currentMonth === -1 && currentYear > 2020){
        currentMonth = 11;
        currentYear--;

        console.log(currentMonth + " " + currentYear);
        }

    else if (currentMonth === -1 && currentYear === 2020){ // This condition is placed in order to stopCurrent
        showMessage("Cannot go before 2020");
        currentMonth = 0;
        currentYear = 2020;
        console.log(currentMonth + " " + currentYear);
    }
    
    d.setMonth(currentMonth);
    d.setFullYear(currentYear);
    console.log(currentMonth + " " + currentYear);
    console.log(d)

}

addMonthBefore();

//d.setMonth(0);
//d.setFullYear(252525);
