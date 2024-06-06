$(document).ready(function () {
    // to store amenities with their status (checked or unchecked)
    const amenities = {};
    // listen for changes on all checkboxes
    $("li input[type=checkbox]").change(function () {
		if (this.checked) {
            // if checked store in dict
			amenities[amenity_id] = true;
		} else {
			delete amenities[this.dataset.name];
		}
        // empty string to store the list of checked amenities
		let amenitiesList = '';
        // looping through the 'amenities' to create a comma-separated list of selected amenities
        for (const id in amenities) {
            // if 'amenitiesList' is empty, add the amenity_id without a comma, otherwise, add a comma before the next amenity_id
            if (amenitiesList === '') amenitiesList += id;
            else amenitiesList += ', ' + id;
        }
        // update the text inside the <h4> tag within the 'div.amenities' with the updated list of selected amenities
        $('div.amenities h4').text(amenitiesList);
	});

    // url + a function to be excuted when the request is compiete
    // data = data returned = json obj
    // textStatus = status of request
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
        if (textStatus === 'success' && data === 'OK') {
        $('#api_status').addClass('available');
        } else {
        $('#api_status').removeClass('available');
        }
    });
});
